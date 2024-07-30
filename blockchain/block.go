package blockchain

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"
)

// Transaction represents an action on the platform
type Transaction struct {
	UserId    string // Unique ID for each user
	CourseId  string // Unique ID for each course
	Timestamp int64  // Time when the transaction happened
}

// Block represents each 'item' in the blockchain
type Block struct {
	Index        int           // Position of the block in the chain
	Timestamp    int64         // Time when block was created
	Transactions []Transaction // List of transactions included in the block
	PrevHash     string        // Hash of the previous block in the chain
	Hash         string        // Hash of the current block
}

// Blockchain is a series of interconnected blocks
type Blockchain struct {
	Blocks []Block    // The series of blocks in the chain
	mu     sync.Mutex // Mutex to handle concurrent access
}

// CreateGenesisBlock creates the first block in the blockchain
func CreateGenesisBlock() *Blockchain {
	genesisBlock := Block{
		Index:        0,
		Timestamp:    time.Now().Unix(),
		Transactions: []Transaction{},
		PrevHash:     "",
		Hash:         "",
	}
	genesisBlock.Hash = CalculateHash(genesisBlock)
	return &Blockchain{Blocks: []Block{genesisBlock}}
}

// CalculateHash generates a hash for a block
func CalculateHash(block Block) string {
	record := fmt.Sprintf("%d%d%s%s", block.Index, block.Timestamp, fmt.Sprint(block.Transactions), block.PrevHash)
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)
}

// CreateBlock creates a new block using the previous block's hash
func CreateBlock(prevBlock Block, transactions []Transaction) Block {
	newBlock := Block{
		Index:        prevBlock.Index + 1, // new block is one step away from the previous so we add one to the index of previous block
		Timestamp:    time.Now().Unix(),   // when the block was created
		Transactions: transactions,
		PrevHash:     prevBlock.Hash,
		Hash:         "",
	}
	newBlock.Hash = CalculateHash(newBlock)
	return newBlock
}

// AddBlock adds a new block to the blockchain
func (bc *Blockchain) AddBlock(transactions []Transaction) {
	bc.mu.Lock()
	defer bc.mu.Unlock()

	prevBlock := bc.Blocks[len(bc.Blocks)-1]
	newBlock := CreateBlock(prevBlock, transactions)
	bc.Blocks = append(bc.Blocks, newBlock)
}

// SaveBlockchain saves the blockchain to a file
func (bc *Blockchain) SaveBlockchain(filename string) error {
	bc.mu.Lock()
	defer bc.mu.Unlock()

	data, err := json.MarshalIndent(bc, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(filename, data, 0644)
}

// LoadBlockchain loads the blockchain from a file
func LoadBlockchain(filename string) (*Blockchain, error) {
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		return CreateGenesisBlock(), nil
	}

	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var blockchain Blockchain
	err = json.Unmarshal(data, &blockchain)
	if err != nil {
		return nil, err
	}
	return &blockchain, nil
}

// Global Blockchain instance
var bc *Blockchain

func init() {
	bc = CreateGenesisBlock()
}

// Course struct
type Course struct {
	CourseId string
	Name     string
	Content  []string
	Duration time.Duration
}

// Dummy course
var BasicMathCourse = Course{
	CourseId: "basic-math",
	Name:     "Basic Math",
	Content:  []string{"Addition", "Subtraction", "Multiplication", "Division"},
	Duration: 1 * time.Minute,
}

// Store all courses in a map for easy access
var Courses = map[string]Course{
	BasicMathCourse.CourseId: BasicMathCourse,
}

// UserCourseProgress struct to track user's progress
type UserCourseProgress struct {
	UserId    string
	CourseId  string
	Progress  int
	StartTime time.Time
}

// Function to check if the user has completed the course
func (ucp *UserCourseProgress) IsCourseCompleted() bool {
	return ucp.Progress >= 100
}

// Function to check if the course duration has expired
func (ucp *UserCourseProgress) IsCourseExpired() bool {
	course, exists := Courses[ucp.CourseId]
	if !exists {
		return false
	}
	return time.Since(ucp.StartTime) > course.Duration
}

// Function to generate a certificate
func GenerateCertificate(userId, courseId string) string {
	return "Certificate of Completion: User " + userId + " has completed the course " + courseId
}

// Function to add course completion to the blockchain
func AddCourseCompletionToBlockchain(userId, courseId string) {
	transaction := Transaction{
		UserId:    userId,
		CourseId:  courseId,
		Timestamp: time.Now().Unix(),
	}
	bc.AddBlock([]Transaction{transaction})
	bc.SaveBlockchain("blockchain.json")
}

// Function to start a course
func StartCourse(userId, courseId string) *UserCourseProgress {
	ucp := &UserCourseProgress{
		UserId:    userId,
		CourseId:  courseId,
		Progress:  0,
		StartTime: time.Now(),
	}

	go func() {
		time.Sleep(Courses[courseId].Duration)
		if !ucp.IsCourseCompleted() {
			ucp.Progress = 0
			// Handle course expiration logic here
			println("Course expired: User " + userId + " failed the course " + courseId)
		}
	}()

	return ucp
}

// Function to handle course completion
func CompleteCourseHandler(w http.ResponseWriter, r *http.Request) {
	userId := r.URL.Query().Get("userid")
	courseId := r.URL.Query().Get("courseid")

	// Here, for simplicity, assume that the user completes the course when this handler is called
	ucp := StartCourse(userId, courseId)
	ucp.Progress = 100

	if ucp.IsCourseCompleted() {
		certificate := GenerateCertificate(userId, courseId)
		AddCourseCompletionToBlockchain(userId, courseId)
		w.Write([]byte(certificate))
	} else if ucp.IsCourseExpired() {
		w.Write([]byte("Course expired. You failed to complete it in the allotted time."))
	} else {
		w.Write([]byte("Continue with the course."))
	}
}

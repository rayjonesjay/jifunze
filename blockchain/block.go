package blockchain

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type Transaction struct {
	UserId    string // each user has unique id
	CourseId  string // each course has a unique id
	Timestamp int64  //time when the transaction happened
}

type Block struct {
	Index        int   // position of block on the blockchain
	Timestamp    int64 // time when block was created
	Transactions []Transaction
	PrevHash     string // each block stores hash of previous block except the genesis block
	Hash         string // hash of the current block
}

// Blockchain is a series of blocks/nodes
type Blockchain struct {
	Blocks []Block
}

// CalculateHash generates a hash for  a block/node, returns hash as a string
func CalculateHash(block Block) string {
	record := string(block.Index) + string(block.Timestamp) + fmt.Sprint(block.Transactions)
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)

}

// CreateBlock creates a new block, and it needs hash of previous block to store it in order to ensure data is valid
func CreateBlock(prevBlock Block, transactions []Transaction) Block {
	newBlock := Block{
		Index:        prevBlock.Index + 1, // since its the current block we increase its position by 1
		Timestamp:    time.Now().Unix(),
		Transactions: transactions,
		PrevHash:     prevBlock.Hash, // store hash of previous block
		Hash:         "",
	}

	newBlock.Hash = CalculateHash(newBlock) // the newly created block also needs its hash to be calculated
	return newBlock
}

// AddBlock adds a block to the blockchain
func (bc *Blockchain) AddBlock(transactions []Transaction) {
	prevBlock := bc.Blocks[len(bc.Blocks)-1] // get the last block in the chain before adding another block since its needed by the CreateBlock() function
	newBlock := CreateBlock(prevBlock, transactions)
	bc.Blocks = append(bc.Blocks, newBlock)
}

// NewBlockchain creates a new blockchain with the genesis block
func NewBlockchain() *Blockchain {
	genesisBlock := Block{
		Index:        0,
		Timestamp:    time.Now().Unix(),
		Transactions: []Transaction{},
		PrevHash:     "", // genesis block has no previous block to reference since its the first one
		Hash:         "",
	}
	genesisBlock.Hash = CalculateHash(genesisBlock)
	return &Blockchain{Blocks: []Block{genesisBlock}}
}

// SaveBlockchain saves the blochain to a file
func (bc *Blockchain) SaveBlockchain(filename string) error {
	data, err := json.MarshalIndent(bc, "", " ")
	if err != nil {
		return err
	}
	return os.WriteFile(filename,data,0644)
}

// LoadBlockchain loads/reads the blockchain from a file
func LoadBlockchain(filename string) (*Blockchain, error) {
	if _, err := os.Stat(filename); os.IsNotExist(err){
		return NewBlockchain(),nil // if the file does not exist create a new blockchain
	}

	// if the file exist, then it means some data exist
	data , err := os.ReadFile(filename)
	if err != nil {
		return nil,err
	}

	var blockchain Blockchain
	err = json.Unmarshal(data, &blockchain)
	if err != nil {
		return nil,err 
	}
	return &blockchain,nil
}
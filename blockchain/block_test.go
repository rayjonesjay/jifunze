package blockchain

import (
	"testing"
	"time"
)

func TestCreateGenesisBlock(t *testing.T) {
	bc := CreateGenesisBlock()
	if len(bc.Blocks) != 1 {
		t.Errorf("Genesis block was not created properly")
	}
}

func TestCalculateHash(t *testing.T) {
	block := Block{
		Index:        0,
		Timestamp:    time.Now().Unix(),
		Transactions: []Transaction{{UserId: "user1", CourseId: "course1"}},
		PrevHash:     "",
		Hash:         "",
	}
	hash := CalculateHash(block)
	if hash == "" {
		t.Errorf("Hash not calculated")
	}
}

func TestAddBlock(t *testing.T) {
	bc := CreateGenesisBlock()
	bc.AddBlock([]Transaction{{UserId: "user2", CourseId: "course2"}})
	if len(bc.Blocks) != 2 {
		t.Errorf("Block was not added properly")
	}
}

func TestIsCourseCompleted(t *testing.T) {
	ucp := &UserCourseProgress{
		UserId:    "user1",
		CourseId:  "course1",
		Progress:  100,
		StartTime: time.Now(),
	}
	if !ucp.IsCourseCompleted() {
		t.Errorf("Course should be marked as completed")
	}
}

func TestIsCourseExpired(t *testing.T) {
	ucp := &UserCourseProgress{
		UserId:    "user1",
		CourseId:  "basic-math",
		Progress:  50,
		StartTime: time.Now().Add(-2 * time.Minute),
	}
	if !ucp.IsCourseExpired() {
		t.Errorf("Course should be marked as expired")
	}
}

func TestGenerateCertificate(t *testing.T) {
	certificate := GenerateCertificate("user1", "course1")
	if certificate == "" {
		t.Errorf("Certificate was not generated")
	}
}

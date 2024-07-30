package main

import (
	// "JIFUNZE/backend"
	"JIFUNZE/backend"
	"JIFUNZE/blockchain"
	"fmt"
)

func main() {
	// Simulate adding a course completion
	blockchain.AddCourseCompletionToBlockchain("user1", "basic-math")
	blockchain.AddCourseCompletionToBlockchain("user2", "science")

	blockchain.AddCourseCompletionToBlockchain("user3", "social")
	// Load the blockchain to verify the data
	bc, err := blockchain.LoadBlockchain("blockchain.json")
	if err != nil {
		fmt.Println("Error loading blockchain:", err)
		return
	}

	// Print the loaded blockchain for verification
	for _, block := range bc.Blocks {
		fmt.Printf("Block %d:\n", block.Index)
		fmt.Printf("  Timestamp: %d\n", block.Timestamp)
		fmt.Printf("  Transactions: %v\n", block.Transactions)
		fmt.Printf("  PrevHash: %s\n", block.PrevHash)
		fmt.Printf("  Hash: %s\n", block.Hash)
	}
	backend.StartServer()
}

package backend

import (
	"JIFUNZE/blockchain"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

var b *blockchain.Blockchain

func StartServer() {
	//load existing blockchain or create a new one

	var err error
	blockChainFile := "blockchain.json"

	block_chain, err := blockchain.LoadBlockchain(blockChainFile)

	if err != nil {
		log.Fatalf("failed to load blockchain: %v", err)
	}

	// handlers for various routes
	http.HandleFunc("/signup", handleSignUp)

	http.HandleFunc("/complete_course", handleCompleteCourse)

	http.HandleFunc("/view_records", handleViewRecords)

	port := ":8080"
	fmt.Printf("server starts on port %s\n", strings.TrimLeft(port,":"))

	log.Fatal(http.ListenAndServe(port, nil))

	// Before the server shuts down, save the current blockchain we have
	defer block_chain.SaveBlockchain(blockChainFile)
}

// several handlers to handle differnt routes
func handleSignUp(w http.ResponseWriter, r *http.Request) {
	// implement sign up logic here
}

func handleCompleteCourse(w http.ResponseWriter, r *http.Request) {
	// implement course completion logic here
}

func handleViewRecords(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(b)
}

package main

import (
	"log"
	"net/http"

	"JIFUNZE/db"
	"JIFUNZE/routes"

	"github.com/gorilla/mux"
)

func main() {
	db.Init()

	r := mux.NewRouter()
	routes.RegisterRoutes(r)

	log.Println("Server started on :8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}

package routes

import (
	"JIFUNZE/backend/handlers"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/register", handlers.RegisterUser).Methods("POST")
	r.HandleFunc("/login", handlers.LoginUser).Methods("POST")
	r.HandleFunc("/courses", handlers.GetCourses).Methods("GET")
	r.HandleFunc("/progress", handlers.TrackProgress).Methods("POST")
}

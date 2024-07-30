package handlers

import (
	"encoding/json"
	"net/http"

	"JIFUNZE/backend/models"
	"JIFUNZE/db"
)

func GetCourses(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query("SELECT id, title, description, language FROM courses")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var courses []models.Course
	for rows.Next() {
		var course models.Course
		err := rows.Scan(&course.ID, &course.Title, &course.Description, &course.Language)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		courses = append(courses, course)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(courses)
}

func TrackProgress(w http.ResponseWriter, r *http.Request) {
	// Implementation for tracking progress
}

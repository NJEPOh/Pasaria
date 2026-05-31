package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"backend/internal/auth"
	"backend/internal/user"
	"backend/pkg/database"
	"backend/pkg/middleware"
)

func main() {

	// Router Gin
	r := gin.Default()

	// =========================
	// Database Connection
	// =========================
	db, err := database.Connect()

	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	log.Println("Database connected successfully")

	// =========================
	// Auto Migration
	// =========================
	err = db.AutoMigrate(&auth.User{})

	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Migration completed")

	// =========================
	// API Group
	// =========================
	api := r.Group("/api")

	// =========================
	// Dependency Injection
	// =========================

	// Auth Module
	authRepo := auth.NewRepository(db)
	authService := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authService)

	// User Module
	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	// =========================
	// Routes
	// =========================
	auth.RegisterRoutes(api, authHandler)

	user.RegisterRoutes(
		api,
		userHandler,
		middleware.JWTAuth(),
	)

	// =========================
	// Run Server
	// =========================
	log.Println("Pasarin API running on :8080")

	r.Run(":8080")
}

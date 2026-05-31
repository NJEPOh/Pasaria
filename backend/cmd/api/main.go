package main

import (
	"github.com/gin-gonic/gin"

	"backend/internal/auth"
	"backend/internal/user"
	"backend/pkg/middleware"
)

func main() {

	r := gin.Default()

	api := r.Group("/api")

	// nanti koneksi database disini

	authRepo := auth.NewRepository(nil)
	authService := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authService)

	userRepo := user.NewRepository(nil)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	auth.RegisterRoutes(api, authHandler)

	user.RegisterRoutes(
		api,
		userHandler,
		middleware.JWTAuth(),
	)

	r.Run(":8080")
}

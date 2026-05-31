package auth

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.RouterGroup, h *Handler) {

	auth := r.Group("/auth")

	auth.POST("/register", h.Register)

	auth.POST("/login", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "coming soon",
		})
	})
}

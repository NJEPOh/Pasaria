package user

import "github.com/gin-gonic/gin"

func RegisterRoutes(
	r *gin.RouterGroup,
	h *Handler,
	authMiddleware gin.HandlerFunc,
) {

	user := r.Group("/user")

	user.Use(authMiddleware)

	user.GET("/profile", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "profile route",
		})
	})
}

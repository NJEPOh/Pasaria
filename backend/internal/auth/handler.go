package auth

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) Register(c *gin.Context) {

	var req RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		fmt.Println("REGISTER ERROR:", err.Error())

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	fmt.Println("REGISTER REQUEST:")
	fmt.Println("Full Name:", req.FullName)
	fmt.Println("Email:", req.Email)
	fmt.Println("Password:", req.Password)

	if err := h.service.Register(req); err != nil {

		fmt.Println("SERVICE ERROR:", err.Error())

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "user registered",
	})
}

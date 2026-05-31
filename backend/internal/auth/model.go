package auth

type User struct {
	ID           uint   `gorm:"primaryKey"`
	FullName     string `gorm:"size:100;not null"`
	Email        string `gorm:"size:255;unique;not null"`
	PasswordHash string `gorm:"size:255;not null"`
	Role         string `gorm:"size:20;default:customer"`
}

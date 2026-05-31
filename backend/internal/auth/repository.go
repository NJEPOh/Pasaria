package auth

type Repository struct{}

func NewRepository(db any) *Repository {
	return &Repository{}
}

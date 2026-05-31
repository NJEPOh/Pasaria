package auth

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) Register(req RegisterRequest) error {

	user := User{
		FullName: req.FullName,
		Email:    req.Email,

		// nanti diganti bcrypt
		PasswordHash: req.Password,

		Role: "customer",
	}

	return s.repository.CreateUser(&user)
}

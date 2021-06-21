// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewPost struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}

type NewURL struct {
	Key  string `json:"key"`
	Dest string `json:"dest"`
}

type NewUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Avatar   string `json:"avatar"`
	Bio      string `json:"bio"`
}

type Post struct {
	ID          string `json:"_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	CreatedAt   int    `json:"createdAt"`
	UpdatedAt   int    `json:"updatedAt"`
}

type URL struct {
	ID        string `json:"_id"`
	Key       string `json:"key"`
	Dest      string `json:"dest"`
	CreatedAt int    `json:"createdAt"`
	UpdatedAt int    `json:"updatedAt"`
}

type User struct {
	ID        string `json:"_id"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Bio       string `json:"bio"`
	Avatar    string `json:"avatar"`
	CreatedAt int    `json:"createdAt"`
	UpdatedAt int    `json:"updatedAt"`
}
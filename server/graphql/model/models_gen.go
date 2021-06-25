// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
)

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type NewPost struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Type        PostType `json:"type"`
	Tags        []string `json:"tags"`
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
	ID          string   `json:"_id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Type        PostType `json:"type"`
	Tags        []string `json:"tags"`
	CreatedAt   int      `json:"createdAt"`
	UpdatedAt   int      `json:"updatedAt"`
}

type PostEdit struct {
	ID          string   `json:"id"`
	Title       *string  `json:"title"`
	Description *string  `json:"description"`
	Tags        []string `json:"tags"`
	Content     *string  `json:"content"`
}

type URL struct {
	ID        string `json:"_id"`
	Key       string `json:"key"`
	Dest      string `json:"dest"`
	CreatedAt int    `json:"createdAt"`
	UpdatedAt int    `json:"updatedAt"`
}

type URLEdit struct {
	Key  string  `json:"key"`
	Dest *string `json:"dest"`
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

type UserEdit struct {
	ID     string  `json:"id"`
	Bio    *string `json:"bio"`
	Avatar *string `json:"avatar"`
}

type PostType string

const (
	PostTypePublic   PostType = "PUBLIC"
	PostTypeUnlisted PostType = "UNLISTED"
	PostTypePrivate  PostType = "PRIVATE"
)

var AllPostType = []PostType{
	PostTypePublic,
	PostTypeUnlisted,
	PostTypePrivate,
}

func (e PostType) IsValid() bool {
	switch e {
	case PostTypePublic, PostTypeUnlisted, PostTypePrivate:
		return true
	}
	return false
}

func (e PostType) String() string {
	return string(e)
}

func (e *PostType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PostType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PostType", str)
	}
	return nil
}

func (e PostType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

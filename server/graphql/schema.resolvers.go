package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/scnewmark/website-new/server/database"
	"github.com/scnewmark/website-new/server/graphql/generated"
	"github.com/scnewmark/website-new/server/graphql/model"
	"golang.org/x/crypto/bcrypt"
)

func (r *mutationResolver) Login(ctx context.Context, data model.Login) (*model.User, error) {
	var user model.User
	err := database.PostgreDB.Model(&user).Where("username = ?", data.Username).Select()
	if err != nil {
		return nil, fmt.Errorf("invalid credentials: username does not exist")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password))
	if err != nil {
		return nil, fmt.Errorf("invalid credentials: password does not match")
	}

	return &user, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, data model.NewUser) (*model.User, error) {
	var existing model.User
	err := database.PostgreDB.Model(&existing).Where("username = ?", data.Username).Select()
	if err != nil && !strings.Contains(err.Error(), "no rows in result set") {
		return nil, err
	}

	if existing.Username == data.Username {
		return nil, fmt.Errorf("could not create user: username %s already exists", data.Username)
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.MinCost)
	if err != nil {
		return nil, fmt.Errorf("bcrypt: %v", err)
	}

	user := &model.User{
		ID:        fmt.Sprint(time.Now().UnixNano()),
		Username:  data.Username,
		Password:  string(hashed),
		Avatar:    data.Avatar,
		Bio:       data.Bio,
		CreatedAt: int(time.Now().Unix()),
		UpdatedAt: int(time.Now().Unix()),
	}

	_, err = database.PostgreDB.Model(user).Insert()
	if err != nil {
		return nil, fmt.Errorf("could not create user: %v", err)
	}

	return user, nil
}

func (r *mutationResolver) CreatePost(ctx context.Context, data model.NewPost) (*model.Post, error) {
	post := &model.Post{
		ID:          fmt.Sprint(time.Now().UnixNano()),
		Title:       data.Title,
		Description: data.Description,
		Content:     data.Content,
		CreatedAt:   int(time.Now().Unix()),
		UpdatedAt:   int(time.Now().Unix()),
	}

	_, err := database.PostgreDB.Model(post).Insert()
	if err != nil {
		return nil, fmt.Errorf("could not create post: %v", err)
	}

	return post, nil
}

func (r *mutationResolver) CreateURL(ctx context.Context, data model.NewURL) (*model.URL, error) {
	var existing model.URL
	err := database.PostgreDB.Model(&existing).Where("key = ?", data.Key).Select()
	if err != nil && !strings.Contains(err.Error(), "no rows in result set") {
		return nil, err
	}

	if existing.Key == data.Key {
		return nil, fmt.Errorf("could not create url: key %s already exists", data.Key)
	}

	url := &model.URL{
		ID:        fmt.Sprint(time.Now().UnixNano()),
		Key:       data.Key,
		Dest:      data.Dest,
		CreatedAt: int(time.Now().Unix()),
		UpdatedAt: int(time.Now().Unix()),
	}

	_, err = database.PostgreDB.Model(url).Insert()
	if err != nil {
		return nil, fmt.Errorf("could not create url: %v", err)
	}

	return url, nil
}

func (r *mutationResolver) DeleteUser(ctx context.Context, username string) (bool, error) {
	var user model.User
	res, err := database.PostgreDB.Model(&user).Where("username = ?", username).Delete()
	if err != nil {
		return false, err
	}
	if res.RowsAffected() == 0 {
		return false, errors.New("invalid username: no rows affected by change")
	}
	return true, nil
}

func (r *mutationResolver) DeletePost(ctx context.Context, id string) (bool, error) {
	var post model.Post
	res, err := database.PostgreDB.Model(&post).Where("id = ?", id).Delete()
	if err != nil {
		return false, err
	}
	if res.RowsAffected() == 0 {
		return false, errors.New("invalid id: no rows affected by change")
	}
	return true, nil
}

func (r *mutationResolver) DeleteURL(ctx context.Context, key string) (bool, error) {
	var url model.URL
	res, err := database.PostgreDB.Model(&url).Where("key = ?", key).Delete()
	if err != nil {
		return false, err
	}
	if res.RowsAffected() == 0 {
		return false, errors.New("invalid key: no rows affected by change")
	}
	return true, nil
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	var user model.User
	err := database.PostgreDB.Model(&user).Where("id = ?", id).Select()

	if err != nil {
		return nil, fmt.Errorf("could not find user associated with id %s", id)
	}

	return &user, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []model.User
	err := database.PostgreDB.Model(&users).Select()
	if err != nil {
		return nil, err
	}

	var res []*model.User
	for _, user := range users {
		res = append(res, &model.User{
			ID:        user.ID,
			Username:  user.Username,
			Password:  user.Password,
			Avatar:    user.Avatar,
			Bio:       user.Bio,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		})
	}

	return res, nil
}

func (r *queryResolver) Post(ctx context.Context, id string) (*model.Post, error) {
	var post model.Post
	err := database.PostgreDB.Model(&post).Where("id = ?", id).Select()

	if err != nil {
		return nil, fmt.Errorf("could not find post associated with id %s", id)
	}

	return &post, nil
}

func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	var posts []model.Post
	err := database.PostgreDB.Model(&posts).Select()
	if err != nil {
		return nil, err
	}

	var res []*model.Post
	for _, post := range posts {
		res = append(res, &model.Post{
			ID:          post.ID,
			Title:       post.Title,
			Description: post.Description,
			Content:     post.Content,
			CreatedAt:   post.CreatedAt,
			UpdatedAt:   post.UpdatedAt,
		})
	}

	return res, nil
}

func (r *queryResolver) URL(ctx context.Context, key string) (*model.URL, error) {
	var url model.URL
	err := database.PostgreDB.Model(&url).Where("key = ?", key).Select()

	if err != nil {
		return nil, fmt.Errorf("could not find url associated with key %s", key)
	}

	return &url, nil
}

func (r *queryResolver) Urls(ctx context.Context) ([]*model.URL, error) {
	var urls []model.URL
	err := database.PostgreDB.Model(&urls).Select()
	if err != nil {
		return nil, err
	}

	var res []*model.URL
	for _, url := range urls {
		res = append(res, &model.URL{
			ID:        url.ID,
			Key:       url.Key,
			Dest:      url.Dest,
			CreatedAt: url.CreatedAt,
			UpdatedAt: url.UpdatedAt,
		})
	}

	return res, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

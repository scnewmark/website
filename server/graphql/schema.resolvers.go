package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/scnewmark/website-new/server/database"
	"github.com/scnewmark/website-new/server/graphql/generated"
	"github.com/scnewmark/website-new/server/graphql/model"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func (r *mutationResolver) CreateUser(ctx context.Context, data model.NewUser) (*model.User, error) {
	if database.Exists("store", "users", "username", data.Username) {
		return nil, fmt.Errorf("database: user already exists with username %s", data.Username)
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

	_, err = database.InsertOne("store", "users", user)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
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

	_, err := database.InsertOne("store", "posts", post)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
	}

	return post, nil
}

func (r *mutationResolver) CreateURL(ctx context.Context, data model.NewURL) (*model.URL, error) {
	if database.Exists("store", "urls", "key", data.Key) {
		return nil, fmt.Errorf("database: url already exists with key %s", data.Key)
	}

	url := &model.URL{
		ID:        fmt.Sprint(time.Now().UnixNano()),
		Key:       data.Key,
		Dest:      data.Dest,
		CreatedAt: int(time.Now().Unix()),
		UpdatedAt: int(time.Now().Unix()),
	}

	_, err := database.InsertOne("store", "urls", url)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
	}

	return url, nil
}

func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (bool, error) {
	return false, errors.New("not implemented")
}

func (r *mutationResolver) DeletePost(ctx context.Context, id string) (bool, error) {
	return false, errors.New("not implemented")
}

func (r *mutationResolver) DeleteURL(ctx context.Context, key string) (bool, error) {
	return false, errors.New("not implemented")
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	col := database.Client.Database("store").Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := col.FindOne(ctx, bson.M{"_id": id})

	var user *model.User
	err := result.Decode(&user)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
	}

	return user, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	col := database.Client.Database("store").Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := col.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var results []*model.User
	err = cursor.All(ctx, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (r *queryResolver) Post(ctx context.Context, id string) (*model.Post, error) {
	col := database.Client.Database("store").Collection("posts")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := col.FindOne(ctx, bson.M{"_id": id})

	var post *model.Post
	err := result.Decode(&post)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
	}

	return post, nil
}

func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	col := database.Client.Database("store").Collection("posts")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := col.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var results []*model.Post
	err = cursor.All(ctx, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (r *queryResolver) URL(ctx context.Context, key string) (*model.URL, error) {
	col := database.Client.Database("store").Collection("urls")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := col.FindOne(ctx, bson.M{"key": key})

	var url *model.URL
	err := result.Decode(&url)
	if err != nil {
		return nil, fmt.Errorf("database: %v", err)
	}

	return url, nil
}

func (r *queryResolver) Urls(ctx context.Context) ([]*model.URL, error) {
	col := database.Client.Database("store").Collection("urls")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := col.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var results []*model.URL
	err = cursor.All(ctx, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

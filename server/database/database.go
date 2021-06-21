package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Client is the manager
var Client *mongo.Client

// CreateClient creates a new MongoDB client
func CreateClient() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Println("info - connecting to mongo cluster")
	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("WEBSITE_MONGO_URI")))
	if err != nil {
		log.Fatal(err)
	}
	log.Println("info - connected to mongo cluster")
}

// InsertOne inserts data into the collection in database
func InsertOne(database, collection string, data interface{}) (string, error) {
	col := Client.Database(database).Collection(collection)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := col.InsertOne(ctx, data)
	if err != nil {
		return "", err
	}
	return fmt.Sprint(res.InsertedID), nil
}

// Exists returns a boolean whether the document exists
func Exists(database, collection, key, value string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result := Client.Database(database).Collection(collection).FindOne(ctx, bson.M{key: value})
	if result.Err() == nil {
		return true
	}

	return false
}

package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"github.com/scnewmark/website-new/server/graphql/model"
	"github.com/scnewmark/website-new/server/utils"
)

// Variables
var (
	PostgreDB *pg.DB
	Store     = sessions.NewCookieStore(securecookie.GenerateRandomKey(32))
)

// CreatePostgre creates the PostgreSQL client
func CreatePostgre() {
	var (
		PostgresHost     = os.Getenv("POSTGRES_HOST")
		PostgresUsername = os.Getenv("POSTGRES_USERNAME")
		PostgresPassword = os.Getenv("POSTGRES_PASSWORD")
	)

	opts, err := pg.ParseURL(fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=require", PostgresUsername, PostgresPassword, PostgresHost, PostgresUsername))
	if err != nil {
		utils.Log(utils.Writer, "error", err.Error())
	}

	opts.OnConnect = func(ctx context.Context, cn *pg.Conn) error {
		start := time.Now()
		err := cn.Ping(ctx)
		end := time.Now()
		if err != nil {
			log.Fatalln(err)
		}
		utils.Log(utils.Writer, "info", "connected to PostgreSQL database")
		utils.Log(utils.Writer, "info", fmt.Sprintf("database latency: %dms", end.Sub(start).Milliseconds()))
		return nil
	}

	PostgreDB = pg.Connect(opts)

	err = createSchema(PostgreDB)
	if err != nil {
		log.Fatalln(err)
	}
	utils.Log(utils.Writer, "info", "created PostgreSQL schema")
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*model.Post)(nil),
		(*model.URL)(nil),
		(*model.User)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp:        false,
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

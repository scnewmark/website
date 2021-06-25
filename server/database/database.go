package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"github.com/scnewmark/website-new/server/graphql/model"
	"github.com/scnewmark/website-new/server/utils"
)

// Postgres authentication credentials
const (
	PostgresHost     = `batyr.db.elephantsql.com`
	PostgresUser     = `cuzaywpd`
	PostgresPassword = `x6ZlYSxLIlEnnpxBNrYxI-pNBqVU4vmh `
)

// PostgreDB is the PostgreSQL database
var PostgreDB *pg.DB

// Store is the session store
var Store = sessions.NewCookieStore(securecookie.GenerateRandomKey(32))

// CreatePostgre creates the PostgreSQL client
func CreatePostgre() {
	opts, err := pg.ParseURL("postgres://cuzaywpd:x6ZlYSxLIlEnnpxBNrYxI-pNBqVU4vmh@batyr.db.elephantsql.com/cuzaywpd?sslmode=require")
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
		err := db.Model(model).DropTable(&orm.DropTableOptions{
			IfExists: true,
		})
		if err != nil {
			return err
		}

		err = db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp: false,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

package database

import (
	"context"
	"log"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"github.com/scnewmark/website-new/server/graphql/model"
)

// PostgreDB is the PostgreSQL database
var PostgreDB *pg.DB

// Store is the session store
var Store = sessions.NewCookieStore(securecookie.GenerateRandomKey(32))

// CreatePostgre creates the PostgreSQL client
func CreatePostgre() {
	PostgreDB = pg.Connect(&pg.Options{
		User:     "postgres",
		Password: "postgres",
		Addr:     "database:5432",
		OnConnect: func(ctx context.Context, cn *pg.Conn) error {
			start := time.Now()
			err := cn.Ping(ctx)
			end := time.Now()
			if err != nil {
				log.Fatalln(err)
			}
			log.Println("info - connected to PostgreSQL database")
			log.Printf("info - PostgreSQL database latency: %dms\n", end.Sub(start).Milliseconds())
			return nil
		},
	})

	err := createSchema(PostgreDB)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("info - created PostgreSQL schema")
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

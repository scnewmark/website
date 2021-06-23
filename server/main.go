package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"github.com/scnewmark/website-new/server/database"
	"github.com/scnewmark/website-new/server/graphql"
	"github.com/scnewmark/website-new/server/graphql/generated"
	"github.com/scnewmark/website-new/server/middleware"
)

const port = 8000
const hostname = "http://localhost"

func init() {
	loadEnv()
}

func main() {
	mux := chi.NewRouter()
	database.CreatePostgre()
	mux.Use(middleware.Context())

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graphql.Resolver{}}))

	mux.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))
	mux.Handle("/graphql", srv)

	var addr = fmt.Sprintf(":%d", port)
	log.Printf("info - server live at %s%s\n", hostname, addr)

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}).Handler(mux)
	if err := http.ListenAndServe(addr, cors); err != nil {
		log.Fatal(err)
	}
}

func loadEnv() {
	abs, err := filepath.Abs("./.env")
	if err != nil {
		log.Fatalln(err)
	}

	data, err := os.ReadFile(abs)
	if err != nil {
		log.Fatalln(err)
	}

	for _, line := range strings.Split(string(data), "\n") {
		var split = strings.SplitAfterN(line, "=", 2)
		os.Setenv(strings.ReplaceAll(split[0], "=", ""), split[1])
	}
}

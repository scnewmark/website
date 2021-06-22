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
	"github.com/scnewmark/website-new/server/database"
	"github.com/scnewmark/website-new/server/graphql"
	"github.com/scnewmark/website-new/server/graphql/generated"
)

const port = 8000
const hostname = "http://localhost"

func init() {
	loadEnv()
}

func main() {
	database.CreatePostgre()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graphql.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))
	http.Handle("/graphql", srv)

	var addr = fmt.Sprintf(":%d", port)
	log.Printf("info - server live at %s%s\n", hostname, addr)

	if err := http.ListenAndServe(addr, nil); err != nil {
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

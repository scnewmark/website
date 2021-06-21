package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/scnewmark/website-new/server/database"
	"github.com/scnewmark/website-new/server/graphql"
	"github.com/scnewmark/website-new/server/graphql/generated"
)

const port = 8000
const hostname = "http://localhost"

func main() {
	database.CreateClient()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graphql.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))
	http.Handle("/graphql", srv)

	var addr = fmt.Sprintf(":%d", port)
	log.Printf("info - server live at %s%s\n", hostname, addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}

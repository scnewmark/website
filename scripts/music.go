package main

import (
	"context"
	"fmt"
	"log"
	"os/exec"
	"strings"

	"github.com/machinebox/graphql"
)

const id = `1624671832803552000`

func main() {
	cmd := exec.Command("osascript", "NowPlaying.applescript")
	res, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalln(err)
	}

	track := strings.TrimSpace(string(res))

	fmt.Println(track)

	client := graphql.NewClient("https://scnewmark.cloud.libraryofcode.org/graphql")

	req := graphql.NewRequest(`
    mutation ($id: String!, $title: String!) {
        updateMusic(id:$id, title: $title)
    }`)

	// set any variables
	req.Var("id", id)
	req.Var("title", track)

	req.Header.Set("Cache-Control", "no-cache")

	ctx := context.Background()

	var resp map[string]interface{}
	if err := client.Run(ctx, req, &resp); err != nil {
		log.Fatal(err)
	}
}

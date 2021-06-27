package main

import (
	"context"
	"log"
	"os"
	"os/exec"
	"os/signal"
	"strings"

	"github.com/machinebox/graphql"
	"github.com/robfig/cron/v3"
)

const id = `1624671832803552000`

func main() {
	c := cron.New()
	_, err := c.AddFunc("* * * * *", updateMusic)
	if err != nil {
		log.Fatalln(err)
	}
	c.Start()

	sc := make(chan os.Signal)
	signal.Notify(sc, os.Interrupt, os.Kill)
	<-sc

	c.Stop()
}

func updateMusic() {
	cmd := exec.Command("osascript", "NowPlaying.applescript")
	res, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalln(err)
	}

	track := strings.TrimSpace(string(res))

	client := graphql.NewClient("https://scnewmark.cloud.libraryofcode.org/graphql")

	req := graphql.NewRequest(`
    mutation ($id: String!, $title: String!) {
        updateMusic(id:$id, title: $title)
    }`)

	req.Var("id", id)
	req.Var("title", track)

	req.Header.Set("Cache-Control", "no-cache")

	ctx := context.Background()

	var resp map[string]interface{}
	if err := client.Run(ctx, req, &resp); err != nil {
		log.Fatal(err)
	}
}

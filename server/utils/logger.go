package utils

import (
	"fmt"
	"os"
	"text/tabwriter"
	"time"
)

// Writer is the log writer
var Writer = tabwriter.NewWriter(os.Stdout, 0, 8, 1, '\t', tabwriter.AlignRight)

// Log logs s to standard output
func Log(w *tabwriter.Writer, t, s string) {
	fmt.Fprintf(w, "\033[0;35m%d\033[0m\t\033[0;36m%s\033[0m\t\033[0;33m%s\033[0m\n", time.Now().Unix(), t, s)
	w.Flush()
}

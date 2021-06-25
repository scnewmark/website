package utils

import (
	"strings"
)

var stopWords = strings.Join([]string{
	"A", "ABOUT", "ACTUALLY", "ALMOST", "ALSO", "ALTHOUGH", "ALWAYS", "AM", "AN", "AND", "ANY", "ARE", "AS",
	"AT", "BE", "BECAME", "BECOME", "BUT", "BY", "CAN", "COULD", "DID", "DO", "DOES", "EACH", "EITHER", "ELSE",
	"FOR", "FROM", "HAD", "HAS", "HAVE", "HENCE", "HOW", "I", "IF", "IN", "IS", "IT", "ITS", "JUST", "MAY", "MAYBE",
	"ME", "MIGHT", "MINE", "MUST", "MY", "MINE", "MUST", "MY", "NEITHER", "NOR", "NOT", "OF", "OH", "OK", "WHEN",
	"WHERE", "WHEREAS", "WHEREVER", "WHENEVER", "WHETHER", "WHICH", "WHILE", "WHO", "WHOM", "WHOEVER", "WHOSE",
	"WHY", "WILL", "WITH", "WITHIN", "WITHOUT", "WOULD", "YES", "YET", "YOU", "YOUR",
}, " ")

// NormalizeTitle removes punctuation and stop words from a title
func NormalizeTitle(title string) string {
	split := strings.Split(title, " ")
	var filtered []string
	for _, word := range split {
		upper := strings.ToUpper(word)
		if !strings.Contains(stopWords, upper) {
			filtered = append(filtered, word)
		}
	}

	var trimmed []string
	for _, word := range filtered {
		trimmed = append(trimmed, strings.Trim(strings.ToLower(word), ",."))
	}

	return strings.Join(trimmed, "-")
}

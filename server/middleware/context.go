package middleware

import (
	"context"
	"net/http"
)

type key struct {
	string
}

var requestKey = &key{"request"}
var writerKey = &key{"writer"}

// Context is the context middleware
func Context() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), requestKey, r)
			ctx = context.WithValue(ctx, writerKey, w)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// RequestFromContext returns the request for ctx
func RequestFromContext(ctx context.Context) *http.Request {
	raw, _ := ctx.Value(requestKey).(*http.Request)
	return raw
}

// WriterFromContext returns the request for ctx
func WriterFromContext(ctx context.Context) http.ResponseWriter {
	raw, _ := ctx.Value(writerKey).(http.ResponseWriter)
	return raw
}

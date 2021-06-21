all: build run

build:
	cd server && go build -o ../dist/server
	cd client && yarn build && cp -R .next ../dist && cp -R ./node_modules ../dist && cp -R ./public ../dist

run:
	cd dist && ./server & 
	cd dist && ./node_modules/.bin/next start &

clean:
	killport -port 3000 -name node
	killport -port 8000 -name server
	rm -f -r dist
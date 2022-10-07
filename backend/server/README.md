# Developing server only

## Start development server
```
docker build -t server -f Dockerfile.dev .
docker run --rm --name dev_server -d -p 8080:80 -v $PWD/app:/app server
```

## Access the API reference
http://localhost:8080/docs

## Get into the development server environment
```
docker exec -it dev_server /bin/bash
```

## Stop the development server
```
docker stop dev_server
```
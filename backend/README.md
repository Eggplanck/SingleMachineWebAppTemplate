# Developing backend

## Start development server (with database)
```
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up -d
```

## Access the API reference
http://localhost:8080/docs

## Get into the development server environment
```
docker exec -it server-dev /bin/bash
```

## Stop the development server
```
docker-compose -f docker-compose-dev.yml down
```
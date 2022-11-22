# Single Machine Web Application Template

This is a template for a web application that runs the frontend, API server, and database all on a single instance.

* Frontend : React
* APIServer : FastAPI
* Database : PostgreSQL

## Requirements
* Docker
* Docker Compose

## Installation
```sh
git clone git@github.com:Eggplanck/SingleMachineWebAppTemplate.git
```

## Usage
### Build
```sh
cd SingleMachineWebAppTemplate
mkdir backend/database/data #make directory for database
docker-compose -f docker-compose-prod.yml build
```

### Start
```sh
docker-compose -f docker-compose-prod.yml up -d
```

Access : http://localhost:80

### Stop
```sh
docker-compose -f docker-compose-prod.yml down
```
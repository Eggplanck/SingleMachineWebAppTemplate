# Developing frontend

## Build environment
```
docker build -t front -f Dockerfile.dev .
```

If you want to create react app first
```
docker run --rm --name dev_front -it -v $PWD:/app front /bin/bash
cd app
npx create-react-app react-app
```

## Start development server
```
docker run --rm --name dev_front -it -p 3000:3000 -v $PWD/react-app:/react-app front /bin/bash
cd react-app
yarn start
```
Access: http://localhost:3000
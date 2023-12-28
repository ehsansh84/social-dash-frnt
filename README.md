# Installation

## Build the Image

```sh
docker build -t social-dashboard-react .
```

## Instantiate the container

```sh
docker run -p 3030:3030 -e BASE_URL=https://some-api.server --name social social-dashboard-react
```

visit the app at `localhost:3030`

## stop the container

```sh
docker stop social
```

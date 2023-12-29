# Running inside a container

## create a `.env` file

```sh
VITE_BASE_URL=YOU_URL
```

If you don't provide this variable, the base url defaults to the `http://social.devserver.ir`

## Build the Image

```sh
docker build -t social-dashboard-react .
```

## Instantiate the container

```sh
docker run --rm -p 3030:3030 --name social social-dashboard-react
```

visit the app at `localhost:3030`

## stop the container

```sh
docker stop social
```

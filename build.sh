docker stop social || true
docker rm social || true
docker rmi social || true
docker build -t social .
docker run --name social -p 3030:3030 -d --restart always social

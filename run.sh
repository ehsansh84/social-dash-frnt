docker pull docker push shirzadi/social-dash-frnt
docker rm -f social-dash-frnt
docker run --name social-dash-frnt -p 3030:3030 -d --restart always shirzadi/social-dash-frnt
docker logs -f social-dash-frnt

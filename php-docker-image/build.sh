#!/bin/bash
docker stop backend_php_1
docker rm backend_php_1
docker rmi $1/php:fpm-lumen
docker build . -t $1/php:fpm-lumen
docker push $1/php:fpm-lumen

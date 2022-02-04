#!/bin/bash
docker rmi $1/php-fpm-laravel:8.1
docker build . -t $1/php-fpm-laravel:8.1
docker push $1/php-fpm-laravel:8.1
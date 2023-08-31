#!/bin/bash

IMAGE_NAME="vue-inputer"

if docker image inspect $IMAGE_NAME >/dev/null 2>&1; then
    docker compose down && docker rmi vue-inputer && docker build -t vue-inputer .
else
    docker build -t vue-inputer . 
fi



#!/bin/bash

JSC_ENV="./code/.env"

if [ ! -f "${JSC_ENV}" ];
then
    echo "Using default ${JSC_ENV}.example file."
    cp ${JSC_ENV}.example ${JSC_ENV}
fi

. "${JSC_ENV}"

export JSC_UID=$(id -u)
export JSC_GID=$(id -g)

GIT_TAG=$(git describe --tags --abbrev=0)
DOCKER_CREDENTIAL=$(jq -r .credsStore ~/.docker/config.json)
DOCKER_ID=$(docker-credential-$DOCKER_CREDENTIAL list | jq -r '. | to_entries[] | select(.key | contains("docker.io")) | last(.value)')
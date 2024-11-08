#!/bin/bash

source ./etc/bin/source.sh

DOCKER_PATH=etc/docker

DOCKER_PUSH="--load "

# If we pass the "Y" argument, also push to the docker registry
if [ "${1}" == "Y" ];
then
    DOCKER_PUSH="--push  "
fi

build_it() {
    echo "  🛠️   Building ${1}"
    docker build ${5} --build-arg GIT_TAG=${2} \
        -t ${3}/jsc-mu-game:latest \
        -t ${3}/jsc-mu-game:${2} \
        -f ${4}/Dockerfile .
}

build_it "${VITE_APP_NAME}" "${GIT_TAG}" ${DOCKER_ID} ${DOCKER_PATH} ${DOCKER_PUSH}

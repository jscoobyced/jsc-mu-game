#!/bin/bash

source ./etc/bin/source.sh

pushd code
docker-compose run --rm node yarn --cwd /app/ build
popd
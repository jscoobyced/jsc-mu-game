#!/bin/bash

source ./etc/bin/source.sh

pushd code
docker-compose run --rm -p 5173:5173 node yarn --cwd /app/ dev
popd
#!/bin/bash

source ./etc/bin/source.sh

WITH_COVERAGE=""

if [ "${COVERAGE}" != "" ];
then
    WITH_COVERAGE=" --coverage"
fi

pushd code
docker-compose run --rm node yarn --cwd /app/ test${WITH_COVERAGE}
popd
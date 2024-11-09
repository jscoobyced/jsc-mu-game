#!/bin/bash

source ./etc/bin/source.sh

INCLUDE_TEST="N"

if [ "$TESTS" = "yes" ] || [ "$TESTS" = "y" ] || [ "$TESTS" = "Yes" ] || [ "$TESTS" = "Y" ];
then
    INCLUDE_TEST="Y"
fi

build_web() {
    pushd code
    echo "    🛠️   Building $1"
    # Reset package.json
    cp ./package.tpl.json ./package.json
    # Delete older node_modules, yarn.lock, dist and coverage
    rm -Rf ./node_modules ./yarn.lock ./dist ./coverage
    # Format dependencies to a single line
    DEV_FILES=$(cat ./deps_dev.txt | tr '\n' ' ')
    RUN_FILES=$(cat ./deps_run.txt | tr '\n' ' ')
    DEV_TEST_FILES=$(cat ./deps_dev_test.txt | tr '\n' ' ')
    # Install dependencies
    if [ "$RUN_FILES" != "" ]; then
        echo "    📦   Installing dependencies"
        docker-compose run --rm node yarn --cwd /app/ add -D $RUN_FILES > /dev/null
    fi
    # Install dev dependencies
    if [ "$DEV_FILES" != "" ]; then
        echo "    📦   Installing dev dependencies"
        docker-compose run --rm node yarn --cwd /app/ add -D $DEV_FILES > /dev/null
    fi
    # Install dev test dependencies
    if [ "Y" = "$INCLUDE_TEST" ] && [ "$DEV_TEST_FILES" != "" ]; then
        echo "    📦   Installing dev test dependencies"
        docker-compose run --rm node yarn --cwd /app/ add -D $DEV_TEST_FILES > /dev/null
    fi
    popd
}

build_web "${VITE_APP_NAME}"
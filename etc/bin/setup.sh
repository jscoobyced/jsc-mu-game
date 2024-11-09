#!/bin/bash

source ./etc/bin/source.sh

SRC_DIR="code"
INCLUDE_TEST="N"

if [ "$TESTS" = "yes" ] || [ "$TESTS" = "y" ] || [ "$TESTS" = "Yes" ] || [ "$TESTS" = "Y" ];
then
    INCLUDE_TEST="Y"
fi

prepare_environment() {
    # Reset default environment
    cp ./etc/tpl/package.json.tpl ./${SRC_DIR}/package.json
    cp ./etc/tpl/tsconfig.json.tpl ./${SRC_DIR}/tsconfig.json
    cp ./etc/tpl/vite.config.ts.tpl ./${SRC_DIR}/vite.config.ts

    if [ "Y" = "$INCLUDE_TEST" ];
    then
        cp ./etc/tpl/tsconfig.json.test.tpl ./${SRC_DIR}/tsconfig.json
        cp ./etc/tpl/vite.config.test.ts.tpl ./${SRC_DIR}/vite.config.ts
        cp ./etc/tpl/vitest.config.ts.tpl ./${SRC_DIR}/vitest.config.ts
    fi
}

build_web() {
    pushd ${SRC_DIR}
    echo "    🛠️   Building $1"
    # Delete older node_modules, yarn.lock, dist and coverage
    rm -Rf ./node_modules ./yarn.lock ./dist ./coverage ./vitest.config.ts
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

prepare_environment
build_web "${VITE_APP_NAME}"
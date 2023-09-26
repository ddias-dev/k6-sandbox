#!/usr/bin/env zsh

#
# This script simply executes a provided JavaScript test using
# the local environment established with the `docker-compose`.
# 
# Each execution is provided a unique tag to differentiate
# discrete test runs within the Grafana dashboard.
#

set -e

if [ -z $1 ]; then
    echo "Error: Test name is undefined."
    exit 1
fi

TEST_NAME=$1
TAG_NAME="$(basename -s .js $TEST_NAME)-$(date +%s)"
PARAMS=$2

yarn build

docker-compose run --rm -T k6 run -<./dist/$TEST_NAME.test.js --tag testid=$TAG_NAME $PARAMS
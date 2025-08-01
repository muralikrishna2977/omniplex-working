#!/bin/sh
echo "Running custom startup..."
yarn install
yarn build
yarn start

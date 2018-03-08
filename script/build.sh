#!/bin/bash

npm run build
$(npm bin)/http-server . &
node ./script/fetch-issues.js

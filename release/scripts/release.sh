#!/bin/bash

TAG="v$(node -p -e "require('./package.json').version")"

gh release create $TAG --generate-notes

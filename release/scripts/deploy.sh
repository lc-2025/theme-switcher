#!/bin/bash

UPDATE=`git diff HEAD^ HEAD -- package.json | grep '^+ '`
DEPLOY="false"

if [[ $UPDATE == *"version"* ]]; then
  DEPLOY="true"
fi

echo "$DEPLOY"

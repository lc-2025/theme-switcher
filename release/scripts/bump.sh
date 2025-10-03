#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
BRANCH_MAJOR="api"
BRANCH_MINOR="feature"
BRANCH_PATCH="hotfix"
REGEX_SUFFIX="\/([a-z]|[A-Z]|[0-9]|\-)+"
REGEX_MAJOR="^(${BRANCH_MAJOR})${REGEX_SUFFIX}$"
REGEX_MINOR="^(${BRANCH_MINOR})${REGEX_SUFFIX}$"
REGEX_PATCH="^(${BRANCH_PATCH})${REGEX_SUFFIX}$"
REGEX_ALL="^(${BRANCH_MAJOR}|${BRANCH_MINOR}|${BRANCH_PATCH})${REGEX_SUFFIX}$"
VERSION=""

# Upgrade/Update/Fix check
# Assign version according to branch type
if [[ "$BRANCH" =~ $REGEX_MAJOR ]]; then
  VERSION="major"
elif [[ "$BRANCH" =~ $REGEX_MINOR ]]; then
  VERSION="minor"
elif [[ "$BRANCH" =~ $REGEX_PATCH ]]; then
  VERSION="patch"
fi

# Assign version according to branch type
if [[ "$BRANCH" =~ $REGEX_ALL ]]; then
  echo "Increasing package version to $VERSION..."
  npm version $VERSION
  echo "Package version increased to $(node -p -e "require('./package.json').version")"
  git add .
fi

exit 1

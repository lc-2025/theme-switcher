#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)
BRANCH_MAJOR="feature_api"
BRANCH_MINOR="feature"
BRANCH_PATCH="hotfix"
REGEX_SUFFIX="\_([a-z]|[A-Z]|[0-9]|\-)+"
REGEX_MAJOR="^(${BRANCH_MAJOR})${REGEX_SUFFIX}$"
REGEX_MINOR="^(${BRANCH_MINOR})${REGEX_SUFFIX}$"
REGEX_PATCH="^(${BRANCH_PATCH})${REGEX_SUFFIX}$"
REGEX_ALL="^(${BRANCH_MAJOR}|${BRANCH_MINOR}|${BRANCH_PATCH})${REGEX_SUFFIX}$"
VERSION=""

# Assign version according to branch type
if [[ "$BRANCH" =~ $REGEX_MAJOR ]]; then
  VERSION="major"
elif [[ "$BRANCH" =~ $REGEX_MINOR ]]; then
  VERSION="minor"
elif [[ "$BRANCH" =~ $REGEX_PATCH ]]; then
  VERSION="patch"
fi

# Upgrade/Update/Fix check
if [[ "$BRANCH" =~ $REGEX_ALL ]]; then
  echo "Increasing package version to $VERSION..."
  npm config set sign-git-tag true
  npm version $VERSION

  VERSION_CURRENT="$(node -p -e "require('./package.json').version")"
  TAG="v$VERSION_CURRENT"

  git tag -v $TAG
  git push --tags
  echo "Package version increased to $VERSION_CURRENT"
  exit 0
fi

#!/bin/bash

MESSAGE=$'Only available merges:\n\n- main <- release/*\n- main <- hotfix_*\n- develop <- feature_api_*|feature_*\n- develop <- release/*\n- develop <- hotfix_*'

echo "$MESSAGE"
exit 1

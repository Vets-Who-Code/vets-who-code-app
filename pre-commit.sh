#!/bin/bash
source ./.env

if [ $DISABLE_PRECOMMIT == 1 ]
then
  echo "Skipping pre-commit hook"
else
  yarn pre-commit
fi

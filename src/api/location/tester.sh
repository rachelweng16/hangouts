#!/bin/bash
# Simple wrapper for searching your hangouts-places index
#create index first
# aws location create-place-index \
#   --index-name hangouts-places \
#   --data-source Esri \
#   --region us-west-2

QUERY=$1   # pass search term as first argument

aws --profile hangouts --region us-west-2 location search-place-index-for-text \
  --index-name hangouts-places \
  --text "$QUERY" \
  --bias-position -123.1207 49.2827 \
  --max-results 3

# chmod +x scripts/search-places.sh


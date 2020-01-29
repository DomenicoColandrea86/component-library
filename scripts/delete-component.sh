#!/usr/bin/env bash
declare COMPONENT_NAME=$1;

rm -rf src/components/$COMPONENT_NAME;

rm stories/components/$COMPONENT_NAME.story.tsx;

#!/bin/bash
exec "/proj/aiblog/server/aiset_skills/skills/aiset-image-gen/node_modules/.bin/ts-node" --transpile-only "/proj/aiblog/server/aiset_skills/skills/aiset-image-gen/scripts/main.ts" "$@"

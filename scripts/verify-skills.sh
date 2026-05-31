#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required to run scripts/verify-skills.sh" >&2
  exit 1
fi

node "$SCRIPT_DIR/verify-skills.js" "$@"

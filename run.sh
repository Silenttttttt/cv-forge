#!/usr/bin/env bash
set -euo pipefail

# Always run from the project root (where this script lives)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

MODE="${1:-start}"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js not found. Please install Node.js (v18+ recommended)." >&2
  exit 1
fi;

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm not found. Please install npm." >&2
  exit 1
fi;

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  if command -v npm >/dev/null 2>&1; then
    npm ci || npm install
  fi
fi

case "$MODE" in
  start)
    echo "Building bundle..."
    npm run build
    echo "Starting server at http://localhost:3001 ..."
    node server.js
    ;;
  dev)
    echo "Starting dev mode (webpack --watch + server)..."
    npm run dev &
    WATCH_PID=$!
    trap 'echo "Stopping..."; kill $WATCH_PID 2>/dev/null || true' EXIT INT TERM
    node server.js
    ;;
  rebuild)
    echo "Cleaning dist and rebuilding..."
    rm -rf dist
    npm run build
    ;;
  *)
    echo "Usage: $0 [start|dev|rebuild]" >&2
    exit 2
    ;;
esac




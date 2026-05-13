#!/bin/bash
# Creates GitHub repo "Advertising-Systems-website-test" and pushes this project.
# Run from project root. You will be prompted to log in to GitHub if not already.

set -e
REPO_NAME="Advertising-Systems-website-test"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# Use GitHub CLI if available (from PATH or from temp install)
GH_BIN=""
if command -v gh &>/dev/null; then
  GH_BIN="gh"
elif [ -x "/tmp/gh_2.88.1_macOS_arm64/bin/gh" ]; then
  GH_BIN="/tmp/gh_2.88.1_macOS_arm64/bin/gh"
fi

if [ -z "$GH_BIN" ]; then
  echo "GitHub CLI (gh) not found. Install it from https://cli.github.com/ or run:"
  echo "  brew install gh"
  exit 1
fi

# Ensure logged in
if ! $GH_BIN auth status &>/dev/null; then
  echo "Log in to GitHub (browser or token)."
  $GH_BIN auth login
fi

# Create repo and push (--public, use current dir as source, set origin and push)
$GH_BIN repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo ""
echo "Done! Repo created and pushed. Open: https://github.com/$(git remote get-url origin 2>/dev/null | sed -E 's|.*github.com[:/]([^/]+)/.*|\1|')/$REPO_NAME"

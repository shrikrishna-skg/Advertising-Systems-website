#!/bin/bash
# Create a new GitHub repo and push this project.
# Usage:
#   ./scripts/create-new-repo-and-push.sh [REPO_NAME]
#   Or set GITHUB_TOKEN and run: GITHUB_TOKEN=xxx ./scripts/create-new-repo-and-push.sh [REPO_NAME]
#
# If GITHUB_TOKEN is set: creates repo via API, sets origin, pushes.
# If not set: prints steps to create repo in browser and push manually.

set -e
REPO_NAME="${1:-Advertising-Systems-website}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

if [ -n "$GITHUB_TOKEN" ]; then
  echo "Creating repo $REPO_NAME via API..."
  RESP=$(curl -s -w "\n%{http_code}" -X POST -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos -d "{\"name\":\"$REPO_NAME\",\"private\":false}")
  HTTP_BODY=$(echo "$RESP" | head -n -1)
  HTTP_CODE=$(echo "$RESP" | tail -n 1)
  if [ "$HTTP_CODE" = "201" ]; then
    echo "Repo created."
    FULL_NAME=$(echo "$HTTP_BODY" | grep -o '"full_name":"[^"]*"' | head -1 | cut -d'"' -f4)
    [ -z "$FULL_NAME" ] && FULL_NAME="shrikrishna-skg/$REPO_NAME"
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${FULL_NAME}.git"
    git push -u origin main
    git remote set-url origin "https://github.com/${FULL_NAME}.git"
    echo "Done! https://github.com/${FULL_NAME}"
  else
    echo "Failed to create repo (HTTP $HTTP_CODE). $HTTP_BODY"
    exit 1
  fi
else
  echo "GITHUB_TOKEN not set. Do one of the following:"
  echo ""
  echo "Option 1: Create repo and push with a token (no token in script)"
  echo "  1. Create a Personal Access Token at https://github.com/settings/tokens (scope: repo)"
  echo "  2. Run: GITHUB_TOKEN=your_token_here ./scripts/create-new-repo-and-push.sh $REPO_NAME"
  echo ""
  echo "Option 2: Create repo in browser, then push"
  echo "  1. Open https://github.com/new"
  echo "  2. Repository name: $REPO_NAME"
  echo "  3. Leave it empty (no README). Create repository."
  echo "  4. Run:"
  echo "     git remote remove origin"
  echo "     git remote add origin https://github.com/shrikrishna-skg/$REPO_NAME.git"
  echo "     git push -u origin main"
  echo "     (When prompted: username = shrikrishna-skg, password = your token)"
  exit 0
fi

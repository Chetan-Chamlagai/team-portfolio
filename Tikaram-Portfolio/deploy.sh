#!/usr/bin/env bash
# Pull latest code, build a new image, and replace the running container.
# Usage: ./deploy.sh   (from anywhere)
set -euo pipefail

IMAGE="tika-portfolio"
CONTAINER="tika-portfolio"
PORT=8081
BRANCH="main"

cd "$(dirname "$(readlink -f "$0")")"

echo "==> Pulling latest code ($BRANCH)"
git pull --ff-only origin "$BRANCH"

# Build before touching the running container, so a failed build keeps the site up
TAG="$(git rev-parse --short HEAD)"
echo "==> Building $IMAGE:$TAG"
docker build -t "$IMAGE:$TAG" -t "$IMAGE:latest" .

echo "==> Replacing container $CONTAINER"
docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
docker run -d \
    --name "$CONTAINER" \
    --restart unless-stopped \
    -p "$PORT:$PORT" \
    "$IMAGE:latest" >/dev/null

echo "==> Health check on http://localhost:$PORT/"
for i in $(seq 1 10); do
    if curl -fsS -o /dev/null "http://localhost:$PORT/"; then
        echo "==> Deployed $IMAGE:$TAG successfully"
        break
    fi
    if [ "$i" -eq 10 ]; then
        echo "!! Health check failed. Recent logs:" >&2
        docker logs --tail 30 "$CONTAINER" >&2
        exit 1
    fi
    sleep 1
done

echo "==> Removing old $IMAGE images"
docker images "$IMAGE" --format '{{.Tag}}' \
    | grep -vxE "latest|$TAG" \
    | xargs -r -I{} docker rmi "$IMAGE:{}" >/dev/null 2>&1 || true
docker image prune -f >/dev/null

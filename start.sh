#!/bin/bash
set -e

# Create necessary directories
mkdir -p /tmp/nginx /var/lib/nginx/body

# Start nginx in background
nginx &

# Start API in background (check if dist exists)
if [ -f "/usr/src/app/apps/api/dist/index.js" ]; then
    cd /usr/src/app/apps/api && node dist/index.js &
else
    echo "API dist/index.js not found, skipping API server"
fi

# Start Next.js web app in background  
cd /usr/src/app/apps/web && npm start &

# Wait for all background processes
wait
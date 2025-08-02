#!/bin/bash
set -e

# Start nginx in background
nginx &

# Start API in background
cd /usr/src/app/apps/api && node dist/index.js &

# Start Next.js web app in background  
cd /usr/src/app/apps/web && npm start &

# Wait for all background processes
wait
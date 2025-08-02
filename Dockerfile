# Build stage
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/mobile/package.json ./apps/mobile/
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/
COPY tsconfig.base.json ./

# Install all dependencies
RUN pnpm install

# Copy all source code
COPY . .

# Build all applications
RUN pnpm build

# Production stage
FROM node:20-slim AS production
WORKDIR /usr/src/app

# Install pnpm and nginx
RUN npm install -g pnpm
RUN apt-get update && apt-get install -y nginx curl && rm -rf /var/lib/apt/lists/*

# Copy everything from builder
COPY --from=builder /usr/src/app .

# Install production dependencies
RUN pnpm install --prod

# Setup nginx for mobile app (port 80)
RUN rm /etc/nginx/sites-enabled/default
COPY <<EOF /etc/nginx/sites-available/mobile
server {
    listen 80;
    server_name localhost;
    root /usr/src/app/apps/mobile/dist;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
RUN ln -s /etc/nginx/sites-available/mobile /etc/nginx/sites-enabled/mobile

# Create startup script
COPY <<EOF /usr/src/app/start.sh
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
EOF

RUN chmod +x /usr/src/app/start.sh

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /usr/src/app
RUN chown -R appuser:appuser /var/log/nginx
RUN chown -R appuser:appuser /var/lib/nginx
RUN chown -R appuser:appuser /var/run

USER appuser

# Expose all ports
EXPOSE 80 3000 3001

# Health check for all services
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:80/ && curl -f http://localhost:3001/api/health && curl -f http://localhost:3000/ || exit 1

# Start all services
CMD ["/usr/src/app/start.sh"]
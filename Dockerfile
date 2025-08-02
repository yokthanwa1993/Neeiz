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

# Install all dependencies with memory optimization
RUN pnpm install --no-optional --ignore-scripts

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

# Copy only necessary files from builder
COPY --from=builder /usr/src/app/apps/mobile/dist ./apps/mobile/dist
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/apps/api/package.json ./apps/api/

# Copy Web files and install dependencies
COPY --from=builder /usr/src/app/apps/web/.next ./apps/web/.next
COPY --from=builder /usr/src/app/apps/web/package.json ./apps/web/
COPY --from=builder /usr/src/app/apps/web/next.config.js ./apps/web/
COPY --from=builder /usr/src/app/apps/web/public ./apps/web/public

# Install production dependencies without dev packages
RUN cd apps/api && npm install --only=production --no-optional --no-audit --no-fund && npm cache clean --force
RUN cd apps/web && npm install --only=production --no-optional --no-audit --no-fund && npm cache clean --force

# Setup nginx for mobile app (port 80)
RUN rm /etc/nginx/sites-enabled/default
COPY nginx-mobile.conf /etc/nginx/sites-available/mobile
RUN ln -s /etc/nginx/sites-available/mobile /etc/nginx/sites-enabled/mobile

# Copy startup script
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Create non-root user with home directory
RUN groupadd -r appuser && useradd -r -g appuser -m appuser
RUN mkdir -p /home/appuser/.npm /var/lib/nginx/body /var/lib/nginx/proxy /var/lib/nginx/fastcgi /var/lib/nginx/uwsgi /var/lib/nginx/scgi
RUN chown -R appuser:appuser /usr/src/app /home/appuser /var/log/nginx /var/lib/nginx /var/run /tmp

USER appuser

# Expose all ports
EXPOSE 80 3000 3001

# Health check for all services
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:80/ && curl -f http://localhost:3001/api/health && curl -f http://localhost:3000/ || exit 1

# Start all services
CMD ["/usr/src/app/start.sh"]
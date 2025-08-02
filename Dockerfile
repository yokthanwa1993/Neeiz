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

# Copy only necessary files from builder
COPY --from=builder /usr/src/app/apps/mobile/dist ./apps/mobile/dist
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/apps/api/package.json ./apps/api/
COPY --from=builder /usr/src/app/apps/web/.next ./apps/web/.next
COPY --from=builder /usr/src/app/apps/web/package.json ./apps/web/
COPY --from=builder /usr/src/app/apps/web/next.config.ts ./apps/web/
COPY --from=builder /usr/src/app/apps/web/public ./apps/web/public

# Install only API and Web production dependencies
RUN cd apps/api && npm install --only=production
RUN cd apps/web && npm install --only=production

# Setup nginx for mobile app (port 80)
RUN rm /etc/nginx/sites-enabled/default
COPY nginx-mobile.conf /etc/nginx/sites-available/mobile
RUN ln -s /etc/nginx/sites-available/mobile /etc/nginx/sites-enabled/mobile

# Copy startup script
COPY start.sh /usr/src/app/start.sh
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
# Build stage
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files for dependency installation
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/mobile/package.json ./apps/mobile/
COPY tsconfig.base.json ./
COPY packages/ ./packages/

# Install all dependencies
RUN pnpm install

# Copy mobile source code
COPY apps/mobile/ ./apps/mobile/

# Build the Vite application
RUN pnpm --filter @neeiz/mobile build

# Production stage
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copy built application from builder stage
COPY --from=builder /usr/src/app/apps/mobile/dist .

# Copy custom nginx configuration
COPY apps/mobile/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user for security
RUN addgroup -g 1001 -S appuser && adduser -S appuser -u 1001
RUN chown -R appuser:appuser /usr/share/nginx/html
RUN chown -R appuser:appuser /var/cache/nginx
RUN chown -R appuser:appuser /var/log/nginx
RUN chown -R appuser:appuser /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R appuser:appuser /var/run/nginx.pid

USER appuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# Build stage
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package files for dependency installation
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY tsconfig.base.json ./
COPY packages/ ./packages/

# Install all dependencies
RUN pnpm install

# Copy web source code
COPY apps/web/ ./apps/web/

# Build the Next.js application
RUN pnpm --filter @neeiz/web build

# Production stage
FROM node:20-slim AS production
WORKDIR /usr/src/app

# Copy package.json and install only production dependencies
COPY apps/web/package.json ./
RUN npm install --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /usr/src/app/apps/web/.next ./.next
COPY --from=builder /usr/src/app/apps/web/public ./public
COPY --from=builder /usr/src/app/apps/web/next.config.ts ./
COPY --from=builder /usr/src/app/apps/web/package.json ./

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /usr/src/app
USER appuser

# Expose port 80
EXPOSE 80

# Set environment variable for Next.js port
ENV PORT=80
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:80', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the Next.js application
CMD ["npm", "start"]
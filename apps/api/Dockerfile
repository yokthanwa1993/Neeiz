# Stage 1: Install dependencies including devDependencies
FROM node:20-slim AS deps
WORKDIR /usr/src/app

# Copy the root package.json and pnpm-lock.yaml to leverage pnpm's caching
COPY package.json pnpm-lock.yaml ./

# Selectively copy the package.json of the packages we depend on
# This allows us to only install dependencies for the 'api' app and its direct dependencies
COPY packages/lib/package.json ./packages/lib/
COPY apps/api/package.json ./apps/api/

# Install all dependencies using pnpm's filtering capabilities
RUN npm install -g pnpm && pnpm install --filter @neeiz/api...

# Stage 2: Build the application from source
FROM node:20-slim AS builder
WORKDIR /usr/src/app

# Copy dependencies from the 'deps' stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/packages ./packages
COPY --from=deps /usr/src/app/apps ./apps

# Copy the source code for the packages we need
COPY packages/lib ./packages/lib
COPY apps/api ./apps/api
COPY tsconfig.base.json ./

# Build the TypeScript project
RUN pnpm --filter @neeiz/api build

# Stage 3: Production image
FROM node:20-slim AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy the built application and production node_modules from the 'builder' stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /usr/src/app/packages/lib ./packages/lib

# The command to run the API server from the built JS file
CMD ["node", "apps/api/dist/index.js"]

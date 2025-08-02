# Stage 1: Install all dependencies and build
FROM node:20-slim AS builder
WORKDIR /usr/src/app
RUN npm install -g pnpm

# Copy all source files
COPY . .

# Install all dependencies needed for the build
RUN pnpm install

# Build the api package
RUN pnpm --filter @neeiz/api build

# Use pnpm deploy to create a production-ready deployment folder
RUN pnpm deploy --filter @neeiz/api --prod --legacy /prod


# Stage 2: Production image
FROM node:20-slim AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy the production-ready files from the builder stage
COPY --from=builder /prod .

# Run the app
ENTRYPOINT ["node", "apps/api/dist/index.js"]

# Stage 1: Install dependencies including devDependencies
FROM node:20-slim AS deps
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY packages/lib/package.json ./packages/lib/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --filter @neeiz/api...

# Stage 2: Build the application from source
FROM node:20-slim AS builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/packages ./packages
COPY --from=deps /usr/src/app/apps ./apps

COPY packages/lib ./packages/lib
COPY apps/api ./apps/api
COPY tsconfig.base.json ./

RUN pnpm --filter @neeiz/api build
RUN pnpm prune --prod --filter @neeiz/api...

# Stage 3: Production image
FROM node:20-slim AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /usr/src/app/packages/lib ./packages/lib

CMD ["node", "apps/api/dist/index.js"]

FROM node:20.12.2 AS base

# Add pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
FROM base AS deps
# Copy root workspace files
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./

# Copy package.json files (from root perspective)
COPY packages/*/package.json ./packages/
COPY apps/server/package.json ./apps/server/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/pnpm-lock.yaml ./
COPY --from=deps /app/pnpm-workspace.yaml ./
COPY --from=deps /app/turbo.json ./

# Copy all source code
COPY . .

# Build the app
RUN pnpm build:server

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built application from builder stage
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./

# Install only production dependencies
RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start:server"]
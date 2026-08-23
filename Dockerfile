# -----------------------------
# Base image
# -----------------------------
FROM node:24-alpine AS base

WORKDIR /app

ARG NEXT_PUBLIC_AUTH_API_URL
ARG NEXT_PUBLIC_SHELF_API_URL

ENV NEXT_PUBLIC_AUTH_API_URL=$NEXT_PUBLIC_AUTH_API_URL
ENV NEXT_PUBLIC_SHELF_API_URL=$NEXT_PUBLIC_SHELF_API_URL

RUN corepack enable && corepack prepare pnpm@11.2.2 --activate


# -----------------------------
# Dependencies
# -----------------------------
FROM base AS deps

COPY package.json \
     pnpm-lock.yaml \
     pnpm-workspace.yaml \
     vitest.config.ts \
     tsconfig.json \
     ./

RUN pnpm install --frozen-lockfile


# -----------------------------
# Test / lint stage
# -----------------------------
FROM deps AS test

COPY . .


# -----------------------------
# Build stage
# -----------------------------
FROM deps AS build

COPY . .

RUN pnpm build


# -----------------------------
# Production runtime
# -----------------------------
FROM node:24-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@11.2.2 --activate

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]

# ---------- Build stage ----------
FROM node:24-alpine AS build
WORKDIR /app

ENV HUSKY=0
ENV CYPRESS_INSTALL_BINARY=0

RUN corepack enable && corepack prepare pnpm@11.8.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ---------- Runtime stage ----------
FROM node:24-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4500
ENV HOST=0.0.0.0

COPY --from=build --chown=node:node /app/dist /app/dist

EXPOSE 4500

USER node

CMD ["node", "dist/trollysix-client/server/server.mjs"]

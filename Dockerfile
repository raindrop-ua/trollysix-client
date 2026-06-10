# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ---------- Runtime stage ----------
FROM node:22-bullseye-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@11.4.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist /app/dist

ENV PORT=4500
ENV HOST=0.0.0.0
EXPOSE 4500

CMD ["npm", "run", "start:ssr"]

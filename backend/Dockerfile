FROM oven/bun:1.2-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "start"]

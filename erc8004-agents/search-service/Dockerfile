FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb* ./
RUN npm install --production=false
COPY tsconfig.json ./
COPY src/ ./src/
RUN npx tsc --outDir dist

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/data
EXPOSE 3100
ENV NODE_ENV=production
ENV DB_PATH=/app/data/agents.db
CMD ["node", "dist/index.js"]

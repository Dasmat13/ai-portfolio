# ---------- Stage 1: Build ----------
FROM node:20-bullseye AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
# Skip ESLint errors during build
RUN NEXTJS_IGNORE_ESLINT=1 npm run build

# ---------- Stage 2: Run ----------
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build output from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

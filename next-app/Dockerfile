FROM node:20-alpine

WORKDIR /next-app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml*   ./
RUN \
  # npm i
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  elif [ -f package-lock.json ]; then npm ci; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.ts .
COPY tsconfig.json .

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Start Next.js in development mode based on the preferred package manager
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run dev;\
  elif [ -f package-lock.json ]; then npm run dev; \
  else npm run dev; \
  fi
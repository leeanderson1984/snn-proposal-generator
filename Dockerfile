# Base image ships Chromium + every OS-level dependency Playwright needs,
# already matched to the exact "playwright" npm version pinned in
# package.json -- avoids any browser-download step (and any mismatch
# between the npm package's expected browser build and what's installed)
# at container build/start time.
FROM mcr.microsoft.com/playwright:v1.63.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./
# The base image already has the matching Chromium build baked in, so skip
# postinstall's "playwright install chromium" (nothing to fetch, and it'd
# otherwise try to hit the network on every build).
RUN npm ci --omit=dev --ignore-scripts

COPY . .

ENV NODE_ENV=production
# Railway/Render inject PORT at runtime; server/index.js already reads
# process.env.PORT with a local-dev fallback, so nothing else to configure.
EXPOSE 4173

CMD ["node", "server/index.js"]

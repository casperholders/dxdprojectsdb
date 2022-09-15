FROM node:lts
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@7.11.0 --activate && pnpm install --prod --frozen-lockfile
COPY . .
CMD [ "node", "./index.mjs" ]

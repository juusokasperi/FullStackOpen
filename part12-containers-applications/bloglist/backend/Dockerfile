FROM node:20.17.0-bullseye-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY --chown=node:node . .

FROM base AS test
RUN npm ci
RUN npm run test

FROM test AS build
ENV NODE_ENV=production
USER node
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "start"]

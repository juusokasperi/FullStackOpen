FROM node:20.17.0-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV=development
ENV DEBUG=app:*
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm install
USER node
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "run", "dev"]

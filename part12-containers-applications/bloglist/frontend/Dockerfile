FROM node:20.17.0-bullseye-slim AS build-stage
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

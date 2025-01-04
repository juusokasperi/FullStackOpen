FROM node:20.17.0-bullseye-slim AS base
WORKDIR /usr/src/app
COPY . .
EXPOSE 80

FROM base AS test
RUN npm ci
RUN npm run test

FROM test AS build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

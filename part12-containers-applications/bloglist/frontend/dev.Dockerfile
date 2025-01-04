FROM node:20.17.0-bullseye-slim AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
CMD ["npm", "run", "dev", "--", "--host"]

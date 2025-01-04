FROM node:20.17.0-bullseye-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]

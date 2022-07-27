FROM node:18-alpine as builder
WORKDIR /app
COPY . /app
RUN npm ci --production

ENTRYPOINT [ "node", "/app/bin/hellowork.js" ]

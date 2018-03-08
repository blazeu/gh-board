FROM node:8.5-alpine

RUN apk add --no-cache git

RUN mkdir -p /opt/gh-board
WORKDIR /opt/gh-board

COPY package.json .
RUN npm install

COPY ./ .

EXPOSE 8080
ENTRYPOINT [ "npm" ]

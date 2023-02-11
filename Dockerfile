FROM node:19.5.0-alpine

RUN apk --no-cache add git openssh

USER 1000
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

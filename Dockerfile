# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /sdk-explorer-uat
COPY . .
RUN npm install

CMD ["npm", "run", "build"]

EXPOSE 8080
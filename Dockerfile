FROM node:17.9-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY src/ .

CMD [ "node", "src/index.js" ]
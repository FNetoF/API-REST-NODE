FROM node:17.9-alpine3.15

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm install

COPY . .

EXPOSE 9090

CMD [ "node", "src/index.js" ]
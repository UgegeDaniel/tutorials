FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@7.10 && npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
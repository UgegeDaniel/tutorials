FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@7.10 && npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
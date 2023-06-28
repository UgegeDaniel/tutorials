FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g npm@9.7.2 && npm install
COPY . .
EXPOSE 3000
CMD npm run start
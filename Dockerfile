FROM node:16

WORKDIR /car-place

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
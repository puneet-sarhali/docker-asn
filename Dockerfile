FROM node:16.16.0
WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
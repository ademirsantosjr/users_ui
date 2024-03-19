FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@17

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
FROM node

WORKDIR /testapp

COPY . .

RUN npm install

EXPOSE 5050

CMD ["node", "server.js"]
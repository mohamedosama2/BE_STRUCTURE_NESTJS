FROM node:14.16.0-alpine3.13
RUN  npm install pm2  -g
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["pm2", "reload","all"]


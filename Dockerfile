FROM node:14.16.0-alpine3.13
RUN sudo npm install pm2@2.9.3  -g

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 5006

CMD ["pm2-runtime", "start","ecosystem.config.js","--env","production"]

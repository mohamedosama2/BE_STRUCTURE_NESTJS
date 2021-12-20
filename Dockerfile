FROM node:14.16.0-alpine3.13
RUN  npm install pm2  -g
ENV PM2_PUBLIC_KEY ct5pc2xkxt2ytgi
ENV PM2_SECRET_KEY sbnxf64l4csfksi
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 5006

CMD ["pm2-runtime", "start","ecosystem.config.js"]


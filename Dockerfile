FROM node:14.16.0-alpine3.13
RUN npm install pm2 -g
RUN addgroup app && adduser -S -G app app 
USER app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN npm run build

EXPOSE 5006

CMD ["pm2-runtime", "start","ecosystem.config.js","--env","production"]


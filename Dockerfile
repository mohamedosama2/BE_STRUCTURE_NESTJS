FROM node:12-alpine

RUN npm install pm2 -g

USER node
WORKDIR /home/node

COPY . .

RUN npm ci

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN npm run build

EXPOSE 5006

CMD ["pm2-runtime", "dist/main.js"]
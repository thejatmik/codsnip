FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules
RUN chown -R node:node /home
WORKDIR /home/node/api

COPY package.json .

USER node

RUN npm install
RUN npm install -D sequelize-cli
COPY --chown=node:node . .

EXPOSE 3631

COPY docker_entry.sh docker_entry.sh

ENTRYPOINT ["./docker_entry.sh"]

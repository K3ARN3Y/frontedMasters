FROM node:12-stretch

# Brian would normally create a dev.Dockerfile for a dev environment set up
# Lines x are dev specific
RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json   ./

RUN npm ci

COPY --chown=node:node . .

# changed this for dev
# CMD ["node", "index.js"]
CMD ["nodemon", "index.js"]
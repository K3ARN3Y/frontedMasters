FROM alpine:3.10

RUN apk add --update nodejs npm

RUN addgroup -S node && adduser -S node -G node

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

# Docker files go in order. It's called layers.
# When rebuilding, it will check the cache of each layer to see if anything as changed.
# By moving copy of the package files here, it allows us to run npm ci because that is resource and time expensive
# but rarely changes. This will make sure that the rebuild will start most likely after it.
COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["node", "index.js"]
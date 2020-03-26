FROM alpine:3.10
# apk is the alpine package manager
RUN apk add --update nodejs npm
# Alpine doens't have the node user by default so wee need to add it ourselves
# Google "how to add a user to Linux" and copy best practices
RUN addgroup -S node && adduser -S node -G node
USER node

RUN mkdir /home/node/code
WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

FROM node:12-stretch

# this node container ships with a user node and is in the user group called node; it was named node but could have been called anyting
USER node

# /home/USER/DIRECTORY; node below is the user, similar to adkearne, code is just a file directory
# mkdir before WORKDIR because WORKDIR will use root as default and then you will have permission issues; if
# you mkdir it will make it as USER node and then WORKDIR will use that
RUN mkdir /home/node/code

WORKDIR /home/node/code

# --chown=USER:GROUP SOURCE DESTINATION
COPY --chown=node:node . .

# Make sure to run npm install inside the container; use ci since it forces to use the lockfile
RUN npm ci

CMD ["node", "index.js"]
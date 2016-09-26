FROM node:6.5.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY . /usr/src/app/
RUN npm install

CMD [ "npm", "start" ]

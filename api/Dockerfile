FROM node:6.5.0

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

RUN npm install supervisor -g

COPY package.json /usr/src/api
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]

FROM node:6.5.0

RUN mkdir -p /usr/src/browser
WORKDIR /usr/src/browser

COPY package.json /usr/src/browser
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]

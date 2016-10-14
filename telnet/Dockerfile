FROM node:6.5.0

RUN mkdir -p /usr/src/telnet
WORKDIR /usr/src/telnet

COPY . /usr/src/telnet
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]

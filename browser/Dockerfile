FROM node:11.1.0

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]

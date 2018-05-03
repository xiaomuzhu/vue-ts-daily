FROM node:9.2.1

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . /usr/local/app
RUN npm install
CMD [ "npm", "run", "build" ]
EXPOSE 80

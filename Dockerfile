FROM node:10.0.0

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . /usr/local/app
RUN npm install
CMD [ "npm", "run", "build" ]
EXPOSE 80

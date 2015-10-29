FROM debian
MAINTAINER mvNerds

RUN apt-get update -y && \
    apt-get install nodejs-legacy npm -y && \
    npm install -g nodemon

WORKDIR /project/

COPY src /project/src
COPY package.json /project/package.json

RUN npm install

CMD ["nodemon", "/project/src/app"]
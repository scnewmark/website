FROM node:14-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app/

RUN yarn build

CMD [ "yarn", "dev"]
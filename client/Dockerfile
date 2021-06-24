FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app/

# Production only
# RUN yarn build

EXPOSE 3000

# Run yarn start if in production
CMD [ "yarn", "dev"]
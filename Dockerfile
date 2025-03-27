ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile

COPY . .

RUN yarn build

# remove development dependencies
RUN yarn install --production

FROM node:${NODE_VERSION}-alpine

RUN apk upgrade --no-cache

ARG NODE_ENV=production
ARG SERVICE_NAME
ARG SERVICE_VERSION

ENV NODE_ENV=${NODE_ENV}
ENV SERVICE_NAME=$SERVICE_NAME
ENV SERVICE_VERSION=$SERVICE_VERSION

WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app/package.json ./
COPY --from=build --chown=node:node /usr/src/app/yarn.lock ./
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules

USER node

CMD ["node", "dist/main"]

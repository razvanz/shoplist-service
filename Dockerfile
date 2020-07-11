
#
# ---- Base ----
FROM node:12 AS base

ENV HOME=/usr/src/app
WORKDIR $HOME

COPY ./package.json $HOME/
COPY ./package-lock.json $HOME/
RUN npm ci --log-level=error

#
# ---- Deps ----
FROM base AS deps

RUN npm prune --only=prod --log-level=error

#
# ---- Build ----
FROM base AS build

COPY . $HOME
RUN npm run build

#
# ---- Release ----
FROM node:12-slim

ENV HOME=/usr/src/app
WORKDIR $HOME

COPY --from=deps $HOME $HOME
COPY --from=build $HOME/dist $HOME/dist

EXPOSE 80

CMD ["npm", "start"]

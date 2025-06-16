FROM node:22-bullseye-slim AS build
ENV NODE_ENV=production
USER node
WORKDIR /opt/app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node packages/backend/dunger-gpt/package.json packages/backend/dunger-gpt/
RUN yarn workspaces focus dunger-gpt

COPY --chown=node:node packages/backend/dunger-gpt packages/backend/dunger-gpt
RUN yarn workspace dunger-gpt build

FROM node:22-bullseye-slim AS install
ENV NODE_ENV production
USER node
WORKDIR /opt/app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node packages/backend/dunger-gpt/package.json packages/backend/dunger-gpt/
RUN yarn workspaces focus dunger-gpt --production

FROM node:22-bullseye-slim AS runtime
ENV NODE_ENV=production
ENV APP_PORT=4000
ENV APP_HOST=0.0.0.0
USER node
WORKDIR /opt/app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node --from=install /opt/app/.yarn/install-state.gz .yarn/
COPY --chown=node:node --from=install /opt/app/node_modules node_modules
COPY --chown=node:node --from=install /opt/app/packages packages
COPY --chown=node:node --from=install /opt/app/package.json /opt/app/yarn.lock /opt/app/.yarnrc.yml ./

COPY --chown=node:node --from=build /opt/app/packages/backend/dunger-gpt/dist packages/backend/dunger-gpt/dist

EXPOSE 4000
CMD ["yarn", "workspace", "dunger-gpt", "prod"]

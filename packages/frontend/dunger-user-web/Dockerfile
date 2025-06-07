FROM node:22-alpine AS build
ENV NODE_ENV production
USER node
WORKDIR /app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node packages/lib/common-enums/package.json packages/lib/common-enums/
COPY --chown=node:node packages/frontend/lib/ui/package.json packages/frontend/lib/ui/
COPY --chown=node:node packages/frontend/lib/auth-fetch/package.json packages/frontend/lib/auth-fetch/
COPY --chown=node:node packages/frontend/dunger-user-web/package.json packages/frontend/dunger-user-web/
RUN yarn workspaces focus dunger-user-web --production

COPY --chown=node:node packages/lib/common-enums packages/lib/common-enums
COPY --chown=node:node packages/frontend/lib/ui packages/frontend/lib/ui
COPY --chown=node:node packages/frontend/lib/auth-fetch packages/frontend/lib/auth-fetch
COPY --chown=node:node packages/frontend/dunger-user-web packages/frontend/dunger-user-web
RUN yarn workspace dunger-user-web build

FROM nginxinc/nginx-unprivileged:1.27 AS runtime
USER nginx

COPY --chown=nginx:nginx packages/frontend/dunger-user-web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=build /app/packages/frontend/dunger-user-web/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

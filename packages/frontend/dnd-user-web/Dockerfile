FROM node:22-alpine AS build
ENV NODE_ENV production
USER node
WORKDIR /app

COPY --chown=node:node .yarn .yarn
COPY --chown=node:node package.json yarn.lock .yarnrc.yml ./
COPY --chown=node:node packages/new-react-service/package.json packages/new-react-service/
RUN yarn workspaces focus new-react-service --production

COPY --chown=node:node packages/new-react-service packages/new-react-service
RUN yarn workspace new-react-service build

FROM nginxinc/nginx-unprivileged:1.27 AS runtime
USER nginx

COPY --chown=nginx:nginx packages/new-react-service/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=build /app/packages/new-react-service/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

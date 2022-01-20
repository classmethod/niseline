FROM node:16-slim
LABEL Author="dyoshikawa"

WORKDIR /app
COPY packages/server/dist /app

ENTRYPOINT []
CMD node index.js

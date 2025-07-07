FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

RUN npm install

RUN cd packages/db && npx prisma generate && cd ../..

RUN npm run build

CMD ["npm", "run", "start-user-app"]
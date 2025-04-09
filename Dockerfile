FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# Copy root configurations and package files
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy app and package source code
COPY apps ./apps
COPY packages ./packages

# Install all dependencies
RUN npm install

# Generate Prisma client
RUN npm run db:generate

# Build only the user-app
RUN npm run build --filter=user-app

# Start the user-app
CMD ["npm", "run", "start-user-app"]
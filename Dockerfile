# Use Node.js version 18 for compatibility with required dependencies
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy relevant configuration files for dependency installation
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy the application source files
COPY apps ./apps
COPY packages ./packages

# Install Python, build tools, and dependencies (for bcrypt and other native modules)
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Install npm dependencies
RUN npm install

# Generate database-related artifacts
RUN npm run db:generate

# Build the project, filtering down to one app
RUN npm run build --filter=my-app-name

# Define the command to start the app
CMD ["npm", "run", "start-user-app"]

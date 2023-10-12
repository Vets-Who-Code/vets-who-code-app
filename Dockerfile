FROM node:18

# Set working directory
WORKDIR /src

# Install dependencies
COPY package*.json ./

# Add node_modules bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

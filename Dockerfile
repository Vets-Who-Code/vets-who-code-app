FROM node:18

# Set working directory
WORKDIR /src

# Install dependencies
COPY package*.json ./
RUN npm install

# Add node_modules bin to PATH
ENV PATH /src/node_modules/.bin:$PATH

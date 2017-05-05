FROM node:latest

# Create app directory
RUN mkdir -p /src
RUN npm install gulp -g

WORKDIR /src

ENV NODE_ENV=development

# Install app dependencies
COPY package.json /src/package.json
RUN npm install

# Bundle app source
COPY . /src

EXPOSE 3000
CMD npm start
FROM node:10.16.0-alpine
WORKDIR /wpm
COPY package.json /app
RUN npm install
COPY . /wpm
CMD node index.js
EXPOSE 8081
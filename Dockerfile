FROM mhart/alpine-node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm install --save --legacy-peer-deps

WORKDIR /usr/src/app/server
RUN npm install --save --legacy-peer-deps

WORKDIR /usr/src/app
EXPOSE 3001

CMD ["npm", "run", "start-prod"]
FROM node:12.22-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD npm run start:prod
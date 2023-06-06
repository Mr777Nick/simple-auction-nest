FROM node:18
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
RUN npm run build
COPY . /app
EXPOSE 3000
CMD npm run start:prod
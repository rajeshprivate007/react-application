FROM node:latest
WORKDIR /apps
ADD . .
RUN npm install
EXPOSE 8000
CMD [ "node","./apps/index.js" ]
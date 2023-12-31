FROM node:20.6.1-slim

WORKDIR /app

COPY . .

RUN npm i -g @antfu/ni

RUN nci

RUN nr build

CMD ["nr", "start"]
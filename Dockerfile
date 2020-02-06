FROM node:8.16.2

# Application base directory
RUN mkdir /app
WORKDIR /app
COPY ./bundle .

# Export Environment variables
ENV PORT=3000
ENV MONGO_URL=mongodb://MONGO:27017/yoourlink
ENV ROOT_URL=https://api.yoourlink.com

# publish exposed ports by itself
EXPOSE 3000

## Start Application ;)
CMD node main.js

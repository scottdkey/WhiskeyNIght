#in this case build is an alias for this docker image
FROM node:10-alpine as build

#copy package json and lockfile
COPY package.json yarn.lock ./

#install dependencies and move node_modules directory to correct folder
RUN yarn install && mkdir /react-ui && mv ./node_modules ./react-ui

#set working directory while in this container
WORKDIR /react-ui
#copy root of current directory to root of build docker image(specified by workdir)
COPY . .

#build project to static site an copy the files to /build
RUN yarn build

#grab nginx image from dockerhub
FROM nginx:alpine

#!/bin/sh
#remove default config
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx page/folder contents
RUN rm -rf /usr/share/nginx/html/*

#Copy static site from build
COPY --from=build /react-ui/build /usr/share/nginx/html/

#expose certain ports to the outside world
EXPOSE 443 
EXPOSE 80


#run this docker with the daemon not showing
#this prevents the container from stopping itself in this case
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
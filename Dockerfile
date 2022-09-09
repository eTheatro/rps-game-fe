FROM nginx:alpine
COPY ./build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
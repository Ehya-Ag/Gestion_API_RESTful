FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
FROM nginx:alpine
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

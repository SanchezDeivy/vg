# Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# usa npm ci si existe package-lock.json, si no npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
ARG APIURL
ENV VITE_APIURL=${APIURL}
RUN npm run build

# Runtime con nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist ./
# si tienes nginx.conf en el proyecto frontend, lo copia; si no, nginx usa default
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

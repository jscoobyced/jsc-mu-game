FROM node:22-alpine AS builder

WORKDIR /app
COPY code/ ./

RUN yarn --cwd code install
RUN yarn --cwd code build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
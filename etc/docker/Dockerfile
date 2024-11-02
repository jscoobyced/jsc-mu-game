FROM node:22-alpine AS builder

WORKDIR /app
COPY code ./
RUN ls -al

RUN cd code ; yarn install ; yarn build

FROM nginx:alpine
COPY --from=builder /app/client/dist /usr/share/nginx/html
EXPOSE 80

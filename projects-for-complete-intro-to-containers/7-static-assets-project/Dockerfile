# build stage
FROM node:12-stretch AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# static
FROM nginx:1.17
# skipped creating a user/group
COPY --from=builder /app/build /usr/share/nginx/html
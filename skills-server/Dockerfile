FROM node:16.19-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
# RUN npm run build

FROM node:16.19-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${API_PORT}
CMD [ "npm", "run", "start" ]



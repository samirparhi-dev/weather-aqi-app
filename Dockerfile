
LABEL org.opencontainers.image.source=https://github.com//samirparhi-dev/weather-aqi-app

LABEL org.opencontainers.image.description="This is a react Demo app container image created for multiple use"

LABEL org.opencontainers.image.licenses=Apache

FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]
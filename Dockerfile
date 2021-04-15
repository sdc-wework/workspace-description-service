FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -y && mv node_modules ../
# COPY ./seed ./seed
# RUN npm run seedall
COPY . .
EXPOSE 6060
CMD ["npm", "run", "server"]

FROM node:lts

WORKDIR /frontend
COPY . .

RUN npm install -g react-scripts
RUN npm install firebase

EXPOSE 3000

CMD ["npm","run","dev"]
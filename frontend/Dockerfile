FROM node:lts

WORKDIR /frontend
COPY . .

RUN npm install -g react-scripts
RUN npm install firebase

CMD ["npm","run","dev"]
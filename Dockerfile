FROM node:13 

COPY dist /dist
COPY index.js /
COPY package-lock.json /
COPY package.json /

RUN npm ci --production

EXPOSE 3000

CMD node /index.js
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g npm && npm install -g pnpm 

RUN pnpm install

COPY . .

EXPOSE 3131

CMD [ "pnpm", "run", "dev" ]
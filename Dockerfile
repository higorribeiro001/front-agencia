FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci 

COPY . . 

RUN npm run build

FROM node:18-alpine AS runner

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]

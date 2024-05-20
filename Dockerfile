FROM node:18-alpine3.16

RUN apk add --no-cache libc6-compat git

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --network-timeout 1000000

COPY . .

ARG NEXT_PUBLIC_REACT_APP_BACKEND_URL
ARG NEXT_PUBLIC_REACT_APP_SITE_NAME
ARG NEXT_PUBLIC_REACT_APP_BUILD_VERSION
ARG NEXT_PUBLIC_REACT_APP_SIGNEDUP_BACKEND_URL
ARG NEXT_PUBLIC_REACT_APP_TERMINAL_API_KEY
ENV NEXT_PUBLIC_REACT_APP_BACKEND_URL $NEXT_PUBLIC_REACT_APP_BACKEND_URL
ENV NEXT_PUBLIC_REACT_APP_SIGNEDUP_BACKEND_URL $NEXT_PUBLIC_REACT_APP_SIGNEDUP_BACKEND_URL
ENV NEXT_PUBLIC_REACT_APP_TERMINAL_API_KEY $NEXT_PUBLIC_REACT_APP_TERMINAL_API_KEY
ENV NEXT_PUBLIC_REACT_APP_SITE_NAME $NEXT_PUBLIC_REACT_APP_SITE_NAME
ENV NEXT_PUBLIC_REACT_APP_BUILD_VERSION $NEXT_PUBLIC_REACT_APP_BUILD_VERSION

# RUN env NODE_OPTIONS=--openssl-legacy-provider yarn build
RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]


FROM node:18.16.0-bullseye-slim as base
WORKDIR /app
# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
RUN npm i -g npm@latest; \
 npm install -g pnpm; \
 pnpm setup; \
 mkdir -p /usr/local/share/pnpm &&\
 export PNPM_HOME="/usr/local/share/pnpm" &&\
 export PATH="$PNPM_HOME:$PATH"; \
 pnpm bin -g
COPY package.json .
COPY pnpm-lock.yaml .

FROM base as development
RUN pnpm install
COPY . .
EXPOSE 7270

# FROM base as production
# COPY ./pnpm-lock.yaml .
# RUN pnpm install --frozen-lockfile --prod;
# COPY /dist .
# COPY .env.production .
# EXPOSE 3333
# CMD ["pnpm", "run", "start"]

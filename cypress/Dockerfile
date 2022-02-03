FROM cypress/included:9.2.0

WORKDIR /home

COPY package*.json ./
COPY *.json ./
COPY .parcelrc ./
COPY .prettierignore ./
COPY .eslintrc ./
COPY .eslintignore ./
COPY .env.* ./
COPY yarn.lock ./
ADD src ./src
ADD ckw/models/src/main/resources ./ckw/models/src/main/resources
ADD cypress ./cypress
ADD res ./res

RUN apt-get update
RUN apt-get install -y openjdk-11-jdk 

RUN yarn install --immutable

RUN yarn build

RUN yarn acceptance
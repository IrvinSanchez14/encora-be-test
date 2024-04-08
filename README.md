<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Encora Back-end Test

App build with nestJS, prisma, Graphql and postgres.
App where the user can create a blog CRUD

Why have I used this framework and these libraries? The reason is because Nest maintains a specific order in the way you create the queries for each table or relationship within the database, Prisma also has a way of creating an ordered database and handling migrations in an orderly manner. and clean and finally use docker to create the base data so that you do not need to have the manager installed on your machine, you simply run docker and that's it.

## Installation

```bash
# clone repo
$ git clone <uri ssh>
$ encota-be-test

# install libraries
$ npm install

# install postgress with docker
$ docker-compose up

# create schema app
$ npx prisma migrate dev

```

## .env

```bash

$ DATABASE_URL="postgresql://citizix_user:S3cret@localhost:5432/mydb?schema=encora-test"
$ DOMAIN="http://localhost:3001"

```

## Running the app

You need to open two tabs in your console:

1st - run the command `docker-compose up`

2nd - run the command `npm run start`

## Graphql

Open in your web borwser the next url: `http://localhost:3001/graphql`

we have the `Playground` from graphql to test all the queries and the mutation

## License

Nest is [MIT licensed](LICENSE).

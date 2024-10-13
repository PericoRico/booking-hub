## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start -- -b swc

# watch mode
$ npm run start:dev -- -b swc

# production mode
$ npm run start:prod
```


## Prisma

Create a migration and apply it to the database:

```bash
npx prisma migrate dev --name init
```

Migrate to new db

```bash
npx prisma migrate deploy
```




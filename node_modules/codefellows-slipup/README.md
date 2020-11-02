# ohNoLogger

401 Codefellows Midterm project using Javascript

## User Stories
- [Requirements](./requirements.md)

## Task List

- [Project](https://github.com/401-midterm-DaveeRyanBenJon/ohNoLogger/projects/1)

## UML Diagram

- [Phase 1](./assets/phaseuml.md)

## Getting Started on Prisma

- [Link1](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres)
- [Link2](https://www.youtube.com/watch?v=0RhtQgIs-TE)

### Prisma Install Instructions

```

- npm install @prisma/cli --save-dev >>> to install prisma in cli
- npm install @prisma/client >>> install prisma client
- npx prisma init >>> creates schema.prisma file and .env file
- npx prisma introspect >>> to generate schema for each table in database
- npx prisma generate >>> update client side now we can send queries
- const { PrismaClient } = require('@prisma/client') >>> require this in your
- const prisma = new PrismaClient() >>> require this in your file
```
### List of CLI commands:- 
**_node query.js getRecord:_** 
```
Shows you a list of errors stored in your database
```
+++++++++++++++++= PSQL Database +++++++++++++++++++++

### In Terminal Create Database:

- Enter: `psql` >>> Opens psql in terminal
- \c into table >>> Lets you view a table
- \dt describe table >>> lets you view whats in table.
- Enter: `CREATE DATABASE dbname`;
  **In .env:**

```
`DATABASE_URL = postgres:localhost:5432/DATABASE-NAME`
To use schema file to start database:
`psql -f file.sql -d DATABASE-NAME`
Add to Heroku online, add this command to terminal:
`heroku pg:psql -f path/to/schema-file.sql --app your-heroku-app-name-here`
```

### List of Common Commands:

```
- \l - to view all databases
- \c DATABASE-NAME - to navigate into your database
- \dt - to view the tables in your database
- \q to quit
```

## Objectives

- [ ] node.js documentation => access build in api methods


## Explanation of Config Steps

## NOTE: WE MUST MANUALLY REMOVE OUR PRISMA FILE EVERYTIME BEFORE WE PUBLISH TO NPM

https://notathoughtexperiment.me/blog/how-to-do-create-database-dbname-if-not-exists-in-postgres-in-golang/

https://docs.npmjs.com/misc/scripts

//get the users db URI and CLIENT ID

//do this with an inquirer function??

//use that db URI to set up a table called errtable

//maybe?? use fs to create .env in prisma folder

//TODO maybe?? symlink .env in prisma folder


//TODO write symlink from internal.env to prisma .env

//TODO after above script, run eblow commands in script in package json

//POST INSTALL COMMNADS
//TODO then run prisma introspect
//TODO then run prisma generate

    ```"postinstall": "rm ./prisma/.env && ln -s ./.env ./prisma/.env && npx prisma introspect && npx prisma generate",```

post install remove prisma .env file, sym link to .env in node modules, then run prisma intro and generate steps

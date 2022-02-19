# storefront-api

Udacity Fullstack Nanodegree 2nd Project.

Develop API with postgres, node.js, Express, Typescript, and Jasmine

For making store api with routes users, products, orders and using JWT to authenticate users.

### How to use the project

1. `npm install` - init the node modules files.
2. `npm run start:dev` - runing the server in development.
3. `npm run start:production` - runing the server in production.
4. `npm run test` - runing Jasmine Tests.

- at root directory create .env file with the following:

  ```
  POSTGRES_PORT={your postgresql database port}
  POSTGRES_HOST={your postgresql database host}
  POSTGRES_DATABASE={your postgresql database name}
  POSTGRES_TEST_DATABASE={your postgresql test database name}
  POSTGRES_USER={your postgresql database user}
  POSTGRES_PASSWORD={your postgresql database password}
  JWT_SECRET={your jwt secret}
  DB_ENV={ dev -when working on dev db / test -when working on test db}

  ```

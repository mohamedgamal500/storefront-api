# storefront-api

Udacity Fullstack Nanodegree 2nd Project.

Develop API with postgres, node.js, Express, Typescript, and Jasmine

For making store api with routes users, products, orders and using JWT to authenticate users.

### How to use the project

1. `npm install` - init the node modules files.
2. `npm run start:dev` - runing the server in development.
3. `npm run start:production` - runing the server in production.
4. `npm run test` - runing Jasmine Tests.
5. `db-migrate up` - create the database tables.

- at root directory create .env file with the following:

  ```
  POSTGRES_PORT={your postgresql database port}
  POSTGRES_HOST={your postgresql database host}
  POSTGRES_DATABASE={your postgresql database name}
  POSTGRES_USER={your postgresql database user}
  POSTGRES_PASSWORD={your postgresql database password}
  JWT_SECRET={your jwt secret}

  ```

- at the root directory create a database.json file with the following:

  ```
  {
    "dev": {
      "driver": "pg",
      "host": "{your postgresql database host}",
      "port": "{your postgresql database port}"
      "database": "{your postgresql database name}",
      "user": "{your postgresql database user}",
      "password": "{your postgresql database password}",
    },
    "test": {
      "driver": "pg",
      "host": "{your postgresql database host}",
      "port":"{your postgresql database port}"
      "database": "{your test postgresql database name}",
      "user": "{your postgresql database user}",
      "password": "{your postgresql database password}",
    },
  }

  ```

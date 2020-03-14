# Murmuration

Migrations and transactions for MariaDB.

Murmuration is meant to be used as alternative to a database [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) package. Aside from migrations it is deliberately simple and low level, in the sense that it provides no more than the bare minimum functionality needed to connect to a MariaDB database and execute queries, optionally in the context of transactions.

The migration functionality, if used correctly, will guarantee that a Node application's codebase remains in line with database it relies on, updating the latter each time the former is deployed.

The prescriptions given below are an essential part of the package. They show how to write database utility functions at scale, how to employ them in the context of transactions, and they outline in detail what practices need to be adhered to in order to guarantee successful migrations.

## Installation

You can install Murmuration with [npm](https://www.npmjs.com/):

    npm install murmuration

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/murmuration.git

...and then install the murmuration modules with npm from within the project's root directory:

    npm install

## Usage

If you are building with [Node.js](http://nodejs.org) the usage is as follows:

```js
const murmuration = require('murmuration'),
      { database, migrate, transaction } = murmuration,
      { query, execute, getConnection, releaseConnection, sqlFromFilePath } = database;

...
```
Each of these functions is explained in the examples that follow.

## Examples

### Getting and releasing connections

The `getConnection()` function takes a configuration and a callback argument while the `releaseConnection()` function takes a connection argument:

```js
const configuration = {
        ...
      };

getConnection(configuration, (error, connection) => {
  ...

  releaseConnection(connection);
});
```
The configuration should be a plain old JavaScript object with at least the following properties:

```
{
  host,
  user,
  password,
  database
}
```
The full list of options can be found in the `mysql` package options [here](https://github.com/mysqljs/mysql#connection-options).

If successful, the `error` argument of the callback is falsey and the connection object is returned, otherwise the

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com

# Murmuration

Migrations and transactions for MariaDB.

Murmuration is meant to be used as alternative to a database [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping). Aside from migrations, it is deliberately simple and low level, in the sense that it provides no more than the bare minimum functionality needed to connect to a MariaDB database and execute queries, optionally in the context of transactions.

The migration functionality, if used correctly, will guarantee that a Node application's codebase remains in line with the database it relies on, updating the latter each time the former is deployed.

The prescriptions given below are an essential part of the package. They show how to write database utility functions at scale, how to employ them in the context of transactions, and they outline in detail what needs to be done in order to guarantee successful migrations.

## Installation

You can install Murmuration with [npm](https://www.npmjs.com/):

    npm install murmuration

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/murmuration.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

## Usage

```js
const murmuration = require('murmuration'),
      { database, migrate, transaction } = murmuration,
      { query, execute, getConnection, releaseConnection, sqlFromFilePath } = database;

...
```

### Getting and releasing connections

The `getConnection()` function takes `configuration` and `callback` arguments whilst the `releaseConnection()` function takes a `connection` argument:

```js
const configuration = {
        ...
      };

getConnection(configuration, (error, connection) => {
  ...

  releaseConnection(connection);
});
```
The `configuration` argument should be a plain old JavaScript object with at least the following properties:

```
{
  host,
  user,
  password,
  database
}
```
The full list of options can be found in the [mysql](https://github.com/mysqljs/mysql) package documentation [here](https://github.com/mysqljs/mysql#connection-options). If successful, the `error` argument of the callback will be falsey and the connection object will be returned, otherwise the `error` argument will be truthy.

In the event of an error, if a `log` property has been added to the configuration object then the `log.error()` function will be called with a message containing a reasonable stab at the cause of the error. Specifically, the following error codes are mapped to the following messages:

* `ECONNREFUSED` - `'The database isn\'t running, probably.'`

* `ENOTFOUND` - `'The host is wrong, probably.'`

* `ER_BAD_DB_ERROR` - `'The database name is wrong, probably.'`

* `ER_ACCESS_DENIED_ERROR` - `'The username or the password are wrong, probably.'`

* `ETIMEOUT` or `PROTOCOL_SEQUENCE_TIMEOUT` - `'The database server is down, probably.'`

* `ER_PARSE_ERROR` or `ER_BAD_TABLE_ERROR` - In these cases the error code is simply echoed and the offending SQL, if there is any, will be returned in a separate call to the `log.error()` function.

Such error handling is admittedly rudimentary and is only meant to help with debugging simple mistakes such as providing the incorrect connection options such as hosts or passwords. If you do not find these messages helpful, do not provide a `log` object in the options and rest assured the error code will be returned either way for you do deal with as you see fit.

### Reading SQL

There is an `sqlFromFilePath()` function that essentially does nothing more than paper over Nodes's own `fs.readFileSync()` function, throwing any native errors:

```js
const filePath = ... ;

try {
  const sql = sqlFromFilePath(filePath);

  ...
} catch (error) {
  ...
}
```

### Executing queries

Two functions are provided, namely `query()` and `execute()`. The former returns an error and an array of rows returned by the query by way of a callback, the latter only an error. Otherwise their signatures are the same.

```js
const sql = ...;

query(connection, sql, username, password, (error, rows) => {

  ...

});

execute(connection, sql, username, password, status, (error) => {

  ...

});
```
In both cases, a variable length list of additional arguments can be passed between the `sql` and `callback` arguments. These are then echoed in the SQL that the functions consume. For example, the SQL passed to the `query()` function might be the following:

```


  SELECT * FROM `user` WHERE `username`=? and `password`=MD5(?);


```
Similarly the SQL passed to the `execute()` function might be the following:

```

  INSERT INTO `user` (``username`, `password`, `status`) VALUES(?,?,MD5(?),?);


```
The question marks will be replaced with the values of the arguments in strict order. For more information on this process and for queries in general, see the mysql package documentation [here](https://github.com/mysqljs/mysql#performing-queries).

As in the case of the `getConnection()` function,

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com

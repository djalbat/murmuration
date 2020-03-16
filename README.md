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

* `ER_PARSE_ERROR` or `ER_BAD_TABLE_ERROR` - In these cases the error code is simply echoed and the offending SQL, if there is any, will be echoed in a separate call to the `log.error()` function.

These messages are meant to help with debugging simple mistakes such as providing incorrect configuration. If you do not find them helpful, do not provide a `log` object in the configuration and be assured error codes will be returned by way of the `error` callback argument for you do deal with as you see fit.

If you do choose to set a `log` property on the configuration object then subsequent errors will also be logged. There are no more helpful messages, instead the error code and offending SQL will be echoed.

### Reading SQL

There is an `sqlFromFilePath()` function that essentially does no more than paper over Nodes's own `fs.readFileSync()` function, throwing any native errors:

```js
const filePath = ... ;

try {
  const sql = sqlFromFilePath(filePath);

  ...
} catch (error) {
  ...
}
```

### Running queries

Two functions are provided, namely `query()` and `execute()`. The former returns an error and an array of rows returned by the query by way of a callback, the latter only an error by way of a callback. Otherwise their signatures are the same:

```js
const sql = ...;

query(connection, sql, ...parameters, (error, rows) => {

  ...

});

execute(connection, sql, ...parameters, status, (error) => {

  ...

});
```
In both cases, a variable length list of parameters can be passed between the `sql` and `callback` arguments. These replace the `?`placeholders in the SQL you provide. For example, if the SQL passed to the `query()` function is the the following...

```

  SELECT * FROM `user` WHERE `username`=? and `password`=MD5(?);

```
...you would call the `query()` function thus:

```js
const username = ... ,
      password = ... ;

query(connection, sql, username, password, (error, rows) => {

  ...

});

```
The `execute()` function is treated entirely similarly.

For more information on placeholders and performing queries in general, see the mysql package documentation [here](https://github.com/mysqljs/mysql#performing-queries).

To make use of these functions, it is recommended that you create a file corresponding to each table or view, naming the functions therein to reflect the SQL operations and parameters. The SQL they employ can be read from files, the names of which exactly match the function names. For example:

```js
const SELECT_USERNAME_FILE_NAME = 'table/user/selectUsername.sql',
      SELECT_IDENTIFIER_FILE_NAME = 'table/user/selectIdentifier.sql',
      SELECT_EMAIL_ADDRESS_FILE_NAME = 'table/user/selectEmailAddress.sql',
      UPDATE_NAME_IDENTIFIER_FILE_NAME = 'table/user/updateNameIdentifier.sql',
      ...
      ;

function selectUsername(connection, username, callback) { ... }

function selectIdentifier(connection, identifier, callback) { ... }

function selectEmailAddress(connection, emailAddress, callback) { ... }

function updateNameIdentifier(connection, name, identifier, callback) { ... }

...
```
The body of each of the function should be identical bar the parameters and the use of the `query()` versus the `execute()` function:

```js
function selectEmailAddress(connection, emailAddress, callback) {
  const filePath = `${SQL_DIRECTORY_PATH}/${SELECT_EMAIL_ADDRESS_FILE_NAME}`,
        sql = sqlFromFilePath(filePath);

  query(connection, sql, emailAddress, (error, rows) => {
    if (error) {
      log.error('selectEmailAddress() failed.');
    }

    callback(error, rows);
  });
}

function updateNameIdentifier(connection, name, identifier, callback) {
  const filePath = `${SQL_DIRECTORY_PATH}/${UPDATE_NAME_IDENTIFIER_FILE_NAME}`,
        sql = sqlFromFilePath(filePath);

  execute(connection, sql, name, identifier, (error) => {
    if (error) {
      log.error('updateNameIdentifier() failed.');
    }

    callback(error);
  });
}
```
Note that the parameters, as well as matching the function names precisely, are passed directly to the `query()` or `execute()` functions. Essentially the only purpose of these functions is to retrieve the SQL, pass it to the requisite murmuration function and log an error if it occurs.

Lastly, it is recommended that you avoid complex queries that span more than one table and always employ views instead. For information on views, see the MariaDB documentation [here](https://mariadb.com/kb/en/views/).

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com

# Murmuration

Database connections, transactions and migrations.

There are two specific packages that you should make use of instead this one:

* [murmuration-mariadb](https://github.com/djalbat/murmuration-mariadb)
* [murmuration-postgresql](https://github.com/djalbat/murmuration-postgresql)

This readme file largely pertains to both, although there are also specific instructions given in readme file for each.

Murmuration is meant to be used as alternative to a database [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping). Aside from migrations, it is deliberately simple and low level, in the sense that it provides no more than the bare minimum functionality needed to connect to a database and run commands, optionally in the context of transactions.

The migration functionality, if used correctly, will guarantee that a Node application's codebase remains in line with the database it relies on, updating the latter each time the former is deployed.

The prescriptions given below are an essential part of the package. They show how to write database utility functions at scale; how to employ them in the context of transactions; and they outline what needs to be done in order to guarantee the success of migrations.

## Installation

You can install Murmuration with [npm](https://www.npmjs.com/):

    npm install murmuration

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/murmuration.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

Remember that it is the aforementioned specific packages that you should install in most cases.

## Usage

Functionality across the specific packages is identical, aside from small differences in configuration and error handling, and is therefore covered here.

### Getting and releasing connections

The static `fromConfiguration()` method of the `Connection` class takes a configuration and a callback argument:

```
Connection.fromConfiguration(configuration, (error, connection) => {

  ...

  connection.release();
};
```

If successful, the `error` argument of the callback will be null and a `connection` object will be returned, otherwise the `error` argument will be truthy. Details of the format of the `configuration` object can be found in the configuration subsections of the specific package readme files.

### Logging

Ideally you should add a `log` property to the `configuration` object that references an object of the following form:

```
const log = {
  trace: () => { ... },
  debug: () => { ... },
  info: () => { ... },
  warning: () => { ... },
  error: () => { ... },
  fatal: () => { ... },
});
```
Currently only the `error()`, `info()` and `debug()` functions are made use of, but in future others may be utilised.

If you do not provide a `log` object, all logging is suppressed.

### Error handling

In the event of an error, if a `log` property has been added to the `configuration` object then the `log.error()` function will be called with a message containing a reasonable stab at the cause of the error. Details can be found in the subsections of the same name in the specific package readme files.

These messages are meant to help with debugging simple mistakes such as providing incorrect configuration. If you do not find them helpful, do not provide a `log` object and be assured that the errors are always returned by way of callback function arguments for you to deal with as you see fit.

### Running queries

Two functions are provided, namely `query()` and `execute()`. The former returns an error and an array of rows returned by the query by way of a callback, the latter only an error by way of a callback. Otherwise their signatures are the same:

```
const sql = ... ;

query(connection, sql, ...parameters, (error, rows) => {

  ...

});

execute(connection, sql, ...parameters, status, (error) => {

  ...

});
```
In both cases, a variable length list of parameters can be passed between the `sql` and `callback` arguments. These replace the placeholders in the SQL you provide. For more information, see the specific packages.

To make use of these functions, it is recommended that you create a file corresponding to each table or view, naming the functions therein to reflect the SQL statements and parameters. The SQL they employ can be read from files, the names of which exactly match the function names. For example:

```
const SELECT_USERNAME_FILE_NAME = "table/user/selectUsername.sql",
      SELECT_IDENTIFIER_FILE_NAME = "table/user/selectIdentifier.sql",
      SELECT_EMAIL_ADDRESS_FILE_NAME = "table/user/selectEmailAddress.sql",
      UPDATE_NAME_IDENTIFIER_FILE_NAME = "table/user/updateNameIdentifier.sql",
      ...
      ;

function selectUsername(connection, username, callback) { ... }

function selectIdentifier(connection, identifier, callback) { ... }

function selectEmailAddress(connection, emailAddress, callback) { ... }

function updateNameIdentifier(connection, name, identifier, callback) { ... }

...
```
The body of each of the function should be identical bar the parameters and the use of the `query()` versus the `execute()` function:

```
function selectEmailAddress(connection, emailAddress, callback) {
  const filePath = `${SQL_DIRECTORY_PATH}/${SELECT_EMAIL_ADDRESS_FILE_NAME}`,
        sql = sqlFromFilePath(filePath);

  query(connection, sql, emailAddress, (error, rows) => {
    if (error) {
      log.error("selectEmailAddress() failed.");
    }

    callback(error, rows);
  });
}

function updateNameIdentifier(connection, name, identifier, callback) {
  const filePath = `${SQL_DIRECTORY_PATH}/${UPDATE_NAME_IDENTIFIER_FILE_NAME}`,
        sql = sqlFromFilePath(filePath);

  execute(connection, sql, name, identifier, (error) => {
    if (error) {
      log.error("updateNameIdentifier() failed.");
    }

    callback(error);
  });
}
```
Note that the parameters, as well as matching the function names precisely, are passed directly to the `query()` or `execute()` functions. Essentially the only purpose of these functions is to retrieve the SQL, pass it to the requisite murmuration function and log an error if it occurs.

Lastly, it is recommended that you avoid complex queries that span more than one table and always employ views instead. For information on views, see the MariaDB documentation [here](https://mariadb.com/kb/en/views/).

### Using transactions

Ideally, all database operations should be run in the context of transactions. There is a single `transaction()` function that allows you to do this. It takes `configuration`, `operations`, `callback` and `context` arguments. The callback provided will have a `completed` argument while the context is mandatory and must be a plain old JavaScript object. The `transaction()` function makes use of the `context` object itself, in fact, with the object's `connection`, `operations` and `completed` properties being reserved.

In the example below, four operations has been provided and the context has properties that they will make use of:

```
const configuration = ... ,
      operations = [
        checkUsernameAvailable,
        checkEmailAddressAvailable,
        addEmailAddressUsernamePasswordAndStatus,
        retrieveUserIdentifier,
      ],
      context = {
        emailAddress,
        username,
        password
      };

transaction(configuration, operations, (completed) => {

  ..

}, context);
```
The signature of the operations must be identical to the following example:

```
function checkUsernameAvailable(connection, abort, proceed, complete, context) {
  const { username } = context;

  selectUsername(connection, username, (error, rows) => {
    if (error) {
      abort();

      return;
    }

    const rowsLength = rows.length;

    (rowsLength === 0) ?
      proceed() :
        complete();
  });
}
```
Note the provision of the `abort()`, `proceed()` and `complete()` callbacks, each of which is utilised. Their utility should be self evident. One important point to note is that there is an explicit `return` statement after the call to the `abort()` callback. It is easy to forget that invoking a callback does not prevent execution continuing in the current context.

It is entirely possible to conflate the first three of these operations into a single SQL statement and then to combine that with the last SQL statement that recovers an auto-incremented identifier. Both of these statements can then be placed in a single SQL file and run with a call to the `query()` function. There is nothing to be gained from such a approach, however, and there are good reasons not to take it:

* You can try to insert values into a table and test whether they are unique by whether or not the insert fails. However, the database will throw an error that is indistinguishable from errors that occur because of, say, syntax errors in the SQL. It could be considered bad practice to knowingly run a query that may result in an error and use the presence of such as an indication of whether or not an otherwise correct query has been successful.

* Often conflating operations means that application logic that is far more suited to, in this case, JavaScript must be added to the SQL itself. Or worse, the application logic is simply assumed to be implicit in the SQL. It is far better to implement this kind of logic explicitly in JavaScript than complicate SQL statements with it.

* As well as conditional branching, for example, often functionality needs to be implemented in the context of a transaction that cannot simply be added to an SQL statement. Unzipping a stored binary, for example, or checking some program variable dependent upon a prior query. Furthermore, a shared context means that even though several parts of the application logic might be related, they can still effectively communication with one another of the course of the transaction.

The example above demonstrates the crux of the approach taken here, therefore. The application logic is to be found in easily readable, atomic form within the body of each operation. On the other hand the SQL statements are considered to be dumb in the sense that they do nothing but slavishly place or retrieve information into or from the database.

This approach leads to less SQL and more JavaScript, however, as already mentioned but well worth repeating, that JavaScript is easily readable and atomic. The downside is a small amount of boilerplate JavaScript wrapping each operation, but this is a small price to pay.

### Making use of migrations

The migration functionality will definitely not suit every use case, however it can provide surety for small applications running on multiple Node instances connecting to a single MariaDB instance. It is essential that the prescriptions below are followed pretty much to the letter. Failing to do so will doubtless result in failure.

The `migrate()` function takes the usual `configuration` argument followed by `migrationsDirectoryPath` argument and a `callback` argument.  The callback is invoked with the usual `error` argument, which is truthy if the migrations have succeeded and falsey otherwise.

```
const configuration = ... ,
      migrationsDirectoryPath = ... ;  ///

migrate(configuration, migrationsDirectoryPath, (error) => {

  ...
});
```
If you provide a `log` property in the configuration, you must supply it with `info()` and `debug()` functions as well as an `error()` function.

Within the migrations directory there should be a collection of SQL files each containing a single SQL statement that changes the database schema or data in some way, in other words a migration. The naming convention for the SQL files is that they must start with a positive integer followed by a dash. Further, since this pattern is searched for in the fully qualified file path with a regular expression, the migration directory in indeed any of its parent directories cannot have also have it.

Perhaps a list of the first few migration files in an example application will be more helpful:

```
migration -- -- 1-create-user-table.sql
            |
             -- 2-alter-user-table-add-username-column.sql
            |
             -- 3-alter-user-table-add-password-column.sql
            |
             -- 4-alter-user-table-move-username-column.sql
            |
             -- 5-create-access-table.sql
            |
             -- 6-alter-access-table-add-user-identifier-foreign-key.sql

            ...
```
Aside from the integer-dash format, there is no specific format for the file names needed, however it is recommended that they be both descriptive and consistent, as above. There is no harm in renaming these files, by the way, as long as the numbers remain constant.

Each time the Node instance on which the application runs is started up, the migration directory will be read and any newly added migration files will be run in order. A table is kept with the number of the previously last executed migration in order to facilitate this.

It is crucial that any changes to the JavaScript or indeed any parts of the application that rely on a new migration are committed along with it. This ensures that whenever the migration is executed and the database schema or data are changed, the application is in a fit state to make use of it.

Migrations must obviously never, ever be changed once they have been committed. If a mistake has been made, it must only be rectified by way of a subsequent migration. When developing migrations, test exhaustively before committing them. You can at least reverse the effect of a migration by overwriting the database with a dump of the previous version.

If used with care, this migration functionality is wholly effective in the aforementioned use case of a single database instance allied with one or possibly many application instances.

## Contact

- james.smith@djalbat.com

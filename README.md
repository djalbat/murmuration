# Murmuration

Database statements, transactions and migrations.

There are two specific packages that you should make use of instead this one:

* [Murmuration-MariaDB](https://github.com/djalbat/murmuration-mariadb)
* [Murmuration-PostGreSQL](https://github.com/djalbat/murmuration-postgresql)

This readme file pertains to both, although there are specific instructions for each of the above in their respective readme files.

Murmuration can be used as alternative to a database [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping). 
It is deliberately simple and low level in the sense that it provides no more than the bare minimum functionality needed to connect to a database and generate statements to be executed ideally in the context of transactions. 

There is also some adjunct migration functionality that may or may not suit your use case. 
If used as prescribed then it guarantees that an application remains in line with its database, as the latter can be migrated if needed each time the former is deployed.

## Installation

You can install Murmuration with [npm](https://www.npmjs.com/):

    npm install murmuration

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/murmuration.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

Remember that it is the aforementioned specific packages that you should install in most cases.

## Usage

Statements are covered first up, but ideally they should be executed in the context of transactions and therefore the remainder of this section cannot be overlooked. 
In particular, the example statements that follow are executed inside operations, which are themselves covered in the later subsection. 
If you do not want to use operations then you can in fact easily wrap statements in promises, again see the relevant subsection later on.

### Generating statements

Statements are generated dynamically with a simple, promise-like syntax. 
Again it is worth noting that they can be executed inside either operations or promises. 
In the examples below operations are used. Wrapping statement in promises is covered later on.

Note that the following points apply to all of the examples:

* A local `using()` function has been employed rather the function supplied by the package, because the `Statement` class it utilities has been extended. 
See the relevant subsection below for more details.
* Each operation provides a connection and a context as well as the `abort`, `proceed` and `compoete` callbacks. 
These allow the result of the statement's execution to determine whether the application should abort, proceed to the next operation or complete, respectively. 
* Again see the relevant section on operations later on.

In the first example a row is selected should its email address and password match the given values:

```
const using = require("../using");

function checkAccountOperation(connection, abort, proceed, complete, context) {
  const { emailAddress, password } = context;
  
  using(connection)
    .selectFromAccont()
    .where({ emailAddress, password })
    .one(({ id }) => {
      Object.assign(context, {
        id
      });
    
      proceed();
    })
    .else(() => {
      ...
    
      complete()
    })
    .catch(abort)
    .execute();
}
```

There are several points worth noting:

* The `where()` method takes a plain old JavaScript object.
* The `one()` method takes a handler that is called if one row is returned.
* The `else()` method takes a handler that is called in all other cases.
* The `catch()` method takes a handler that is called should execution fail.

In the following example rows in a table holding temporary reset codes are deleted once they expire:

```
const using = require("../using");

const { unauthorized } = require("../utilities/states");
 
function deleteExpiredResetCodesOperation(connection, abort, proceed, complete, context) {
  const { emailAddress, password } = context;
    
  using(connection)
    .deleteFromResetCode()
    .where`
    
      expires < NOW()
    
    `
    .success(proceed)
    .catch(abort)
    .execute();
}
```

The following points are worth noting:

* The `where()` method takes a template literal this time, see below for further details.
* The `success()` method takes a callback that is called should hte execution succeed.

In this example a row is inserted into a table for software packages:

```
const using = require("../using");

function createReleaseOperation(connection, abort, proceed, complete, context) {
  const { name, entriesBlob, versionNumber } = context;

  using(connection)
    .insertIntoRelease()
    .values({ name, entriesBlob, versionNumber })
    .success(proceed)
    .catch(abort)
    .execute();
}
```

Note the following:

* The `values()` method takes a plain old JavaScript object with the values to be inserted.

Finally, the following operation updates a user profile:

```
const using = require("../using");

function editProfileOperation(connection, abort, proceed, complete, context) {
  const { name, notes, userIdentifier } = context,
        identifier = userIdentifier;	///

  using(connection)
    .updateUser()
    .set({ name, notes })
    .where({ identifier })
    .success(proceed)
    .execute();
}
```

Note:

* The `set()` method takes a plain old JavaScript object.

In general, the assumption with passing plain old JavaScript objects is that clauses and so forth can easily be constructed from them. 
The `set()`, `where()` and `values()` methods can also take appended template literals, however, so that you can define parts of the SQL with more freedom. 
More detail is given towards the end of the next subsection.

All of the methods that can be called against the instances of statements returned from the `using()` function are described in the statement specification subsection further below. 

### Operations and transactions

Ideally, all statements should be executed in the context of a transaction. 
Murmuration provides a `transaction()` function that allows you to do this. It takes `configuration`, `operations`, `callback` and `context` arguments. 
The callback provided will have a `completed` argument while the context is mandatory and must be a plain old JavaScript object. 
The `transaction()` function makes use of the `context` object itself, in fact, with the object's `connection`, `operations` and `completed` properties being reserved.

In the example below, three operations have been provided and the context has some example properties that they will make use of:

```
const configuration = ... ,
      operations = [
        checkUsernameOperation,
        checkEmailAddressOperation,
        addEmailOperation
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

The signatures of the operations have already been demonstrated in the examples above. 
In fact the bodies of the operations are immaterial, they do not have to execute statements and can contain any application logic. 
However, if you do want to execute statement inside an operation then again see the examples for guidance on how to integration the statement methods with the operation callbacks. 

What follows are general prescriptions for how to make use of transactions. 
They are meant to persuade that the small amount of boilerplate necessary to execute any statement inside a transaction is always worth the effort.

* You can try to insert values into a table and test whether they are unique by whether or not the insert fails. 
However, the database will throw an error that is indistinguishable from errors that occur because of, say, syntax errors in the SQL. 
It could be argued that it is bad practice to knowingly run a query that may result in an error and use the presence of such as an indication of whether or not an otherwise correct query has been successful. 
Therefore a better approach is to precede the insert with a select statement and execute both in the context of a transaction. 

* Often conflating operations means that application logic that is far more suited to, in this case, JavaScript must be added to the SQL itself. 
Or worse, the application logic is simply assumed to be implicit in the SQL. 
It is far better to implement this kind of logic explicitly in JavaScript than complicate SQL statements with it. 
In short, executing multiple SQL statements threaded together with SQL variables and the like is always best avoided.

* As well as conditional branching, for example, often functionality needs to be implemented in the context of a transaction that cannot simply be added to an SQL statement. 
Unzipping a stored binary, for example, or checking some program variable dependent upon a prior query. 
Furthermore, a shared context means that even though several parts of the application logic might be related, they can still effectively communication with one another of the course of the transaction.

The example above demonstrates the crux of the approach taken here, therefore. 
The application logic is to be found in easily readable, atomic form within the body of each operation. 
On the other hand the SQL statements are considered to be dumb in the sense that they do nothing but slavishly place or retrieve information into or from the database.

### Supporting promises and the `async`/`await` syntax

Murmuration's promise-like syntax for generating and executing statements is easily and elegantly adaptable to promises. Consider the following asynchronous function to return a user from a database:

```
async function getUser(connection, identifier) {
  return new Promise((resolve, reject) => {
    using(connection)
      .selectFromUsers()
      .where({ identifier })
      .else(() => {
        const user = null;

        resolve(user);
      })
      .one(({ jsonString }) => {
        const user = User.fromJSONString(jsonString);

        resolve(user);
      })
      .catch(reject)
      .execute();
  });
}
```

Now, rather then the `one()`, `else()` and `catch()` methods calling the callbacks passed by way of an enclosing operation, they call the `resolve` and `reject` callbacks of the promise. The function can be thus be utilised as follows:

```
try {
  const user = await getUser(connection, identifier); ;
  
  /// Make use of the user 
} catch (error) {
  /// Handle any error
}
```

Note that both the `one()` and `else()` methods call the `resolve` callback whereas the `catch()` method calls the `reject` callback, essentially passing the `error` argument on to body of the outermost `catch` block.

The following example is even more succinct:

```
async function destroyUser(connection, identifier) {
  return new Promise((resolve, reject) => {
    using(connection)
      .deleteFromUsers()
      .where({ identifier })
      .success(resolve)
      .catch(reject)
      .execute();
  });
}
```

If you want to interrupt the program flow for debugging purposes then replace the direct references to the `resolve` and `reject` callbacks with arrow functions that call them, as in the `one()` and `else()` methods in the first example.

Of course both of these functions can be utilised using promises directly, that is calling the `then()` and `catch()` methods of the returned promises directly.

Finally, note that it is easy to encapsulate the instantiation of promises into a function called `promisify()` or such like, but nothing is provided by this package.  

### Extending the `Statement` class

This is recommended for no other reason than to avoid repetitively passing table or view names to `selectFrom()` methods and the like. A simple exapmle will amply demonstrate:

```
"use strict";

const { Statement: BaseStatement } = require("./murmuration-...");

const USER_TABLE = "user",
      RELEASE_TABLE = "release";

class Statement extends BaseStatement {
  updateUser() { return this.update(USER_TABLE); }
  updateRelease() { return this.update(RELEASE_TABLE); }

  insertIntoUser() { return this.insertInto(USER_TABLE); }
  insertIntoRelease() { return this.insertInto(RELEASE_TABLE); }

  deleteFromUser() { return this.deleteFrom(USER_TABLE); }
  deleteFromRelease() { return this.deleteFrom(RELEASE_TABLE); }

  selectFromUser() { return this.selectFrom(USER_TABLE); }
  selectFromRelease() { return this.selectFrom(RELEASE_TABLE); }

  static fromConnection(connection) { return BaseStatement.fromConnection(Statement, connection); }
}

module.exports = Statement;
```

Here the ellipsis in the `require()` statement should be replaced as needed.

Now make use of this subclass in your own `using()` function...

```
"use strict";

const Statement = require("./statement");

function using(connection) {
  const statement = Statement.fromConnection(connection);

  return statement;
}

module.exports = using;
```

...or require and instantiate it directly. The `using()` function is purely for convenience.

### Connections

The static `fromConfiguration()` method of the `Connection` class takes a configuration and a callback argument:

```
Connection.fromConfiguration(configuration, (error, connection) => {

  ...

  connection.release();
};
```

If successful, the `error` argument of the callback will be null and a `connection` object will be returned, otherwise the `error` argument will be truthy. 
Details of the format of the `configuration` object can be found in the configuration subsections of the specific package readme files.

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

In the event of an error, if a `log` property has been added to the `configuration` object then the `log.error()` function will be called with a message containing a reasonable stab at the cause of the error. 
Details can be found in the subsections of the same name in the specific package readme files.

These messages are meant to help with debugging simple mistakes such as providing incorrect configuration. 
If you do not find them helpful, do not provide a `log` object and be assured that the errors are always returned by way of callback function arguments for you to deal with as you see fit.

### Statement class specification

The following specification gives a complete and more detailed list of the methods available.

* One of the `selectFrom()`, `insertInto()`, `deleteFrom()` or `delete()` methods must be called. Each takes a string for the name of a table or view.

It is recommended that these methods are not called directly, by the way, rather methods that call them indirectly are created on a subclass of the `Statement` class, in order to avoid repetition. 
This is covered in the later subsection on extending the `Statement` class.

* The `success()` method must accompany the `insertInto()`, `deleteFrom()` or `delete()` methods.
* If the `selectFrom()` method is called, then one of the following of the following methods must also be called. Each takes a callback. 
In all but the last case, you must also call the `else()` method with a callback:
  * The `none()` method for when no rows are returned.
  * The `one()` method for when exactly one row is returned.
  * The `first()` method for when one or more rows are returned.
  * The `many()` method for when any number of rows are returned, including none.

* The `catch()` method must always be called with a callback for when an exception occurs.
* The `set()` method must be called along with the `update()` method.
* The `where()` method can be called with all but the `insertInto()` method.
* The `values()` method must be called along with the `insertInto()` method.
* Either the `getSQL()` or `execute()` methods must be called, usually the latter.

Each of the `set()`, `where()` and `values()` methods can take a plain old JavaScript object or an appended template literal. 
You cannot pass a string as an argument because there is a danger that it might contain an un-escaped value. 
By forcing you to pass an appended template literal, the method in question is able to pass the array of arguments it receives directly on to the underlying database package, thereby guaranteeing that they will be correctly cast and escaped.

## Migrations

The migration functionality will definitely not suit every use case, however it can provide surety for small applications running on multiple Node instances connecting to a single database instance. 
It is essential that the prescriptions below are followed pretty much to the letter. Failing to do so will doubtless result in failure.

The `migrate()` function takes the usual `configuration` argument followed by `migrationsDirectoryPath` argument and a `callback` argument.  
The callback is called with the usual `error` argument, which is truthy if the migrations have succeeded and falsey otherwise.

```
const configuration = ... ,
      migrationsDirectoryPath = ... ;  ///

migrate(configuration, migrationsDirectoryPath, (error) => {

  ...
});
```
If you provide a `log` property in the configuration, you must supply it with `info()` and `debug()` functions as well as an `error()` function.

Within the migrations directory there should be a collection of SQL files each containing a single SQL statement that changes the database schema or data in some way, in other words a migration. 
The naming convention for the SQL files is that they must start with a positive integer followed by a dash. 
Further, since this pattern is searched for in the fully qualified file path with a regular expression, the migration directory in indeed any of its parent directories cannot have also have it.

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
Aside from the integer-dash format, there is no specific format for the file names needed, however it is recommended that they be both descriptive and consistent, as above. 
There is no harm in renaming these files, by the way, as long as the numbers remain constant.

Each time the Node instance on which the application runs is started up, the migration directory will be read and any newly added migration files will be run in order. 
A table is kept with the number of the previously last executed migration in order to facilitate this.

It is crucial that any changes to the JavaScript or indeed any parts of the application that rely on a new migration are committed along with it. 
This ensures that whenever the migration is executed and the database schema or data are changed, the application is in a fit state to make use of it.

Migrations must obviously never, ever be changed once they have been committed. 
If a mistake has been made, it must only be rectified by way of a subsequent migration. 
When developing migrations, test exhaustively before committing them. 
You can at least reverse the effect of a migration by overwriting the database with a dump of the previous version.

If used with care, this migration functionality is wholly effective in the aforementioned use case of a single database instance allied with one or possibly many application instances.

### Custom migrations

As well as migrations based on SQL files it is possible to add custom migrations. 
These are identified by custom text files that sit next to the SQL files in the migrations directory. 
They must have the following format:

```
12-CUSTOM.txt
```

That is, the file name must start with a contiguous version number followed by a hyphen, but end with `CUSTOM` and have a `.txt` extension. 
Any other format will be ignored and will also lead to all further migrations being ignored. 
The contents of these files can be left empty or can contain information pertinent to the custom migration. 

To create a custom migration, extend the CustomMigration class and fill out the `apply()` method as needed. 
This example requires the CustomMigration class from the Murmuration-PostGreSQL package but the same holds for the Murmuration-MariaDB package:

```
const { CustomMigration } = require("murmuration-postgresql");

class IdentifierCustomMigration extends CustomMigration {
  apply(connection, callback) {
    ...
    
    callback(error);
  }

  static fromFilePath(filePath) {
    const identifierCustomMigration = new IdentifierCustomMigration(filePath);

    return identifierCustomMigration;
  }
}
```
Note that the `apply()` method takes `connection` and `callback` arguments. 
The latter must be called with a boolean `error` argument when the migration completes. 
Also note the format of the static `fromFilePath()` factory method. 
The file path of the text file is available via a standard `getFilePath()` method, by the way.

Custom migrations must be collected together into a map, the keys of which are precisely the file names of the custom text files in the migrations SQL directory. 
For example:

```
const IdentifierCustomMigration = rquire("./identifierCustomMigration");

const CustomMigrationMap = {
  "13-CUSTOM.txt" : IdentifierCustomMigration
};
```

This map should be passed as an optional third argument to the `migrate()` function as follows:

```
migrate(configuration, migrationsDirectoryPath, CustomMigrationMap (error) => {

  ...
});
```

It is possible to use the same custom migration class for multiple custom migrations with the contents of the custom text files dictating the behaviours of at each invocation.

## Contact

* james.smith@djalbat.com

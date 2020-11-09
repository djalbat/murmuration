"use strict";

const necessary = require("necessary");

const defaultLog = require("./defaultLog");

const { asynchronousUtilities } = necessary,
      { whilst, sequence } = asynchronousUtilities;
      
function transaction(configuration, operations, callback, context) {
  const { Connection } = configuration,
        completed = false,
        callbacks = [
          beginTransactionCallback,
          executeOperationsCallback,
          commitTransactionCallback,
          rollbackTransactionCallback
        ];

  Connection.fromConfiguration(configuration, (error, connection) => {
    if (error) {
      const { log = defaultLog } = configuration;

      log.error("The transaction wasn't completed because there was no connection.");

      callback(completed);

      return;
    }

    Object.assign(context, {
      connection,
      operations,
      completed
    });

    sequence(callbacks, () => {
      const { completed } = context;

      delete context.connection;
      delete context.operations;
      delete context.completed;

      connection.release();

      callback(completed);
    }, context);
  });

}

module.exports = transaction;

function beginTransactionCallback(next, done, context) {
  const { connection } = context,
        log = connection.getLog();

  log.debug("Beginning transaction...");

  connection.begin((error) => {
    if (error) {
      const { code } = error;

      log.error(`An error with '${code}' has occurred.`);

      done();

      return;
    }

    next();
  });
}

function commitTransactionCallback(next, done, context) {
  const { completed } = context;

  if (!completed) {
    next();

    return;
  }

  const { connection } = context,
        log = connection.getLog();

  log.debug("Committing transaction...");

  connection.commit((error) => {
    if (error) {
      const { code } = error;

      log.error("An error with '${code}' has occurred.");

      done();

      return;
    }

    next();
  });
}

function rollbackTransactionCallback(next, done, context) {
  const { completed } = context;

  if (completed) {
    next();

    return;
  }

  const { connection } = context,
        log = connection.getLog();

  log.debug("Rolling back transaction...");

  connection.rollback((error) => {
    if (error) {
      const { code } = error;

      log.error(`...failed with error code ${code}.`);

      done();

      return;
    }

    next();
  });
}

function executeOperationsCallback(next, done, context) {
  whilst(executeOperation, next, context);
}

function executeOperation(next, done, context, index) {
  const { operations } = context,
        operationsLength = operations.length,
        lastOperationIndex = operationsLength - 1;

  if (index > lastOperationIndex) {
    complete();

    return;
  }

  const { connection } = context,
        log = connection.getLog();

  log.debug("Executing operation...");

  const operation = operations[index],
        abort = done, ///
        proceed = next; ///

  operation(connection, abort, proceed, complete, context);

  function complete() {
    const completed = true;

    Object.assign(context, {
      completed
    });

    done();
  }
}

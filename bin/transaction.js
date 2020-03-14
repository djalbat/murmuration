'use strict';

const necessary = require('necessary');

const database = require('./database');

const { asynchronousUtilities, miscellaneousUtilities } = necessary,
      { log } = miscellaneousUtilities,
      { whilst, sequence } = asynchronousUtilities,
      { getConnection, releaseConnection } = database;
      
function transaction(operations, configuration, callback, context) {
  const completed = false,
        callbacks = [
          beginTransactionCallback,
          executeOperationsCallback,
          commitTransactionCallback,
          rollbackTransactionCallback
        ];

  getConnection(configuration, (error, connection) => {
    if (error) {
      log.error('The transaction wasn\'t completed because there was no connection.');

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

      releaseConnection(connection);

      callback(completed);
    }, context);
  });

}

module.exports = transaction;

function beginTransactionCallback(next, done, context) {
  const { connection } = context;

  log.debug('Beginning transaction...');
  
  connection.beginTransaction((error) => {
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

  const { connection } = context;

  log.debug('Committing transaction...');

  connection.commit((error) => {
    if (error) {
      const { code } = error;

      log.error(`An error with '${code}' has occurred.`);

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

  const { connection } = context;

  log.debug('Rolling back transaction...');

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
  log.debug('Executing operation...');

  const { connection, operations } = context,
        operationsLength = operations.length,
        lastOperationIndex = operationsLength - 1;

  if (index > lastOperationIndex) {
    complete();

    return;
  }

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

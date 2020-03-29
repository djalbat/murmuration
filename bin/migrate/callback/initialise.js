'use strict';

const transaction = require('../../transaction'),
      migrationTable = require('../../table/migration');

const { createTable, insertVersion, showLikeTables } = migrationTable;

function initialiseCallback(next, done, context) {
  const { configuration } = context,
        { log } = configuration;

  if (log) {
    log.debug('Initialise...');
  }

  const operations = [
    checkTablePresent,
    createMissingTable,
    insertZeroVersion
  ];

  transaction(configuration, operations, (completed) => {
    const error = !completed;

    if (error) {
      if (log) {
        log.error('...not completed.');
      }

      Object.assign(context, {
        error
      });

      done();

      return;
    }

    next();
  }, context);
}

module.exports = initialiseCallback;

function checkTablePresent(connection, abort, proceed, complete, context) {
  const { log } = connection;

  if (log) {
    log.debug('Check table present...');
  }

  showLikeTables(connection, (error, rows) => {
    if (error) {
      abort();

      return;
    }

    const rowsLength = rows.length;

    (rowsLength === 1) ?
      complete() :
        proceed();
  });
}

function createMissingTable(connection, abort, proceed, complete, context) {
  const { log } = connection;

  if (log) {
    log.debug('Create missing table...');
  }

  createTable(connection, (error) => {
    error ?
      abort() :
        proceed();
  });
}

function insertZeroVersion(connection, abort, proceed, complete, context) {
  const { log } = connection;

  if (log) {
    log.debug('Inserting zero version...');
  }

  const version = 0;

  insertVersion(connection, version, (error) => {
    error ?
      abort() :
        proceed();
  });
}

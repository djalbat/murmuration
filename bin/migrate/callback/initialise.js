'use strict';

const necessary = require('necessary');

const transaction = require('../../transaction'),
      migrationTable = require('../../table/migration');

const { miscellaneousUtilities } = necessary,
      { log } = miscellaneousUtilities,
      { createTable, showLikeTables } = migrationTable;

function initialiseCallback(next, done, context) {
  log.debug('Initialise...');

  const { configuration } = context,
        operations = [
          checkTablePresent,
          createMissingTable
        ];

  transaction(operations, configuration, (completed) => {
    const error = !completed;

    if (error) {
      log.error('...not completed.');

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
  log.debug('Check table present...');

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
  log.debug('Create missing table...');

  createTable(connection, (error) => {
    error ?
      abort() :
        proceed();
  });
}

"use strict";

const transaction = require("../../transaction");

const { createTable, insertVersion, showLikeTables } = require("../../table/migration");

function initialiseCallback(next, done, context) {
  const { configuration } = context,
        { log } = configuration;

  if (log) {
    log.debug("Initialise...");
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
        log.error("...not completed.");
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
  const { configuration } = context,
        { migrationSQLMap } = configuration,
        { showLikeTablesMigrationSQL } = migrationSQLMap,
        sql = showLikeTablesMigrationSQL, ///
        log = connection.getLog();

  log.debug("Check table present...");

  showLikeTables(connection, sql, (error, rows) => {
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
  const { configuration } = context,
        { migrationSQLMap } = configuration,
        { createTableMigrationSQL } = migrationSQLMap,
        sql = createTableMigrationSQL, ///
        log = connection.getLog();

  log.debug("Create missing table...");

  createTable(connection, sql, (error) => {
    error ?
      abort() :
        proceed();
  });
}

function insertZeroVersion(connection, abort, proceed, complete, context) {
  const { configuration } = context,
        { migrationSQLMap } = configuration,
        { insertVersionMigrationSQL } = migrationSQLMap,
        sql = insertVersionMigrationSQL,  ///
        log = connection.getLog();

  log.debug("Inserting zero version...");

  const version = 0;

  insertVersion(connection, version, sql, (error) => {
    error ?
      abort() :
        proceed();
  });
}

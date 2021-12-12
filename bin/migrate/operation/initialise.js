"use strict";

const transaction = require("../../transaction");

const { createTable, insertVersion, showLikeTables } = require("../../table/migration");

function initialiseOperation(next, done, context) {
  const { configuration } = context,
        { log } = configuration;

  if (log) {
    log.debug("Initialise...");
  }

  const operations = [
    checkTablePresentOperatino,
    createMissingTableOperation,
    insertZeroVersionOperation
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

module.exports = initialiseOperation;

function checkTablePresentOperatino(connection, abort, proceed, complete, context) {
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

function createMissingTableOperation(connection, abort, proceed, complete, context) {
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

function insertZeroVersionOperation(connection, abort, proceed, complete, context) {
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

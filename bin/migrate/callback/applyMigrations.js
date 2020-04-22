"use strict";

const necessary = require("necessary");

const Migrations = require("../migrations"),
      transaction = require("../../transaction"),
      migrationTable = require("../../table/migration");

const { arrayUtilities, asynchronousUtilities } = necessary,
      { first } = arrayUtilities,
      { whilst } = asynchronousUtilities,
      { insertVersion, selectMaximumVersion } = migrationTable;

function applyMigrationsCallback(next, done, context) {
  const { configuration, migrationsDirectoryPath } = context,
        migrations = Migrations.fromMigrationsDirectoryPath(migrationsDirectoryPath),
        { log } = configuration;

  if (log) {
    log.debug("Apply migrations...");
  }

  Object.assign(context, {
    migrations
  });

  whilst(applyMigrationCallback, () => {
    delete context.migrations;

    done();
  }, context);
}

module.exports = applyMigrationsCallback;
  
function applyMigrationCallback(next, done, context) {
  const { configuration } = context,
        { log } = configuration;

  if (log) {
    log.debug("Apply migration...");
  }

  const operations = [
    getVersion,
    applyMigration,
    updateVersion
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

    const { finished } = context;

    delete context.finished;

    finished ?
      done() :
        next();
  }, context);
}

function getVersion(connection, abort, proceed, complete, context) {
  const { configuration } = context,
        { migrationSQLMap } = configuration,
        { selectMaximumVersionMigrationSQL } = migrationSQLMap,
        sql = selectMaximumVersionMigrationSQL, ///
        log = connection.getLog();

  log.debug("Get version....");

  selectMaximumVersion(connection, sql, (error, rows) => {
    if (error) {
      abort();

      return;
    }

    const firstRow = first(rows),
          { maximum_version } = firstRow,
          version = maximum_version;  ///

    Object.assign(context, {
      version
    });

    proceed();
  });
}

function updateVersion(connection, abort, proceed, complete, context) {
  const { configuration } = context,
        { migrationSQLMap } = configuration,
        { insertVersionMigrationSQL } = migrationSQLMap,
        sql = insertVersionMigrationSQL,  ///
        log = connection.getLog();

  log.debug("Update version...");

  const { version } = context;

  delete context.version;

  insertVersion(connection, version, sql, (error) => {
    error ?
      abort() :
        proceed();
  });
}

function applyMigration(connection, abort, proceed, complete, context) {
  let { version, migrations } = context;

  delete context.version;

  const migration = migrations.retrieveMigration(++version),  ///
        finished = (migration === null);

  Object.assign(context, {
    finished
  });

  if (finished) {
    complete();

    return;
  }

  const log = connection.getLog();

  log.debug("Apply migration...");

  migration.apply(connection, (error) => {
    if (error) {
      abort();

      return;
    }

    Object.assign(context, {
      version
    });

    proceed();
  });
}

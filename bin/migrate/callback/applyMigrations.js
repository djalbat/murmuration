'use strict';

const necessary = require('necessary');

const Migrations = require('../migrations'),
      transaction = require('../../transaction'),
      migrationTable = require('../../table/migration');

const { arrayUtilities, asynchronousUtilities, miscellaneousUtilities } = necessary,
      { log } = miscellaneousUtilities,
      { first } = arrayUtilities,
      { whilst } = asynchronousUtilities,
      { insertVersion, selectMaximumVersion } = migrationTable;

function applyMigrationsCallback(next, done, context) {
  log.debug('Apply migrations...');

  const { migrationsDirectoryPath } = context,
        migrations = Migrations.fromMigrationsDirectoryPath(migrationsDirectoryPath);

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
  log.debug('Apply migration...');

  const { configuration } = context,
        operations = [
          getVersion,
          applyMigration,
          updateVersion
        ];

  transaction(configuration, operations, (completed) => {
    const error = !completed;

    if (error) {
      log.error('...not completed.');

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
  log.debug('Get version....');

  selectMaximumVersion(connection, (error, rows) => {
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
  log.debug('Update version...');

  const { version } = context;

  delete context.version;

  insertVersion(connection, version, (error) => {
    error ?
      abort() :
        proceed();
  });
}

function applyMigration(connection, abort, proceed, complete, context) {
  log.debug('Apply migration...');

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

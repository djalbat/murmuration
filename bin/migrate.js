'use strict';

const necessary = require('necessary');

const initialiseCallback = require('./migrate/callback/initialise'),
      applyMigrationsCallback = require('./migrate/callback/applyMigrations');

const { asynchronousUtilities } = necessary,
      { sequence } = asynchronousUtilities;

function migrate(migrationsDirectoryPath, callback) {
  const callbacks = [
          initialiseCallback,
          applyMigrationsCallback
        ],
        error = false,  ///
        context = {
          error,
          migrationsDirectoryPath
        };

  sequence(callbacks, () => {
    const { error } = context;

    delete context.error;

    delete context.migrationsDirectoryPath;

    callback(error);
  }, context);
}

module.exports = migrate;

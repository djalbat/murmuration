'use strict';

const necessary = require('necessary');

const initialiseCallback = require('./migrate/callback/initialise'),
      applyMigrationsCallback = require('./migrate/callback/applyMigrations');

const { asynchronousUtilities } = necessary,
      { sequence } = asynchronousUtilities;

function migrate(configuration, migrationsDirectoryPath, callback) {
  const callbacks = [
          initialiseCallback,
          applyMigrationsCallback
        ],
        error = false,  ///
        context = {
          error,
          configuration,
          migrationsDirectoryPath
        };

  sequence(callbacks, () => {
    const { error } = context;

    callback(error);
  }, context);
}

module.exports = migrate;

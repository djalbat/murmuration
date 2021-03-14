"use strict";

const initialiseCallback = require("./migrate/callback/initialise"),
      applyMigrationsCallback = require("./migrate/callback/applyMigrations");

const { asynchronousUtilities } = require("necessary");

const { sequence } = asynchronousUtilities;

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

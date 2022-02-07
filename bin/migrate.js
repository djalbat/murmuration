"use strict";

const initialiseOperation = require("./migrate/operation/initialise"),
      applyMigrationsOperation = require("./migrate/operation/applyMigrations");

const { asynchronousUtilities } = require("necessary");

const { sequence } = asynchronousUtilities;

function migrate(configuration, migrationsDirectoryPath, CustomMigrationMap, callback) {
  if (callback === undefined) {
    callback = CustomMigrationMap; ///

    CustomMigrationMap = {};
  }

  const callbacks = [
          initialiseOperation,
          applyMigrationsOperation
        ],
        error = false,  ///
        context = {
          error,
          configuration,
          CustomMigrationMap,
          migrationsDirectoryPath
        };

  sequence(callbacks, () => {
    const { error } = context;

    callback(error);
  }, context);
}

module.exports = migrate;

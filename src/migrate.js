"use strict";

import initialiseOperation from "./migrate/operation/initialise";
import applyMigrationsOperation from "./migrate/operation/applyMigrations";

import { asynchronousUtilities } from "necessary";

const { sequence } = asynchronousUtilities;

export default function migrate(configuration, migrationsDirectoryPath, CustomMigrationMap, callback) {
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

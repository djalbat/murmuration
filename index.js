"use strict";

const migrate = require("./bin/migrate"),
      database = require("./bin/database"),
      defaultLog = require("./bin/defaultLog"),
      transaction = require("./bin/transaction"),
      CustomMigration = require("./bin/migrate/customMigration");

module.exports = {
  migrate,
  database,
  defaultLog,
  transaction,
  CustomMigration
};

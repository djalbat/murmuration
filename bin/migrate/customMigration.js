"use strict";

const { arrayUtilities } = require("necessary");

const { second } = arrayUtilities;

class CustomMigration {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getFilePath() {
    return this.filePath;
  }

  getVersion() {
    const matches = this.filePath.match(/(\d+)-.+$/),
          secondMatch = second(matches),
          version = secondMatch;  ///

    return version;
  }
  
  apply(connection, callback) {
    const log = connection.getLog(),
          version = this.getVersion();

    log.info(`Applying custom migration version ${version}...`);

    const error = true;

    callback(error);
  }
  
  static fromFilePath(filePath) {
    const customMigration = new CustomMigration(filePath);
    
    return customMigration;
  }
}

module.exports = CustomMigration;

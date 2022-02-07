"use strict";

const { arrayUtilities, fileSystemUtilities } = require("necessary");

const { second } = arrayUtilities,
      { readFile } = fileSystemUtilities;

class CustomMigration {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getSQL() {
    const fileContent = readFile(this.filePath),
          sql = fileContent;  ///

    return sql;
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

'use strict';

const necessary = require('necessary');

const database = require('../database');

const { arrayUtilities, fileSystemUtilities } = necessary,
      { second } = arrayUtilities,
      { readFile } = fileSystemUtilities,
      { execute } = database;

class Migration {
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
    const { log } = connection,
          sql = this.getSQL(),
          version = this.getVersion();

    if (log) {
      log.info(`Applying migration version ${version}...`);
    }

    execute(connection, sql, (error) => {
      if (log) {
        error ?
          log.error(`...failed!`) :
            log.debug('...success!');
      }

      callback(error);
    });
  }
  
  static fromFilePath(filePath) {
    const migration = new Migration(filePath);
    
    return migration;
  }
}

module.exports = Migration;

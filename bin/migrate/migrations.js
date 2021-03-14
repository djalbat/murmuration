"use strict";

const { pathUtilities, fileSystemUtilities } = require("necessary");

const Migration = require("./migration");

const { readDirectory } = fileSystemUtilities,
      { concatenatePaths } = pathUtilities;

class Migrations {
  constructor(map) {
    this.map = map;
  }

  retrieveMigration(version) {
    const migration = this.map[version] || null;

    return migration;
  }
  
  static fromMigrationsDirectoryPath(migrationsDirectoryPath) {
    const entryNames = readDirectory(migrationsDirectoryPath),
          fileNames = entryNames.reduce((fileNames, entryName) => {
            const entryNameSQLFileName = /.+\.sql/.test(entryName);
            
            if (entryNameSQLFileName) {
              const sqlFileName = entryName,  ///
                    fileName = sqlFileName; ///
              
              fileNames.push(fileName);
            }
            
            return fileNames;
          }, []),
          map = fileNames.reduce((map, fileName) => {
            const filePath = concatenatePaths(migrationsDirectoryPath, fileName),
                  migration = Migration.fromFilePath(filePath),
                  version = migration.getVersion();

            map[version] = migration;

            return map;
          }, {}),
          migrations = new Migrations(map);

    return migrations;
  }
}

module.exports = Migrations;

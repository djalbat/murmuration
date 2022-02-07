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
  
  static fromCustomMigrationMapAndMigrationsDirectoryPath(CustomMigrationMap, migrationsDirectoryPath) {
    const map = {},
          entryNames = readDirectory(migrationsDirectoryPath),
          sqlFileNames = sqlFileNamesFromEntryNames(entryNames),
          customTextFileNames = customTextFileNamesFromEEntryNames(entryNames);

    sqlFileNames.forEach((sqlFileName) => {
      const filePath = concatenatePaths(migrationsDirectoryPath, sqlFileName),
            migration = Migration.fromFilePath(filePath),
            version = migration.getVersion();

      map[version] = migration;
    });

    customTextFileNames.forEach((customTextFileName) => {
      const filePath = concatenatePaths(migrationsDirectoryPath, customTextFileName),
            CustomMigration = CustomMigrationMap[customTextFileName],
            customMigration = CustomMigration.fromFilePath(filePath),
            migration = customMigration,  ///
            version = migration.getVersion();

      map[version] = migration;
    });

    const migrations = new Migrations(map);

    return migrations;
  }
}

module.exports = Migrations;

function customTextFileNamesFromEEntryNames(entryNames) {
  const test = /.+CUSTOM\.txt$/.test,
        customTextFileNames = fileNamesFromEntryNames(entryNames, test);

  return customTextFileNames;
}

function sqlFileNamesFromEntryNames(entryNames) {
  const test = /.+\.sql$/.test,
        sqlFileNames = fileNamesFromEntryNames(entryNames, test);

  return sqlFileNames;
}

function fileNamesFromEntryNames(entryNames, test) {
  const fileNames = entryNames.reduce((fileNames, entryName) => {
    const entryNameSQLFileName = test(entryName);

    if (entryNameSQLFileName) {
      const fileName = entryName;

      fileNames.push(fileName);
    }

    return fileNames;
  }, []);

  return fileNames;
}

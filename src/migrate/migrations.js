"use strict";

import { pathUtilities, fileSystemUtilities } from "necessary";

import Migration from "./migration";

const { readDirectory } = fileSystemUtilities,
      { concatenatePaths } = pathUtilities;

export default class Migrations {
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

function customTextFileNamesFromEEntryNames(entryNames) { return fileNamesFromEntryNames(entryNames, (entryName) => /.+CUSTOM\.txt$/.test(entryName)); }

function sqlFileNamesFromEntryNames(entryNames) { return fileNamesFromEntryNames(entryNames, (entryName) => /.+\.sql$/.test(entryName)); }

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

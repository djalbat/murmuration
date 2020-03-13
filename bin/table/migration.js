'use strict';

const necessary = require('necessary');

const database = require('../database'),
      createTableMigrationSQL = require('../sql/migration/createTable'),
      insertVersionMigrationSQL = require('../sql/migration/insertVersion'),
      showLikeTablesMigrationSQL = require('../sql/migration/showLikeTables'),
      selectMaximumVersionMigrationSQL = require('../sql/migration/selectMaximumVersion');

const { miscellaneousUtilities } = necessary,
      { query, execute } = database,
      { log } = miscellaneousUtilities;

function createTable(connection, callback) {
  const sql = createTableMigrationSQL;  ///
  
  execute(connection, sql, (error) => {
    if (error) {
      log.error('createTable() failed.');
    }
    
    callback(error);
  });
}

function insertVersion(connection, version, callback) {
  const sql = insertVersionMigrationSQL;  ///

  execute(connection, sql, version, (error) => {
    if (error) {
      log.error('insertVersion() failed.');
    }

    callback(error);
  });
}

function showLikeTables(connection, callback) {
  const sql = showLikeTablesMigrationSQL; ///
  
  query(connection, sql, (error, rows) => {
    if (error) {
      log.error('showLikeTables() failed.');
    }
    
    callback(error, rows);
  });
}

function selectMaximumVersion(connection, callback) {
  const sql = selectMaximumVersionMigrationSQL; ///

  query(connection, sql, (error, rows) => {
    if (error) {
      log.error('selectMaximumVersion() failed.');
    }

    callback(error, rows);
  });
}

module.exports = {
  createTable,
  insertVersion,
  showLikeTables,
  selectMaximumVersion
};

"use strict";

const { query, execute } = require("../database");

function createTable(connection, sql, callback) {
  execute(connection, sql, (error) => {
    if (error) {
      const log = connection.getLog();

      log.error("createTable() failed.");
    }
    
    callback(error);
  });
}

function insertVersion(connection, version, sql, callback) {
  execute(connection, sql, version, (error) => {
    if (error) {
      const log = connection.getLog();

      log.error("insertVersion() failed.");
    }

    callback(error);
  });
}

function showLikeTables(connection, sql, callback) {
  query(connection, sql, (error, rows) => {
    if (error) {
      const log = connection.getLog();

      log.error("showLikeTables() failed.");
    }
    
    callback(error, rows);
  });
}

function selectMaximumVersion(connection, sql, callback) {
  query(connection, sql, (error, rows) => {
    if (error) {
      const log = connection.getLog();

      log.error("selectMaximumVersion() failed.");
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

"use strict";

import { query, execute } from "../database";

export function createTable(connection, sql, callback) {
  execute(connection, sql, (error) => {
    if (error) {
      const log = connection.getLog();

      log.error("createTable() failed.");
    }
    
    callback(error);
  });
}

export function insertVersion(connection, version, sql, callback) {
  execute(connection, sql, version, (error) => {
    if (error) {
      const log = connection.getLog();

      log.error("insertVersion() failed.");
    }

    callback(error);
  });
}

export function showLikeTables(connection, sql, callback) {
  query(connection, sql, (error, rows) => {
    if (error) {
      const log = connection.getLog();

      log.error("showLikeTables() failed.");
    }
    
    callback(error, rows);
  });
}

export function selectMaximumVersion(connection, sql, callback) {
  query(connection, sql, (error, rows) => {
    if (error) {
      const log = connection.getLog();

      log.error("selectMaximumVersion() failed.");
    }

    callback(error, rows);
  });
}

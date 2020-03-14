'use strict';

const mysql = require('mysql'),
      necessary = require('necessary');

const { fileSystemUtilities } = necessary,
      { readFile } = fileSystemUtilities;

let pool = null;      

function query(connection, sql, ...remainingArguments) {
  const values = remainingArguments,
        callback = values.pop();  ///

  try {
    connection.query(sql, values, (error, rows) => {
      if (error) {
        const { log } = connection;

        log && logError(error, sql, log);

        rows = null;
      }

      callback(error, rows);
    });
  } catch (error) {
    let rows; ///

    log.error(error);

    callback(error, rows);
  }
}

function execute(connection, sql, ...remainingArguments) {
  const values = remainingArguments,
        callback = values.pop();  ///

  try {
    connection.query(sql, values, (error) => {
      if (error) {
        const { log } = connection;

        log && logError(error, sql, log);
      }

      callback(error);
    });
  } catch (error) {
    log.error(error);

    callback(error);
  }
}

function getConnection(configuration, callback) {
  if (pool === null) {
    pool = mysql.createPool(configuration);
  }

  pool.getConnection((error, connection) => {
    const { log } = configuration;

    if (error) {
      const sql = null; ///

      log && logError(error, sql, log);
    }

    log && Object.assign(connection, {
      log
    });

    callback(error, connection);
  });
}

function releaseConnection(connection) {
  connection.release();
}

function sqlFromFilePath(filePath) {
  const sql = readFile(filePath);
  
  return sql;
}

module.exports = {
  query,
  execute,
  getConnection,
  releaseConnection,
  sqlFromFilePath
};

function logError(error, sql, log) {
  const { code } = error;
  
  log.error(code);
  
  switch(code) {
    case 'ECONNREFUSED' :
      log.error('The database isn\'t running, probably.');
      break;

    case 'ENOTFOUND' :
      log.error('The host is wrong, probably.');
      break;

    case 'ER_BAD_DB_ERROR' :
      log.error('The database name is wrong, probably.');
      break;

    case 'ER_ACCESS_DENIED_ERROR' :
      log.error('The username or the password are wrong, probably.');
      break;

    case 'ETIMEOUT' :
    case 'PROTOCOL_SEQUENCE_TIMEOUT' :
      log.error('The database is timing out for some reason.');
      break;

    case 'ER_PARSE_ERROR' :
    case 'ER_BAD_TABLE_ERROR' :
      const { message } = error;
        
      log.error(message);

      if (sql) {
        log.error(`The offending SQL is: '${sql}'`);
      }
      break;
  }
}

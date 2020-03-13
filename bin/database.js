'use strict';

const mysql = require('mysql'),
      necessary = require('necessary');

const { fileSystemUtilities, miscellaneousUtilities } = necessary,
      { rc, log } = miscellaneousUtilities,
      { readFile } = fileSystemUtilities;

let pool = null;      

function query(connection, sql, ...remainingArguments) {
  const values = remainingArguments,
        callback = values.pop();  ///

  try {
    connection.query(sql, values, (error, rows) => {
      if (error) {
        errorHandler(error, sql);

        rows = null;
      }

      error = !!error;  ///

      callback(error, rows);
    });
  } catch (error) {
    let rows; ///

    log.error(error);

    error = !!error;  ///

    callback(error, rows);
  }
}

function execute(connection, sql, ...remainingArguments) {
  const values = remainingArguments,
        callback = values.pop();  ///

  try {
    connection.query(sql, values, (error) => {
      if (error) {
        errorHandler(error, sql);
      }

      error = !!error;  ///

      callback(error);
    });
  } catch (error) {
    log.error(error);

    error = !!error;  ///

    callback(error);
  }
}

function getConnection(callback) {
  if (pool === null) {
    const { database } = rc,
          config = database;  ///

    pool = mysql.createPool(config);
  }

  pool.getConnection((error, connection) => {
    if (error) {
      let sql; ///

      errorHandler(error, sql);
    }

    error = !!error;  ///

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

function errorHandler(error, sql) {
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
      log.error('The active build in the runtime configuration is wrong, probably.');
      break;

    case 'ER_PARSE_ERROR' :
    case 'ER_BAD_TABLE_ERROR' :
      const { message } = error;
        
      log.error(message);
        
      log.error(`The offending SQL is: ${sql}`);
      break;
  }
}

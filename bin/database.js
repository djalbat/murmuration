'use strict';

function query(connection, sql, ...remainingArguments) {
  const parameters = remainingArguments,
        callback = parameters.pop();  ///

  try {
    connection.query(sql, parameters, (error, rows) => callback(error, rows));
  } catch (error) {
    const log = connection.getLog();

    log.error(error);

    const rows = null; ///

    callback(error, rows);
  }
}

function execute(connection, sql, ...remainingArguments) {
  const parameters = remainingArguments,
        callback = parameters.pop();  ///

  try {
    connection.query(sql, parameters, (error, rows) => callback(error));
  } catch (error) {
    const log = connection.getLog();

    log.error(error);

    callback(error);
  }
}

module.exports = {
  query,
  execute
};

"use strict";

export function query(connection, sql, ...remainingArguments) {
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

export function execute(connection, sql, ...remainingArguments) {
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

export default {
  query,
  execute
};

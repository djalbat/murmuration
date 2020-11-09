"use strict";

function defaultLog(message) {}

Object.assign(defaultLog, {
  trace: () => {},
  debug: () => {},
  info: () => {},
  warning: () => {},
  error: () => {},
  fatal: () => {},
});

module.exports = defaultLog;

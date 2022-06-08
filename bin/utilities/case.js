"use strict";

function camelCaseToSnakeCase(string) {
  return string.replace(/([A-Z])/g, (match, character) => `_${character.toLowerCase()}`);
}

function snakeCaseToCamelCase(string) {
  return string.replace(/_(.)/g, (match, character) => character.toUpperCase());
}

module.exports = {
  camelCaseToSnakeCase,
  snakeCaseToCamelCase
};

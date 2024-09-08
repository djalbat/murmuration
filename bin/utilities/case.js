"use strict";

function camelCaseToSnakeCase(string) {
  return string.replace(/([A-Z])/g, (match, character) => {
    const lowerCaseCharacter = character.toLowerCase(),
          characters = `_${lowerCaseCharacter}`

    return characters;
  });
}

function snakeCaseToCamelCase(string) {
  return string.replace(/_(.)/g, (match, character) => {
    const upperCaseCharacter = character.toUpperCase();

    return upperCaseCharacter;
  });
}

module.exports = {
  camelCaseToSnakeCase,
  snakeCaseToCamelCase
};

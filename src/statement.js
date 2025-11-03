"use strict";

import { arrayUtilities } from "necessary";

import database from "./database";

import { STRING, EMPTY_STRING } from "./constants";

const { first } = arrayUtilities,
      { query, execute: command } = database;

export default class Statement {
  constructor(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler) {
    this.connection = connection;
    this.sql = sql;
    this.query = query;
    this.parameters = parameters;
    this.oneHandler = oneHandler;
    this.noneHandler = noneHandler;
    this.manyHandler = manyHandler;
    this.elseHandler = elseHandler;
    this.firstHandler = firstHandler;
    this.errorHandler = errorHandler;
    this.successHandler = successHandler;
  }

  getConnection() {
    return this.connection;
  }

  getSQL() {
    return this.sql;
  }

  isQuery() {
    return this.query;
  }

  getParameters() {
    return this.parameters;
  }

  getOneHandler() {
    return this.oneHandler;
  }

  getNoneHandler() {
    return this.noneHandler;
  }

  getManyHandler() {
    return this.manyHandler;
  }

  getElseHandler() {
    return this.elseHandler;
  }

  getFirstHandler() {
    return this.firstHandler;
  }

  getErrorHandler() {
    return this.errorHandler;
  }

  getSuccessHandler() {
    return this.successHandler;
  }

  setSQL(sql) {
    this.sql = sql;
  }

  setQuery(query) {
    this.query = query;
  }

  setParameters(parameters) {
    this.parameters = parameters;
  }

  one(oneHandler) {
    this.oneHandler = oneHandler;

    return this;
  }

  none(noneHandler) {
    this.noneHandler = noneHandler;

    return this;
  }

  many(manyHandler) {
    this.manyHandler = manyHandler;

    return this;
  }

  else(elseHandler) {
    this.elseHandler = elseHandler;

    return this;
  }

  first(firstHandler) {
    this.firstHandler = firstHandler;

    return this;
  }

  catch(errorHandler) {
    this.errorHandler = errorHandler;

    return this;
  }

  success(successHandler) {
    this.successHandler = successHandler;

    return this;
  }

  set(value, ...parameters) {
    let assignments;

    const valueArray = isArray(value),
          valueObject = isObject(value),
          valueString = isString(value);

    if (false) {
      ///
    } else if (valueArray) {
      const array = value,  ///
            strings = array;  ///

      assignments = this.assignmentsFromStringsAndParameters(strings, parameters);
    } else if (valueObject) {
      const object = value;  ///

      assignments = this.assignmentsFromObject(object); ///
    } else if (valueString) {
      const string = value; ///

      assignments = string; ///
    }

    this.sql = ` ${this.sql} SET ${assignments}`;

    return this;
  }

  where(value, ...parameters) {
    let clause;

    const valueArray = isArray(value),
          valueObject = isObject(value),
          valueString = isString(value);

    if (false) {
      ///
    } else if (valueArray) {
      const array = value,  ///
            strings = array;  ///

      clause = this.clauseFromStringsAndParameters(strings, parameters);
    } else if (valueObject) {
      const object = value;  ///

      clause = this.clauseFromObject(object); ///
    } else if (valueString) {
      const string = value; ///

      clause = string;  ///
    }

    this.sql = ` ${this.sql} WHERE ${clause}`;

    return this;
  }

  values(value, ...parameters) {
    let columnsAndValues;

    const valueArray = isArray(value),
          valueObject = isObject(value),
          valueString = isString(value);

    if (false) {
      ///
    } else if (valueArray) {
      const array = value,  ///
            strings = array;  ///

      columnsAndValues = this.columnsAndValuesFromStringsAndParameters(strings, parameters);
    } else if (valueObject) {
      const object = value;  ///

      columnsAndValues = this.columnsAndValuesFromObject(object);
    } else if (valueString) {
      const string = value; ///

      columnsAndValues = string;  ///
    }

    this.sql = `${this.sql} ${columnsAndValues}`;

    return this;
  }

  objectFromRow(row) {
    const values = Object.values(row),
          columns = Object.keys(row), ///
          object = columns.reduce((object, column, index) => {
            const key = this.keyFromColumn(column),
                  value = values[index];

            object[key] = value;

            return object;
          }, {});

    return object;
  }

  clauseFromObject(object) {
    const keys = Object.keys(object),
          columns = keys.map((key) => this.columnFromKey(key)),
          parameters = Object.values(object), ///
          firstIndex = 0,
          clause = columns.reduce((clause, column, index) => {
            const placeholder = this.placeholder();

            clause = (index === firstIndex) ?
                `${column}=${placeholder}` :
                ` ${clause} AND ${column}=${placeholder}`;

            return clause;
          }, EMPTY_STRING);

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return clause;
  }

  assignmentsFromObject(object) {
    const keys = Object.keys(object),
          columns = keys.map((key) => this.columnFromKey(key)),
          parameters = Object.values(object), ///
          firstIndex = 0,
          assignments = columns.reduce((assignments, column, index) => {
            const placeholder = this.placeholder();

            assignments = (index === firstIndex) ?
                `${column}=${placeholder}` :
                ` ${assignments}, ${column}=${placeholder}`;

            return assignments;
          }, EMPTY_STRING);

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return assignments;
  }

  columnsAndValuesFromObject(object) {
    const keys = Object.keys(object),
          columns = keys.map((key) => this.columnFromKey(key)),
          parameters = Object.values(object), ///
          firstIndex = 0,
          values = columns.reduce((values, column, index) => {
            const placeholder = this.placeholder();

            values = (index === firstIndex) ?
                        `${placeholder}` :
                        ` ${values}, ${placeholder}`;

            return values;
          }, EMPTY_STRING),
          columnsAndValues = `(${columns}) VALUES (${values})`;

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return columnsAndValues;
  }

  clauseFromStringsAndParameters(strings, parameters) {
    const stringsLength = strings.length,
          lastIndex = stringsLength - 1,
          clause = strings.reduce((clause, string, index) => {
            if (index < lastIndex) {
              const placeholder = this.placeholder();

              clause = `${clause}${string}${placeholder}`
            } else {
              clause = `${clause}${string}`;
            }

            return clause;
          }, EMPTY_STRING);

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return clause;
  }

  assignmentsFromStringsAndParameters(strings, parameters) {
    const stringsLength = strings.length,
          lastIndex = stringsLength - 1,
          assignments = strings.reduce((assignments, string, index) => {
            if (index < lastIndex) {
              const placeholder = this.placeholder();

              assignments = `${assignments}${string}${placeholder}`
            } else {
              assignments = `${assignments}${string}`;
            }

            return assignments;
          }, EMPTY_STRING);

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return assignments;
  }

  columnsAndValuesFromStringsAndParameters(strings, parameters) {
    const stringsLength = strings.length,
          lastIndex = stringsLength - 1,
          columnsAndValues = strings.reduce((columnsAndValues, string, index) => {
            if (index < lastIndex) {
              const placeholder = this.placeholder();

              columnsAndValues = `${columnsAndValues}${string}${placeholder}`
            } else {
              columnsAndValues = `${columnsAndValues}${string}`;
            }

            return columnsAndValues;
          }, EMPTY_STRING);

    this.parameters = [
      ...this.parameters,
      ...parameters
    ];

    return columnsAndValues;
  }

  execute() {
    this.query ?
      query(this.connection, this.sql, ...this.parameters, this.queryHandler) :
        command(this.connection, this.sql, ...this.parameters, this.commandHandler);
  }

  queryHandler = (error, rows) => {
    if (error) {
      this.errorHandler(error);

      return;
    }

    const rowsLength = rows.length;

    if (false) {
      ///
    } else if (this.noneHandler !== null) {
      if (rowsLength === 0) {
        this.noneHandler();

        return;
      }
    } else if (this.firstHandler !== null) {
      if (rowsLength > 0) {
        const firstRow = first(rows),
              row = firstRow, ///
              object = this.objectFromRow(row);

        this.firstHandler(object);

        return;
      }
    } else if (this.oneHandler !== null) {
      if (rowsLength === 1) {
        const firstRow = first(rows),
              row = firstRow, ///
              object = this.objectFromRow(row);

        this.oneHandler(object);

        return;
      }
    } else if (this.manyHandler !== null) {
      const objects = rows.map((row) => this.objectFromRow(row));

      this.manyHandler(objects);

      return;
    }

    this.elseHandler(rows);
  }

  commandHandler = (error) => {
    if (error) {
      this.errorHandler(error);

      return;
    }

    this.successHandler();
  }

  static fromConnection(Class, connection) {
    const sql = null,
          query = false,
          parameters = [],
          oneHandler = null,
          noneHandler = null,
          manyHandler = null,
          elseHandler = null,
          firstHandler = null,
          errorHandler = null,
          successHandler = null,
          statement = new Class(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler);

    return statement;
  }
}

function isArray(value) {
  const valueArray = Array.isArray(value);

  return valueArray;
}

function isString(value) {
  const valueString = (typeof value === STRING);

  return valueString;
}

function isObject(value) {
  const valueArray = isArray(value),
        valueString = isString(value),
        valueSObject = (!valueArray && !valueString);

  return valueSObject
}
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Statement;
    }
});
const _necessary = require("necessary");
const _database = /*#__PURE__*/ _interop_require_default(require("./database"));
const _constants = require("./constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { first } = _necessary.arrayUtilities, { query, execute: command } = _database.default, { isArray, isObject, isString } = _necessary.jsonUtilities;
class Statement {
    constructor(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler){
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
        const valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
        if (false) {
        ///
        } else if (valueArray) {
            const array = value, strings = array; ///
            assignments = this.assignmentsFromStringsAndParameters(strings, parameters);
        } else if (valueObject) {
            const object = value; ///
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
        const valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
        if (false) {
        ///
        } else if (valueArray) {
            const array = value, strings = array; ///
            clause = this.clauseFromStringsAndParameters(strings, parameters);
        } else if (valueObject) {
            const object = value; ///
            clause = this.clauseFromObject(object); ///
        } else if (valueString) {
            const string = value; ///
            clause = string; ///
        }
        this.sql = ` ${this.sql} WHERE ${clause}`;
        return this;
    }
    values(value, ...parameters) {
        let columnsAndValues;
        const valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
        if (false) {
        ///
        } else if (valueArray) {
            const array = value, strings = array; ///
            columnsAndValues = this.columnsAndValuesFromStringsAndParameters(strings, parameters);
        } else if (valueObject) {
            const object = value; ///
            columnsAndValues = this.columnsAndValuesFromObject(object);
        } else if (valueString) {
            const string = value; ///
            columnsAndValues = string; ///
        }
        this.sql = `${this.sql} ${columnsAndValues}`;
        return this;
    }
    objectFromRow(row) {
        const values = Object.values(row), columns = Object.keys(row), object = columns.reduce((object, column, index)=>{
            const key = this.keyFromColumn(column), value = values[index];
            object[key] = value;
            return object;
        }, {});
        return object;
    }
    clauseFromObject(object) {
        const keys = Object.keys(object), columns = keys.map((key)=>this.columnFromKey(key)), parameters = Object.values(object), firstIndex = 0, clause = columns.reduce((clause, column, index)=>{
            const placeholder = this.placeholder();
            clause = index === firstIndex ? `${column}=${placeholder}` : ` ${clause} AND ${column}=${placeholder}`;
            return clause;
        }, _constants.EMPTY_STRING);
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return clause;
    }
    assignmentsFromObject(object) {
        const keys = Object.keys(object), columns = keys.map((key)=>this.columnFromKey(key)), parameters = Object.values(object), firstIndex = 0, assignments = columns.reduce((assignments, column, index)=>{
            const placeholder = this.placeholder();
            assignments = index === firstIndex ? `${column}=${placeholder}` : ` ${assignments}, ${column}=${placeholder}`;
            return assignments;
        }, _constants.EMPTY_STRING);
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return assignments;
    }
    columnsAndValuesFromObject(object) {
        const keys = Object.keys(object), columns = keys.map((key)=>this.columnFromKey(key)), parameters = Object.values(object), firstIndex = 0, values = columns.reduce((values, column, index)=>{
            const placeholder = this.placeholder();
            values = index === firstIndex ? `${placeholder}` : ` ${values}, ${placeholder}`;
            return values;
        }, _constants.EMPTY_STRING), columnsAndValues = `(${columns}) VALUES (${values})`;
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return columnsAndValues;
    }
    clauseFromStringsAndParameters(strings, parameters) {
        const stringsLength = strings.length, lastIndex = stringsLength - 1, clause = strings.reduce((clause, string, index)=>{
            if (index < lastIndex) {
                const placeholder = this.placeholder();
                clause = `${clause}${string}${placeholder}`;
            } else {
                clause = `${clause}${string}`;
            }
            return clause;
        }, _constants.EMPTY_STRING);
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return clause;
    }
    assignmentsFromStringsAndParameters(strings, parameters) {
        const stringsLength = strings.length, lastIndex = stringsLength - 1, assignments = strings.reduce((assignments, string, index)=>{
            if (index < lastIndex) {
                const placeholder = this.placeholder();
                assignments = `${assignments}${string}${placeholder}`;
            } else {
                assignments = `${assignments}${string}`;
            }
            return assignments;
        }, _constants.EMPTY_STRING);
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return assignments;
    }
    columnsAndValuesFromStringsAndParameters(strings, parameters) {
        const stringsLength = strings.length, lastIndex = stringsLength - 1, columnsAndValues = strings.reduce((columnsAndValues, string, index)=>{
            if (index < lastIndex) {
                const placeholder = this.placeholder();
                columnsAndValues = `${columnsAndValues}${string}${placeholder}`;
            } else {
                columnsAndValues = `${columnsAndValues}${string}`;
            }
            return columnsAndValues;
        }, _constants.EMPTY_STRING);
        this.parameters = [
            ...this.parameters,
            ...parameters
        ];
        return columnsAndValues;
    }
    execute() {
        this.query ? query(this.connection, this.sql, ...this.parameters, this.queryHandler) : command(this.connection, this.sql, ...this.parameters, this.commandHandler);
    }
    queryHandler = (error, rows)=>{
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
                const firstRow = first(rows), row = firstRow, object = this.objectFromRow(row);
                this.firstHandler(object);
                return;
            }
        } else if (this.oneHandler !== null) {
            if (rowsLength === 1) {
                const firstRow = first(rows), row = firstRow, object = this.objectFromRow(row);
                this.oneHandler(object);
                return;
            }
        } else if (this.manyHandler !== null) {
            const objects = rows.map((row)=>this.objectFromRow(row));
            this.manyHandler(objects);
            return;
        }
        this.elseHandler(rows);
    };
    commandHandler = (error)=>{
        if (error) {
            this.errorHandler(error);
            return;
        }
        this.successHandler();
    };
    static fromConnection(Class, connection) {
        const sql = null, query = false, parameters = [], oneHandler = null, noneHandler = null, manyHandler = null, elseHandler = null, firstHandler = null, errorHandler = null, successHandler = null, statement = new Class(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler);
        return statement;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0ZW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGpzb25VdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2VcIjtcblxuaW1wb3J0IHsgRU1QVFlfU1RSSU5HIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBxdWVyeSwgZXhlY3V0ZTogY29tbWFuZCB9ID0gZGF0YWJhc2UsXG4gICAgICB7IGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZyB9ID0ganNvblV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGVtZW50IHtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbiwgc3FsLCBxdWVyeSwgcGFyYW1ldGVycywgb25lSGFuZGxlciwgbm9uZUhhbmRsZXIsIG1hbnlIYW5kbGVyLCBlbHNlSGFuZGxlciwgZmlyc3RIYW5kbGVyLCBlcnJvckhhbmRsZXIsIHN1Y2Nlc3NIYW5kbGVyKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICB0aGlzLnNxbCA9IHNxbDtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICB0aGlzLm9uZUhhbmRsZXIgPSBvbmVIYW5kbGVyO1xuICAgIHRoaXMubm9uZUhhbmRsZXIgPSBub25lSGFuZGxlcjtcbiAgICB0aGlzLm1hbnlIYW5kbGVyID0gbWFueUhhbmRsZXI7XG4gICAgdGhpcy5lbHNlSGFuZGxlciA9IGVsc2VIYW5kbGVyO1xuICAgIHRoaXMuZmlyc3RIYW5kbGVyID0gZmlyc3RIYW5kbGVyO1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBzdWNjZXNzSGFuZGxlcjtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbjtcbiAgfVxuXG4gIGdldFNRTCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcWw7XG4gIH1cblxuICBpc1F1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICB9XG5cbiAgZ2V0UGFyYW1ldGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJzO1xuICB9XG5cbiAgZ2V0T25lSGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5vbmVIYW5kbGVyO1xuICB9XG5cbiAgZ2V0Tm9uZUhhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9uZUhhbmRsZXI7XG4gIH1cblxuICBnZXRNYW55SGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5tYW55SGFuZGxlcjtcbiAgfVxuXG4gIGdldEVsc2VIYW5kbGVyKCkge1xuICAgIHJldHVybiB0aGlzLmVsc2VIYW5kbGVyO1xuICB9XG5cbiAgZ2V0Rmlyc3RIYW5kbGVyKCkge1xuICAgIHJldHVybiB0aGlzLmZpcnN0SGFuZGxlcjtcbiAgfVxuXG4gIGdldEVycm9ySGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXI7XG4gIH1cblxuICBnZXRTdWNjZXNzSGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzSGFuZGxlcjtcbiAgfVxuXG4gIHNldFNRTChzcWwpIHtcbiAgICB0aGlzLnNxbCA9IHNxbDtcbiAgfVxuXG4gIHNldFF1ZXJ5KHF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICB9XG5cbiAgc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgfVxuXG4gIG9uZShvbmVIYW5kbGVyKSB7XG4gICAgdGhpcy5vbmVIYW5kbGVyID0gb25lSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbm9uZShub25lSGFuZGxlcikge1xuICAgIHRoaXMubm9uZUhhbmRsZXIgPSBub25lSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbWFueShtYW55SGFuZGxlcikge1xuICAgIHRoaXMubWFueUhhbmRsZXIgPSBtYW55SGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZWxzZShlbHNlSGFuZGxlcikge1xuICAgIHRoaXMuZWxzZUhhbmRsZXIgPSBlbHNlSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlyc3QoZmlyc3RIYW5kbGVyKSB7XG4gICAgdGhpcy5maXJzdEhhbmRsZXIgPSBmaXJzdEhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNhdGNoKGVycm9ySGFuZGxlcikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWNjZXNzKHN1Y2Nlc3NIYW5kbGVyKSB7XG4gICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IHN1Y2Nlc3NIYW5kbGVyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXQodmFsdWUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgYXNzaWdubWVudHM7XG5cbiAgICBjb25zdCB2YWx1ZUFycmF5ID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBpc1N0cmluZyh2YWx1ZSk7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVBcnJheSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB2YWx1ZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5ncyA9IGFycmF5OyAgLy8vXG5cbiAgICAgIGFzc2lnbm1lbnRzID0gdGhpcy5hc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlT2JqZWN0KSB7XG4gICAgICBjb25zdCBvYmplY3QgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICBhc3NpZ25tZW50cyA9IHRoaXMuYXNzaWdubWVudHNGcm9tT2JqZWN0KG9iamVjdCk7IC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IHZhbHVlOyAvLy9cblxuICAgICAgYXNzaWdubWVudHMgPSBzdHJpbmc7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBTRVQgJHthc3NpZ25tZW50c31gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aGVyZSh2YWx1ZSwgLi4ucGFyYW1ldGVycykge1xuICAgIGxldCBjbGF1c2U7XG5cbiAgICBjb25zdCB2YWx1ZUFycmF5ID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBpc1N0cmluZyh2YWx1ZSk7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVBcnJheSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB2YWx1ZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5ncyA9IGFycmF5OyAgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHRoaXMuY2xhdXNlRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVPYmplY3QpIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHRoaXMuY2xhdXNlRnJvbU9iamVjdChvYmplY3QpOyAvLy9cbiAgICB9IGVsc2UgaWYgKHZhbHVlU3RyaW5nKSB7XG4gICAgICBjb25zdCBzdHJpbmcgPSB2YWx1ZTsgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHN0cmluZzsgIC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBXSEVSRSAke2NsYXVzZX1gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YWx1ZXModmFsdWUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgY29sdW1uc0FuZFZhbHVlcztcblxuICAgIGNvbnN0IHZhbHVlQXJyYXkgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgICAgICB2YWx1ZU9iamVjdCA9IGlzT2JqZWN0KHZhbHVlKSxcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IGlzU3RyaW5nKHZhbHVlKTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh2YWx1ZUFycmF5KSB7XG4gICAgICBjb25zdCBhcnJheSA9IHZhbHVlLCAgLy8vXG4gICAgICAgICAgICBzdHJpbmdzID0gYXJyYXk7ICAvLy9cblxuICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IHRoaXMuY29sdW1uc0FuZFZhbHVlc0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlT2JqZWN0KSB7XG4gICAgICBjb25zdCBvYmplY3QgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICBjb2x1bW5zQW5kVmFsdWVzID0gdGhpcy5jb2x1bW5zQW5kVmFsdWVzRnJvbU9iamVjdChvYmplY3QpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IHZhbHVlOyAvLy9cblxuICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IHN0cmluZzsgIC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCR7dGhpcy5zcWx9ICR7Y29sdW1uc0FuZFZhbHVlc31gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvYmplY3RGcm9tUm93KHJvdykge1xuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocm93KSxcbiAgICAgICAgICBjb2x1bW5zID0gT2JqZWN0LmtleXMocm93KSwgLy8vXG4gICAgICAgICAgb2JqZWN0ID0gY29sdW1ucy5yZWR1Y2UoKG9iamVjdCwgY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5rZXlGcm9tQ29sdW1uKGNvbHVtbiksXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgfSwge30pO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGNsYXVzZUZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICAgICAgY29sdW1ucyA9IGtleXMubWFwKChrZXkpID0+IHRoaXMuY29sdW1uRnJvbUtleShrZXkpKSxcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gT2JqZWN0LnZhbHVlcyhvYmplY3QpLCAvLy9cbiAgICAgICAgICBmaXJzdEluZGV4ID0gMCxcbiAgICAgICAgICBjbGF1c2UgPSBjb2x1bW5zLnJlZHVjZSgoY2xhdXNlLCBjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgY2xhdXNlID0gKGluZGV4ID09PSBmaXJzdEluZGV4KSA/XG4gICAgICAgICAgICAgICAgYCR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgIGAgJHtjbGF1c2V9IEFORCAke2NvbHVtbn09JHtwbGFjZWhvbGRlcn1gO1xuXG4gICAgICAgICAgICByZXR1cm4gY2xhdXNlO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjbGF1c2U7XG4gIH1cblxuICBhc3NpZ25tZW50c0Zyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICAgICAgY29sdW1ucyA9IGtleXMubWFwKChrZXkpID0+IHRoaXMuY29sdW1uRnJvbUtleShrZXkpKSxcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gT2JqZWN0LnZhbHVlcyhvYmplY3QpLCAvLy9cbiAgICAgICAgICBmaXJzdEluZGV4ID0gMCxcbiAgICAgICAgICBhc3NpZ25tZW50cyA9IGNvbHVtbnMucmVkdWNlKChhc3NpZ25tZW50cywgY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnRzID0gKGluZGV4ID09PSBmaXJzdEluZGV4KSA/XG4gICAgICAgICAgICAgICAgYCR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgIGAgJHthc3NpZ25tZW50c30sICR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBhc3NpZ25tZW50cztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpO1xuXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gW1xuICAgICAgLi4udGhpcy5wYXJhbWV0ZXJzLFxuICAgICAgLi4ucGFyYW1ldGVyc1xuICAgIF07XG5cbiAgICByZXR1cm4gYXNzaWdubWVudHM7XG4gIH1cblxuICBjb2x1bW5zQW5kVmFsdWVzRnJvbU9iamVjdChvYmplY3QpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgICAgICBjb2x1bW5zID0ga2V5cy5tYXAoKGtleSkgPT4gdGhpcy5jb2x1bW5Gcm9tS2V5KGtleSkpLFxuICAgICAgICAgIHBhcmFtZXRlcnMgPSBPYmplY3QudmFsdWVzKG9iamVjdCksIC8vL1xuICAgICAgICAgIGZpcnN0SW5kZXggPSAwLFxuICAgICAgICAgIHZhbHVlcyA9IGNvbHVtbnMucmVkdWNlKCh2YWx1ZXMsIGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICB2YWx1ZXMgPSAoaW5kZXggPT09IGZpcnN0SW5kZXgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgYCAke3ZhbHVlc30sICR7cGxhY2Vob2xkZXJ9YDtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpLFxuICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBgKCR7Y29sdW1uc30pIFZBTFVFUyAoJHt2YWx1ZXN9KWA7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICB9XG5cbiAgY2xhdXNlRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBzdHJpbmdzTGVuZ3RoID0gc3RyaW5ncy5sZW5ndGgsXG4gICAgICAgICAgbGFzdEluZGV4ID0gc3RyaW5nc0xlbmd0aCAtIDEsXG4gICAgICAgICAgY2xhdXNlID0gc3RyaW5ncy5yZWR1Y2UoKGNsYXVzZSwgc3RyaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICAgIGNsYXVzZSA9IGAke2NsYXVzZX0ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNsYXVzZSA9IGAke2NsYXVzZX0ke3N0cmluZ31gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2xhdXNlO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjbGF1c2U7XG4gIH1cblxuICBhc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3Qgc3RyaW5nc0xlbmd0aCA9IHN0cmluZ3MubGVuZ3RoLFxuICAgICAgICAgIGxhc3RJbmRleCA9IHN0cmluZ3NMZW5ndGggLSAxLFxuICAgICAgICAgIGFzc2lnbm1lbnRzID0gc3RyaW5ncy5yZWR1Y2UoKGFzc2lnbm1lbnRzLCBzdHJpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgICAgYXNzaWdubWVudHMgPSBgJHthc3NpZ25tZW50c30ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFzc2lnbm1lbnRzID0gYCR7YXNzaWdubWVudHN9JHtzdHJpbmd9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbm1lbnRzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBhc3NpZ25tZW50cztcbiAgfVxuXG4gIGNvbHVtbnNBbmRWYWx1ZXNGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMoc3RyaW5ncywgcGFyYW1ldGVycykge1xuICAgIGNvbnN0IHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aCxcbiAgICAgICAgICBsYXN0SW5kZXggPSBzdHJpbmdzTGVuZ3RoIC0gMSxcbiAgICAgICAgICBjb2x1bW5zQW5kVmFsdWVzID0gc3RyaW5ncy5yZWR1Y2UoKGNvbHVtbnNBbmRWYWx1ZXMsIHN0cmluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgICBjb2x1bW5zQW5kVmFsdWVzID0gYCR7Y29sdW1uc0FuZFZhbHVlc30ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBgJHtjb2x1bW5zQW5kVmFsdWVzfSR7c3RyaW5nfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICB9XG5cbiAgZXhlY3V0ZSgpIHtcbiAgICB0aGlzLnF1ZXJ5ID9cbiAgICAgIHF1ZXJ5KHRoaXMuY29ubmVjdGlvbiwgdGhpcy5zcWwsIC4uLnRoaXMucGFyYW1ldGVycywgdGhpcy5xdWVyeUhhbmRsZXIpIDpcbiAgICAgICAgY29tbWFuZCh0aGlzLmNvbm5lY3Rpb24sIHRoaXMuc3FsLCAuLi50aGlzLnBhcmFtZXRlcnMsIHRoaXMuY29tbWFuZEhhbmRsZXIpO1xuICB9XG5cbiAgcXVlcnlIYW5kbGVyID0gKGVycm9yLCByb3dzKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlcihlcnJvcik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByb3dzTGVuZ3RoID0gcm93cy5sZW5ndGg7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub25lSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgaWYgKHJvd3NMZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5ub25lSGFuZGxlcigpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3RIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBpZiAocm93c0xlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBmaXJzdChyb3dzKSxcbiAgICAgICAgICAgICAgcm93ID0gZmlyc3RSb3csIC8vL1xuICAgICAgICAgICAgICBvYmplY3QgPSB0aGlzLm9iamVjdEZyb21Sb3cocm93KTtcblxuICAgICAgICB0aGlzLmZpcnN0SGFuZGxlcihvYmplY3QpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMub25lSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgaWYgKHJvd3NMZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBmaXJzdChyb3dzKSxcbiAgICAgICAgICAgICAgcm93ID0gZmlyc3RSb3csIC8vL1xuICAgICAgICAgICAgICBvYmplY3QgPSB0aGlzLm9iamVjdEZyb21Sb3cocm93KTtcblxuICAgICAgICB0aGlzLm9uZUhhbmRsZXIob2JqZWN0KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1hbnlIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBvYmplY3RzID0gcm93cy5tYXAoKHJvdykgPT4gdGhpcy5vYmplY3RGcm9tUm93KHJvdykpO1xuXG4gICAgICB0aGlzLm1hbnlIYW5kbGVyKG9iamVjdHMpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbHNlSGFuZGxlcihyb3dzKTtcbiAgfVxuXG4gIGNvbW1hbmRIYW5kbGVyID0gKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlcihlcnJvcik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbm5lY3Rpb24oQ2xhc3MsIGNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBzcWwgPSBudWxsLFxuICAgICAgICAgIHF1ZXJ5ID0gZmFsc2UsXG4gICAgICAgICAgcGFyYW1ldGVycyA9IFtdLFxuICAgICAgICAgIG9uZUhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIG5vbmVIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBtYW55SGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgZWxzZUhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIGZpcnN0SGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgZXJyb3JIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBzdWNjZXNzSGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgc3RhdGVtZW50ID0gbmV3IENsYXNzKGNvbm5lY3Rpb24sIHNxbCwgcXVlcnksIHBhcmFtZXRlcnMsIG9uZUhhbmRsZXIsIG5vbmVIYW5kbGVyLCBtYW55SGFuZGxlciwgZWxzZUhhbmRsZXIsIGZpcnN0SGFuZGxlciwgZXJyb3JIYW5kbGVyLCBzdWNjZXNzSGFuZGxlcik7XG5cbiAgICByZXR1cm4gc3RhdGVtZW50O1xuICB9XG59XG4iXSwibmFtZXMiOlsiU3RhdGVtZW50IiwiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsInF1ZXJ5IiwiZXhlY3V0ZSIsImNvbW1hbmQiLCJkYXRhYmFzZSIsImlzQXJyYXkiLCJpc09iamVjdCIsImlzU3RyaW5nIiwianNvblV0aWxpdGllcyIsImNvbm5lY3Rpb24iLCJzcWwiLCJwYXJhbWV0ZXJzIiwib25lSGFuZGxlciIsIm5vbmVIYW5kbGVyIiwibWFueUhhbmRsZXIiLCJlbHNlSGFuZGxlciIsImZpcnN0SGFuZGxlciIsImVycm9ySGFuZGxlciIsInN1Y2Nlc3NIYW5kbGVyIiwiZ2V0Q29ubmVjdGlvbiIsImdldFNRTCIsImlzUXVlcnkiLCJnZXRQYXJhbWV0ZXJzIiwiZ2V0T25lSGFuZGxlciIsImdldE5vbmVIYW5kbGVyIiwiZ2V0TWFueUhhbmRsZXIiLCJnZXRFbHNlSGFuZGxlciIsImdldEZpcnN0SGFuZGxlciIsImdldEVycm9ySGFuZGxlciIsImdldFN1Y2Nlc3NIYW5kbGVyIiwic2V0U1FMIiwic2V0UXVlcnkiLCJzZXRQYXJhbWV0ZXJzIiwib25lIiwibm9uZSIsIm1hbnkiLCJlbHNlIiwiY2F0Y2giLCJzdWNjZXNzIiwic2V0IiwidmFsdWUiLCJhc3NpZ25tZW50cyIsInZhbHVlQXJyYXkiLCJ2YWx1ZU9iamVjdCIsInZhbHVlU3RyaW5nIiwiYXJyYXkiLCJzdHJpbmdzIiwiYXNzaWdubWVudHNGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMiLCJvYmplY3QiLCJhc3NpZ25tZW50c0Zyb21PYmplY3QiLCJzdHJpbmciLCJ3aGVyZSIsImNsYXVzZSIsImNsYXVzZUZyb21TdHJpbmdzQW5kUGFyYW1ldGVycyIsImNsYXVzZUZyb21PYmplY3QiLCJ2YWx1ZXMiLCJjb2x1bW5zQW5kVmFsdWVzIiwiY29sdW1uc0FuZFZhbHVlc0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyIsImNvbHVtbnNBbmRWYWx1ZXNGcm9tT2JqZWN0Iiwib2JqZWN0RnJvbVJvdyIsInJvdyIsIk9iamVjdCIsImNvbHVtbnMiLCJrZXlzIiwicmVkdWNlIiwiY29sdW1uIiwiaW5kZXgiLCJrZXkiLCJrZXlGcm9tQ29sdW1uIiwibWFwIiwiY29sdW1uRnJvbUtleSIsImZpcnN0SW5kZXgiLCJwbGFjZWhvbGRlciIsIkVNUFRZX1NUUklORyIsInN0cmluZ3NMZW5ndGgiLCJsZW5ndGgiLCJsYXN0SW5kZXgiLCJxdWVyeUhhbmRsZXIiLCJjb21tYW5kSGFuZGxlciIsImVycm9yIiwicm93cyIsInJvd3NMZW5ndGgiLCJmaXJzdFJvdyIsIm9iamVjdHMiLCJmcm9tQ29ubmVjdGlvbiIsIkNsYXNzIiwic3RhdGVtZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFZQTs7O2VBQXFCQTs7OzJCQVZ5QjtpRUFFekI7MkJBRVE7Ozs7OztBQUU3QixNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHQyx5QkFBYyxFQUMxQixFQUFFQyxLQUFLLEVBQUVDLFNBQVNDLE9BQU8sRUFBRSxHQUFHQyxpQkFBUSxFQUN0QyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxFQUFFLEdBQUdDLHdCQUFhO0FBRXRDLE1BQU1WO0lBQ25CLFlBQVlXLFVBQVUsRUFBRUMsR0FBRyxFQUFFVCxLQUFLLEVBQUVVLFVBQVUsRUFBRUMsVUFBVSxFQUFFQyxXQUFXLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxZQUFZLEVBQUVDLFlBQVksRUFBRUMsY0FBYyxDQUFFO1FBQzdJLElBQUksQ0FBQ1QsVUFBVSxHQUFHQTtRQUNsQixJQUFJLENBQUNDLEdBQUcsR0FBR0E7UUFDWCxJQUFJLENBQUNULEtBQUssR0FBR0E7UUFDYixJQUFJLENBQUNVLFVBQVUsR0FBR0E7UUFDbEIsSUFBSSxDQUFDQyxVQUFVLEdBQUdBO1FBQ2xCLElBQUksQ0FBQ0MsV0FBVyxHQUFHQTtRQUNuQixJQUFJLENBQUNDLFdBQVcsR0FBR0E7UUFDbkIs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
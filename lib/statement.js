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
var _necessary = require("necessary");
var _database = /*#__PURE__*/ _interop_require_default(require("./database"));
var _constants = require("./constants");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var first = _necessary.arrayUtilities.first, query = _database.default.query, command = _database.default.execute;
var Statement = /*#__PURE__*/ function() {
    function Statement(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler) {
        var _this = this;
        _class_call_check(this, Statement);
        _define_property(this, "queryHandler", function(error, rows) {
            if (error) {
                _this.errorHandler(error);
                return;
            }
            var rowsLength = rows.length;
            if (false) {
            ///
            } else if (_this.noneHandler !== null) {
                if (rowsLength === 0) {
                    _this.noneHandler();
                    return;
                }
            } else if (_this.firstHandler !== null) {
                if (rowsLength > 0) {
                    var firstRow = first(rows), row = firstRow, object = _this.objectFromRow(row);
                    _this.firstHandler(object);
                    return;
                }
            } else if (_this.oneHandler !== null) {
                if (rowsLength === 1) {
                    var firstRow1 = first(rows), row1 = firstRow1, object1 = _this.objectFromRow(row1);
                    _this.oneHandler(object1);
                    return;
                }
            } else if (_this.manyHandler !== null) {
                var objects = rows.map(function(row) {
                    return _this.objectFromRow(row);
                });
                _this.manyHandler(objects);
                return;
            }
            _this.elseHandler(rows);
        });
        _define_property(this, "commandHandler", function(error) {
            if (error) {
                _this.errorHandler(error);
                return;
            }
            _this.successHandler();
        });
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
    _create_class(Statement, [
        {
            key: "getConnection",
            value: function getConnection() {
                return this.connection;
            }
        },
        {
            key: "getSQL",
            value: function getSQL() {
                return this.sql;
            }
        },
        {
            key: "isQuery",
            value: function isQuery() {
                return this.query;
            }
        },
        {
            key: "getParameters",
            value: function getParameters() {
                return this.parameters;
            }
        },
        {
            key: "getOneHandler",
            value: function getOneHandler() {
                return this.oneHandler;
            }
        },
        {
            key: "getNoneHandler",
            value: function getNoneHandler() {
                return this.noneHandler;
            }
        },
        {
            key: "getManyHandler",
            value: function getManyHandler() {
                return this.manyHandler;
            }
        },
        {
            key: "getElseHandler",
            value: function getElseHandler() {
                return this.elseHandler;
            }
        },
        {
            key: "getFirstHandler",
            value: function getFirstHandler() {
                return this.firstHandler;
            }
        },
        {
            key: "getErrorHandler",
            value: function getErrorHandler() {
                return this.errorHandler;
            }
        },
        {
            key: "getSuccessHandler",
            value: function getSuccessHandler() {
                return this.successHandler;
            }
        },
        {
            key: "setSQL",
            value: function setSQL(sql) {
                this.sql = sql;
            }
        },
        {
            key: "setQuery",
            value: function setQuery(query) {
                this.query = query;
            }
        },
        {
            key: "setParameters",
            value: function setParameters(parameters) {
                this.parameters = parameters;
            }
        },
        {
            key: "one",
            value: function one(oneHandler) {
                this.oneHandler = oneHandler;
                return this;
            }
        },
        {
            key: "none",
            value: function none(noneHandler) {
                this.noneHandler = noneHandler;
                return this;
            }
        },
        {
            key: "many",
            value: function many(manyHandler) {
                this.manyHandler = manyHandler;
                return this;
            }
        },
        {
            key: "else",
            value: function _else(elseHandler) {
                this.elseHandler = elseHandler;
                return this;
            }
        },
        {
            key: "first",
            value: function first(firstHandler) {
                this.firstHandler = firstHandler;
                return this;
            }
        },
        {
            key: "catch",
            value: function _catch(errorHandler) {
                this.errorHandler = errorHandler;
                return this;
            }
        },
        {
            key: "success",
            value: function success(successHandler) {
                this.successHandler = successHandler;
                return this;
            }
        },
        {
            key: "set",
            value: function set(objectOrArray) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var assignments;
                var objectOrArrayIsArray = Array.isArray(objectOrArray);
                if (objectOrArrayIsArray) {
                    var array = objectOrArray, strings = array; ///
                    assignments = this.assignmentsFromStringsAndParameters(strings, parameters);
                } else {
                    var object = objectOrArray; ///
                    assignments = this.assignmentsFromObject(object); ///
                }
                this.sql = " ".concat(this.sql, " SET ").concat(assignments);
                return this;
            }
        },
        {
            key: "where",
            value: function where(objectOrArray) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var clause;
                var objectOrArrayIsArray = Array.isArray(objectOrArray);
                if (objectOrArrayIsArray) {
                    var array = objectOrArray, strings = array; ///
                    clause = this.clauseFromStringsAndParameters(strings, parameters);
                } else {
                    var object = objectOrArray; ///
                    clause = this.clauseFromObject(object); ///
                }
                this.sql = " ".concat(this.sql, " WHERE ").concat(clause);
                return this;
            }
        },
        {
            key: "values",
            value: function values(objectOrArray) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var objectOrArrayIsArray = Array.isArray(objectOrArray);
                var columnsAndValues;
                if (objectOrArrayIsArray) {
                    var array = objectOrArray, strings = array; ///
                    columnsAndValues = this.columnsAndValuesFromStringsAndParameters(strings, parameters);
                } else {
                    var object = objectOrArray; ///
                    columnsAndValues = this.columnsAndValuesFromObject(object);
                }
                this.sql = "".concat(this.sql, " ").concat(columnsAndValues);
                return this;
            }
        },
        {
            key: "objectFromRow",
            value: function objectFromRow(row) {
                var _this = this;
                var values = Object.values(row), columns = Object.keys(row), object = columns.reduce(function(object, column, index) {
                    var key = _this.keyFromColumn(column), value = values[index];
                    object[key] = value;
                    return object;
                }, {});
                return object;
            }
        },
        {
            key: "clauseFromObject",
            value: function clauseFromObject(object) {
                var _this = this;
                var keys = Object.keys(object), columns = keys.map(function(key) {
                    return _this.columnFromKey(key);
                }), parameters = Object.values(object), firstIndex = 0, clause = columns.reduce(function(clause, column, index) {
                    var placeholder = _this.placeholder();
                    clause = index === firstIndex ? "".concat(column, "=").concat(placeholder) : " ".concat(clause, " AND ").concat(column, "=").concat(placeholder);
                    return clause;
                }, _constants.EMPTY_STRING);
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return clause;
            }
        },
        {
            key: "assignmentsFromObject",
            value: function assignmentsFromObject(object) {
                var _this = this;
                var keys = Object.keys(object), columns = keys.map(function(key) {
                    return _this.columnFromKey(key);
                }), parameters = Object.values(object), firstIndex = 0, assignments = columns.reduce(function(assignments, column, index) {
                    var placeholder = _this.placeholder();
                    assignments = index === firstIndex ? "".concat(column, "=").concat(placeholder) : " ".concat(assignments, ", ").concat(column, "=").concat(placeholder);
                    return assignments;
                }, _constants.EMPTY_STRING);
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return assignments;
            }
        },
        {
            key: "columnsAndValuesFromObject",
            value: function columnsAndValuesFromObject(object) {
                var _this = this;
                var keys = Object.keys(object), columns = keys.map(function(key) {
                    return _this.columnFromKey(key);
                }), parameters = Object.values(object), firstIndex = 0, values = columns.reduce(function(values, column, index) {
                    var placeholder = _this.placeholder();
                    values = index === firstIndex ? "".concat(placeholder) : " ".concat(values, ", ").concat(placeholder);
                    return values;
                }, _constants.EMPTY_STRING), columnsAndValues = "(".concat(columns, ") VALUES (").concat(values, ")");
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return columnsAndValues;
            }
        },
        {
            key: "clauseFromStringsAndParameters",
            value: function clauseFromStringsAndParameters(strings, parameters) {
                var _this = this;
                var stringsLength = strings.length, lastIndex = stringsLength - 1, clause = strings.reduce(function(clause, string, index) {
                    if (index < lastIndex) {
                        var placeholder = _this.placeholder();
                        clause = "".concat(clause).concat(string).concat(placeholder);
                    } else {
                        clause = "".concat(clause).concat(string);
                    }
                    return clause;
                }, _constants.EMPTY_STRING);
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return clause;
            }
        },
        {
            key: "assignmentsFromStringsAndParameters",
            value: function assignmentsFromStringsAndParameters(strings, parameters) {
                var _this = this;
                var stringsLength = strings.length, lastIndex = stringsLength - 1, assignments = strings.reduce(function(assignments, string, index) {
                    if (index < lastIndex) {
                        var placeholder = _this.placeholder();
                        assignments = "".concat(assignments).concat(string).concat(placeholder);
                    } else {
                        assignments = "".concat(assignments).concat(string);
                    }
                    return assignments;
                }, _constants.EMPTY_STRING);
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return assignments;
            }
        },
        {
            key: "columnsAndValuesFromStringsAndParameters",
            value: function columnsAndValuesFromStringsAndParameters(strings, parameters) {
                var _this = this;
                var stringsLength = strings.length, lastIndex = stringsLength - 1, columnsAndValues = strings.reduce(function(columnsAndValues, string, index) {
                    if (index < lastIndex) {
                        var placeholder = _this.placeholder();
                        columnsAndValues = "".concat(columnsAndValues).concat(string).concat(placeholder);
                    } else {
                        columnsAndValues = "".concat(columnsAndValues).concat(string);
                    }
                    return columnsAndValues;
                }, _constants.EMPTY_STRING);
                this.parameters = _to_consumable_array(this.parameters).concat(_to_consumable_array(parameters));
                return columnsAndValues;
            }
        },
        {
            key: "execute",
            value: function execute() {
                this.query ? query.apply(void 0, [
                    this.connection,
                    this.sql
                ].concat(_to_consumable_array(this.parameters), [
                    this.queryHandler
                ])) : command.apply(void 0, [
                    this.connection,
                    this.sql
                ].concat(_to_consumable_array(this.parameters), [
                    this.commandHandler
                ]));
            }
        }
    ], [
        {
            key: "fromConnection",
            value: function fromConnection(Class, connection) {
                var sql = null, query = false, parameters = [], oneHandler = null, noneHandler = null, manyHandler = null, elseHandler = null, firstHandler = null, errorHandler = null, successHandler = null, statement = new Class(connection, sql, query, parameters, oneHandler, noneHandler, manyHandler, elseHandler, firstHandler, errorHandler, successHandler);
                return statement;
            }
        }
    ]);
    return Statement;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0ZW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2VcIjtcblxuaW1wb3J0IHsgRU1QVFlfU1RSSU5HIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBxdWVyeSwgZXhlY3V0ZTogY29tbWFuZCB9ID0gZGF0YWJhc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlbWVudCB7XG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb24sIHNxbCwgcXVlcnksIHBhcmFtZXRlcnMsIG9uZUhhbmRsZXIsIG5vbmVIYW5kbGVyLCBtYW55SGFuZGxlciwgZWxzZUhhbmRsZXIsIGZpcnN0SGFuZGxlciwgZXJyb3JIYW5kbGVyLCBzdWNjZXNzSGFuZGxlcikge1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgdGhpcy5zcWwgPSBzcWw7XG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgdGhpcy5vbmVIYW5kbGVyID0gb25lSGFuZGxlcjtcbiAgICB0aGlzLm5vbmVIYW5kbGVyID0gbm9uZUhhbmRsZXI7XG4gICAgdGhpcy5tYW55SGFuZGxlciA9IG1hbnlIYW5kbGVyO1xuICAgIHRoaXMuZWxzZUhhbmRsZXIgPSBlbHNlSGFuZGxlcjtcbiAgICB0aGlzLmZpcnN0SGFuZGxlciA9IGZpcnN0SGFuZGxlcjtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcbiAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyID0gc3VjY2Vzc0hhbmRsZXI7XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb247XG4gIH1cblxuICBnZXRTUUwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3FsO1xuICB9XG5cbiAgaXNRdWVyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeTtcbiAgfVxuXG4gIGdldFBhcmFtZXRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1ldGVycztcbiAgfVxuXG4gIGdldE9uZUhhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMub25lSGFuZGxlcjtcbiAgfVxuXG4gIGdldE5vbmVIYW5kbGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5vbmVIYW5kbGVyO1xuICB9XG5cbiAgZ2V0TWFueUhhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFueUhhbmRsZXI7XG4gIH1cblxuICBnZXRFbHNlSGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5lbHNlSGFuZGxlcjtcbiAgfVxuXG4gIGdldEZpcnN0SGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdEhhbmRsZXI7XG4gIH1cblxuICBnZXRFcnJvckhhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc0hhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzc0hhbmRsZXI7XG4gIH1cblxuICBzZXRTUUwoc3FsKSB7XG4gICAgdGhpcy5zcWwgPSBzcWw7XG4gIH1cblxuICBzZXRRdWVyeShxdWVyeSkge1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgfVxuXG4gIHNldFBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gIH1cblxuICBvbmUob25lSGFuZGxlcikge1xuICAgIHRoaXMub25lSGFuZGxlciA9IG9uZUhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5vbmUobm9uZUhhbmRsZXIpIHtcbiAgICB0aGlzLm5vbmVIYW5kbGVyID0gbm9uZUhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG1hbnkobWFueUhhbmRsZXIpIHtcbiAgICB0aGlzLm1hbnlIYW5kbGVyID0gbWFueUhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVsc2UoZWxzZUhhbmRsZXIpIHtcbiAgICB0aGlzLmVsc2VIYW5kbGVyID0gZWxzZUhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZpcnN0KGZpcnN0SGFuZGxlcikge1xuICAgIHRoaXMuZmlyc3RIYW5kbGVyID0gZmlyc3RIYW5kbGVyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjYXRjaChlcnJvckhhbmRsZXIpIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3VjY2VzcyhzdWNjZXNzSGFuZGxlcikge1xuICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBzdWNjZXNzSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0KG9iamVjdE9yQXJyYXksIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgYXNzaWdubWVudHM7XG5cbiAgICBjb25zdCBvYmplY3RPckFycmF5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2JqZWN0T3JBcnJheSk7XG5cbiAgICBpZiAob2JqZWN0T3JBcnJheUlzQXJyYXkpIHtcbiAgICAgIGNvbnN0IGFycmF5ID0gb2JqZWN0T3JBcnJheSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5ncyA9IGFycmF5OyAgLy8vXG5cbiAgICAgIGFzc2lnbm1lbnRzID0gdGhpcy5hc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2JqZWN0ID0gb2JqZWN0T3JBcnJheTsgIC8vL1xuXG4gICAgICBhc3NpZ25tZW50cyA9IHRoaXMuYXNzaWdubWVudHNGcm9tT2JqZWN0KG9iamVjdCk7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBTRVQgJHthc3NpZ25tZW50c31gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aGVyZShvYmplY3RPckFycmF5LCAuLi5wYXJhbWV0ZXJzKSB7XG4gICAgbGV0IGNsYXVzZTtcblxuICAgIGNvbnN0IG9iamVjdE9yQXJyYXlJc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmplY3RPckFycmF5KTtcblxuICAgIGlmIChvYmplY3RPckFycmF5SXNBcnJheSkge1xuICAgICAgY29uc3QgYXJyYXkgPSBvYmplY3RPckFycmF5LCAgLy8vXG4gICAgICAgICAgICBzdHJpbmdzID0gYXJyYXk7ICAvLy9cblxuICAgICAgY2xhdXNlID0gdGhpcy5jbGF1c2VGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMoc3RyaW5ncywgcGFyYW1ldGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IG9iamVjdE9yQXJyYXk7ICAvLy9cblxuICAgICAgY2xhdXNlID0gdGhpcy5jbGF1c2VGcm9tT2JqZWN0KG9iamVjdCk7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBXSEVSRSAke2NsYXVzZX1gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YWx1ZXMob2JqZWN0T3JBcnJheSwgLi4ucGFyYW1ldGVycykge1xuICAgIGNvbnN0IG9iamVjdE9yQXJyYXlJc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmplY3RPckFycmF5KTtcblxuICAgIGxldCBjb2x1bW5zQW5kVmFsdWVzO1xuXG4gICAgaWYgKG9iamVjdE9yQXJyYXlJc0FycmF5KSB7XG4gICAgICBjb25zdCBhcnJheSA9IG9iamVjdE9yQXJyYXksICAvLy9cbiAgICAgICAgICAgIHN0cmluZ3MgPSBhcnJheTsgIC8vL1xuXG4gICAgICBjb2x1bW5zQW5kVmFsdWVzID0gdGhpcy5jb2x1bW5zQW5kVmFsdWVzRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvYmplY3QgPSBvYmplY3RPckFycmF5OyAgLy8vXG5cbiAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSB0aGlzLmNvbHVtbnNBbmRWYWx1ZXNGcm9tT2JqZWN0KG9iamVjdCk7XG4gICAgfVxuXG4gICAgdGhpcy5zcWwgPSBgJHt0aGlzLnNxbH0gJHtjb2x1bW5zQW5kVmFsdWVzfWA7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9iamVjdEZyb21Sb3cocm93KSB7XG4gICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhyb3cpLFxuICAgICAgICAgIGNvbHVtbnMgPSBPYmplY3Qua2V5cyhyb3cpLCAvLy9cbiAgICAgICAgICBvYmplY3QgPSBjb2x1bW5zLnJlZHVjZSgob2JqZWN0LCBjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmtleUZyb21Db2x1bW4oY29sdW1uKSxcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW2luZGV4XTtcblxuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgY2xhdXNlRnJvbU9iamVjdChvYmplY3QpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgICAgICBjb2x1bW5zID0ga2V5cy5tYXAoKGtleSkgPT4gdGhpcy5jb2x1bW5Gcm9tS2V5KGtleSkpLFxuICAgICAgICAgIHBhcmFtZXRlcnMgPSBPYmplY3QudmFsdWVzKG9iamVjdCksIC8vL1xuICAgICAgICAgIGZpcnN0SW5kZXggPSAwLFxuICAgICAgICAgIGNsYXVzZSA9IGNvbHVtbnMucmVkdWNlKChjbGF1c2UsIGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICBjbGF1c2UgPSAoaW5kZXggPT09IGZpcnN0SW5kZXgpID9cbiAgICAgICAgICAgICAgICBgJHtjb2x1bW59PSR7cGxhY2Vob2xkZXJ9YCA6XG4gICAgICAgICAgICAgICAgYCAke2NsYXVzZX0gQU5EICR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBjbGF1c2U7XG4gICAgICAgICAgfSwgRU1QVFlfU1RSSU5HKTtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IFtcbiAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcbiAgICAgIC4uLnBhcmFtZXRlcnNcbiAgICBdO1xuXG4gICAgcmV0dXJuIGNsYXVzZTtcbiAgfVxuXG4gIGFzc2lnbm1lbnRzRnJvbU9iamVjdChvYmplY3QpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgICAgICBjb2x1bW5zID0ga2V5cy5tYXAoKGtleSkgPT4gdGhpcy5jb2x1bW5Gcm9tS2V5KGtleSkpLFxuICAgICAgICAgIHBhcmFtZXRlcnMgPSBPYmplY3QudmFsdWVzKG9iamVjdCksIC8vL1xuICAgICAgICAgIGZpcnN0SW5kZXggPSAwLFxuICAgICAgICAgIGFzc2lnbm1lbnRzID0gY29sdW1ucy5yZWR1Y2UoKGFzc2lnbm1lbnRzLCBjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgYXNzaWdubWVudHMgPSAoaW5kZXggPT09IGZpcnN0SW5kZXgpID9cbiAgICAgICAgICAgICAgICBgJHtjb2x1bW59PSR7cGxhY2Vob2xkZXJ9YCA6XG4gICAgICAgICAgICAgICAgYCAke2Fzc2lnbm1lbnRzfSwgJHtjb2x1bW59PSR7cGxhY2Vob2xkZXJ9YDtcblxuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbm1lbnRzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBhc3NpZ25tZW50cztcbiAgfVxuXG4gIGNvbHVtbnNBbmRWYWx1ZXNGcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgICAgIGNvbHVtbnMgPSBrZXlzLm1hcCgoa2V5KSA9PiB0aGlzLmNvbHVtbkZyb21LZXkoa2V5KSksXG4gICAgICAgICAgcGFyYW1ldGVycyA9IE9iamVjdC52YWx1ZXMob2JqZWN0KSwgLy8vXG4gICAgICAgICAgZmlyc3RJbmRleCA9IDAsXG4gICAgICAgICAgdmFsdWVzID0gY29sdW1ucy5yZWR1Y2UoKHZhbHVlcywgY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgIHZhbHVlcyA9IChpbmRleCA9PT0gZmlyc3RJbmRleCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgYCR7cGxhY2Vob2xkZXJ9YCA6XG4gICAgICAgICAgICAgICAgICAgICAgICBgICR7dmFsdWVzfSwgJHtwbGFjZWhvbGRlcn1gO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyksXG4gICAgICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IGAoJHtjb2x1bW5zfSkgVkFMVUVTICgke3ZhbHVlc30pYDtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IFtcbiAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcbiAgICAgIC4uLnBhcmFtZXRlcnNcbiAgICBdO1xuXG4gICAgcmV0dXJuIGNvbHVtbnNBbmRWYWx1ZXM7XG4gIH1cblxuICBjbGF1c2VGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMoc3RyaW5ncywgcGFyYW1ldGVycykge1xuICAgIGNvbnN0IHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aCxcbiAgICAgICAgICBsYXN0SW5kZXggPSBzdHJpbmdzTGVuZ3RoIC0gMSxcbiAgICAgICAgICBjbGF1c2UgPSBzdHJpbmdzLnJlZHVjZSgoY2xhdXNlLCBzdHJpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgICAgY2xhdXNlID0gYCR7Y2xhdXNlfSR7c3RyaW5nfSR7cGxhY2Vob2xkZXJ9YFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2xhdXNlID0gYCR7Y2xhdXNlfSR7c3RyaW5nfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjbGF1c2U7XG4gICAgICAgICAgfSwgRU1QVFlfU1RSSU5HKTtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IFtcbiAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcbiAgICAgIC4uLnBhcmFtZXRlcnNcbiAgICBdO1xuXG4gICAgcmV0dXJuIGNsYXVzZTtcbiAgfVxuXG4gIGFzc2lnbm1lbnRzRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBzdHJpbmdzTGVuZ3RoID0gc3RyaW5ncy5sZW5ndGgsXG4gICAgICAgICAgbGFzdEluZGV4ID0gc3RyaW5nc0xlbmd0aCAtIDEsXG4gICAgICAgICAgYXNzaWdubWVudHMgPSBzdHJpbmdzLnJlZHVjZSgoYXNzaWdubWVudHMsIHN0cmluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgICBhc3NpZ25tZW50cyA9IGAke2Fzc2lnbm1lbnRzfSR7c3RyaW5nfSR7cGxhY2Vob2xkZXJ9YFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXNzaWdubWVudHMgPSBgJHthc3NpZ25tZW50c30ke3N0cmluZ31gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYXNzaWdubWVudHM7XG4gICAgICAgICAgfSwgRU1QVFlfU1RSSU5HKTtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IFtcbiAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcbiAgICAgIC4uLnBhcmFtZXRlcnNcbiAgICBdO1xuXG4gICAgcmV0dXJuIGFzc2lnbm1lbnRzO1xuICB9XG5cbiAgY29sdW1uc0FuZFZhbHVlc0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3Qgc3RyaW5nc0xlbmd0aCA9IHN0cmluZ3MubGVuZ3RoLFxuICAgICAgICAgIGxhc3RJbmRleCA9IHN0cmluZ3NMZW5ndGggLSAxLFxuICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBzdHJpbmdzLnJlZHVjZSgoY29sdW1uc0FuZFZhbHVlcywgc3RyaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBgJHtjb2x1bW5zQW5kVmFsdWVzfSR7c3RyaW5nfSR7cGxhY2Vob2xkZXJ9YFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IGAke2NvbHVtbnNBbmRWYWx1ZXN9JHtzdHJpbmd9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnNBbmRWYWx1ZXM7XG4gICAgICAgICAgfSwgRU1QVFlfU1RSSU5HKTtcblxuICAgIHRoaXMucGFyYW1ldGVycyA9IFtcbiAgICAgIC4uLnRoaXMucGFyYW1ldGVycyxcbiAgICAgIC4uLnBhcmFtZXRlcnNcbiAgICBdO1xuXG4gICAgcmV0dXJuIGNvbHVtbnNBbmRWYWx1ZXM7XG4gIH1cblxuICBleGVjdXRlKCkge1xuICAgIHRoaXMucXVlcnkgP1xuICAgICAgcXVlcnkodGhpcy5jb25uZWN0aW9uLCB0aGlzLnNxbCwgLi4udGhpcy5wYXJhbWV0ZXJzLCB0aGlzLnF1ZXJ5SGFuZGxlcikgOlxuICAgICAgICBjb21tYW5kKHRoaXMuY29ubmVjdGlvbiwgdGhpcy5zcWwsIC4uLnRoaXMucGFyYW1ldGVycywgdGhpcy5jb21tYW5kSGFuZGxlcik7XG4gIH1cblxuICBxdWVyeUhhbmRsZXIgPSAoZXJyb3IsIHJvd3MpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGVycm9yKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJvd3NMZW5ndGggPSByb3dzLmxlbmd0aDtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vbmVIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBpZiAocm93c0xlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm5vbmVIYW5kbGVyKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5maXJzdEhhbmRsZXIgIT09IG51bGwpIHtcbiAgICAgIGlmIChyb3dzTGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IGZpcnN0KHJvd3MpLFxuICAgICAgICAgICAgICByb3cgPSBmaXJzdFJvdywgLy8vXG4gICAgICAgICAgICAgIG9iamVjdCA9IHRoaXMub2JqZWN0RnJvbVJvdyhyb3cpO1xuXG4gICAgICAgIHRoaXMuZmlyc3RIYW5kbGVyKG9iamVjdCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vbmVIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBpZiAocm93c0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IGZpcnN0KHJvd3MpLFxuICAgICAgICAgICAgICByb3cgPSBmaXJzdFJvdywgLy8vXG4gICAgICAgICAgICAgIG9iamVjdCA9IHRoaXMub2JqZWN0RnJvbVJvdyhyb3cpO1xuXG4gICAgICAgIHRoaXMub25lSGFuZGxlcihvYmplY3QpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMubWFueUhhbmRsZXIgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iamVjdHMgPSByb3dzLm1hcCgocm93KSA9PiB0aGlzLm9iamVjdEZyb21Sb3cocm93KSk7XG5cbiAgICAgIHRoaXMubWFueUhhbmRsZXIob2JqZWN0cyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVsc2VIYW5kbGVyKHJvd3MpO1xuICB9XG5cbiAgY29tbWFuZEhhbmRsZXIgPSAoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGVycm9yKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ29ubmVjdGlvbihDbGFzcywgY29ubmVjdGlvbikge1xuICAgIGNvbnN0IHNxbCA9IG51bGwsXG4gICAgICAgICAgcXVlcnkgPSBmYWxzZSxcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gW10sXG4gICAgICAgICAgb25lSGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgbm9uZUhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIG1hbnlIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBlbHNlSGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgZmlyc3RIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBlcnJvckhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIHN1Y2Nlc3NIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBzdGF0ZW1lbnQgPSBuZXcgQ2xhc3MoY29ubmVjdGlvbiwgc3FsLCBxdWVyeSwgcGFyYW1ldGVycywgb25lSGFuZGxlciwgbm9uZUhhbmRsZXIsIG1hbnlIYW5kbGVyLCBlbHNlSGFuZGxlciwgZmlyc3RIYW5kbGVyLCBlcnJvckhhbmRsZXIsIHN1Y2Nlc3NIYW5kbGVyKTtcblxuICAgIHJldHVybiBzdGF0ZW1lbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJTdGF0ZW1lbnQiLCJmaXJzdCIsImFycmF5VXRpbGl0aWVzIiwicXVlcnkiLCJkYXRhYmFzZSIsImV4ZWN1dGUiLCJjb21tYW5kIiwiY29ubmVjdGlvbiIsInNxbCIsInBhcmFtZXRlcnMiLCJvbmVIYW5kbGVyIiwibm9uZUhhbmRsZXIiLCJtYW55SGFuZGxlciIsImVsc2VIYW5kbGVyIiwiZmlyc3RIYW5kbGVyIiwiZXJyb3JIYW5kbGVyIiwic3VjY2Vzc0hhbmRsZXIiLCJxdWVyeUhhbmRsZXIiLCJlcnJvciIsInJvd3MiLCJyb3dzTGVuZ3RoIiwibGVuZ3RoIiwiZmlyc3RSb3ciLCJyb3ciLCJvYmplY3QiLCJvYmplY3RGcm9tUm93Iiwib2JqZWN0cyIsIm1hcCIsImNvbW1hbmRIYW5kbGVyIiwiZ2V0Q29ubmVjdGlvbiIsImdldFNRTCIsImlzUXVlcnkiLCJnZXRQYXJhbWV0ZXJzIiwiZ2V0T25lSGFuZGxlciIsImdldE5vbmVIYW5kbGVyIiwiZ2V0TWFueUhhbmRsZXIiLCJnZXRFbHNlSGFuZGxlciIsImdldEZpcnN0SGFuZGxlciIsImdldEVycm9ySGFuZGxlciIsImdldFN1Y2Nlc3NIYW5kbGVyIiwic2V0U1FMIiwic2V0UXVlcnkiLCJzZXRQYXJhbWV0ZXJzIiwib25lIiwibm9uZSIsIm1hbnkiLCJlbHNlIiwiY2F0Y2giLCJzdWNjZXNzIiwic2V0Iiwib2JqZWN0T3JBcnJheSIsImFzc2lnbm1lbnRzIiwib2JqZWN0T3JBcnJheUlzQXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJhcnJheSIsInN0cmluZ3MiLCJhc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyIsImFzc2lnbm1lbnRzRnJvbU9iamVjdCIsIndoZXJlIiwiY2xhdXNlIiwiY2xhdXNlRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzIiwiY2xhdXNlRnJvbU9iamVjdCIsInZhbHVlcyIsImNvbHVtbnNBbmRWYWx1ZXMiLCJjb2x1bW5zQW5kVmFsdWVzRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzIiwiY29sdW1uc0FuZFZhbHVlc0Zyb21PYmplY3QiLCJPYmplY3QiLCJjb2x1bW5zIiwia2V5cyIsInJlZHVjZSIsImNvbHVtbiIsImluZGV4Iiwia2V5Iiwia2V5RnJvbUNvbHVtbiIsInZhbHVlIiwiY29sdW1uRnJvbUtleSIsImZpcnN0SW5kZXgiLCJwbGFjZWhvbGRlciIsIkVNUFRZX1NUUklORyIsInN0cmluZ3NMZW5ndGgiLCJsYXN0SW5kZXgiLCJzdHJpbmciLCJmcm9tQ29ubmVjdGlvbiIsIkNsYXNzIiwic3RhdGVtZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVdxQkE7Ozt5QkFUVTsrREFFVjt5QkFFUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTdCLElBQU0sQUFBRUMsUUFBVUMseUJBQWMsQ0FBeEJELE9BQ0FFLFFBQTRCQyxpQkFBUSxDQUFwQ0QsT0FBT0UsQUFBU0MsVUFBWUYsaUJBQVEsQ0FBN0JDO0FBRUEsSUFBQSxBQUFNTCwwQkFBTjthQUFNQSxVQUNQTyxVQUFVLEVBQUVDLEdBQUcsRUFBRUwsS0FBSyxFQUFFTSxVQUFVLEVBQUVDLFVBQVUsRUFB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
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
            value: function set(value) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var assignments;
                var valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
                if (false) {
                ///
                } else if (valueArray) {
                    var array = value, strings = array; ///
                    assignments = this.assignmentsFromStringsAndParameters(strings, parameters);
                } else if (valueObject) {
                    var object = value; ///
                    assignments = this.assignmentsFromObject(object); ///
                } else if (valueString) {
                    var string = value; ///
                    assignments = string; ///
                }
                this.sql = " ".concat(this.sql, " SET ").concat(assignments);
                return this;
            }
        },
        {
            key: "where",
            value: function where(value) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var clause;
                var valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
                if (false) {
                ///
                } else if (valueArray) {
                    var array = value, strings = array; ///
                    clause = this.clauseFromStringsAndParameters(strings, parameters);
                } else if (valueObject) {
                    var object = value; ///
                    clause = this.clauseFromObject(object); ///
                } else if (valueString) {
                    var string = value; ///
                    clause = string; ///
                }
                this.sql = " ".concat(this.sql, " WHERE ").concat(clause);
                return this;
            }
        },
        {
            key: "values",
            value: function values(value) {
                for(var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    parameters[_key - 1] = arguments[_key];
                }
                var columnsAndValues;
                var valueArray = isArray(value), valueObject = isObject(value), valueString = isString(value);
                if (false) {
                ///
                } else if (valueArray) {
                    var array = value, strings = array; ///
                    columnsAndValues = this.columnsAndValuesFromStringsAndParameters(strings, parameters);
                } else if (valueObject) {
                    var object = value; ///
                    columnsAndValues = this.columnsAndValuesFromObject(object);
                } else if (valueString) {
                    var string = value; ///
                    columnsAndValues = string; ///
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
function isArray(value) {
    var valueArray = Array.isArray(value);
    return valueArray;
}
function isString(value) {
    var valueString = (typeof value === "undefined" ? "undefined" : _type_of(value)) === _constants.STRING;
    return valueString;
}
function isObject(value) {
    var valueArray = isArray(value), valueString = isString(value), valueSObject = !valueArray && !valueString;
    return valueSObject;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0ZW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vZGF0YWJhc2VcIjtcblxuaW1wb3J0IHsgU1RSSU5HLCBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHF1ZXJ5LCBleGVjdXRlOiBjb21tYW5kIH0gPSBkYXRhYmFzZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGVtZW50IHtcbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbiwgc3FsLCBxdWVyeSwgcGFyYW1ldGVycywgb25lSGFuZGxlciwgbm9uZUhhbmRsZXIsIG1hbnlIYW5kbGVyLCBlbHNlSGFuZGxlciwgZmlyc3RIYW5kbGVyLCBlcnJvckhhbmRsZXIsIHN1Y2Nlc3NIYW5kbGVyKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICB0aGlzLnNxbCA9IHNxbDtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICB0aGlzLm9uZUhhbmRsZXIgPSBvbmVIYW5kbGVyO1xuICAgIHRoaXMubm9uZUhhbmRsZXIgPSBub25lSGFuZGxlcjtcbiAgICB0aGlzLm1hbnlIYW5kbGVyID0gbWFueUhhbmRsZXI7XG4gICAgdGhpcy5lbHNlSGFuZGxlciA9IGVsc2VIYW5kbGVyO1xuICAgIHRoaXMuZmlyc3RIYW5kbGVyID0gZmlyc3RIYW5kbGVyO1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuICAgIHRoaXMuc3VjY2Vzc0hhbmRsZXIgPSBzdWNjZXNzSGFuZGxlcjtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbjtcbiAgfVxuXG4gIGdldFNRTCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcWw7XG4gIH1cblxuICBpc1F1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICB9XG5cbiAgZ2V0UGFyYW1ldGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJzO1xuICB9XG5cbiAgZ2V0T25lSGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5vbmVIYW5kbGVyO1xuICB9XG5cbiAgZ2V0Tm9uZUhhbmRsZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9uZUhhbmRsZXI7XG4gIH1cblxuICBnZXRNYW55SGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5tYW55SGFuZGxlcjtcbiAgfVxuXG4gIGdldEVsc2VIYW5kbGVyKCkge1xuICAgIHJldHVybiB0aGlzLmVsc2VIYW5kbGVyO1xuICB9XG5cbiAgZ2V0Rmlyc3RIYW5kbGVyKCkge1xuICAgIHJldHVybiB0aGlzLmZpcnN0SGFuZGxlcjtcbiAgfVxuXG4gIGdldEVycm9ySGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXI7XG4gIH1cblxuICBnZXRTdWNjZXNzSGFuZGxlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzSGFuZGxlcjtcbiAgfVxuXG4gIHNldFNRTChzcWwpIHtcbiAgICB0aGlzLnNxbCA9IHNxbDtcbiAgfVxuXG4gIHNldFF1ZXJ5KHF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICB9XG5cbiAgc2V0UGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgfVxuXG4gIG9uZShvbmVIYW5kbGVyKSB7XG4gICAgdGhpcy5vbmVIYW5kbGVyID0gb25lSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbm9uZShub25lSGFuZGxlcikge1xuICAgIHRoaXMubm9uZUhhbmRsZXIgPSBub25lSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbWFueShtYW55SGFuZGxlcikge1xuICAgIHRoaXMubWFueUhhbmRsZXIgPSBtYW55SGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZWxzZShlbHNlSGFuZGxlcikge1xuICAgIHRoaXMuZWxzZUhhbmRsZXIgPSBlbHNlSGFuZGxlcjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlyc3QoZmlyc3RIYW5kbGVyKSB7XG4gICAgdGhpcy5maXJzdEhhbmRsZXIgPSBmaXJzdEhhbmRsZXI7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNhdGNoKGVycm9ySGFuZGxlcikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdWNjZXNzKHN1Y2Nlc3NIYW5kbGVyKSB7XG4gICAgdGhpcy5zdWNjZXNzSGFuZGxlciA9IHN1Y2Nlc3NIYW5kbGVyO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXQodmFsdWUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgYXNzaWdubWVudHM7XG5cbiAgICBjb25zdCB2YWx1ZUFycmF5ID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBpc1N0cmluZyh2YWx1ZSk7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVBcnJheSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB2YWx1ZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5ncyA9IGFycmF5OyAgLy8vXG5cbiAgICAgIGFzc2lnbm1lbnRzID0gdGhpcy5hc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlT2JqZWN0KSB7XG4gICAgICBjb25zdCBvYmplY3QgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICBhc3NpZ25tZW50cyA9IHRoaXMuYXNzaWdubWVudHNGcm9tT2JqZWN0KG9iamVjdCk7IC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IHZhbHVlOyAvLy9cblxuICAgICAgYXNzaWdubWVudHMgPSBzdHJpbmc7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBTRVQgJHthc3NpZ25tZW50c31gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aGVyZSh2YWx1ZSwgLi4ucGFyYW1ldGVycykge1xuICAgIGxldCBjbGF1c2U7XG5cbiAgICBjb25zdCB2YWx1ZUFycmF5ID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSksXG4gICAgICAgICAgdmFsdWVTdHJpbmcgPSBpc1N0cmluZyh2YWx1ZSk7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodmFsdWVBcnJheSkge1xuICAgICAgY29uc3QgYXJyYXkgPSB2YWx1ZSwgIC8vL1xuICAgICAgICAgICAgc3RyaW5ncyA9IGFycmF5OyAgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHRoaXMuY2xhdXNlRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVPYmplY3QpIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHRoaXMuY2xhdXNlRnJvbU9iamVjdChvYmplY3QpOyAvLy9cbiAgICB9IGVsc2UgaWYgKHZhbHVlU3RyaW5nKSB7XG4gICAgICBjb25zdCBzdHJpbmcgPSB2YWx1ZTsgLy8vXG5cbiAgICAgIGNsYXVzZSA9IHN0cmluZzsgIC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCAke3RoaXMuc3FsfSBXSEVSRSAke2NsYXVzZX1gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YWx1ZXModmFsdWUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgY29sdW1uc0FuZFZhbHVlcztcblxuICAgIGNvbnN0IHZhbHVlQXJyYXkgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgICAgICB2YWx1ZU9iamVjdCA9IGlzT2JqZWN0KHZhbHVlKSxcbiAgICAgICAgICB2YWx1ZVN0cmluZyA9IGlzU3RyaW5nKHZhbHVlKTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh2YWx1ZUFycmF5KSB7XG4gICAgICBjb25zdCBhcnJheSA9IHZhbHVlLCAgLy8vXG4gICAgICAgICAgICBzdHJpbmdzID0gYXJyYXk7ICAvLy9cblxuICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IHRoaXMuY29sdW1uc0FuZFZhbHVlc0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlT2JqZWN0KSB7XG4gICAgICBjb25zdCBvYmplY3QgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICBjb2x1bW5zQW5kVmFsdWVzID0gdGhpcy5jb2x1bW5zQW5kVmFsdWVzRnJvbU9iamVjdChvYmplY3QpO1xuICAgIH0gZWxzZSBpZiAodmFsdWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IHZhbHVlOyAvLy9cblxuICAgICAgY29sdW1uc0FuZFZhbHVlcyA9IHN0cmluZzsgIC8vL1xuICAgIH1cblxuICAgIHRoaXMuc3FsID0gYCR7dGhpcy5zcWx9ICR7Y29sdW1uc0FuZFZhbHVlc31gO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvYmplY3RGcm9tUm93KHJvdykge1xuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocm93KSxcbiAgICAgICAgICBjb2x1bW5zID0gT2JqZWN0LmtleXMocm93KSwgLy8vXG4gICAgICAgICAgb2JqZWN0ID0gY29sdW1ucy5yZWR1Y2UoKG9iamVjdCwgY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5rZXlGcm9tQ29sdW1uKGNvbHVtbiksXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbmRleF07XG5cbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgfSwge30pO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGNsYXVzZUZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICAgICAgY29sdW1ucyA9IGtleXMubWFwKChrZXkpID0+IHRoaXMuY29sdW1uRnJvbUtleShrZXkpKSxcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gT2JqZWN0LnZhbHVlcyhvYmplY3QpLCAvLy9cbiAgICAgICAgICBmaXJzdEluZGV4ID0gMCxcbiAgICAgICAgICBjbGF1c2UgPSBjb2x1bW5zLnJlZHVjZSgoY2xhdXNlLCBjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgY2xhdXNlID0gKGluZGV4ID09PSBmaXJzdEluZGV4KSA/XG4gICAgICAgICAgICAgICAgYCR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgIGAgJHtjbGF1c2V9IEFORCAke2NvbHVtbn09JHtwbGFjZWhvbGRlcn1gO1xuXG4gICAgICAgICAgICByZXR1cm4gY2xhdXNlO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjbGF1c2U7XG4gIH1cblxuICBhc3NpZ25tZW50c0Zyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICAgICAgY29sdW1ucyA9IGtleXMubWFwKChrZXkpID0+IHRoaXMuY29sdW1uRnJvbUtleShrZXkpKSxcbiAgICAgICAgICBwYXJhbWV0ZXJzID0gT2JqZWN0LnZhbHVlcyhvYmplY3QpLCAvLy9cbiAgICAgICAgICBmaXJzdEluZGV4ID0gMCxcbiAgICAgICAgICBhc3NpZ25tZW50cyA9IGNvbHVtbnMucmVkdWNlKChhc3NpZ25tZW50cywgY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgIGFzc2lnbm1lbnRzID0gKGluZGV4ID09PSBmaXJzdEluZGV4KSA/XG4gICAgICAgICAgICAgICAgYCR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgIGAgJHthc3NpZ25tZW50c30sICR7Y29sdW1ufT0ke3BsYWNlaG9sZGVyfWA7XG5cbiAgICAgICAgICAgIHJldHVybiBhc3NpZ25tZW50cztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpO1xuXG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gW1xuICAgICAgLi4udGhpcy5wYXJhbWV0ZXJzLFxuICAgICAgLi4ucGFyYW1ldGVyc1xuICAgIF07XG5cbiAgICByZXR1cm4gYXNzaWdubWVudHM7XG4gIH1cblxuICBjb2x1bW5zQW5kVmFsdWVzRnJvbU9iamVjdChvYmplY3QpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgICAgICBjb2x1bW5zID0ga2V5cy5tYXAoKGtleSkgPT4gdGhpcy5jb2x1bW5Gcm9tS2V5KGtleSkpLFxuICAgICAgICAgIHBhcmFtZXRlcnMgPSBPYmplY3QudmFsdWVzKG9iamVjdCksIC8vL1xuICAgICAgICAgIGZpcnN0SW5kZXggPSAwLFxuICAgICAgICAgIHZhbHVlcyA9IGNvbHVtbnMucmVkdWNlKCh2YWx1ZXMsIGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICB2YWx1ZXMgPSAoaW5kZXggPT09IGZpcnN0SW5kZXgpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3BsYWNlaG9sZGVyfWAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgYCAke3ZhbHVlc30sICR7cGxhY2Vob2xkZXJ9YDtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICB9LCBFTVBUWV9TVFJJTkcpLFxuICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBgKCR7Y29sdW1uc30pIFZBTFVFUyAoJHt2YWx1ZXN9KWA7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICB9XG5cbiAgY2xhdXNlRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzKHN0cmluZ3MsIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBzdHJpbmdzTGVuZ3RoID0gc3RyaW5ncy5sZW5ndGgsXG4gICAgICAgICAgbGFzdEluZGV4ID0gc3RyaW5nc0xlbmd0aCAtIDEsXG4gICAgICAgICAgY2xhdXNlID0gc3RyaW5ncy5yZWR1Y2UoKGNsYXVzZSwgc3RyaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcigpO1xuXG4gICAgICAgICAgICAgIGNsYXVzZSA9IGAke2NsYXVzZX0ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNsYXVzZSA9IGAke2NsYXVzZX0ke3N0cmluZ31gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2xhdXNlO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjbGF1c2U7XG4gIH1cblxuICBhc3NpZ25tZW50c0Zyb21TdHJpbmdzQW5kUGFyYW1ldGVycyhzdHJpbmdzLCBwYXJhbWV0ZXJzKSB7XG4gICAgY29uc3Qgc3RyaW5nc0xlbmd0aCA9IHN0cmluZ3MubGVuZ3RoLFxuICAgICAgICAgIGxhc3RJbmRleCA9IHN0cmluZ3NMZW5ndGggLSAxLFxuICAgICAgICAgIGFzc2lnbm1lbnRzID0gc3RyaW5ncy5yZWR1Y2UoKGFzc2lnbm1lbnRzLCBzdHJpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICAgICAgICAgICAgYXNzaWdubWVudHMgPSBgJHthc3NpZ25tZW50c30ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFzc2lnbm1lbnRzID0gYCR7YXNzaWdubWVudHN9JHtzdHJpbmd9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbm1lbnRzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBhc3NpZ25tZW50cztcbiAgfVxuXG4gIGNvbHVtbnNBbmRWYWx1ZXNGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMoc3RyaW5ncywgcGFyYW1ldGVycykge1xuICAgIGNvbnN0IHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aCxcbiAgICAgICAgICBsYXN0SW5kZXggPSBzdHJpbmdzTGVuZ3RoIC0gMSxcbiAgICAgICAgICBjb2x1bW5zQW5kVmFsdWVzID0gc3RyaW5ncy5yZWR1Y2UoKGNvbHVtbnNBbmRWYWx1ZXMsIHN0cmluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgICAgICAgICAgICBjb2x1bW5zQW5kVmFsdWVzID0gYCR7Y29sdW1uc0FuZFZhbHVlc30ke3N0cmluZ30ke3BsYWNlaG9sZGVyfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbnNBbmRWYWx1ZXMgPSBgJHtjb2x1bW5zQW5kVmFsdWVzfSR7c3RyaW5nfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICAgICAgICAgIH0sIEVNUFRZX1NUUklORyk7XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBbXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi5wYXJhbWV0ZXJzXG4gICAgXTtcblxuICAgIHJldHVybiBjb2x1bW5zQW5kVmFsdWVzO1xuICB9XG5cbiAgZXhlY3V0ZSgpIHtcbiAgICB0aGlzLnF1ZXJ5ID9cbiAgICAgIHF1ZXJ5KHRoaXMuY29ubmVjdGlvbiwgdGhpcy5zcWwsIC4uLnRoaXMucGFyYW1ldGVycywgdGhpcy5xdWVyeUhhbmRsZXIpIDpcbiAgICAgICAgY29tbWFuZCh0aGlzLmNvbm5lY3Rpb24sIHRoaXMuc3FsLCAuLi50aGlzLnBhcmFtZXRlcnMsIHRoaXMuY29tbWFuZEhhbmRsZXIpO1xuICB9XG5cbiAgcXVlcnlIYW5kbGVyID0gKGVycm9yLCByb3dzKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlcihlcnJvcik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByb3dzTGVuZ3RoID0gcm93cy5sZW5ndGg7XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub25lSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgaWYgKHJvd3NMZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5ub25lSGFuZGxlcigpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3RIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBpZiAocm93c0xlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBmaXJzdChyb3dzKSxcbiAgICAgICAgICAgICAgcm93ID0gZmlyc3RSb3csIC8vL1xuICAgICAgICAgICAgICBvYmplY3QgPSB0aGlzLm9iamVjdEZyb21Sb3cocm93KTtcblxuICAgICAgICB0aGlzLmZpcnN0SGFuZGxlcihvYmplY3QpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMub25lSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgaWYgKHJvd3NMZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBmaXJzdChyb3dzKSxcbiAgICAgICAgICAgICAgcm93ID0gZmlyc3RSb3csIC8vL1xuICAgICAgICAgICAgICBvYmplY3QgPSB0aGlzLm9iamVjdEZyb21Sb3cocm93KTtcblxuICAgICAgICB0aGlzLm9uZUhhbmRsZXIob2JqZWN0KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1hbnlIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBvYmplY3RzID0gcm93cy5tYXAoKHJvdykgPT4gdGhpcy5vYmplY3RGcm9tUm93KHJvdykpO1xuXG4gICAgICB0aGlzLm1hbnlIYW5kbGVyKG9iamVjdHMpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbHNlSGFuZGxlcihyb3dzKTtcbiAgfVxuXG4gIGNvbW1hbmRIYW5kbGVyID0gKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlcihlcnJvcik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN1Y2Nlc3NIYW5kbGVyKCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbm5lY3Rpb24oQ2xhc3MsIGNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBzcWwgPSBudWxsLFxuICAgICAgICAgIHF1ZXJ5ID0gZmFsc2UsXG4gICAgICAgICAgcGFyYW1ldGVycyA9IFtdLFxuICAgICAgICAgIG9uZUhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIG5vbmVIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBtYW55SGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgZWxzZUhhbmRsZXIgPSBudWxsLFxuICAgICAgICAgIGZpcnN0SGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgZXJyb3JIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICBzdWNjZXNzSGFuZGxlciA9IG51bGwsXG4gICAgICAgICAgc3RhdGVtZW50ID0gbmV3IENsYXNzKGNvbm5lY3Rpb24sIHNxbCwgcXVlcnksIHBhcmFtZXRlcnMsIG9uZUhhbmRsZXIsIG5vbmVIYW5kbGVyLCBtYW55SGFuZGxlciwgZWxzZUhhbmRsZXIsIGZpcnN0SGFuZGxlciwgZXJyb3JIYW5kbGVyLCBzdWNjZXNzSGFuZGxlcik7XG5cbiAgICByZXR1cm4gc3RhdGVtZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgY29uc3QgdmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuXG4gIHJldHVybiB2YWx1ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICBjb25zdCB2YWx1ZVN0cmluZyA9ICh0eXBlb2YgdmFsdWUgPT09IFNUUklORyk7XG5cbiAgcmV0dXJuIHZhbHVlU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICBjb25zdCB2YWx1ZUFycmF5ID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICAgIHZhbHVlU3RyaW5nID0gaXNTdHJpbmcodmFsdWUpLFxuICAgICAgICB2YWx1ZVNPYmplY3QgPSAoIXZhbHVlQXJyYXkgJiYgIXZhbHVlU3RyaW5nKTtcblxuICByZXR1cm4gdmFsdWVTT2JqZWN0XG59Il0sIm5hbWVzIjpbIlN0YXRlbWVudCIsImZpcnN0IiwiYXJyYXlVdGlsaXRpZXMiLCJxdWVyeSIsImRhdGFiYXNlIiwiZXhlY3V0ZSIsImNvbW1hbmQiLCJjb25uZWN0aW9uIiwic3FsIiwicGFyYW1ldGVycyIsIm9uZUhhbmRsZXIiLCJub25lSGFuZGxlciIsIm1hbnlIYW5kbGVyIiwiZWxzZUhhbmRsZXIiLCJmaXJzdEhhbmRsZXIiLCJlcnJvckhhbmRsZXIiLCJzdWNjZXNzSGFuZGxlciIsInF1ZXJ5SGFuZGxlciIsImVycm9yIiwicm93cyIsInJvd3NMZW5ndGgiLCJsZW5ndGgiLCJmaXJzdFJvdyIsInJvdyIsIm9iamVjdCIsIm9iamVjdEZyb21Sb3ciLCJvYmplY3RzIiwibWFwIiwiY29tbWFuZEhhbmRsZXIiLCJnZXRDb25uZWN0aW9uIiwiZ2V0U1FMIiwiaXNRdWVyeSIsImdldFBhcmFtZXRlcnMiLCJnZXRPbmVIYW5kbGVyIiwiZ2V0Tm9uZUhhbmRsZXIiLCJnZXRNYW55SGFuZGxlciIsImdldEVsc2VIYW5kbGVyIiwiZ2V0Rmlyc3RIYW5kbGVyIiwiZ2V0RXJyb3JIYW5kbGVyIiwiZ2V0U3VjY2Vzc0hhbmRsZXIiLCJzZXRTUUwiLCJzZXRRdWVyeSIsInNldFBhcmFtZXRlcnMiLCJvbmUiLCJub25lIiwibWFueSIsImVsc2UiLCJjYXRjaCIsInN1Y2Nlc3MiLCJzZXQiLCJ2YWx1ZSIsImFzc2lnbm1lbnRzIiwidmFsdWVBcnJheSIsImlzQXJyYXkiLCJ2YWx1ZU9iamVjdCIsImlzT2JqZWN0IiwidmFsdWVTdHJpbmciLCJpc1N0cmluZyIsImFycmF5Iiwic3RyaW5ncyIsImFzc2lnbm1lbnRzRnJvbVN0cmluZ3NBbmRQYXJhbWV0ZXJzIiwiYXNzaWdubWVudHNGcm9tT2JqZWN0Iiwic3RyaW5nIiwid2hlcmUiLCJjbGF1c2UiLCJjbGF1c2VGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMiLCJjbGF1c2VGcm9tT2JqZWN0IiwidmFsdWVzIiwiY29sdW1uc0FuZFZhbHVlcyIsImNvbHVtbnNBbmRWYWx1ZXNGcm9tU3RyaW5nc0FuZFBhcmFtZXRlcnMiLCJjb2x1bW5zQW5kVmFsdWVzRnJvbU9iamVjdCIsIk9iamVjdCIsImNvbHVtbnMiLCJrZXlzIiwicmVkdWNlIiwiY29sdW1uIiwiaW5kZXgiLCJrZXkiLCJrZXlGcm9tQ29sdW1uIiwiY29sdW1uRnJvbUtleSIsImZpcnN0SW5kZXgiLCJwbGFjZWhvbGRlciIsIkVNUFRZX1NUUklORyIsInN0cmluZ3NMZW5ndGgiLCJsYXN0SW5kZXgiLCJmcm9tQ29ubmVjdGlvbiIsIkNsYXNzIiwic3RhdGVtZW50IiwiQXJyYXkiLCJTVFJJTkciLCJ2YWx1ZVNPYmplY3QiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBV3FCQTs7O3lCQVRVOytEQUVWO3lCQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVyQyxJQUFNLEFBQUVDLFFBQVVDLHlCQUFjLENBQXhCRCxPQUNBRSxRQUE0QkMsaUJBQVEsQ0FBcENELE9BQU9FLEFBQVNDLFVBQVlGLGlCQUFR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
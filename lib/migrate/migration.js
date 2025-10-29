"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Migration;
    }
});
var _necessary = require("necessary");
var _database = require("../database");
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
var second = _necessary.arrayUtilities.second, readFile = _necessary.fileSystemUtilities.readFile;
var Migration = /*#__PURE__*/ function() {
    function Migration(filePath) {
        _class_call_check(this, Migration);
        this.filePath = filePath;
    }
    _create_class(Migration, [
        {
            key: "getSQL",
            value: function getSQL() {
                var fileContent = readFile(this.filePath), sql = fileContent; ///
                return sql;
            }
        },
        {
            key: "getVersion",
            value: function getVersion() {
                var matches = this.filePath.match(/(\d+)-.+$/), secondMatch = second(matches), version = secondMatch; ///
                return version;
            }
        },
        {
            key: "apply",
            value: function apply(connection, callback) {
                var log = connection.getLog(), sql = this.getSQL(), version = this.getVersion();
                log.info("Applying migration version ".concat(version, "..."));
                (0, _database.execute)(connection, sql, function(error) {
                    error ? log.error("...failed!") : log.debug("...success!");
                    callback(error);
                });
            }
        }
    ], [
        {
            key: "fromFilePath",
            value: function fromFilePath(filePath) {
                var migration = new Migration(filePath);
                return migration;
            }
        }
    ]);
    return Migration;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRlL21pZ3JhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tIFwiLi4vZGF0YWJhc2VcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyByZWFkRmlsZSB9ID0gZmlsZVN5c3RlbVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlncmF0aW9uIHtcbiAgY29uc3RydWN0b3IoZmlsZVBhdGgpIHtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gIH1cblxuICBnZXRTUUwoKSB7XG4gICAgY29uc3QgZmlsZUNvbnRlbnQgPSByZWFkRmlsZSh0aGlzLmZpbGVQYXRoKSxcbiAgICAgICAgICBzcWwgPSBmaWxlQ29udGVudDsgIC8vL1xuXG4gICAgcmV0dXJuIHNxbDtcbiAgfVxuICBcbiAgZ2V0VmVyc2lvbigpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5maWxlUGF0aC5tYXRjaCgvKFxcZCspLS4rJC8pLFxuICAgICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICAgIHZlcnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cbiAgXG4gIGFwcGx5KGNvbm5lY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKSxcbiAgICAgICAgICBzcWwgPSB0aGlzLmdldFNRTCgpLFxuICAgICAgICAgIHZlcnNpb24gPSB0aGlzLmdldFZlcnNpb24oKTtcblxuICAgIGxvZy5pbmZvKGBBcHBseWluZyBtaWdyYXRpb24gdmVyc2lvbiAke3ZlcnNpb259Li4uYCk7XG5cbiAgICBleGVjdXRlKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yKSA9PiB7XG4gICAgICBlcnJvciA/XG4gICAgICAgIGxvZy5lcnJvcihcIi4uLmZhaWxlZCFcIikgOlxuICAgICAgICAgIGxvZy5kZWJ1ZyhcIi4uLnN1Y2Nlc3MhXCIpO1xuXG4gICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBtaWdyYXRpb24gPSBuZXcgTWlncmF0aW9uKGZpbGVQYXRoKTtcbiAgICBcbiAgICByZXR1cm4gbWlncmF0aW9uO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWlncmF0aW9uIiwic2Vjb25kIiwiYXJyYXlVdGlsaXRpZXMiLCJyZWFkRmlsZSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJmaWxlUGF0aCIsImdldFNRTCIsImZpbGVDb250ZW50Iiwic3FsIiwiZ2V0VmVyc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwidmVyc2lvbiIsImFwcGx5IiwiY29ubmVjdGlvbiIsImNhbGxiYWNrIiwibG9nIiwiZ2V0TG9nIiwiaW5mbyIsImV4ZWN1dGUiLCJlcnJvciIsImRlYnVnIiwiZnJvbUZpbGVQYXRoIiwibWlncmF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVNxQkE7Ozt5QkFQK0I7d0JBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV4QixJQUFNLEFBQUVDLFNBQVdDLHlCQUFjLENBQXpCRCxRQUNGLEFBQUVFLFdBQWFDLDhCQUFtQixDQUFoQ0Q7QUFFTyxJQUFBLEFBQU1ILDBCQUFOO2FBQU1BLFVBQ1BLLFFBQVE7Z0NBRERMO1FBRWpCLElBQUksQ0FBQ0ssUUFBUSxHQUFHQTs7a0JBRkNMOztZQUtuQk0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLGNBQWNKLFNBQVMsSUFBSSxDQUFDRSxRQUFRLEdBQ3BDRyxNQUFNRCxhQUFjLEdBQUc7Z0JBRTdCLE9BQU9DO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsVUFBVSxJQUFJLENBQUNMLFFBQVEsQ0FBQ00sS0FBSyxDQUFDLGNBQzlCQyxjQUFjWCxPQUFPUyxVQUNyQkcsVUFBVUQsYUFBYyxHQUFHO2dCQUVqQyxPQUFPQztZQUNUOzs7WUFFQUMsS0FBQUE7bUJBQUFBLFNBQUFBLE1BQU1DLFVBQVUsRUFBRUMsUUFBUTtnQkFDeEIsSUFBTUMsTUFBTUYsV0FBV0csTUFBTSxJQUN2QlYsTUFBTSxJQUFJLENBQUNGLE1BQU0sSUFDakJPLFVBQVUsSUFBSSxDQUFDSixVQUFVO2dCQUUvQlEsSUFBSUUsSUFBSSxDQUFDLEFBQUMsOEJBQXFDLE9BQVJOLFNBQVE7Z0JBRS9DTyxJQUFBQSxpQkFBTyxFQUFDTCxZQUFZUCxLQUFLLFNBQUNhO29CQUN4QkEsUUFDRUosSUFBSUksS0FBSyxDQUFDLGdCQUNSSixJQUFJSyxLQUFLLENBQUM7b0JBRWROLFNBQVNLO2dCQUNYO1lBQ0Y7Ozs7WUFFT0UsS0FBQUE7bUJBQVAsU0FBT0EsYUFBYWxCLFFBQVE7Z0JBQzFCLElBQU1tQixZQUFZLElBckNEeEIsVUFxQ2VLO2dCQUVoQyxPQUFPbUI7WUFDVDs7O1dBeENtQnhCIn0=
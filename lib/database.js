"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get execute () {
        return execute;
    },
    get query () {
        return query;
    }
});
function query(connection, sql) {
    for(var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        remainingArguments[_key - 2] = arguments[_key];
    }
    var parameters = remainingArguments, callback = parameters.pop(); ///
    try {
        connection.query(sql, parameters, function(error, rows) {
            return callback(error, rows);
        });
    } catch (error) {
        var log = connection.getLog();
        log.error(error);
        var rows = null; ///
        callback(error, rows);
    }
}
function execute(connection, sql) {
    for(var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        remainingArguments[_key - 2] = arguments[_key];
    }
    var parameters = remainingArguments, callback = parameters.pop(); ///
    try {
        connection.query(sql, parameters, function(error, rows) {
            return callback(error);
        });
    } catch (error) {
        var log = connection.getLog();
        log.error(error);
        callback(error);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KGNvbm5lY3Rpb24sIHNxbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gIGNvbnN0IHBhcmFtZXRlcnMgPSByZW1haW5pbmdBcmd1bWVudHMsXG4gICAgICAgIGNhbGxiYWNrID0gcGFyYW1ldGVycy5wb3AoKTsgIC8vL1xuXG4gIHRyeSB7XG4gICAgY29ubmVjdGlvbi5xdWVyeShzcWwsIHBhcmFtZXRlcnMsIChlcnJvciwgcm93cykgPT4gY2FsbGJhY2soZXJyb3IsIHJvd3MpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gICAgbG9nLmVycm9yKGVycm9yKTtcblxuICAgIGNvbnN0IHJvd3MgPSBudWxsOyAvLy9cblxuICAgIGNhbGxiYWNrKGVycm9yLCByb3dzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShjb25uZWN0aW9uLCBzcWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICBjb25zdCBwYXJhbWV0ZXJzID0gcmVtYWluaW5nQXJndW1lbnRzLFxuICAgICAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnMucG9wKCk7ICAvLy9cblxuICB0cnkge1xuICAgIGNvbm5lY3Rpb24ucXVlcnkoc3FsLCBwYXJhbWV0ZXJzLCAoZXJyb3IsIHJvd3MpID0+IGNhbGxiYWNrKGVycm9yKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICAgIGxvZy5lcnJvcihlcnJvcik7XG5cbiAgICBjYWxsYmFjayhlcnJvcik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJleGVjdXRlIiwicXVlcnkiLCJjb25uZWN0aW9uIiwic3FsIiwicmVtYWluaW5nQXJndW1lbnRzIiwicGFyYW1ldGVycyIsImNhbGxiYWNrIiwicG9wIiwiZXJyb3IiLCJyb3dzIiwibG9nIiwiZ2V0TG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFtQmdCQTtlQUFBQTs7UUFqQkFDO2VBQUFBOzs7QUFBVCxTQUFTQSxNQUFNQyxVQUFVLEVBQUVDLEdBQUc7SUFBRSxJQUFBLElBQUEsT0FBQSxVQUFBLFFBQUEsQUFBR0MscUJBQUgsVUFBQSxPQUFBLElBQUEsT0FBQSxRQUFBLE9BQUEsR0FBQSxPQUFBLE1BQUE7UUFBR0EsbUJBQUgsT0FBQSxLQUFBLFNBQUEsQ0FBQSxLQUFxQjs7SUFDMUQsSUFBTUMsYUFBYUQsb0JBQ2JFLFdBQVdELFdBQVdFLEdBQUcsSUFBSyxHQUFHO0lBRXZDLElBQUk7UUFDRkwsV0FBV0QsS0FBSyxDQUFDRSxLQUFLRSxZQUFZLFNBQUNHLE9BQU9DO21CQUFTSCxTQUFTRSxPQUFPQzs7SUFDckUsRUFBRSxPQUFPRCxPQUFPO1FBQ2QsSUFBTUUsTUFBTVIsV0FBV1MsTUFBTTtRQUU3QkQsSUFBSUYsS0FBSyxDQUFDQTtRQUVWLElBQU1DLE9BQU8sTUFBTSxHQUFHO1FBRXRCSCxTQUFTRSxPQUFPQztJQUNsQjtBQUNGO0FBRU8sU0FBU1QsUUFBUUUsVUFBVSxFQUFFQyxHQUFHO0lBQUUsSUFBQSxJQUFBLE9BQUEsVUFBQSxRQUFBLEFBQUdDLHFCQUFILFVBQUEsT0FBQSxJQUFBLE9BQUEsUUFBQSxPQUFBLEdBQUEsT0FBQSxNQUFBO1FBQUdBLG1CQUFILE9BQUEsS0FBQSxTQUFBLENBQUEsS0FBcUI7O0lBQzVELElBQU1DLGFBQWFELG9CQUNiRSxXQUFXRCxXQUFXRSxHQUFHLElBQUssR0FBRztJQUV2QyxJQUFJO1FBQ0ZMLFdBQVdELEtBQUssQ0FBQ0UsS0FBS0UsWUFBWSxTQUFDRyxPQUFPQzttQkFBU0gsU0FBU0U7O0lBQzlELEVBQUUsT0FBT0EsT0FBTztRQUNkLElBQU1FLE1BQU1SLFdBQVdTLE1BQU07UUFFN0JELElBQUlGLEtBQUssQ0FBQ0E7UUFFVkYsU0FBU0U7SUFDWDtBQUNGIn0=
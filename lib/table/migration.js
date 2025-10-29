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
    get createTable () {
        return createTable;
    },
    get insertVersion () {
        return insertVersion;
    },
    get selectMaximumVersion () {
        return selectMaximumVersion;
    },
    get showLikeTables () {
        return showLikeTables;
    }
});
var _database = require("../database");
function createTable(connection, sql, callback) {
    (0, _database.execute)(connection, sql, function(error) {
        if (error) {
            var log = connection.getLog();
            log.error("createTable() failed.");
        }
        callback(error);
    });
}
function insertVersion(connection, version, sql, callback) {
    (0, _database.execute)(connection, sql, version, function(error) {
        if (error) {
            var log = connection.getLog();
            log.error("insertVersion() failed.");
        }
        callback(error);
    });
}
function showLikeTables(connection, sql, callback) {
    (0, _database.query)(connection, sql, function(error, rows) {
        if (error) {
            var log = connection.getLog();
            log.error("showLikeTables() failed.");
        }
        callback(error, rows);
    });
}
function selectMaximumVersion(connection, sql, callback) {
    (0, _database.query)(connection, sql, function(error, rows) {
        if (error) {
            var log = connection.getLog();
            log.error("selectMaximumVersion() failed.");
        }
        callback(error, rows);
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YWJsZS9taWdyYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHF1ZXJ5LCBleGVjdXRlIH0gZnJvbSBcIi4uL2RhdGFiYXNlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJsZShjb25uZWN0aW9uLCBzcWwsIGNhbGxiYWNrKSB7XG4gIGV4ZWN1dGUoY29ubmVjdGlvbiwgc3FsLCAoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGxvZyA9IGNvbm5lY3Rpb24uZ2V0TG9nKCk7XG5cbiAgICAgIGxvZy5lcnJvcihcImNyZWF0ZVRhYmxlKCkgZmFpbGVkLlwiKTtcbiAgICB9XG4gICAgXG4gICAgY2FsbGJhY2soZXJyb3IpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFZlcnNpb24oY29ubmVjdGlvbiwgdmVyc2lvbiwgc3FsLCBjYWxsYmFjaykge1xuICBleGVjdXRlKGNvbm5lY3Rpb24sIHNxbCwgdmVyc2lvbiwgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gICAgICBsb2cuZXJyb3IoXCJpbnNlcnRWZXJzaW9uKCkgZmFpbGVkLlwiKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhlcnJvcik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xpa2VUYWJsZXMoY29ubmVjdGlvbiwgc3FsLCBjYWxsYmFjaykge1xuICBxdWVyeShjb25uZWN0aW9uLCBzcWwsIChlcnJvciwgcm93cykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICAgICAgbG9nLmVycm9yKFwic2hvd0xpa2VUYWJsZXMoKSBmYWlsZWQuXCIpO1xuICAgIH1cbiAgICBcbiAgICBjYWxsYmFjayhlcnJvciwgcm93cyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0TWF4aW11bVZlcnNpb24oY29ubmVjdGlvbiwgc3FsLCBjYWxsYmFjaykge1xuICBxdWVyeShjb25uZWN0aW9uLCBzcWwsIChlcnJvciwgcm93cykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICAgICAgbG9nLmVycm9yKFwic2VsZWN0TWF4aW11bVZlcnNpb24oKSBmYWlsZWQuXCIpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGVycm9yLCByb3dzKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlVGFibGUiLCJpbnNlcnRWZXJzaW9uIiwic2VsZWN0TWF4aW11bVZlcnNpb24iLCJzaG93TGlrZVRhYmxlcyIsImNvbm5lY3Rpb24iLCJzcWwiLCJjYWxsYmFjayIsImV4ZWN1dGUiLCJlcnJvciIsImxvZyIsImdldExvZyIsInZlcnNpb24iLCJxdWVyeSIsInJvd3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQUlnQkE7ZUFBQUE7O1FBWUFDO2VBQUFBOztRQXdCQUM7ZUFBQUE7O1FBWkFDO2VBQUFBOzs7d0JBMUJlO0FBRXhCLFNBQVNILFlBQVlJLFVBQVUsRUFBRUMsR0FBRyxFQUFFQyxRQUFRO0lBQ25EQyxJQUFBQSxpQkFBTyxFQUFDSCxZQUFZQyxLQUFLLFNBQUNHO1FBQ3hCLElBQUlBLE9BQU87WUFDVCxJQUFNQyxNQUFNTCxXQUFXTSxNQUFNO1lBRTdCRCxJQUFJRCxLQUFLLENBQUM7UUFDWjtRQUVBRixTQUFTRTtJQUNYO0FBQ0Y7QUFFTyxTQUFTUCxjQUFjRyxVQUFVLEVBQUVPLE9BQU8sRUFBRU4sR0FBRyxFQUFFQyxRQUFRO0lBQzlEQyxJQUFBQSxpQkFBTyxFQUFDSCxZQUFZQyxLQUFLTSxTQUFTLFNBQUNIO1FBQ2pDLElBQUlBLE9BQU87WUFDVCxJQUFNQyxNQUFNTCxXQUFXTSxNQUFNO1lBRTdCRCxJQUFJRCxLQUFLLENBQUM7UUFDWjtRQUVBRixTQUFTRTtJQUNYO0FBQ0Y7QUFFTyxTQUFTTCxlQUFlQyxVQUFVLEVBQUVDLEdBQUcsRUFBRUMsUUFBUTtJQUN0RE0sSUFBQUEsZUFBSyxFQUFDUixZQUFZQyxLQUFLLFNBQUNHLE9BQU9LO1FBQzdCLElBQUlMLE9BQU87WUFDVCxJQUFNQyxNQUFNTCxXQUFXTSxNQUFNO1lBRTdCRCxJQUFJRCxLQUFLLENBQUM7UUFDWjtRQUVBRixTQUFTRSxPQUFPSztJQUNsQjtBQUNGO0FBRU8sU0FBU1gscUJBQXFCRSxVQUFVLEVBQUVDLEdBQUcsRUFBRUMsUUFBUTtJQUM1RE0sSUFBQUEsZUFBSyxFQUFDUixZQUFZQyxLQUFLLFNBQUNHLE9BQU9LO1FBQzdCLElBQUlMLE9BQU87WUFDVCxJQUFNQyxNQUFNTCxXQUFXTSxNQUFNO1lBRTdCRCxJQUFJRCxLQUFLLENBQUM7UUFDWjtRQUVBRixTQUFTRSxPQUFPSztJQUNsQjtBQUNGIn0=
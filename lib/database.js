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
    get default () {
        return _default;
    },
    get execute () {
        return execute;
    },
    get query () {
        return query;
    }
});
function query(connection, sql, ...remainingArguments) {
    const parameters = remainingArguments, callback = parameters.pop(); ///
    try {
        connection.query(sql, parameters, (error, rows)=>callback(error, rows));
    } catch (error) {
        const log = connection.getLog();
        log.error(error);
        const rows = null; ///
        callback(error, rows);
    }
}
function execute(connection, sql, ...remainingArguments) {
    const parameters = remainingArguments, callback = parameters.pop(); ///
    try {
        connection.query(sql, parameters, (error, rows)=>callback(error));
    } catch (error) {
        const log = connection.getLog();
        log.error(error);
        callback(error);
    }
}
const _default = {
    query,
    execute
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KGNvbm5lY3Rpb24sIHNxbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gIGNvbnN0IHBhcmFtZXRlcnMgPSByZW1haW5pbmdBcmd1bWVudHMsXG4gICAgICAgIGNhbGxiYWNrID0gcGFyYW1ldGVycy5wb3AoKTsgIC8vL1xuXG4gIHRyeSB7XG4gICAgY29ubmVjdGlvbi5xdWVyeShzcWwsIHBhcmFtZXRlcnMsIChlcnJvciwgcm93cykgPT4gY2FsbGJhY2soZXJyb3IsIHJvd3MpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gICAgbG9nLmVycm9yKGVycm9yKTtcblxuICAgIGNvbnN0IHJvd3MgPSBudWxsOyAvLy9cblxuICAgIGNhbGxiYWNrKGVycm9yLCByb3dzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShjb25uZWN0aW9uLCBzcWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICBjb25zdCBwYXJhbWV0ZXJzID0gcmVtYWluaW5nQXJndW1lbnRzLFxuICAgICAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnMucG9wKCk7ICAvLy9cblxuICB0cnkge1xuICAgIGNvbm5lY3Rpb24ucXVlcnkoc3FsLCBwYXJhbWV0ZXJzLCAoZXJyb3IsIHJvd3MpID0+IGNhbGxiYWNrKGVycm9yKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICAgIGxvZy5lcnJvcihlcnJvcik7XG5cbiAgICBjYWxsYmFjayhlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBxdWVyeSxcbiAgZXhlY3V0ZVxufTtcbiJdLCJuYW1lcyI6WyJleGVjdXRlIiwicXVlcnkiLCJjb25uZWN0aW9uIiwic3FsIiwicmVtYWluaW5nQXJndW1lbnRzIiwicGFyYW1ldGVycyIsImNhbGxiYWNrIiwicG9wIiwiZXJyb3IiLCJyb3dzIiwibG9nIiwiZ2V0TG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFrQ0E7ZUFBQTs7UUFmZ0JBO2VBQUFBOztRQWpCQUM7ZUFBQUE7OztBQUFULFNBQVNBLE1BQU1DLFVBQVUsRUFBRUMsR0FBRyxFQUFFLEdBQUdDLGtCQUFrQjtJQUMxRCxNQUFNQyxhQUFhRCxvQkFDYkUsV0FBV0QsV0FBV0UsR0FBRyxJQUFLLEdBQUc7SUFFdkMsSUFBSTtRQUNGTCxXQUFXRCxLQUFLLENBQUNFLEtBQUtFLFlBQVksQ0FBQ0csT0FBT0MsT0FBU0gsU0FBU0UsT0FBT0M7SUFDckUsRUFBRSxPQUFPRCxPQUFPO1FBQ2QsTUFBTUUsTUFBTVIsV0FBV1MsTUFBTTtRQUU3QkQsSUFBSUYsS0FBSyxDQUFDQTtRQUVWLE1BQU1DLE9BQU8sTUFBTSxHQUFHO1FBRXRCSCxTQUFTRSxPQUFPQztJQUNsQjtBQUNGO0FBRU8sU0FBU1QsUUFBUUUsVUFBVSxFQUFFQyxHQUFHLEVBQUUsR0FBR0Msa0JBQWtCO0lBQzVELE1BQU1DLGFBQWFELG9CQUNiRSxXQUFXRCxXQUFXRSxHQUFHLElBQUssR0FBRztJQUV2QyxJQUFJO1FBQ0ZMLFdBQVdELEtBQUssQ0FBQ0UsS0FBS0UsWUFBWSxDQUFDRyxPQUFPQyxPQUFTSCxTQUFTRTtJQUM5RCxFQUFFLE9BQU9BLE9BQU87UUFDZCxNQUFNRSxNQUFNUixXQUFXUyxNQUFNO1FBRTdCRCxJQUFJRixLQUFLLENBQUNBO1FBRVZGLFNBQVNFO0lBQ1g7QUFDRjtNQUVBLFdBQWU7SUFDYlA7SUFDQUQ7QUFDRiJ9
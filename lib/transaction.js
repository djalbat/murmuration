"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return transaction;
    }
});
var _defaultLog = /*#__PURE__*/ _interop_require_default(require("./defaultLog"));
var _necessary = require("necessary");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var whilst = _necessary.asynchronousUtilities.whilst, sequence = _necessary.asynchronousUtilities.sequence;
function transaction(configuration, operations, callback, context) {
    var Connection = configuration.Connection, completed = false;
    Connection.fromConfiguration(configuration, function(error, connection) {
        if (error) {
            var _configuration_log = configuration.log, log = _configuration_log === void 0 ? _defaultLog.default : _configuration_log;
            log.error("The transaction wasn't completed because there was no connection.");
            callback(completed);
            return;
        }
        Object.assign(context, {
            connection: connection,
            operations: operations,
            completed: completed
        });
        operations = [
            beginTransactionOperation,
            executeOperationsOperation,
            commitTransactionOperation,
            rollbackTransactionOperation
        ];
        sequence(operations, function() {
            var completed = context.completed;
            delete context.connection;
            delete context.operations;
            delete context.completed;
            connection.release();
            callback(completed);
        }, context);
    });
}
function beginTransactionOperation(next, done, context) {
    var connection = context.connection, log = connection.getLog();
    log.debug("Beginning transaction...");
    connection.begin(function(error) {
        if (error) {
            var code = error.code;
            log.error("An error with '".concat(code, "' has occurred."));
            done();
            return;
        }
        next();
    });
}
function commitTransactionOperation(next, done, context) {
    var completed = context.completed;
    if (!completed) {
        next();
        return;
    }
    var connection = context.connection, log = connection.getLog();
    log.debug("Committing transaction...");
    connection.commit(function(error) {
        if (error) {
            var code = error.code;
            log.error("An error with '${code}' has occurred.");
            done();
            return;
        }
        next();
    });
}
function rollbackTransactionOperation(next, done, context) {
    var completed = context.completed;
    if (completed) {
        next();
        return;
    }
    var connection = context.connection, log = connection.getLog();
    log.debug("Rolling back transaction...");
    connection.rollback(function(error) {
        if (error) {
            var code = error.code;
            log.error("...failed with error code ".concat(code, "."));
            done();
            return;
        }
        next();
    });
}
function executeOperationsOperation(next, done, context) {
    whilst(executeOperation, next, context);
}
function executeOperation(next, done, context, index) {
    var operations = context.operations, operationsLength = operations.length, lastOperationIndex = operationsLength - 1;
    if (index > lastOperationIndex) {
        complete();
        return;
    }
    var connection = context.connection, log = connection.getLog();
    log.debug("Executing operation...");
    var operation = operations[index], abort = done, proceed = next; ///
    operation(connection, abort, proceed, complete, context);
    function complete() {
        var completed = true;
        Object.assign(context, {
            completed: completed
        });
        done();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2FjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRlZmF1bHRMb2cgZnJvbSBcIi4vZGVmYXVsdExvZ1wiO1xuXG5pbXBvcnQgeyBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgd2hpbHN0LCBzZXF1ZW5jZSB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzO1xuICAgICAgXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBvcGVyYXRpb25zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBjb25zdCB7IENvbm5lY3Rpb24gfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gIENvbm5lY3Rpb24uZnJvbUNvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbiwgKGVycm9yLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zdCB7IGxvZyA9IGRlZmF1bHRMb2cgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgICAgIGxvZy5lcnJvcihcIlRoZSB0cmFuc2FjdGlvbiB3YXNuJ3QgY29tcGxldGVkIGJlY2F1c2UgdGhlcmUgd2FzIG5vIGNvbm5lY3Rpb24uXCIpO1xuXG4gICAgICBjYWxsYmFjayhjb21wbGV0ZWQpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICBjb25uZWN0aW9uLFxuICAgICAgb3BlcmF0aW9ucyxcbiAgICAgIGNvbXBsZXRlZFxuICAgIH0pO1xuXG4gICAgb3BlcmF0aW9ucyA9IFsgIC8vL1xuICAgICAgYmVnaW5UcmFuc2FjdGlvbk9wZXJhdGlvbixcbiAgICAgIGV4ZWN1dGVPcGVyYXRpb25zT3BlcmF0aW9uLFxuICAgICAgY29tbWl0VHJhbnNhY3Rpb25PcGVyYXRpb24sXG4gICAgICByb2xsYmFja1RyYW5zYWN0aW9uT3BlcmF0aW9uXG4gICAgXTtcblxuICAgIHNlcXVlbmNlKG9wZXJhdGlvbnMsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgY29tcGxldGVkIH0gPSBjb250ZXh0O1xuXG4gICAgICBkZWxldGUgY29udGV4dC5jb25uZWN0aW9uO1xuICAgICAgZGVsZXRlIGNvbnRleHQub3BlcmF0aW9ucztcbiAgICAgIGRlbGV0ZSBjb250ZXh0LmNvbXBsZXRlZDtcblxuICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbXBsZXRlZCk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBiZWdpblRyYW5zYWN0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkJlZ2lubmluZyB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLmJlZ2luKChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBlcnJvcjtcblxuICAgICAgbG9nLmVycm9yKGBBbiBlcnJvciB3aXRoICcke2NvZGV9JyBoYXMgb2NjdXJyZWQuYCk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbW1pdFRyYW5zYWN0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb21wbGV0ZWQgfSA9IGNvbnRleHQ7XG5cbiAgaWYgKCFjb21wbGV0ZWQpIHtcbiAgICBuZXh0KCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IGNvbm5lY3Rpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIGxvZyA9IGNvbm5lY3Rpb24uZ2V0TG9nKCk7XG5cbiAgbG9nLmRlYnVnKFwiQ29tbWl0dGluZyB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLmNvbW1pdCgoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gZXJyb3I7XG5cbiAgICAgIGxvZy5lcnJvcihcIkFuIGVycm9yIHdpdGggJyR7Y29kZX0nIGhhcyBvY2N1cnJlZC5cIik7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJvbGxiYWNrVHJhbnNhY3Rpb25PcGVyYXRpb24obmV4dCwgZG9uZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbXBsZXRlZCB9ID0gY29udGV4dDtcblxuICBpZiAoY29tcGxldGVkKSB7XG4gICAgbmV4dCgpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIlJvbGxpbmcgYmFjayB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLnJvbGxiYWNrKChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBlcnJvcjtcblxuICAgICAgbG9nLmVycm9yKGAuLi5mYWlsZWQgd2l0aCBlcnJvciBjb2RlICR7Y29kZX0uYCk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVPcGVyYXRpb25zT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgd2hpbHN0KGV4ZWN1dGVPcGVyYXRpb24sIG5leHQsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KSB7XG4gIGNvbnN0IHsgb3BlcmF0aW9ucyB9ID0gY29udGV4dCxcbiAgICAgICAgb3BlcmF0aW9uc0xlbmd0aCA9IG9wZXJhdGlvbnMubGVuZ3RoLFxuICAgICAgICBsYXN0T3BlcmF0aW9uSW5kZXggPSBvcGVyYXRpb25zTGVuZ3RoIC0gMTtcblxuICBpZiAoaW5kZXggPiBsYXN0T3BlcmF0aW9uSW5kZXgpIHtcbiAgICBjb21wbGV0ZSgpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkV4ZWN1dGluZyBvcGVyYXRpb24uLi5cIik7XG5cbiAgY29uc3Qgb3BlcmF0aW9uID0gb3BlcmF0aW9uc1tpbmRleF0sXG4gICAgICAgIGFib3J0ID0gZG9uZSwgLy8vXG4gICAgICAgIHByb2NlZWQgPSBuZXh0OyAvLy9cblxuICBvcGVyYXRpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KTtcblxuICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICBjb21wbGV0ZWRcbiAgICB9KTtcblxuICAgIGRvbmUoKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRyYW5zYWN0aW9uIiwid2hpbHN0IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwic2VxdWVuY2UiLCJjb25maWd1cmF0aW9uIiwib3BlcmF0aW9ucyIsImNhbGxiYWNrIiwiY29udGV4dCIsIkNvbm5lY3Rpb24iLCJjb21wbGV0ZWQiLCJmcm9tQ29uZmlndXJhdGlvbiIsImVycm9yIiwiY29ubmVjdGlvbiIsImxvZyIsImRlZmF1bHRMb2ciLCJPYmplY3QiLCJhc3NpZ24iLCJiZWdpblRyYW5zYWN0aW9uT3BlcmF0aW9uIiwiZXhlY3V0ZU9wZXJhdGlvbnNPcGVyYXRpb24iLCJjb21taXRUcmFuc2FjdGlvbk9wZXJhdGlvbiIsInJvbGxiYWNrVHJhbnNhY3Rpb25PcGVyYXRpb24iLCJyZWxlYXNlIiwibmV4dCIsImRvbmUiLCJnZXRMb2ciLCJkZWJ1ZyIsImJlZ2luIiwiY29kZSIsImNvbW1pdCIsInJvbGxiYWNrIiwiZXhlY3V0ZU9wZXJhdGlvbiIsImluZGV4Iiwib3BlcmF0aW9uc0xlbmd0aCIsImxlbmd0aCIsImxhc3RPcGVyYXRpb25JbmRleCIsImNvbXBsZXRlIiwib3BlcmF0aW9uIiwiYWJvcnQiLCJwcm9jZWVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFRQTs7O2VBQXdCQTs7O2lFQU5EO3lCQUVlOzs7Ozs7QUFFdEMsSUFBUUMsU0FBcUJDLGdDQUFxQixDQUExQ0QsUUFBUUUsV0FBYUQsZ0NBQXFCLENBQWxDQztBQUVELFNBQVNILFlBQVlJLGFBQWEsRUFBRUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLE9BQU87SUFDOUUsSUFBTSxBQUFFQyxhQUFlSixjQUFmSSxZQUNGQyxZQUFZO0lBRWxCRCxXQUFXRSxpQkFBaUIsQ0FBQ04sZUFBZSxTQUFDTyxPQUFPQztRQUNsRCxJQUFJRCxPQUFPO1lBQ1QseUJBQTZCUCxjQUFyQlMsS0FBQUEsc0NBQU1DLG1CQUFVO1lBRXhCRCxJQUFJRixLQUFLLENBQUM7WUFFVkwsU0FBU0c7WUFFVDtRQUNGO1FBRUFNLE9BQU9DLE1BQU0sQ0FBQ1QsU0FBUztZQUNyQkssWUFBQUE7WUFDQVAsWUFBQUE7WUFDQUksV0FBQUE7UUFDRjtRQUVBSixhQUFhO1lBQ1hZO1lBQ0FDO1lBQ0FDO1lBQ0FDO1NBQ0Q7UUFFRGpCLFNBQVNFLFlBQVk7WUFDbkIsSUFBTSxBQUFFSSxZQUFjRixRQUFkRTtZQUVSLE9BQU9GLFFBQVFLLFVBQVU7WUFDekIsT0FBT0wsUUFBUUYsVUFBVTtZQUN6QixPQUFPRSxRQUFRRSxTQUFTO1lBRXhCRyxXQUFXUyxPQUFPO1lBRWxCZixTQUFTRztRQUNYLEdBQUdGO0lBQ0w7QUFDRjtBQUVBLFNBQVNVLDBCQUEwQkssSUFBSSxFQUFFQyxJQUFJLEVBQUVoQixPQUFPO0lBQ3BELElBQU0sQUFBRUssYUFBZUwsUUFBZkssWUFDRkMsTUFBTUQsV0FBV1ksTUFBTTtJQUU3QlgsSUFBSVksS0FBSyxDQUFDO0lBRVZiLFdBQVdjLEtBQUssQ0FBQyxTQUFDZjtRQUNoQixJQUFJQSxPQUFPO1lBQ1QsSUFBTSxBQUFFZ0IsT0FBU2hCLE1BQVRnQjtZQUVSZCxJQUFJRixLQUFLLENBQUMsQUFBQyxrQkFBc0IsT0FBTGdCLE1BQUs7WUFFakNKO1lBRUE7UUFDRjtRQUVBRDtJQUNGO0FBQ0Y7QUFFQSxTQUFTSCwyQkFBMkJHLElBQUksRUFBRUMsSUFBSSxFQUFFaEIsT0FBTztJQUNyRCxJQUFNLEFBQUVFLFlBQWNGLFFBQWRFO0lBRVIsSUFBSSxDQUFDQSxXQUFXO1FBQ2RhO1FBRUE7SUFDRjtJQUVBLElBQU0sQUFBRVYsYUFBZUwsUUFBZkssWUFDRkMsTUFBTUQsV0FBV1ksTUFBTTtJQUU3QlgsSUFBSVksS0FBSyxDQUFDO0lBRVZiLFdBQVdnQixNQUFNLENBQUMsU0FBQ2pCO1FBQ2pCLElBQUlBLE9BQU87WUFDVCxJQUFNLEFBQUVnQixPQUFTaEIsTUFBVGdCO1lBRVJkLElBQUlGLEtBQUssQ0FBQztZQUVWWTtZQUVBO1FBQ0Y7UUFFQUQ7SUFDRjtBQUNGO0FBRUEsU0FBU0YsNkJBQTZCRSxJQUFJLEVBQUVDLElBQUksRUFBRWhCLE9BQU87SUFDdkQsSUFBTSxBQUFFRSxZQUFjRixRQUFkRTtJQUVSLElBQUlBLFdBQVc7UUFDYmE7UUFFQTtJQUNGO0lBRUEsSUFBTSxBQUFFVixhQUFlTCxRQUFmSyxZQUNGQyxNQUFNRCxXQUFXWSxNQUFNO0lBRTdCWCxJQUFJWSxLQUFLLENBQUM7SUFFVmIsV0FBV2lCLFFBQVEsQ0FBQyxTQUFDbEI7UUFDbkIsSUFBSUEsT0FBTztZQUNULElBQU0sQUFBRWdCLE9BQVNoQixNQUFUZ0I7WUFFUmQsSUFBSUYsS0FBSyxDQUFDLEFBQUMsNkJBQWlDLE9BQUxnQixNQUFLO1lBRTVDSjtZQUVBO1FBQ0Y7UUFFQUQ7SUFDRjtBQUNGO0FBRUEsU0FBU0osMkJBQTJCSSxJQUFJLEVBQUVDLElBQUksRUFBRWhCLE9BQU87SUFDckROLE9BQU82QixrQkFBa0JSLE1BQU1mO0FBQ2pDO0FBRUEsU0FBU3VCLGlCQUFpQlIsSUFBSSxFQUFFQyxJQUFJLEVBQUVoQixPQUFPLEVBQUV3QixLQUFLO0lBQ2xELElBQU0sQUFBRTFCLGFBQWVFLFFBQWZGLFlBQ0YyQixtQkFBbUIzQixXQUFXNEIsTUFBTSxFQUNwQ0MscUJBQXFCRixtQkFBbUI7SUFFOUMsSUFBSUQsUUFBUUcsb0JBQW9CO1FBQzlCQztRQUVBO0lBQ0Y7SUFFQSxJQUFNLEFBQUV2QixhQUFlTCxRQUFmSyxZQUNGQyxNQUFNRCxXQUFXWSxNQUFNO0lBRTdCWCxJQUFJWSxLQUFLLENBQUM7SUFFVixJQUFNVyxZQUFZL0IsVUFBVSxDQUFDMEIsTUFBTSxFQUM3Qk0sUUFBUWQsTUFDUmUsVUFBVWhCLE1BQU0sR0FBRztJQUV6QmMsVUFBVXhCLFlBQVl5QixPQUFPQyxTQUFTSCxVQUFVNUI7SUFFaEQsU0FBUzRCO1FBQ1AsSUFBTTFCLFlBQVk7UUFFbEJNLE9BQU9DLE1BQU0sQ0FBQ1QsU0FBUztZQUNyQkUsV0FBQUE7UUFDRjtRQUVBYztJQUNGO0FBQ0YifQ==
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
const _defaultLog = /*#__PURE__*/ _interop_require_default(require("./defaultLog"));
const _necessary = require("necessary");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { whilst, sequence } = _necessary.asynchronousUtilities;
function transaction(configuration, operations, callback, context) {
    const { Connection } = configuration, completed = false;
    Connection.fromConfiguration(configuration, (error, connection)=>{
        if (error) {
            const { log = _defaultLog.default } = configuration;
            log.error("The transaction wasn't completed because there was no connection.");
            callback(completed);
            return;
        }
        Object.assign(context, {
            connection,
            operations,
            completed
        });
        operations = [
            beginTransactionOperation,
            executeOperationsOperation,
            commitTransactionOperation,
            rollbackTransactionOperation
        ];
        sequence(operations, ()=>{
            const { completed } = context;
            delete context.connection;
            delete context.operations;
            delete context.completed;
            connection.release();
            callback(completed);
        }, context);
    });
}
function beginTransactionOperation(next, done, context) {
    const { connection } = context, log = connection.getLog();
    log.debug("Beginning transaction...");
    connection.begin((error)=>{
        if (error) {
            const { code } = error;
            log.error(`An error with '${code}' has occurred.`);
            done();
            return;
        }
        next();
    });
}
function commitTransactionOperation(next, done, context) {
    const { completed } = context;
    if (!completed) {
        next();
        return;
    }
    const { connection } = context, log = connection.getLog();
    log.debug("Committing transaction...");
    connection.commit((error)=>{
        if (error) {
            const { code } = error;
            log.error("An error with '${code}' has occurred.");
            done();
            return;
        }
        next();
    });
}
function rollbackTransactionOperation(next, done, context) {
    const { completed } = context;
    if (completed) {
        next();
        return;
    }
    const { connection } = context, log = connection.getLog();
    log.debug("Rolling back transaction...");
    connection.rollback((error)=>{
        if (error) {
            const { code } = error;
            log.error(`...failed with error code ${code}.`);
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
    const { operations } = context, operationsLength = operations.length, lastOperationIndex = operationsLength - 1;
    if (index > lastOperationIndex) {
        complete();
        return;
    }
    const { connection } = context, log = connection.getLog();
    log.debug("Executing operation...");
    const operation = operations[index], abort = done, proceed = next; ///
    operation(connection, abort, proceed, complete, context);
    function complete() {
        const completed = true;
        Object.assign(context, {
            completed
        });
        done();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2FjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRlZmF1bHRMb2cgZnJvbSBcIi4vZGVmYXVsdExvZ1wiO1xuXG5pbXBvcnQgeyBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgd2hpbHN0LCBzZXF1ZW5jZSB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzO1xuICAgICAgXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBvcGVyYXRpb25zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBjb25zdCB7IENvbm5lY3Rpb24gfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gIENvbm5lY3Rpb24uZnJvbUNvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbiwgKGVycm9yLCBjb25uZWN0aW9uKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zdCB7IGxvZyA9IGRlZmF1bHRMb2cgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgICAgIGxvZy5lcnJvcihcIlRoZSB0cmFuc2FjdGlvbiB3YXNuJ3QgY29tcGxldGVkIGJlY2F1c2UgdGhlcmUgd2FzIG5vIGNvbm5lY3Rpb24uXCIpO1xuXG4gICAgICBjYWxsYmFjayhjb21wbGV0ZWQpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICBjb25uZWN0aW9uLFxuICAgICAgb3BlcmF0aW9ucyxcbiAgICAgIGNvbXBsZXRlZFxuICAgIH0pO1xuXG4gICAgb3BlcmF0aW9ucyA9IFsgIC8vL1xuICAgICAgYmVnaW5UcmFuc2FjdGlvbk9wZXJhdGlvbixcbiAgICAgIGV4ZWN1dGVPcGVyYXRpb25zT3BlcmF0aW9uLFxuICAgICAgY29tbWl0VHJhbnNhY3Rpb25PcGVyYXRpb24sXG4gICAgICByb2xsYmFja1RyYW5zYWN0aW9uT3BlcmF0aW9uXG4gICAgXTtcblxuICAgIHNlcXVlbmNlKG9wZXJhdGlvbnMsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgY29tcGxldGVkIH0gPSBjb250ZXh0O1xuXG4gICAgICBkZWxldGUgY29udGV4dC5jb25uZWN0aW9uO1xuICAgICAgZGVsZXRlIGNvbnRleHQub3BlcmF0aW9ucztcbiAgICAgIGRlbGV0ZSBjb250ZXh0LmNvbXBsZXRlZDtcblxuICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbXBsZXRlZCk7XG4gICAgfSwgY29udGV4dCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBiZWdpblRyYW5zYWN0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkJlZ2lubmluZyB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLmJlZ2luKChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBlcnJvcjtcblxuICAgICAgbG9nLmVycm9yKGBBbiBlcnJvciB3aXRoICcke2NvZGV9JyBoYXMgb2NjdXJyZWQuYCk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbW1pdFRyYW5zYWN0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb21wbGV0ZWQgfSA9IGNvbnRleHQ7XG5cbiAgaWYgKCFjb21wbGV0ZWQpIHtcbiAgICBuZXh0KCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IGNvbm5lY3Rpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIGxvZyA9IGNvbm5lY3Rpb24uZ2V0TG9nKCk7XG5cbiAgbG9nLmRlYnVnKFwiQ29tbWl0dGluZyB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLmNvbW1pdCgoZXJyb3IpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHsgY29kZSB9ID0gZXJyb3I7XG5cbiAgICAgIGxvZy5lcnJvcihcIkFuIGVycm9yIHdpdGggJyR7Y29kZX0nIGhhcyBvY2N1cnJlZC5cIik7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJvbGxiYWNrVHJhbnNhY3Rpb25PcGVyYXRpb24obmV4dCwgZG9uZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbXBsZXRlZCB9ID0gY29udGV4dDtcblxuICBpZiAoY29tcGxldGVkKSB7XG4gICAgbmV4dCgpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIlJvbGxpbmcgYmFjayB0cmFuc2FjdGlvbi4uLlwiKTtcblxuICBjb25uZWN0aW9uLnJvbGxiYWNrKChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc3QgeyBjb2RlIH0gPSBlcnJvcjtcblxuICAgICAgbG9nLmVycm9yKGAuLi5mYWlsZWQgd2l0aCBlcnJvciBjb2RlICR7Y29kZX0uYCk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWN1dGVPcGVyYXRpb25zT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgd2hpbHN0KGV4ZWN1dGVPcGVyYXRpb24sIG5leHQsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KSB7XG4gIGNvbnN0IHsgb3BlcmF0aW9ucyB9ID0gY29udGV4dCxcbiAgICAgICAgb3BlcmF0aW9uc0xlbmd0aCA9IG9wZXJhdGlvbnMubGVuZ3RoLFxuICAgICAgICBsYXN0T3BlcmF0aW9uSW5kZXggPSBvcGVyYXRpb25zTGVuZ3RoIC0gMTtcblxuICBpZiAoaW5kZXggPiBsYXN0T3BlcmF0aW9uSW5kZXgpIHtcbiAgICBjb21wbGV0ZSgpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkV4ZWN1dGluZyBvcGVyYXRpb24uLi5cIik7XG5cbiAgY29uc3Qgb3BlcmF0aW9uID0gb3BlcmF0aW9uc1tpbmRleF0sXG4gICAgICAgIGFib3J0ID0gZG9uZSwgLy8vXG4gICAgICAgIHByb2NlZWQgPSBuZXh0OyAvLy9cblxuICBvcGVyYXRpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KTtcblxuICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSB0cnVlO1xuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICBjb21wbGV0ZWRcbiAgICB9KTtcblxuICAgIGRvbmUoKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRyYW5zYWN0aW9uIiwid2hpbHN0Iiwic2VxdWVuY2UiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJjb25maWd1cmF0aW9uIiwib3BlcmF0aW9ucyIsImNhbGxiYWNrIiwiY29udGV4dCIsIkNvbm5lY3Rpb24iLCJjb21wbGV0ZWQiLCJmcm9tQ29uZmlndXJhdGlvbiIsImVycm9yIiwiY29ubmVjdGlvbiIsImxvZyIsImRlZmF1bHRMb2ciLCJPYmplY3QiLCJhc3NpZ24iLCJiZWdpblRyYW5zYWN0aW9uT3BlcmF0aW9uIiwiZXhlY3V0ZU9wZXJhdGlvbnNPcGVyYXRpb24iLCJjb21taXRUcmFuc2FjdGlvbk9wZXJhdGlvbiIsInJvbGxiYWNrVHJhbnNhY3Rpb25PcGVyYXRpb24iLCJyZWxlYXNlIiwibmV4dCIsImRvbmUiLCJnZXRMb2ciLCJkZWJ1ZyIsImJlZ2luIiwiY29kZSIsImNvbW1pdCIsInJvbGxiYWNrIiwiZXhlY3V0ZU9wZXJhdGlvbiIsImluZGV4Iiwib3BlcmF0aW9uc0xlbmd0aCIsImxlbmd0aCIsImxhc3RPcGVyYXRpb25JbmRleCIsImNvbXBsZXRlIiwib3BlcmF0aW9uIiwiYWJvcnQiLCJwcm9jZWVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFRQTs7O2VBQXdCQTs7O21FQU5EOzJCQUVlOzs7Ozs7QUFFdEMsTUFBTSxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHQyxnQ0FBcUI7QUFFbkMsU0FBU0gsWUFBWUksYUFBYSxFQUFFQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsT0FBTztJQUM5RSxNQUFNLEVBQUVDLFVBQVUsRUFBRSxHQUFHSixlQUNqQkssWUFBWTtJQUVsQkQsV0FBV0UsaUJBQWlCLENBQUNOLGVBQWUsQ0FBQ08sT0FBT0M7UUFDbEQsSUFBSUQsT0FBTztZQUNULE1BQU0sRUFBRUUsTUFBTUMsbUJBQVUsRUFBRSxHQUFHVjtZQUU3QlMsSUFBSUYsS0FBSyxDQUFDO1lBRVZMLFNBQVNHO1lBRVQ7UUFDRjtRQUVBTSxPQUFPQyxNQUFNLENBQUNULFNBQVM7WUFDckJLO1lBQ0FQO1lBQ0FJO1FBQ0Y7UUFFQUosYUFBYTtZQUNYWTtZQUNBQztZQUNBQztZQUNBQztTQUNEO1FBRURsQixTQUFTRyxZQUFZO1lBQ25CLE1BQU0sRUFBRUksU0FBUyxFQUFFLEdBQUdGO1lBRXRCLE9BQU9BLFFBQVFLLFVBQVU7WUFDekIsT0FBT0wsUUFBUUYsVUFBVTtZQUN6QixPQUFPRSxRQUFRRSxTQUFTO1lBRXhCRyxXQUFXUyxPQUFPO1lBRWxC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
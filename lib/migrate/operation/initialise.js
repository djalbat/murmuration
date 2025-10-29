"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return initialiseOperation;
    }
});
var _transaction = /*#__PURE__*/ _interop_require_default(require("../../transaction"));
var _migration = require("../../table/migration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function initialiseOperation(next, done, context) {
    var configuration = context.configuration, log = configuration.log;
    if (log) {
        log.debug("Initialise...");
    }
    var operations = [
        checkTablePresentOperatino,
        createMissingTableOperation,
        insertZeroVersionOperation
    ];
    (0, _transaction.default)(configuration, operations, function(completed) {
        var error = !completed;
        if (error) {
            if (log) {
                log.error("...not completed.");
            }
            Object.assign(context, {
                error: error
            });
            done();
            return;
        }
        next();
    }, context);
}
function checkTablePresentOperatino(connection, abort, proceed, complete, context) {
    var configuration = context.configuration, migrationSQLMap = configuration.migrationSQLMap, showLikeTablesMigrationSQL = migrationSQLMap.showLikeTablesMigrationSQL, sql = showLikeTablesMigrationSQL, log = connection.getLog();
    log.debug("Check table present...");
    (0, _migration.showLikeTables)(connection, sql, function(error, rows) {
        if (error) {
            abort();
            return;
        }
        var rowsLength = rows.length;
        rowsLength === 1 ? complete() : proceed();
    });
}
function createMissingTableOperation(connection, abort, proceed, complete, context) {
    var configuration = context.configuration, migrationSQLMap = configuration.migrationSQLMap, createTableMigrationSQL = migrationSQLMap.createTableMigrationSQL, sql = createTableMigrationSQL, log = connection.getLog();
    log.debug("Create missing table...");
    (0, _migration.createTable)(connection, sql, function(error) {
        error ? abort() : proceed();
    });
}
function insertZeroVersionOperation(connection, abort, proceed, complete, context) {
    var configuration = context.configuration, migrationSQLMap = configuration.migrationSQLMap, insertVersionMigrationSQL = migrationSQLMap.insertVersionMigrationSQL, sql = insertVersionMigrationSQL, log = connection.getLog();
    log.debug("Inserting zero version...");
    var version = 0;
    (0, _migration.insertVersion)(connection, version, sql, function(error) {
        error ? abort() : proceed();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWdyYXRlL29wZXJhdGlvbi9pbml0aWFsaXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgdHJhbnNhY3Rpb24gZnJvbSBcIi4uLy4uL3RyYW5zYWN0aW9uXCI7XG5cbmltcG9ydCB7IGNyZWF0ZVRhYmxlLCBpbnNlcnRWZXJzaW9uLCBzaG93TGlrZVRhYmxlcyB9IGZyb20gXCIuLi8uLi90YWJsZS9taWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGlzZU9wZXJhdGlvbihuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBsb2cgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgaWYgKGxvZykge1xuICAgIGxvZy5kZWJ1ZyhcIkluaXRpYWxpc2UuLi5cIik7XG4gIH1cblxuICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgIGNoZWNrVGFibGVQcmVzZW50T3BlcmF0aW5vLFxuICAgIGNyZWF0ZU1pc3NpbmdUYWJsZU9wZXJhdGlvbixcbiAgICBpbnNlcnRaZXJvVmVyc2lvbk9wZXJhdGlvblxuICBdO1xuXG4gIHRyYW5zYWN0aW9uKGNvbmZpZ3VyYXRpb24sIG9wZXJhdGlvbnMsIChjb21wbGV0ZWQpID0+IHtcbiAgICBjb25zdCBlcnJvciA9ICFjb21wbGV0ZWQ7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiLi4ubm90IGNvbXBsZXRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgICAgICBlcnJvclxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVGFibGVQcmVzZW50T3BlcmF0aW5vKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IHNob3dMaWtlVGFibGVzTWlncmF0aW9uU1FMIH0gPSBtaWdyYXRpb25TUUxNYXAsXG4gICAgICAgIHNxbCA9IHNob3dMaWtlVGFibGVzTWlncmF0aW9uU1FMLCAvLy9cbiAgICAgICAgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICBsb2cuZGVidWcoXCJDaGVjayB0YWJsZSBwcmVzZW50Li4uXCIpO1xuXG4gIHNob3dMaWtlVGFibGVzKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yLCByb3dzKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBhYm9ydCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgcm93c0xlbmd0aCA9IHJvd3MubGVuZ3RoO1xuXG4gICAgKHJvd3NMZW5ndGggPT09IDEpID9cbiAgICAgIGNvbXBsZXRlKCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNaXNzaW5nVGFibGVPcGVyYXRpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBtaWdyYXRpb25TUUxNYXAgfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIHsgY3JlYXRlVGFibGVNaWdyYXRpb25TUUwgfSA9IG1pZ3JhdGlvblNRTE1hcCxcbiAgICAgICAgc3FsID0gY3JlYXRlVGFibGVNaWdyYXRpb25TUUwsIC8vL1xuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkNyZWF0ZSBtaXNzaW5nIHRhYmxlLi4uXCIpO1xuXG4gIGNyZWF0ZVRhYmxlKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yKSA9PiB7XG4gICAgZXJyb3IgP1xuICAgICAgYWJvcnQoKSA6XG4gICAgICAgIHByb2NlZWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydFplcm9WZXJzaW9uT3BlcmF0aW9uKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IGluc2VydFZlcnNpb25NaWdyYXRpb25TUUwgfSA9IG1pZ3JhdGlvblNRTE1hcCxcbiAgICAgICAgc3FsID0gaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCwgIC8vL1xuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkluc2VydGluZyB6ZXJvIHZlcnNpb24uLi5cIik7XG5cbiAgY29uc3QgdmVyc2lvbiA9IDA7XG5cbiAgaW5zZXJ0VmVyc2lvbihjb25uZWN0aW9uLCB2ZXJzaW9uLCBzcWwsIChlcnJvcikgPT4ge1xuICAgIGVycm9yID9cbiAgICAgIGFib3J0KCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImluaXRpYWxpc2VPcGVyYXRpb24iLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJjb25maWd1cmF0aW9uIiwibG9nIiwiZGVidWciLCJvcGVyYXRpb25zIiwiY2hlY2tUYWJsZVByZXNlbnRPcGVyYXRpbm8iLCJjcmVhdGVNaXNzaW5nVGFibGVPcGVyYXRpb24iLCJpbnNlcnRaZXJvVmVyc2lvbk9wZXJhdGlvbiIsInRyYW5zYWN0aW9uIiwiY29tcGxldGVkIiwiZXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJjb25uZWN0aW9uIiwiYWJvcnQiLCJwcm9jZWVkIiwiY29tcGxldGUiLCJtaWdyYXRpb25TUUxNYXAiLCJzaG93TGlrZVRhYmxlc01pZ3JhdGlvblNRTCIsInNxbCIsImdldExvZyIsInNob3dMaWtlVGFibGVzIiwicm93cyIsInJvd3NMZW5ndGgiLCJsZW5ndGgiLCJjcmVhdGVUYWJsZU1pZ3JhdGlvblNRTCIsImNyZWF0ZVRhYmxlIiwiaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCIsInZlcnNpb24iLCJpbnNlcnRWZXJzaW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFNQTs7O2VBQXdCQTs7O2tFQUpBO3lCQUVtQzs7Ozs7O0FBRTVDLFNBQVNBLG9CQUFvQkMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLE9BQU87SUFDN0QsSUFBTSxBQUFFQyxnQkFBa0JELFFBQWxCQyxlQUNGLEFBQUVDLE1BQVFELGNBQVJDO0lBRVIsSUFBSUEsS0FBSztRQUNQQSxJQUFJQyxLQUFLLENBQUM7SUFDWjtJQUVBLElBQU1DLGFBQWE7UUFDakJDO1FBQ0FDO1FBQ0FDO0tBQ0Q7SUFFREMsSUFBQUEsb0JBQVcsRUFBQ1AsZUFBZUcsWUFBWSxTQUFDSztRQUN0QyxJQUFNQyxRQUFRLENBQUNEO1FBRWYsSUFBSUMsT0FBTztZQUNULElBQUlSLEtBQUs7Z0JBQ1BBLElBQUlRLEtBQUssQ0FBQztZQUNaO1lBRUFDLE9BQU9DLE1BQU0sQ0FBQ1osU0FBUztnQkFDckJVLE9BQUFBO1lBQ0Y7WUFFQVg7WUFFQTtRQUNGO1FBRUFEO0lBQ0YsR0FBR0U7QUFDTDtBQUVBLFNBQVNLLDJCQUEyQlEsVUFBVSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFaEIsT0FBTztJQUMvRSxJQUFNLEFBQUVDLGdCQUFrQkQsUUFBbEJDLGVBQ0YsQUFBRWdCLGtCQUFvQmhCLGNBQXBCZ0IsaUJBQ0YsQUFBRUMsNkJBQStCRCxnQkFBL0JDLDRCQUNGQyxNQUFNRCw0QkFDTmhCLE1BQU1XLFdBQVdPLE1BQU07SUFFN0JsQixJQUFJQyxLQUFLLENBQUM7SUFFVmtCLElBQUFBLHlCQUFjLEVBQUNSLFlBQVlNLEtBQUssU0FBQ1QsT0FBT1k7UUFDdEMsSUFBSVosT0FBTztZQUNUSTtZQUVBO1FBQ0Y7UUFFQSxJQUFNUyxhQUFhRCxLQUFLRSxNQUFNO1FBRTdCRCxlQUFlLElBQ2RQLGFBQ0VEO0lBQ047QUFDRjtBQUVBLFNBQVNULDRCQUE0Qk8sVUFBVSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFaEIsT0FBTztJQUNoRixJQUFNLEFBQUVDLGdCQUFrQkQsUUFBbEJDLGVBQ0YsQUFBRWdCLGtCQUFvQmhCLGNBQXBCZ0IsaUJBQ0YsQUFBRVEsMEJBQTRCUixnQkFBNUJRLHlCQUNGTixNQUFNTSx5QkFDTnZCLE1BQU1XLFdBQVdPLE1BQU07SUFFN0JsQixJQUFJQyxLQUFLLENBQUM7SUFFVnVCLElBQUFBLHNCQUFXLEVBQUNiLFlBQVlNLEtBQUssU0FBQ1Q7UUFDNUJBLFFBQ0VJLFVBQ0VDO0lBQ047QUFDRjtBQUVBLFNBQVNSLDJCQUEyQk0sVUFBVSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFaEIsT0FBTztJQUMvRSxJQUFNLEFBQUVDLGdCQUFrQkQsUUFBbEJDLGVBQ0YsQUFBRWdCLGtCQUFvQmhCLGNBQXBCZ0IsaUJBQ0YsQUFBRVUsNEJBQThCVixnQkFBOUJVLDJCQUNGUixNQUFNUSwyQkFDTnpCLE1BQU1XLFdBQVdPLE1BQU07SUFFN0JsQixJQUFJQyxLQUFLLENBQUM7SUFFVixJQUFNeUIsVUFBVTtJQUVoQkMsSUFBQUEsd0JBQWEsRUFBQ2hCLFlBQVllLFNBQVNULEtBQUssU0FBQ1Q7UUFDdkNBLFFBQ0VJLFVBQ0VDO0lBQ047QUFDRiJ9
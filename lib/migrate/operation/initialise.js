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
const _transaction = /*#__PURE__*/ _interop_require_default(require("../../transaction"));
const _migration = require("../../table/migration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function initialiseOperation(next, done, context) {
    const { configuration } = context, { log } = configuration;
    if (log) {
        log.debug("Initialise...");
    }
    const operations = [
        checkTablePresentOperatino,
        createMissingTableOperation,
        insertZeroVersionOperation
    ];
    (0, _transaction.default)(configuration, operations, (completed)=>{
        const error = !completed;
        if (error) {
            if (log) {
                log.error("...not completed.");
            }
            Object.assign(context, {
                error
            });
            done();
            return;
        }
        next();
    }, context);
}
function checkTablePresentOperatino(connection, abort, proceed, complete, context) {
    const { configuration } = context, { migrationSQLMap } = configuration, { showLikeTablesMigrationSQL } = migrationSQLMap, sql = showLikeTablesMigrationSQL, log = connection.getLog();
    log.debug("Check table present...");
    (0, _migration.showLikeTables)(connection, sql, (error, rows)=>{
        if (error) {
            abort();
            return;
        }
        const rowsLength = rows.length;
        rowsLength === 1 ? complete() : proceed();
    });
}
function createMissingTableOperation(connection, abort, proceed, complete, context) {
    const { configuration } = context, { migrationSQLMap } = configuration, { createTableMigrationSQL } = migrationSQLMap, sql = createTableMigrationSQL, log = connection.getLog();
    log.debug("Create missing table...");
    (0, _migration.createTable)(connection, sql, (error)=>{
        error ? abort() : proceed();
    });
}
function insertZeroVersionOperation(connection, abort, proceed, complete, context) {
    const { configuration } = context, { migrationSQLMap } = configuration, { insertVersionMigrationSQL } = migrationSQLMap, sql = insertVersionMigrationSQL, log = connection.getLog();
    log.debug("Inserting zero version...");
    const version = 0;
    (0, _migration.insertVersion)(connection, version, sql, (error)=>{
        error ? abort() : proceed();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWdyYXRlL29wZXJhdGlvbi9pbml0aWFsaXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgdHJhbnNhY3Rpb24gZnJvbSBcIi4uLy4uL3RyYW5zYWN0aW9uXCI7XG5cbmltcG9ydCB7IGNyZWF0ZVRhYmxlLCBpbnNlcnRWZXJzaW9uLCBzaG93TGlrZVRhYmxlcyB9IGZyb20gXCIuLi8uLi90YWJsZS9taWdyYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGlzZU9wZXJhdGlvbihuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBsb2cgfSA9IGNvbmZpZ3VyYXRpb247XG5cbiAgaWYgKGxvZykge1xuICAgIGxvZy5kZWJ1ZyhcIkluaXRpYWxpc2UuLi5cIik7XG4gIH1cblxuICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgIGNoZWNrVGFibGVQcmVzZW50T3BlcmF0aW5vLFxuICAgIGNyZWF0ZU1pc3NpbmdUYWJsZU9wZXJhdGlvbixcbiAgICBpbnNlcnRaZXJvVmVyc2lvbk9wZXJhdGlvblxuICBdO1xuXG4gIHRyYW5zYWN0aW9uKGNvbmZpZ3VyYXRpb24sIG9wZXJhdGlvbnMsIChjb21wbGV0ZWQpID0+IHtcbiAgICBjb25zdCBlcnJvciA9ICFjb21wbGV0ZWQ7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiLi4ubm90IGNvbXBsZXRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgICAgICBlcnJvclxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5leHQoKTtcbiAgfSwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVGFibGVQcmVzZW50T3BlcmF0aW5vKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IHNob3dMaWtlVGFibGVzTWlncmF0aW9uU1FMIH0gPSBtaWdyYXRpb25TUUxNYXAsXG4gICAgICAgIHNxbCA9IHNob3dMaWtlVGFibGVzTWlncmF0aW9uU1FMLCAvLy9cbiAgICAgICAgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICBsb2cuZGVidWcoXCJDaGVjayB0YWJsZSBwcmVzZW50Li4uXCIpO1xuXG4gIHNob3dMaWtlVGFibGVzKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yLCByb3dzKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBhYm9ydCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgcm93c0xlbmd0aCA9IHJvd3MubGVuZ3RoO1xuXG4gICAgKHJvd3NMZW5ndGggPT09IDEpID9cbiAgICAgIGNvbXBsZXRlKCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNaXNzaW5nVGFibGVPcGVyYXRpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBtaWdyYXRpb25TUUxNYXAgfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIHsgY3JlYXRlVGFibGVNaWdyYXRpb25TUUwgfSA9IG1pZ3JhdGlvblNRTE1hcCxcbiAgICAgICAgc3FsID0gY3JlYXRlVGFibGVNaWdyYXRpb25TUUwsIC8vL1xuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkNyZWF0ZSBtaXNzaW5nIHRhYmxlLi4uXCIpO1xuXG4gIGNyZWF0ZVRhYmxlKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yKSA9PiB7XG4gICAgZXJyb3IgP1xuICAgICAgYWJvcnQoKSA6XG4gICAgICAgIHByb2NlZWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydFplcm9WZXJzaW9uT3BlcmF0aW9uKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IGluc2VydFZlcnNpb25NaWdyYXRpb25TUUwgfSA9IG1pZ3JhdGlvblNRTE1hcCxcbiAgICAgICAgc3FsID0gaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCwgIC8vL1xuICAgICAgICBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkluc2VydGluZyB6ZXJvIHZlcnNpb24uLi5cIik7XG5cbiAgY29uc3QgdmVyc2lvbiA9IDA7XG5cbiAgaW5zZXJ0VmVyc2lvbihjb25uZWN0aW9uLCB2ZXJzaW9uLCBzcWwsIChlcnJvcikgPT4ge1xuICAgIGVycm9yID9cbiAgICAgIGFib3J0KCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImluaXRpYWxpc2VPcGVyYXRpb24iLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJjb25maWd1cmF0aW9uIiwibG9nIiwiZGVidWciLCJvcGVyYXRpb25zIiwiY2hlY2tUYWJsZVByZXNlbnRPcGVyYXRpbm8iLCJjcmVhdGVNaXNzaW5nVGFibGVPcGVyYXRpb24iLCJpbnNlcnRaZXJvVmVyc2lvbk9wZXJhdGlvbiIsInRyYW5zYWN0aW9uIiwiY29tcGxldGVkIiwiZXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJjb25uZWN0aW9uIiwiYWJvcnQiLCJwcm9jZWVkIiwiY29tcGxldGUiLCJtaWdyYXRpb25TUUxNYXAiLCJzaG93TGlrZVRhYmxlc01pZ3JhdGlvblNRTCIsInNxbCIsImdldExvZyIsInNob3dMaWtlVGFibGVzIiwicm93cyIsInJvd3NMZW5ndGgiLCJsZW5ndGgiLCJjcmVhdGVUYWJsZU1pZ3JhdGlvblNRTCIsImNyZWF0ZVRhYmxlIiwiaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCIsInZlcnNpb24iLCJpbnNlcnRWZXJzaW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFNQTs7O2VBQXdCQTs7O29FQUpBOzJCQUVtQzs7Ozs7O0FBRTVDLFNBQVNBLG9CQUFvQkMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLE9BQU87SUFDN0QsTUFBTSxFQUFFQyxhQUFhLEVBQUUsR0FBR0QsU0FDcEIsRUFBRUUsR0FBRyxFQUFFLEdBQUdEO0lBRWhCLElBQUlDLEtBQUs7UUFDUEEsSUFBSUMsS0FBSyxDQUFDO0lBQ1o7SUFFQSxNQUFNQyxhQUFhO1FBQ2pCQztRQUNBQztRQUNBQztLQUNEO0lBRURDLElBQUFBLG9CQUFXLEVBQUNQLGVBQWVHLFlBQVksQ0FBQ0s7UUFDdEMsTUFBTUMsUUFBUSxDQUFDRDtRQUVmLElBQUlDLE9BQU87WUFDVCxJQUFJUixLQUFLO2dCQUNQQSxJQUFJUSxLQUFLLENBQUM7WUFDWjtZQUVBQyxPQUFPQyxNQUFNLENBQUNaLFNBQVM7Z0JBQ3JCVTtZQUNGO1lBRUFYO1lBRUE7UUFDRjtRQUVBRDtJQUNGLEdBQUdFO0FBQ0w7QUFFQSxTQUFTSywyQkFBMkJRLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRWhCLE9BQU87SUFDL0UsTUFBTSxFQUFFQyxhQUFhLEVBQUUsR0FBR0QsU0FDcEIsRUFBRWlCLGVBQWUsRUFBRSxHQUFHaEIsZUFDdEIsRUFBRWlCLDBCQUEwQixFQUFFLEdBQUdELGlCQUNqQ0UsTUFBTUQsNEJBQ05oQixNQUFNVyxXQUFXTyxNQUFNO0lBRTdCbEIsSUFBSUMsS0FBSyxDQUFDO0lBRVZrQixJQUFBQSx5QkFBYyxFQUFDUixZQUFZTSxLQUFLLENBQUNULE9BQU9ZO1FBQ3RDLElBQUlaLE9BQU87WUFDVEk7WUFFQTtRQUNGO1FBRUEsTUFBTVMsYUFBYUQsS0FBS0UsTUFBTTtRQUU3QkQsZUFBZSxJQUNkUCxhQUNFRDtJQUNOO0FBQ0Y7QUFFQSxTQUFTVCw0QkFBNEJPLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRWhCLE9BQU87SUFDaEYsTUFBTSxFQUFFQyxhQUFhLEVBQUUsR0FBR0QsU0FDcEIsRUFBRWlCLGVBQWUsRUFBRSxHQUFHaEIsZUFDdEIsRUFBRXdCLHVCQUF1QixFQUFFLEdBQUdSLGlCQUM5QkUsTUFBTU0seUJBQ052QixNQUFNVyxXQUFXTyxNQUFNO0lBRTdCbEIsSUFBSUMsS0FBSyxDQUFDO0lBRVZ1QixJQUFBQSxzQkFBVyxFQUFDYixZQUFZTSxLQUFLLENBQUNUO1FBQzVCQSxRQUNFSSxVQUNFQztJQUNOO0FBQ0Y7QUFFQSxTQUFTUiwyQkFBMkJNLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRWhCLE9BQU87SUFDL0UsTUFBTSxFQUFFQyxhQUFhLEVBQUUsR0FBR0QsU0FDcEIsRUFBRWlCLGVBQWUsRUFBRSxHQUFHaEIsZUFDdEIsRUFBRTBCLHlCQUF5QixFQUFFLEdBQUdWLGlCQUNoQ0UsTUFBTVEsMkJBQ056QixNQUFNVyxXQUFXTyxNQUFNO0lBRTdCbEIsSUFBSUMsS0FBSyxDQUFDO0lBRVYsTUFBTXlCLFVBQVU7SUFFaEJDLElBQUFBLHdCQUFhLEVBQUNoQixZQUFZZSxTQUFTVCxLQUFLLENBQUNUO1FBQ3ZDQSxRQUNFSSxVQUNFQztJQUNOO0FBQ0YifQ==
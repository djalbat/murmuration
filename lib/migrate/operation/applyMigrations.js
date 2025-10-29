"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return applyMigrationsOperation;
    }
});
var _necessary = require("necessary");
var _migrations = /*#__PURE__*/ _interop_require_default(require("../migrations"));
var _transaction = /*#__PURE__*/ _interop_require_default(require("../../transaction"));
var _migration = require("../../table/migration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var first = _necessary.arrayUtilities.first, whilst = _necessary.asynchronousUtilities.whilst;
function applyMigrationsOperation(next, done, context) {
    var configuration = context.configuration, CustomMigrationMap = context.CustomMigrationMap, migrationsDirectoryPath = context.migrationsDirectoryPath, migrations = _migrations.default.fromCustomMigrationMapAndMigrationsDirectoryPath(CustomMigrationMap, migrationsDirectoryPath), log = configuration.log;
    if (log) {
        log.debug("Apply migrations...");
    }
    Object.assign(context, {
        migrations: migrations
    });
    whilst(applyMigrationOperation, function() {
        delete context.migrations;
        done();
    }, context);
}
function applyMigrationOperation(next, done, context) {
    var configuration = context.configuration, log = configuration.log;
    if (log) {
        log.debug("Apply migration...");
    }
    var operations = [
        getVersion,
        applyMigration,
        updateVersion
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
        var finished = context.finished;
        delete context.finished;
        finished ? done() : next();
    }, context);
}
function getVersion(connection, abort, proceed, complete, context) {
    var configuration = context.configuration, migrationSQLMap = configuration.migrationSQLMap, selectMaximumVersionMigrationSQL = migrationSQLMap.selectMaximumVersionMigrationSQL, sql = selectMaximumVersionMigrationSQL, log = connection.getLog();
    log.debug("Get version....");
    (0, _migration.selectMaximumVersion)(connection, sql, function(error, rows) {
        if (error) {
            abort();
            return;
        }
        var firstRow = first(rows), maximum_version = firstRow.maximum_version, version = maximum_version; ///
        Object.assign(context, {
            version: version
        });
        proceed();
    });
}
function updateVersion(connection, abort, proceed, complete, context) {
    var configuration = context.configuration, migrationSQLMap = configuration.migrationSQLMap, insertVersionMigrationSQL = migrationSQLMap.insertVersionMigrationSQL, sql = insertVersionMigrationSQL, log = connection.getLog();
    log.debug("Update version...");
    var version = context.version;
    delete context.version;
    (0, _migration.insertVersion)(connection, version, sql, function(error) {
        error ? abort() : proceed();
    });
}
function applyMigration(connection, abort, proceed, complete, context) {
    var version = context.version, migrations = context.migrations;
    delete context.version;
    var migration = migrations.retrieveMigration(++version), finished = migration === null;
    Object.assign(context, {
        finished: finished
    });
    if (finished) {
        complete();
        return;
    }
    var log = connection.getLog();
    log.debug("Apply migration...");
    migration.apply(connection, function(error) {
        if (error) {
            abort();
            return;
        }
        Object.assign(context, {
            version: version
        });
        proceed();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWdyYXRlL29wZXJhdGlvbi9hcHBseU1pZ3JhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzLCBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBNaWdyYXRpb25zIGZyb20gXCIuLi9taWdyYXRpb25zXCI7XG5pbXBvcnQgdHJhbnNhY3Rpb24gZnJvbSBcIi4uLy4uL3RyYW5zYWN0aW9uXCI7XG5cbmltcG9ydCB7IGluc2VydFZlcnNpb24sIHNlbGVjdE1heGltdW1WZXJzaW9uIH0gZnJvbSBcIi4uLy4uL3RhYmxlL21pZ3JhdGlvblwiO1xuXG5jb25zdCB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlncmF0aW9uc09wZXJhdGlvbihuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiwgQ3VzdG9tTWlncmF0aW9uTWFwLCBtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCB9ID0gY29udGV4dCxcbiAgICAgICAgbWlncmF0aW9ucyA9IE1pZ3JhdGlvbnMuZnJvbUN1c3RvbU1pZ3JhdGlvbk1hcEFuZE1pZ3JhdGlvbnNEaXJlY3RvcnlQYXRoKEN1c3RvbU1pZ3JhdGlvbk1hcCwgbWlncmF0aW9uc0RpcmVjdG9yeVBhdGgpLFxuICAgICAgICB7IGxvZyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBpZiAobG9nKSB7XG4gICAgbG9nLmRlYnVnKFwiQXBwbHkgbWlncmF0aW9ucy4uLlwiKTtcbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIG1pZ3JhdGlvbnNcbiAgfSk7XG5cbiAgd2hpbHN0KGFwcGx5TWlncmF0aW9uT3BlcmF0aW9uLCAoKSA9PiB7XG4gICAgZGVsZXRlIGNvbnRleHQubWlncmF0aW9ucztcblxuICAgIGRvbmUoKTtcbiAgfSwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5TWlncmF0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb25maWd1cmF0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICB7IGxvZyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBpZiAobG9nKSB7XG4gICAgbG9nLmRlYnVnKFwiQXBwbHkgbWlncmF0aW9uLi4uXCIpO1xuICB9XG5cbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICBnZXRWZXJzaW9uLFxuICAgIGFwcGx5TWlncmF0aW9uLFxuICAgIHVwZGF0ZVZlcnNpb25cbiAgXTtcblxuICB0cmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBvcGVyYXRpb25zLCAoY29tcGxldGVkKSA9PiB7XG4gICAgY29uc3QgZXJyb3IgPSAhY29tcGxldGVkO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBpZiAobG9nKSB7XG4gICAgICAgIGxvZy5lcnJvcihcIi4uLm5vdCBjb21wbGV0ZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgZXJyb3JcbiAgICAgIH0pO1xuXG4gICAgICBkb25lKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGZpbmlzaGVkIH0gPSBjb250ZXh0O1xuXG4gICAgZGVsZXRlIGNvbnRleHQuZmluaXNoZWQ7XG5cbiAgICBmaW5pc2hlZCA/XG4gICAgICBkb25lKCkgOlxuICAgICAgICBuZXh0KCk7XG4gIH0sIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBnZXRWZXJzaW9uKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IHNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMIH0gPSBtaWdyYXRpb25TUUxNYXAsXG4gICAgICAgIHNxbCA9IHNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMLCAvLy9cbiAgICAgICAgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICBsb2cuZGVidWcoXCJHZXQgdmVyc2lvbi4uLi5cIik7XG5cbiAgc2VsZWN0TWF4aW11bVZlcnNpb24oY29ubmVjdGlvbiwgc3FsLCAoZXJyb3IsIHJvd3MpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGFib3J0KCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFJvdyA9IGZpcnN0KHJvd3MpLFxuICAgICAgICAgIHsgbWF4aW11bV92ZXJzaW9uIH0gPSBmaXJzdFJvdyxcbiAgICAgICAgICB2ZXJzaW9uID0gbWF4aW11bV92ZXJzaW9uOyAgLy8vXG5cbiAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgIHZlcnNpb25cbiAgICB9KTtcblxuICAgIHByb2NlZWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZlcnNpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBtaWdyYXRpb25TUUxNYXAgfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIHsgaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCB9ID0gbWlncmF0aW9uU1FMTWFwLFxuICAgICAgICBzcWwgPSBpbnNlcnRWZXJzaW9uTWlncmF0aW9uU1FMLCAgLy8vXG4gICAgICAgIGxvZyA9IGNvbm5lY3Rpb24uZ2V0TG9nKCk7XG5cbiAgbG9nLmRlYnVnKFwiVXBkYXRlIHZlcnNpb24uLi5cIik7XG5cbiAgY29uc3QgeyB2ZXJzaW9uIH0gPSBjb250ZXh0O1xuXG4gIGRlbGV0ZSBjb250ZXh0LnZlcnNpb247XG5cbiAgaW5zZXJ0VmVyc2lvbihjb25uZWN0aW9uLCB2ZXJzaW9uLCBzcWwsIChlcnJvcikgPT4ge1xuICAgIGVycm9yID9cbiAgICAgIGFib3J0KCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseU1pZ3JhdGlvbihjb25uZWN0aW9uLCBhYm9ydCwgcHJvY2VlZCwgY29tcGxldGUsIGNvbnRleHQpIHtcbiAgbGV0IHsgdmVyc2lvbiwgbWlncmF0aW9ucyB9ID0gY29udGV4dDtcblxuICBkZWxldGUgY29udGV4dC52ZXJzaW9uO1xuXG4gIGNvbnN0IG1pZ3JhdGlvbiA9IG1pZ3JhdGlvbnMucmV0cmlldmVNaWdyYXRpb24oKyt2ZXJzaW9uKSwgIC8vL1xuICAgICAgICBmaW5pc2hlZCA9IChtaWdyYXRpb24gPT09IG51bGwpO1xuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGZpbmlzaGVkXG4gIH0pO1xuXG4gIGlmIChmaW5pc2hlZCkge1xuICAgIGNvbXBsZXRlKCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkFwcGx5IG1pZ3JhdGlvbi4uLlwiKTtcblxuICBtaWdyYXRpb24uYXBwbHkoY29ubmVjdGlvbiwgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBhYm9ydCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICB2ZXJzaW9uXG4gICAgfSk7XG5cbiAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImFwcGx5TWlncmF0aW9uc09wZXJhdGlvbiIsImZpcnN0IiwiYXJyYXlVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJjb25maWd1cmF0aW9uIiwiQ3VzdG9tTWlncmF0aW9uTWFwIiwibWlncmF0aW9uc0RpcmVjdG9yeVBhdGgiLCJtaWdyYXRpb25zIiwiTWlncmF0aW9ucyIsImZyb21DdXN0b21NaWdyYXRpb25NYXBBbmRNaWdyYXRpb25zRGlyZWN0b3J5UGF0aCIsImxvZyIsImRlYnVnIiwiT2JqZWN0IiwiYXNzaWduIiwiYXBwbHlNaWdyYXRpb25PcGVyYXRpb24iLCJvcGVyYXRpb25zIiwiZ2V0VmVyc2lvbiIsImFwcGx5TWlncmF0aW9uIiwidXBkYXRlVmVyc2lvbiIsInRyYW5zYWN0aW9uIiwiY29tcGxldGVkIiwiZXJyb3IiLCJmaW5pc2hlZCIsImNvbm5lY3Rpb24iLCJhYm9ydCIsInByb2NlZWQiLCJjb21wbGV0ZSIsIm1pZ3JhdGlvblNRTE1hcCIsInNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMIiwic3FsIiwiZ2V0TG9nIiwic2VsZWN0TWF4aW11bVZlcnNpb24iLCJyb3dzIiwiZmlyc3RSb3ciLCJtYXhpbXVtX3ZlcnNpb24iLCJ2ZXJzaW9uIiwiaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCIsImluc2VydFZlcnNpb24iLCJtaWdyYXRpb24iLCJyZXRyaWV2ZU1pZ3JhdGlvbiIsImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFZQTs7O2VBQXdCQTs7O3lCQVY4QjtpRUFFL0I7a0VBQ0M7eUJBRTRCOzs7Ozs7QUFFcEQsSUFBTSxBQUFFQyxRQUFVQyx5QkFBYyxDQUF4QkQsT0FDRixBQUFFRSxTQUFXQyxnQ0FBcUIsQ0FBaENEO0FBRU8sU0FBU0gseUJBQXlCSyxJQUFJLEVBQUVDLElBQUksRUFBRUMsT0FBTztJQUNsRSxJQUFRQyxnQkFBK0RELFFBQS9EQyxlQUFlQyxxQkFBZ0RGLFFBQWhERSxvQkFBb0JDLDBCQUE0QkgsUUFBNUJHLHlCQUNyQ0MsYUFBYUMsbUJBQVUsQ0FBQ0MsZ0RBQWdELENBQUNKLG9CQUFvQkMsMEJBQzdGLEFBQUVJLE1BQVFOLGNBQVJNO0lBRVIsSUFBSUEsS0FBSztRQUNQQSxJQUFJQyxLQUFLLENBQUM7SUFDWjtJQUVBQyxPQUFPQyxNQUFNLENBQUNWLFNBQVM7UUFDckJJLFlBQUFBO0lBQ0Y7SUFFQVIsT0FBT2UseUJBQXlCO1FBQzlCLE9BQU9YLFFBQVFJLFVBQVU7UUFFekJMO0lBQ0YsR0FBR0M7QUFDTDtBQUVBLFNBQVNXLHdCQUF3QmIsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLE9BQU87SUFDbEQsSUFBTSxBQUFFQyxnQkFBa0JELFFBQWxCQyxlQUNGLEFBQUVNLE1BQVFOLGNBQVJNO0lBRVIsSUFBSUEsS0FBSztRQUNQQSxJQUFJQyxLQUFLLENBQUM7SUFDWjtJQUVBLElBQU1JLGFBQWE7UUFDakJDO1FBQ0FDO1FBQ0FDO0tBQ0Q7SUFFREMsSUFBQUEsb0JBQVcsRUFBQ2YsZUFBZVcsWUFBWSxTQUFDSztRQUN0QyxJQUFNQyxRQUFRLENBQUNEO1FBRWYsSUFBSUMsT0FBTztZQUNULElBQUlYLEtBQUs7Z0JBQ1BBLElBQUlXLEtBQUssQ0FBQztZQUNaO1lBRUFULE9BQU9DLE1BQU0sQ0FBQ1YsU0FBUztnQkFDckJrQixPQUFBQTtZQUNGO1lBRUFuQjtZQUVBO1FBQ0Y7UUFFQSxJQUFNLEFBQUVvQixXQUFhbkIsUUFBYm1CO1FBRVIsT0FBT25CLFFBQVFtQixRQUFRO1FBRXZCQSxXQUNFcEIsU0FDRUQ7SUFDTixHQUFHRTtBQUNMO0FBRUEsU0FBU2EsV0FBV08sVUFBVSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFdkIsT0FBTztJQUMvRCxJQUFNLEFBQUVDLGdCQUFrQkQsUUFBbEJDLGVBQ0YsQUFBRXVCLGtCQUFvQnZCLGNBQXBCdUIsaUJBQ0YsQUFBRUMsbUNBQXFDRCxnQkFBckNDLGtDQUNGQyxNQUFNRCxrQ0FDTmxCLE1BQU1hLFdBQVdPLE1BQU07SUFFN0JwQixJQUFJQyxLQUFLLENBQUM7SUFFVm9CLElBQUFBLCtCQUFvQixFQUFDUixZQUFZTSxLQUFLLFNBQUNSLE9BQU9XO1FBQzVDLElBQUlYLE9BQU87WUFDVEc7WUFFQTtRQUNGO1FBRUEsSUFBTVMsV0FBV3BDLE1BQU1tQyxPQUNqQixBQUFFRSxrQkFBb0JELFNBQXBCQyxpQkFDRkMsVUFBVUQsaUJBQWtCLEdBQUc7UUFFckN0QixPQUFPQyxNQUFNLENBQUNWLFNBQVM7WUFDckJnQyxTQUFBQTtRQUNGO1FBRUFWO0lBQ0Y7QUFDRjtBQUVBLFNBQVNQLGNBQWNLLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsRUFBRXZCLE9BQU87SUFDbEUsSUFBTSxBQUFFQyxnQkFBa0JELFFBQWxCQyxlQUNGLEFBQUV1QixrQkFBb0J2QixjQUFwQnVCLGlCQUNGLEFBQUVTLDRCQUE4QlQsZ0JBQTlCUywyQkFDRlAsTUFBTU8sMkJBQ04xQixNQUFNYSxXQUFXTyxNQUFNO0lBRTdCcEIsSUFBSUMsS0FBSyxDQUFDO0lBRVYsSUFBTSxBQUFFd0IsVUFBWWhDLFFBQVpnQztJQUVSLE9BQU9oQyxRQUFRZ0MsT0FBTztJQUV0QkUsSUFBQUEsd0JBQWEsRUFBQ2QsWUFBWVksU0FBU04sS0FBSyxTQUFDUjtRQUN2Q0EsUUFDRUcsVUFDRUM7SUFDTjtBQUNGO0FBRUEsU0FBU1IsZUFBZU0sVUFBVSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFdkIsT0FBTztJQUNuRSxJQUFNZ0MsVUFBd0JoQyxRQUF4QmdDLFNBQVM1QixhQUFlSixRQUFmSTtJQUVmLE9BQU9KLFFBQVFnQyxPQUFPO0lBRXRCLElBQU1HLFlBQVkvQixXQUFXZ0MsaUJBQWlCLENBQUMsRUFBRUosVUFDM0NiLFdBQVlnQixjQUFjO0lBRWhDMUIsT0FBT0MsTUFBTSxDQUFDVixTQUFTO1FBQ3JCbUIsVUFBQUE7SUFDRjtJQUVBLElBQUlBLFVBQVU7UUFDWkk7UUFFQTtJQUNGO0lBRUEsSUFBTWhCLE1BQU1hLFdBQVdPLE1BQU07SUFFN0JwQixJQUFJQyxLQUFLLENBQUM7SUFFVjJCLFVBQVVFLEtBQUssQ0FBQ2pCLFlBQVksU0FBQ0Y7UUFDM0IsSUFBSUEsT0FBTztZQUNURztZQUVBO1FBQ0Y7UUFFQVosT0FBT0MsTUFBTSxDQUFDVixTQUFTO1lBQ3JCZ0MsU0FBQUE7UUFDRjtRQUVBVjtJQUNGO0FBQ0YifQ==
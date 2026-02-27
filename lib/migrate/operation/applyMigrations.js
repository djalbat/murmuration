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
const _necessary = require("necessary");
const _migrations = /*#__PURE__*/ _interop_require_default(require("../migrations"));
const _transaction = /*#__PURE__*/ _interop_require_default(require("../../transaction"));
const _migration = require("../../table/migration");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { first } = _necessary.arrayUtilities, { whilst } = _necessary.asynchronousUtilities;
function applyMigrationsOperation(next, done, context) {
    const { configuration, CustomMigrationMap, migrationsDirectoryPath } = context, migrations = _migrations.default.fromCustomMigrationMapAndMigrationsDirectoryPath(CustomMigrationMap, migrationsDirectoryPath), { log } = configuration;
    if (log) {
        log.debug("Apply migrations...");
    }
    Object.assign(context, {
        migrations
    });
    whilst(applyMigrationOperation, ()=>{
        delete context.migrations;
        done();
    }, context);
}
function applyMigrationOperation(next, done, context) {
    const { configuration } = context, { log } = configuration;
    if (log) {
        log.debug("Apply migration...");
    }
    const operations = [
        getVersion,
        applyMigration,
        updateVersion
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
        const { finished } = context;
        delete context.finished;
        finished ? done() : next();
    }, context);
}
function getVersion(connection, abort, proceed, complete, context) {
    const { configuration } = context, { migrationSQLMap } = configuration, { selectMaximumVersionMigrationSQL } = migrationSQLMap, sql = selectMaximumVersionMigrationSQL, log = connection.getLog();
    log.debug("Get version....");
    (0, _migration.selectMaximumVersion)(connection, sql, (error, rows)=>{
        if (error) {
            abort();
            return;
        }
        const firstRow = first(rows), { maximum_version } = firstRow, version = maximum_version; ///
        Object.assign(context, {
            version
        });
        proceed();
    });
}
function updateVersion(connection, abort, proceed, complete, context) {
    const { configuration } = context, { migrationSQLMap } = configuration, { insertVersionMigrationSQL } = migrationSQLMap, sql = insertVersionMigrationSQL, log = connection.getLog();
    log.debug("Update version...");
    const { version } = context;
    delete context.version;
    (0, _migration.insertVersion)(connection, version, sql, (error)=>{
        error ? abort() : proceed();
    });
}
function applyMigration(connection, abort, proceed, complete, context) {
    let { version, migrations } = context;
    delete context.version;
    const migration = migrations.retrieveMigration(++version), finished = migration === null;
    Object.assign(context, {
        finished
    });
    if (finished) {
        complete();
        return;
    }
    const log = connection.getLog();
    log.debug("Apply migration...");
    migration.apply(connection, (error)=>{
        if (error) {
            abort();
            return;
        }
        Object.assign(context, {
            version
        });
        proceed();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWdyYXRlL29wZXJhdGlvbi9hcHBseU1pZ3JhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzLCBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBNaWdyYXRpb25zIGZyb20gXCIuLi9taWdyYXRpb25zXCI7XG5pbXBvcnQgdHJhbnNhY3Rpb24gZnJvbSBcIi4uLy4uL3RyYW5zYWN0aW9uXCI7XG5cbmltcG9ydCB7IGluc2VydFZlcnNpb24sIHNlbGVjdE1heGltdW1WZXJzaW9uIH0gZnJvbSBcIi4uLy4uL3RhYmxlL21pZ3JhdGlvblwiO1xuXG5jb25zdCB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlncmF0aW9uc09wZXJhdGlvbihuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiwgQ3VzdG9tTWlncmF0aW9uTWFwLCBtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCB9ID0gY29udGV4dCxcbiAgICAgICAgbWlncmF0aW9ucyA9IE1pZ3JhdGlvbnMuZnJvbUN1c3RvbU1pZ3JhdGlvbk1hcEFuZE1pZ3JhdGlvbnNEaXJlY3RvcnlQYXRoKEN1c3RvbU1pZ3JhdGlvbk1hcCwgbWlncmF0aW9uc0RpcmVjdG9yeVBhdGgpLFxuICAgICAgICB7IGxvZyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBpZiAobG9nKSB7XG4gICAgbG9nLmRlYnVnKFwiQXBwbHkgbWlncmF0aW9ucy4uLlwiKTtcbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIG1pZ3JhdGlvbnNcbiAgfSk7XG5cbiAgd2hpbHN0KGFwcGx5TWlncmF0aW9uT3BlcmF0aW9uLCAoKSA9PiB7XG4gICAgZGVsZXRlIGNvbnRleHQubWlncmF0aW9ucztcblxuICAgIGRvbmUoKTtcbiAgfSwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5TWlncmF0aW9uT3BlcmF0aW9uKG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBjb25maWd1cmF0aW9uIH0gPSBjb250ZXh0LFxuICAgICAgICB7IGxvZyB9ID0gY29uZmlndXJhdGlvbjtcblxuICBpZiAobG9nKSB7XG4gICAgbG9nLmRlYnVnKFwiQXBwbHkgbWlncmF0aW9uLi4uXCIpO1xuICB9XG5cbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICBnZXRWZXJzaW9uLFxuICAgIGFwcGx5TWlncmF0aW9uLFxuICAgIHVwZGF0ZVZlcnNpb25cbiAgXTtcblxuICB0cmFuc2FjdGlvbihjb25maWd1cmF0aW9uLCBvcGVyYXRpb25zLCAoY29tcGxldGVkKSA9PiB7XG4gICAgY29uc3QgZXJyb3IgPSAhY29tcGxldGVkO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBpZiAobG9nKSB7XG4gICAgICAgIGxvZy5lcnJvcihcIi4uLm5vdCBjb21wbGV0ZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgZXJyb3JcbiAgICAgIH0pO1xuXG4gICAgICBkb25lKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGZpbmlzaGVkIH0gPSBjb250ZXh0O1xuXG4gICAgZGVsZXRlIGNvbnRleHQuZmluaXNoZWQ7XG5cbiAgICBmaW5pc2hlZCA/XG4gICAgICBkb25lKCkgOlxuICAgICAgICBuZXh0KCk7XG4gIH0sIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBnZXRWZXJzaW9uKGNvbm5lY3Rpb24sIGFib3J0LCBwcm9jZWVkLCBjb21wbGV0ZSwgY29udGV4dCkge1xuICBjb25zdCB7IGNvbmZpZ3VyYXRpb24gfSA9IGNvbnRleHQsXG4gICAgICAgIHsgbWlncmF0aW9uU1FMTWFwIH0gPSBjb25maWd1cmF0aW9uLFxuICAgICAgICB7IHNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMIH0gPSBtaWdyYXRpb25TUUxNYXAsXG4gICAgICAgIHNxbCA9IHNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMLCAvLy9cbiAgICAgICAgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKTtcblxuICBsb2cuZGVidWcoXCJHZXQgdmVyc2lvbi4uLi5cIik7XG5cbiAgc2VsZWN0TWF4aW11bVZlcnNpb24oY29ubmVjdGlvbiwgc3FsLCAoZXJyb3IsIHJvd3MpID0+IHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGFib3J0KCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFJvdyA9IGZpcnN0KHJvd3MpLFxuICAgICAgICAgIHsgbWF4aW11bV92ZXJzaW9uIH0gPSBmaXJzdFJvdyxcbiAgICAgICAgICB2ZXJzaW9uID0gbWF4aW11bV92ZXJzaW9uOyAgLy8vXG5cbiAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgIHZlcnNpb25cbiAgICB9KTtcblxuICAgIHByb2NlZWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZlcnNpb24oY29ubmVjdGlvbiwgYWJvcnQsIHByb2NlZWQsIGNvbXBsZXRlLCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgY29uZmlndXJhdGlvbiB9ID0gY29udGV4dCxcbiAgICAgICAgeyBtaWdyYXRpb25TUUxNYXAgfSA9IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIHsgaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCB9ID0gbWlncmF0aW9uU1FMTWFwLFxuICAgICAgICBzcWwgPSBpbnNlcnRWZXJzaW9uTWlncmF0aW9uU1FMLCAgLy8vXG4gICAgICAgIGxvZyA9IGNvbm5lY3Rpb24uZ2V0TG9nKCk7XG5cbiAgbG9nLmRlYnVnKFwiVXBkYXRlIHZlcnNpb24uLi5cIik7XG5cbiAgY29uc3QgeyB2ZXJzaW9uIH0gPSBjb250ZXh0O1xuXG4gIGRlbGV0ZSBjb250ZXh0LnZlcnNpb247XG5cbiAgaW5zZXJ0VmVyc2lvbihjb25uZWN0aW9uLCB2ZXJzaW9uLCBzcWwsIChlcnJvcikgPT4ge1xuICAgIGVycm9yID9cbiAgICAgIGFib3J0KCkgOlxuICAgICAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseU1pZ3JhdGlvbihjb25uZWN0aW9uLCBhYm9ydCwgcHJvY2VlZCwgY29tcGxldGUsIGNvbnRleHQpIHtcbiAgbGV0IHsgdmVyc2lvbiwgbWlncmF0aW9ucyB9ID0gY29udGV4dDtcblxuICBkZWxldGUgY29udGV4dC52ZXJzaW9uO1xuXG4gIGNvbnN0IG1pZ3JhdGlvbiA9IG1pZ3JhdGlvbnMucmV0cmlldmVNaWdyYXRpb24oKyt2ZXJzaW9uKSwgIC8vL1xuICAgICAgICBmaW5pc2hlZCA9IChtaWdyYXRpb24gPT09IG51bGwpO1xuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGZpbmlzaGVkXG4gIH0pO1xuXG4gIGlmIChmaW5pc2hlZCkge1xuICAgIGNvbXBsZXRlKCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpO1xuXG4gIGxvZy5kZWJ1ZyhcIkFwcGx5IG1pZ3JhdGlvbi4uLlwiKTtcblxuICBtaWdyYXRpb24uYXBwbHkoY29ubmVjdGlvbiwgKGVycm9yKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBhYm9ydCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICB2ZXJzaW9uXG4gICAgfSk7XG5cbiAgICBwcm9jZWVkKCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImFwcGx5TWlncmF0aW9uc09wZXJhdGlvbiIsImZpcnN0IiwiYXJyYXlVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJjb25maWd1cmF0aW9uIiwiQ3VzdG9tTWlncmF0aW9uTWFwIiwibWlncmF0aW9uc0RpcmVjdG9yeVBhdGgiLCJtaWdyYXRpb25zIiwiTWlncmF0aW9ucyIsImZyb21DdXN0b21NaWdyYXRpb25NYXBBbmRNaWdyYXRpb25zRGlyZWN0b3J5UGF0aCIsImxvZyIsImRlYnVnIiwiT2JqZWN0IiwiYXNzaWduIiwiYXBwbHlNaWdyYXRpb25PcGVyYXRpb24iLCJvcGVyYXRpb25zIiwiZ2V0VmVyc2lvbiIsImFwcGx5TWlncmF0aW9uIiwidXBkYXRlVmVyc2lvbiIsInRyYW5zYWN0aW9uIiwiY29tcGxldGVkIiwiZXJyb3IiLCJmaW5pc2hlZCIsImNvbm5lY3Rpb24iLCJhYm9ydCIsInByb2NlZWQiLCJjb21wbGV0ZSIsIm1pZ3JhdGlvblNRTE1hcCIsInNlbGVjdE1heGltdW1WZXJzaW9uTWlncmF0aW9uU1FMIiwic3FsIiwiZ2V0TG9nIiwic2VsZWN0TWF4aW11bVZlcnNpb24iLCJyb3dzIiwiZmlyc3RSb3ciLCJtYXhpbXVtX3ZlcnNpb24iLCJ2ZXJzaW9uIiwiaW5zZXJ0VmVyc2lvbk1pZ3JhdGlvblNRTCIsImluc2VydFZlcnNpb24iLCJtaWdyYXRpb24iLCJyZXRyaWV2ZU1pZ3JhdGlvbiIsImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFZQTs7O2VBQXdCQTs7OzJCQVY4QjttRUFFL0I7b0VBQ0M7MkJBRTRCOzs7Ozs7QUFFcEQsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0MseUJBQWMsRUFDMUIsRUFBRUMsTUFBTSxFQUFFLEdBQUdDLGdDQUFxQjtBQUV6QixTQUFTSix5QkFBeUJLLElBQUksRUFBRUMsSUFBSSxFQUFFQyxPQUFPO0lBQ2xFLE1BQU0sRUFBRUMsYUFBYSxFQUFFQyxrQkFBa0IsRUFBRUMsdUJBQXVCLEVBQUUsR0FBR0gsU0FDakVJLGFBQWFDLG1CQUFVLENBQUNDLGdEQUFnRCxDQUFDSixvQkFBb0JDLDBC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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return migrate;
    }
});
const _initialise = /*#__PURE__*/ _interop_require_default(require("./migrate/operation/initialise"));
const _applyMigrations = /*#__PURE__*/ _interop_require_default(require("./migrate/operation/applyMigrations"));
const _necessary = require("necessary");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { sequence } = _necessary.asynchronousUtilities;
function migrate(configuration, migrationsDirectoryPath, CustomMigrationMap, callback) {
    if (callback === undefined) {
        callback = CustomMigrationMap; ///
        CustomMigrationMap = {};
    }
    const callbacks = [
        _initialise.default,
        _applyMigrations.default
    ], error = false, context = {
        error,
        configuration,
        CustomMigrationMap,
        migrationsDirectoryPath
    };
    sequence(callbacks, ()=>{
        const { error } = context;
        callback(error);
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgaW5pdGlhbGlzZU9wZXJhdGlvbiBmcm9tIFwiLi9taWdyYXRlL29wZXJhdGlvbi9pbml0aWFsaXNlXCI7XG5pbXBvcnQgYXBwbHlNaWdyYXRpb25zT3BlcmF0aW9uIGZyb20gXCIuL21pZ3JhdGUvb3BlcmF0aW9uL2FwcGx5TWlncmF0aW9uc1wiO1xuXG5pbXBvcnQgeyBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgc2VxdWVuY2UgfSA9IGFzeW5jaHJvbm91c1V0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWlncmF0ZShjb25maWd1cmF0aW9uLCBtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCwgQ3VzdG9tTWlncmF0aW9uTWFwLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIGNhbGxiYWNrID0gQ3VzdG9tTWlncmF0aW9uTWFwOyAvLy9cblxuICAgIEN1c3RvbU1pZ3JhdGlvbk1hcCA9IHt9O1xuICB9XG5cbiAgY29uc3QgY2FsbGJhY2tzID0gW1xuICAgICAgICAgIGluaXRpYWxpc2VPcGVyYXRpb24sXG4gICAgICAgICAgYXBwbHlNaWdyYXRpb25zT3BlcmF0aW9uXG4gICAgICAgIF0sXG4gICAgICAgIGVycm9yID0gZmFsc2UsICAvLy9cbiAgICAgICAgY29udGV4dCA9IHtcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgIEN1c3RvbU1pZ3JhdGlvbk1hcCxcbiAgICAgICAgICBtaWdyYXRpb25zRGlyZWN0b3J5UGF0aFxuICAgICAgICB9O1xuXG4gIHNlcXVlbmNlKGNhbGxiYWNrcywgKCkgPT4ge1xuICAgIGNvbnN0IHsgZXJyb3IgfSA9IGNvbnRleHQ7XG5cbiAgICBjYWxsYmFjayhlcnJvcik7XG4gIH0sIGNvbnRleHQpO1xufVxuIl0sIm5hbWVzIjpbIm1pZ3JhdGUiLCJzZXF1ZW5jZSIsImFzeW5jaHJvbm91c1V0aWxpdGllcyIsImNvbmZpZ3VyYXRpb24iLCJtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCIsIkN1c3RvbU1pZ3JhdGlvbk1hcCIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiY2FsbGJhY2tzIiwiaW5pdGlhbGlzZU9wZXJhdGlvbiIsImFwcGx5TWlncmF0aW9uc09wZXJhdGlvbiIsImVycm9yIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBU0E7OztlQUF3QkE7OzttRUFQUTt3RUFDSzsyQkFFQzs7Ozs7O0FBRXRDLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdDLGdDQUFxQjtBQUUzQixTQUFTRixRQUFRRyxhQUFhLEVBQUVDLHVCQUF1QixFQUFFQyxrQkFBa0IsRUFBRUMsUUFBUTtJQUNsRyxJQUFJQSxhQUFhQyxXQUFXO1FBQzFCRCxXQUFXRCxvQkFBb0IsR0FBRztRQUVsQ0EscUJBQXFCLENBQUM7SUFDeEI7SUFFQSxNQUFNRyxZQUFZO1FBQ1ZDLG1CQUFtQjtRQUNuQkMsd0JBQXdCO0tBQ3pCLEVBQ0RDLFFBQVEsT0FDUkMsVUFBVTtRQUNSRDtRQUNBUjtRQUNBRTtRQUNBRDtJQUNGO0lBRU5ILFNBQVNPLFdBQVc7UUFDbEIsTUFBTSxFQUFFRyxLQUFLLEVBQUUsR0FBR0M7UUFFbEJOLFNBQVNLO0lBQ1gsR0FBR0M7QUFDTCJ9
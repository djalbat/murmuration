"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CustomMigration;
    }
});
var _necessary = require("necessary");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var second = _necessary.arrayUtilities.second;
var CustomMigration = /*#__PURE__*/ function() {
    function CustomMigration(filePath) {
        _class_call_check(this, CustomMigration);
        this.filePath = filePath;
    }
    _create_class(CustomMigration, [
        {
            key: "getFilePath",
            value: function getFilePath() {
                return this.filePath;
            }
        },
        {
            key: "getVersion",
            value: function getVersion() {
                var matches = this.filePath.match(/(\d+)-.+$/), secondMatch = second(matches), version = secondMatch; ///
                return version;
            }
        },
        {
            key: "apply",
            value: function apply(connection, callback) {
                var log = connection.getLog(), version = this.getVersion();
                log.info("Applying custom migration version ".concat(version, "..."));
                var error = true;
                callback(error);
            }
        }
    ], [
        {
            key: "fromFilePath",
            value: function fromFilePath(filePath) {
                var customMigration = new CustomMigration(filePath);
                return customMigration;
            }
        }
    ]);
    return CustomMigration;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRlL2N1c3RvbU1pZ3JhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgIGNsYXNzIEN1c3RvbU1pZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGZpbGVQYXRoKSB7XG4gICAgdGhpcy5maWxlUGF0aCA9IGZpbGVQYXRoO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVBhdGg7XG4gIH1cblxuICBnZXRWZXJzaW9uKCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLmZpbGVQYXRoLm1hdGNoKC8oXFxkKyktLiskLyksXG4gICAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgICAgdmVyc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG5cbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuICBcbiAgYXBwbHkoY29ubmVjdGlvbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpLFxuICAgICAgICAgIHZlcnNpb24gPSB0aGlzLmdldFZlcnNpb24oKTtcblxuICAgIGxvZy5pbmZvKGBBcHBseWluZyBjdXN0b20gbWlncmF0aW9uIHZlcnNpb24gJHt2ZXJzaW9ufS4uLmApO1xuXG4gICAgY29uc3QgZXJyb3IgPSB0cnVlO1xuXG4gICAgY2FsbGJhY2soZXJyb3IpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgY3VzdG9tTWlncmF0aW9uID0gbmV3IEN1c3RvbU1pZ3JhdGlvbihmaWxlUGF0aCk7XG4gICAgXG4gICAgcmV0dXJuIGN1c3RvbU1pZ3JhdGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkN1c3RvbU1pZ3JhdGlvbiIsInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwiZmlsZVBhdGgiLCJnZXRGaWxlUGF0aCIsImdldFZlcnNpb24iLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCIsInZlcnNpb24iLCJhcHBseSIsImNvbm5lY3Rpb24iLCJjYWxsYmFjayIsImxvZyIsImdldExvZyIsImluZm8iLCJlcnJvciIsImZyb21GaWxlUGF0aCIsImN1c3RvbU1pZ3JhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFNc0JBOzs7eUJBSlM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9CLElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRVEsSUFBQSxBQUFNRCxnQ0FBTjthQUFNQSxnQkFDUkcsUUFBUTtnQ0FEQUg7UUFFbEIsSUFBSSxDQUFDRyxRQUFRLEdBQUdBOztrQkFGRUg7O1lBS3BCSSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNELFFBQVE7WUFDdEI7OztZQUVBRSxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsVUFBVSxJQUFJLENBQUNILFFBQVEsQ0FBQ0ksS0FBSyxDQUFDLGNBQzlCQyxjQUFjUCxPQUFPSyxVQUNyQkcsVUFBVUQsYUFBYyxHQUFHO2dCQUVqQyxPQUFPQztZQUNUOzs7WUFFQUMsS0FBQUE7bUJBQUFBLFNBQUFBLE1BQU1DLFVBQVUsRUFBRUMsUUFBUTtnQkFDeEIsSUFBTUMsTUFBTUYsV0FBV0csTUFBTSxJQUN2QkwsVUFBVSxJQUFJLENBQUNKLFVBQVU7Z0JBRS9CUSxJQUFJRSxJQUFJLENBQUMsQUFBQyxxQ0FBNEMsT0FBUk4sU0FBUTtnQkFFdEQsSUFBTU8sUUFBUTtnQkFFZEosU0FBU0k7WUFDWDs7OztZQUVPQyxLQUFBQTttQkFBUCxTQUFPQSxhQUFhZCxRQUFRO2dCQUMxQixJQUFNZSxrQkFBa0IsSUE3Qk5sQixnQkE2QjBCRztnQkFFNUMsT0FBT2U7WUFDVDs7O1dBaENvQmxCIn0=
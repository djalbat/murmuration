"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Migrations;
    }
});
var _necessary = require("necessary");
var _migration = /*#__PURE__*/ _interop_require_default(require("./migration"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var readDirectory = _necessary.fileSystemUtilities.readDirectory, concatenatePaths = _necessary.pathUtilities.concatenatePaths;
var Migrations = /*#__PURE__*/ function() {
    function Migrations(map) {
        _class_call_check(this, Migrations);
        this.map = map;
    }
    _create_class(Migrations, [
        {
            key: "retrieveMigration",
            value: function retrieveMigration(version) {
                var migration = this.map[version] || null;
                return migration;
            }
        }
    ], [
        {
            key: "fromCustomMigrationMapAndMigrationsDirectoryPath",
            value: function fromCustomMigrationMapAndMigrationsDirectoryPath(CustomMigrationMap, migrationsDirectoryPath) {
                var map = {}, entryNames = readDirectory(migrationsDirectoryPath), sqlFileNames = sqlFileNamesFromEntryNames(entryNames), customTextFileNames = customTextFileNamesFromEEntryNames(entryNames);
                sqlFileNames.forEach(function(sqlFileName) {
                    var filePath = concatenatePaths(migrationsDirectoryPath, sqlFileName), migration = _migration.default.fromFilePath(filePath), version = migration.getVersion();
                    map[version] = migration;
                });
                customTextFileNames.forEach(function(customTextFileName) {
                    var filePath = concatenatePaths(migrationsDirectoryPath, customTextFileName), CustomMigration = CustomMigrationMap[customTextFileName], customMigration = CustomMigration.fromFilePath(filePath), migration = customMigration, version = migration.getVersion();
                    map[version] = migration;
                });
                var migrations = new Migrations(map);
                return migrations;
            }
        }
    ]);
    return Migrations;
}();
function customTextFileNamesFromEEntryNames(entryNames) {
    return fileNamesFromEntryNames(entryNames, function(entryName) {
        return /.+CUSTOM\.txt$/.test(entryName);
    });
}
function sqlFileNamesFromEntryNames(entryNames) {
    return fileNamesFromEntryNames(entryNames, function(entryName) {
        return /.+\.sql$/.test(entryName);
    });
}
function fileNamesFromEntryNames(entryNames, test) {
    var fileNames = entryNames.reduce(function(fileNames, entryName) {
        var entryNameSQLFileName = test(entryName);
        if (entryNameSQLFileName) {
            var fileName = entryName;
            fileNames.push(fileName);
        }
        return fileNames;
    }, []);
    return fileNames;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRlL21pZ3JhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBNaWdyYXRpb24gZnJvbSBcIi4vbWlncmF0aW9uXCI7XG5cbmNvbnN0IHsgcmVhZERpcmVjdG9yeSB9ID0gZmlsZVN5c3RlbVV0aWxpdGllcyxcbiAgICAgIHsgY29uY2F0ZW5hdGVQYXRocyB9ID0gcGF0aFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlncmF0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKG1hcCkge1xuICAgIHRoaXMubWFwID0gbWFwO1xuICB9XG5cbiAgcmV0cmlldmVNaWdyYXRpb24odmVyc2lvbikge1xuICAgIGNvbnN0IG1pZ3JhdGlvbiA9IHRoaXMubWFwW3ZlcnNpb25dIHx8IG51bGw7XG5cbiAgICByZXR1cm4gbWlncmF0aW9uO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUN1c3RvbU1pZ3JhdGlvbk1hcEFuZE1pZ3JhdGlvbnNEaXJlY3RvcnlQYXRoKEN1c3RvbU1pZ3JhdGlvbk1hcCwgbWlncmF0aW9uc0RpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBtYXAgPSB7fSxcbiAgICAgICAgICBlbnRyeU5hbWVzID0gcmVhZERpcmVjdG9yeShtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgc3FsRmlsZU5hbWVzID0gc3FsRmlsZU5hbWVzRnJvbUVudHJ5TmFtZXMoZW50cnlOYW1lcyksXG4gICAgICAgICAgY3VzdG9tVGV4dEZpbGVOYW1lcyA9IGN1c3RvbVRleHRGaWxlTmFtZXNGcm9tRUVudHJ5TmFtZXMoZW50cnlOYW1lcyk7XG5cbiAgICBzcWxGaWxlTmFtZXMuZm9yRWFjaCgoc3FsRmlsZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gY29uY2F0ZW5hdGVQYXRocyhtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCwgc3FsRmlsZU5hbWUpLFxuICAgICAgICAgICAgbWlncmF0aW9uID0gTWlncmF0aW9uLmZyb21GaWxlUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgICB2ZXJzaW9uID0gbWlncmF0aW9uLmdldFZlcnNpb24oKTtcblxuICAgICAgbWFwW3ZlcnNpb25dID0gbWlncmF0aW9uO1xuICAgIH0pO1xuXG4gICAgY3VzdG9tVGV4dEZpbGVOYW1lcy5mb3JFYWNoKChjdXN0b21UZXh0RmlsZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gY29uY2F0ZW5hdGVQYXRocyhtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCwgY3VzdG9tVGV4dEZpbGVOYW1lKSxcbiAgICAgICAgICAgIEN1c3RvbU1pZ3JhdGlvbiA9IEN1c3RvbU1pZ3JhdGlvbk1hcFtjdXN0b21UZXh0RmlsZU5hbWVdLFxuICAgICAgICAgICAgY3VzdG9tTWlncmF0aW9uID0gQ3VzdG9tTWlncmF0aW9uLmZyb21GaWxlUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgICBtaWdyYXRpb24gPSBjdXN0b21NaWdyYXRpb24sICAvLy9cbiAgICAgICAgICAgIHZlcnNpb24gPSBtaWdyYXRpb24uZ2V0VmVyc2lvbigpO1xuXG4gICAgICBtYXBbdmVyc2lvbl0gPSBtaWdyYXRpb247XG4gICAgfSk7XG5cbiAgICBjb25zdCBtaWdyYXRpb25zID0gbmV3IE1pZ3JhdGlvbnMobWFwKTtcblxuICAgIHJldHVybiBtaWdyYXRpb25zO1xuICB9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbVRleHRGaWxlTmFtZXNGcm9tRUVudHJ5TmFtZXMoZW50cnlOYW1lcykgeyByZXR1cm4gZmlsZU5hbWVzRnJvbUVudHJ5TmFtZXMoZW50cnlOYW1lcywgKGVudHJ5TmFtZSkgPT4gLy4rQ1VTVE9NXFwudHh0JC8udGVzdChlbnRyeU5hbWUpKTsgfVxuXG5mdW5jdGlvbiBzcWxGaWxlTmFtZXNGcm9tRW50cnlOYW1lcyhlbnRyeU5hbWVzKSB7IHJldHVybiBmaWxlTmFtZXNGcm9tRW50cnlOYW1lcyhlbnRyeU5hbWVzLCAoZW50cnlOYW1lKSA9PiAvLitcXC5zcWwkLy50ZXN0KGVudHJ5TmFtZSkpOyB9XG5cbmZ1bmN0aW9uIGZpbGVOYW1lc0Zyb21FbnRyeU5hbWVzKGVudHJ5TmFtZXMsIHRlc3QpIHtcbiAgY29uc3QgZmlsZU5hbWVzID0gZW50cnlOYW1lcy5yZWR1Y2UoKGZpbGVOYW1lcywgZW50cnlOYW1lKSA9PiB7XG4gICAgY29uc3QgZW50cnlOYW1lU1FMRmlsZU5hbWUgPSB0ZXN0KGVudHJ5TmFtZSk7XG5cbiAgICBpZiAoZW50cnlOYW1lU1FMRmlsZU5hbWUpIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZW50cnlOYW1lO1xuXG4gICAgICBmaWxlTmFtZXMucHVzaChmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lcztcbiAgfSwgW10pO1xuXG4gIHJldHVybiBmaWxlTmFtZXM7XG59XG4iXSwibmFtZXMiOlsiTWlncmF0aW9ucyIsInJlYWREaXJlY3RvcnkiLCJmaWxlU3lzdGVtVXRpbGl0aWVzIiwiY29uY2F0ZW5hdGVQYXRocyIsInBhdGhVdGlsaXRpZXMiLCJtYXAiLCJyZXRyaWV2ZU1pZ3JhdGlvbiIsInZlcnNpb24iLCJtaWdyYXRpb24iLCJmcm9tQ3VzdG9tTWlncmF0aW9uTWFwQW5kTWlncmF0aW9uc0RpcmVjdG9yeVBhdGgiLCJDdXN0b21NaWdyYXRpb25NYXAiLCJtaWdyYXRpb25zRGlyZWN0b3J5UGF0aCIsImVudHJ5TmFtZXMiLCJzcWxGaWxlTmFtZXMiLCJzcWxGaWxlTmFtZXNGcm9tRW50cnlOYW1lcyIsImN1c3RvbVRleHRGaWxlTmFtZXMiLCJjdXN0b21UZXh0RmlsZU5hbWVzRnJvbUVFbnRyeU5hbWVzIiwiZm9yRWFjaCIsInNxbEZpbGVOYW1lIiwiZmlsZVBhdGgiLCJNaWdyYXRpb24iLCJmcm9tRmlsZVBhdGgiLCJnZXRWZXJzaW9uIiwiY3VzdG9tVGV4dEZpbGVOYW1lIiwiQ3VzdG9tTWlncmF0aW9uIiwiY3VzdG9tTWlncmF0aW9uIiwibWlncmF0aW9ucyIsImZpbGVOYW1lc0Zyb21FbnRyeU5hbWVzIiwiZW50cnlOYW1lIiwidGVzdCIsImZpbGVOYW1lcyIsInJlZHVjZSIsImVudHJ5TmFtZVNRTEZpbGVOYW1lIiwiZmlsZU5hbWUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQVNxQkE7Ozt5QkFQOEI7Z0VBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXRCLElBQU0sQUFBRUMsZ0JBQWtCQyw4QkFBbUIsQ0FBckNELGVBQ0YsQUFBRUUsbUJBQXFCQyx3QkFBYSxDQUFsQ0Q7QUFFTyxJQUFBLEFBQU1ILDJCQUFOO2FBQU1BLFdBQ1BLLEdBQUc7Z0NBRElMO1FBRWpCLElBQUksQ0FBQ0ssR0FBRyxHQUFHQTs7a0JBRk1MOztZQUtuQk0sS0FBQUE7bUJBQUFBLFNBQUFBLGtCQUFrQkMsT0FBTztnQkFDdkIsSUFBTUMsWUFBWSxJQUFJLENBQUNILEdBQUcsQ0FBQ0UsUUFBUSxJQUFJO2dCQUV2QyxPQUFPQztZQUNUOzs7O1lBRU9DLEtBQUFBO21CQUFQLFNBQU9BLGlEQUFpREMsa0JBQWtCLEVBQUVDLHVCQUF1QjtnQkFDakcsSUFBTU4sTUFBTSxDQUFDLEdBQ1BPLGFBQWFYLGNBQWNVLDBCQUMzQkUsZUFBZUMsMkJBQTJCRixhQUMxQ0csc0JBQXNCQyxtQ0FBbUNKO2dCQUUvREMsYUFBYUksT0FBTyxDQUFDLFNBQUNDO29CQUNwQixJQUFNQyxXQUFXaEIsaUJBQWlCUSx5QkFBeUJPLGNBQ3JEVixZQUFZWSxrQkFBUyxDQUFDQyxZQUFZLENBQUNGLFdBQ25DWixVQUFVQyxVQUFVYyxVQUFVO29CQUVwQ2pCLEdBQUcsQ0FBQ0UsUUFBUSxHQUFHQztnQkFDakI7Z0JBRUFPLG9CQUFvQkUsT0FBTyxDQUFDLFNBQUNNO29CQUMzQixJQUFNSixXQUFXaEIsaUJBQWlCUSx5QkFBeUJZLHFCQUNyREMsa0JBQWtCZCxrQkFBa0IsQ0FBQ2EsbUJBQW1CLEVBQ3hERSxrQkFBa0JELGdCQUFnQkgsWUFBWSxDQUFDRixXQUMvQ1gsWUFBWWlCLGlCQUNabEIsVUFBVUMsVUFBVWMsVUFBVTtvQkFFcENqQixHQUFHLENBQUNFLFFBQVEsR0FBR0M7Z0JBQ2pCO2dCQUVBLElBQU1rQixhQUFhLElBbkNGMUIsV0FtQ2lCSztnQkFFbEMsT0FBT3FCO1lBQ1Q7OztXQXRDbUIxQjs7QUF5Q3JCLFNBQVNnQixtQ0FBbUNKLFVBQVU7SUFBSSxPQUFPZSx3QkFBd0JmLFlBQVksU0FBQ2dCO2VBQWMsaUJBQWlCQyxJQUFJLENBQUNEOztBQUFhO0FBRXZKLFNBQVNkLDJCQUEyQkYsVUFBVTtJQUFJLE9BQU9lLHdCQUF3QmYsWUFBWSxTQUFDZ0I7ZUFBYyxXQUFXQyxJQUFJLENBQUNEOztBQUFhO0FBRXpJLFNBQVNELHdCQUF3QmYsVUFBVSxFQUFFaUIsSUFBSTtJQUMvQyxJQUFNQyxZQUFZbEIsV0FBV21CLE1BQU0sQ0FBQyxTQUFDRCxXQUFXRjtRQUM5QyxJQUFNSSx1QkFBdUJILEtBQUtEO1FBRWxDLElBQUlJLHNCQUFzQjtZQUN4QixJQUFNQyxXQUFXTDtZQUVqQkUsVUFBVUksSUFBSSxDQUFDRDtRQUNqQjtRQUVBLE9BQU9IO0lBQ1QsR0FBRyxFQUFFO0lBRUwsT0FBT0E7QUFDVCJ9
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Migration;
    }
});
const _necessary = require("necessary");
const _database = require("../database");
const { second } = _necessary.arrayUtilities, { readFile } = _necessary.fileSystemUtilities;
class Migration {
    constructor(filePath){
        this.filePath = filePath;
    }
    getSQL() {
        const fileContent = readFile(this.filePath), sql = fileContent; ///
        return sql;
    }
    getVersion() {
        const matches = this.filePath.match(/(\d+)-.+$/), secondMatch = second(matches), version = secondMatch; ///
        return version;
    }
    apply(connection, callback) {
        const log = connection.getLog(), sql = this.getSQL(), version = this.getVersion();
        log.info(`Applying migration version ${version}...`);
        (0, _database.execute)(connection, sql, (error)=>{
            error ? log.error("...failed!") : log.debug("...success!");
            callback(error);
        });
    }
    static fromFilePath(filePath) {
        const migration = new Migration(filePath);
        return migration;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRlL21pZ3JhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IGV4ZWN1dGUgfSBmcm9tIFwiLi4vZGF0YWJhc2VcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyByZWFkRmlsZSB9ID0gZmlsZVN5c3RlbVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWlncmF0aW9uIHtcbiAgY29uc3RydWN0b3IoZmlsZVBhdGgpIHtcbiAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XG4gIH1cblxuICBnZXRTUUwoKSB7XG4gICAgY29uc3QgZmlsZUNvbnRlbnQgPSByZWFkRmlsZSh0aGlzLmZpbGVQYXRoKSxcbiAgICAgICAgICBzcWwgPSBmaWxlQ29udGVudDsgIC8vL1xuXG4gICAgcmV0dXJuIHNxbDtcbiAgfVxuICBcbiAgZ2V0VmVyc2lvbigpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5maWxlUGF0aC5tYXRjaCgvKFxcZCspLS4rJC8pLFxuICAgICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICAgIHZlcnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cbiAgXG4gIGFwcGx5KGNvbm5lY3Rpb24sIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgbG9nID0gY29ubmVjdGlvbi5nZXRMb2coKSxcbiAgICAgICAgICBzcWwgPSB0aGlzLmdldFNRTCgpLFxuICAgICAgICAgIHZlcnNpb24gPSB0aGlzLmdldFZlcnNpb24oKTtcblxuICAgIGxvZy5pbmZvKGBBcHBseWluZyBtaWdyYXRpb24gdmVyc2lvbiAke3ZlcnNpb259Li4uYCk7XG5cbiAgICBleGVjdXRlKGNvbm5lY3Rpb24sIHNxbCwgKGVycm9yKSA9PiB7XG4gICAgICBlcnJvciA/XG4gICAgICAgIGxvZy5lcnJvcihcIi4uLmZhaWxlZCFcIikgOlxuICAgICAgICAgIGxvZy5kZWJ1ZyhcIi4uLnN1Y2Nlc3MhXCIpO1xuXG4gICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBtaWdyYXRpb24gPSBuZXcgTWlncmF0aW9uKGZpbGVQYXRoKTtcbiAgICBcbiAgICByZXR1cm4gbWlncmF0aW9uO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWlncmF0aW9uIiwic2Vjb25kIiwiYXJyYXlVdGlsaXRpZXMiLCJyZWFkRmlsZSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJmaWxlUGF0aCIsImdldFNRTCIsImZpbGVDb250ZW50Iiwic3FsIiwiZ2V0VmVyc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwidmVyc2lvbiIsImFwcGx5IiwiY29ubmVjdGlvbiIsImNhbGxiYWNrIiwibG9nIiwiZ2V0TG9nIiwiaW5mbyIsImV4ZWN1dGUiLCJlcnJvciIsImRlYnVnIiwiZnJvbUZpbGVQYXRoIiwibWlncmF0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFTQTs7O2VBQXFCQTs7OzJCQVArQjswQkFFNUI7QUFFeEIsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR0MseUJBQWMsRUFDM0IsRUFBRUMsUUFBUSxFQUFFLEdBQUdDLDhCQUFtQjtBQUV6QixNQUFNSjtJQUNuQixZQUFZSyxRQUFRLENBQUU7UUFDcEIsSUFBSSxDQUFDQSxRQUFRLEdBQUdBO0lBQ2xCO0lBRUFDLFNBQVM7UUFDUCxNQUFNQyxjQUFjSixTQUFTLElBQUksQ0FBQ0UsUUFBUSxHQUNwQ0csTUFBTUQsYUFBYyxHQUFHO1FBRTdCLE9BQU9DO0lBQ1Q7SUFFQUMsYUFBYTtRQUNYLE1BQU1DLFVBQVUsSUFBSSxDQUFDTCxRQUFRLENBQUNNLEtBQUssQ0FBQyxjQUM5QkMsY0FBY1gsT0FBT1MsVUFDckJHLFVBQVVELGFBQWMsR0FBRztRQUVqQyxPQUFPQztJQUNUO0lBRUFDLE1BQU1DLFVBQVUsRUFBRUMsUUFBUSxFQUFFO1FBQzFCLE1BQU1DLE1BQU1GLFdBQVdHLE1BQU0sSUFDdkJWLE1BQU0sSUFBSSxDQUFDRixNQUFNLElBQ2pCTyxVQUFVLElBQUksQ0FBQ0osVUFBVTtRQUUvQlEsSUFBSUUsSUFBSSxDQUFDLENBQUMsMkJBQTJCLEVBQUVOLFFBQVEsR0FBRyxDQUFDO1FBRW5ETyxJQUFBQSxpQkFBTyxFQUFDTCxZQUFZUCxLQUFLLENBQUNhO1lBQ3hCQSxRQUNFSixJQUFJSSxLQUFLLENBQUMsZ0JBQ1JKLElBQUlLLEtBQUssQ0FBQztZQUVkTixTQUFTSztRQUNYO0lBQ0Y7SUFFQSxPQUFPRSxhQUFhbEIsUUFBUSxFQUFFO1FBQzVCLE1BQU1tQixZQUFZLElBQUl4QixVQUFVSztRQUVoQyxPQUFPbUI7SUFDVDtBQUNGIn0=
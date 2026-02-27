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
const _necessary = require("necessary");
const { second } = _necessary.arrayUtilities;
class CustomMigration {
    constructor(filePath){
        this.filePath = filePath;
    }
    getFilePath() {
        return this.filePath;
    }
    getVersion() {
        const matches = this.filePath.match(/(\d+)-.+$/), secondMatch = second(matches), version = secondMatch; ///
        return version;
    }
    apply(connection, callback) {
        const log = connection.getLog(), version = this.getVersion();
        log.info(`Applying custom migration version ${version}...`);
        const error = true;
        callback(error);
    }
    static fromFilePath(filePath) {
        const customMigration = new CustomMigration(filePath);
        return customMigration;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWdyYXRlL2N1c3RvbU1pZ3JhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgIGNsYXNzIEN1c3RvbU1pZ3JhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGZpbGVQYXRoKSB7XG4gICAgdGhpcy5maWxlUGF0aCA9IGZpbGVQYXRoO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVBhdGg7XG4gIH1cblxuICBnZXRWZXJzaW9uKCkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLmZpbGVQYXRoLm1hdGNoKC8oXFxkKyktLiskLyksXG4gICAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgICAgdmVyc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG5cbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuICBcbiAgYXBwbHkoY29ubmVjdGlvbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBsb2cgPSBjb25uZWN0aW9uLmdldExvZygpLFxuICAgICAgICAgIHZlcnNpb24gPSB0aGlzLmdldFZlcnNpb24oKTtcblxuICAgIGxvZy5pbmZvKGBBcHBseWluZyBjdXN0b20gbWlncmF0aW9uIHZlcnNpb24gJHt2ZXJzaW9ufS4uLmApO1xuXG4gICAgY29uc3QgZXJyb3IgPSB0cnVlO1xuXG4gICAgY2FsbGJhY2soZXJyb3IpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgY3VzdG9tTWlncmF0aW9uID0gbmV3IEN1c3RvbU1pZ3JhdGlvbihmaWxlUGF0aCk7XG4gICAgXG4gICAgcmV0dXJuIGN1c3RvbU1pZ3JhdGlvbjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkN1c3RvbU1pZ3JhdGlvbiIsInNlY29uZCIsImFycmF5VXRpbGl0aWVzIiwiZmlsZVBhdGgiLCJnZXRGaWxlUGF0aCIsImdldFZlcnNpb24iLCJtYXRjaGVzIiwibWF0Y2giLCJzZWNvbmRNYXRjaCIsInZlcnNpb24iLCJhcHBseSIsImNvbm5lY3Rpb24iLCJjYWxsYmFjayIsImxvZyIsImdldExvZyIsImluZm8iLCJlcnJvciIsImZyb21GaWxlUGF0aCIsImN1c3RvbU1pZ3JhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBTUE7OztlQUFzQkE7OzsyQkFKUztBQUUvQixNQUFNLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyx5QkFBYztBQUVqQixNQUFNRjtJQUNwQixZQUFZRyxRQUFRLENBQUU7UUFDcEIsSUFBSSxDQUFDQSxRQUFRLEdBQUdBO0lBQ2xCO0lBRUFDLGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQ0QsUUFBUTtJQUN0QjtJQUVBRSxhQUFhO1FBQ1gsTUFBTUMsVUFBVSxJQUFJLENBQUNILFFBQVEsQ0FBQ0ksS0FBSyxDQUFDLGNBQzlCQyxjQUFjUCxPQUFPSyxVQUNyQkcsVUFBVUQsYUFBYyxHQUFHO1FBRWpDLE9BQU9DO0lBQ1Q7SUFFQUMsTUFBTUMsVUFBVSxFQUFFQyxRQUFRLEVBQUU7UUFDMUIsTUFBTUMsTUFBTUYsV0FBV0csTUFBTSxJQUN2QkwsVUFBVSxJQUFJLENBQUNKLFVBQVU7UUFFL0JRLElBQUlFLElBQUksQ0FBQyxDQUFDLGtDQUFrQyxFQUFFTixRQUFRLEdBQUcsQ0FBQztRQUUxRCxNQUFNTyxRQUFRO1FBRWRKLFNBQVNJO0lBQ1g7SUFFQSxPQUFPQyxhQUFhZCxRQUFRLEVBQUU7UUFDNUIsTUFBTWUsa0JBQWtCLElBQUlsQixnQkFBZ0JHO1FBRTVDLE9BQU9lO0lBQ1Q7QUFDRiJ9
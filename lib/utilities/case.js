"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get camelCaseToSnakeCase () {
        return camelCaseToSnakeCase;
    },
    get snakeCaseToCamelCase () {
        return snakeCaseToCamelCase;
    }
});
function camelCaseToSnakeCase(string) {
    return string.replace(/([A-Z])/g, function(match, character) {
        var lowerCaseCharacter = character.toLowerCase(), characters = "_".concat(lowerCaseCharacter);
        return characters;
    });
}
function snakeCaseToCamelCase(string) {
    return string.replace(/_(.)/g, function(match, character) {
        var upperCaseCharacter = character.toUpperCase();
        return upperCaseCharacter;
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY2FzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZVRvU25ha2VDYXNlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbQS1aXSkvZywgKG1hdGNoLCBjaGFyYWN0ZXIpID0+IHtcbiAgICBjb25zdCBsb3dlckNhc2VDaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICBjaGFyYWN0ZXJzID0gYF8ke2xvd2VyQ2FzZUNoYXJhY3Rlcn1gXG5cbiAgICByZXR1cm4gY2hhcmFjdGVycztcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFrZUNhc2VUb0NhbWVsQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9fKC4pL2csIChtYXRjaCwgY2hhcmFjdGVyKSA9PiB7XG4gICAgY29uc3QgdXBwZXJDYXNlQ2hhcmFjdGVyID0gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdXBwZXJDYXNlQ2hhcmFjdGVyO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJjYW1lbENhc2VUb1NuYWtlQ2FzZSIsInNuYWtlQ2FzZVRvQ2FtZWxDYXNlIiwic3RyaW5nIiwicmVwbGFjZSIsIm1hdGNoIiwiY2hhcmFjdGVyIiwibG93ZXJDYXNlQ2hhcmFjdGVyIiwidG9Mb3dlckNhc2UiLCJjaGFyYWN0ZXJzIiwidXBwZXJDYXNlQ2hhcmFjdGVyIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQUVnQkE7ZUFBQUE7O1FBU0FDO2VBQUFBOzs7QUFUVCxTQUFTRCxxQkFBcUJFLE1BQU07SUFDekMsT0FBT0EsT0FBT0MsT0FBTyxDQUFDLFlBQVksU0FBQ0MsT0FBT0M7UUFDeEMsSUFBTUMscUJBQXFCRCxVQUFVRSxXQUFXLElBQzFDQyxhQUFhLEFBQUMsSUFBc0IsT0FBbkJGO1FBRXZCLE9BQU9FO0lBQ1Q7QUFDRjtBQUVPLFNBQVNQLHFCQUFxQkMsTUFBTTtJQUN6QyxPQUFPQSxPQUFPQyxPQUFPLENBQUMsU0FBUyxTQUFDQyxPQUFPQztRQUNyQyxJQUFNSSxxQkFBcUJKLFVBQVVLLFdBQVc7UUFFaEQsT0FBT0Q7SUFDVDtBQUNGIn0=
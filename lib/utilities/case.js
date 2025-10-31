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
    get default () {
        return _default;
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
var _default = {
    camelCaseToSnakeCase: camelCaseToSnakeCase,
    snakeCaseToCamelCase: snakeCaseToCamelCase
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY2FzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZVRvU25ha2VDYXNlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbQS1aXSkvZywgKG1hdGNoLCBjaGFyYWN0ZXIpID0+IHtcbiAgICBjb25zdCBsb3dlckNhc2VDaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICBjaGFyYWN0ZXJzID0gYF8ke2xvd2VyQ2FzZUNoYXJhY3Rlcn1gXG5cbiAgICByZXR1cm4gY2hhcmFjdGVycztcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFrZUNhc2VUb0NhbWVsQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9fKC4pL2csIChtYXRjaCwgY2hhcmFjdGVyKSA9PiB7XG4gICAgY29uc3QgdXBwZXJDYXNlQ2hhcmFjdGVyID0gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdXBwZXJDYXNlQ2hhcmFjdGVyO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjYW1lbENhc2VUb1NuYWtlQ2FzZSxcbiAgc25ha2VDYXNlVG9DYW1lbENhc2UsXG59OyJdLCJuYW1lcyI6WyJjYW1lbENhc2VUb1NuYWtlQ2FzZSIsInNuYWtlQ2FzZVRvQ2FtZWxDYXNlIiwic3RyaW5nIiwicmVwbGFjZSIsIm1hdGNoIiwiY2hhcmFjdGVyIiwibG93ZXJDYXNlQ2hhcmFjdGVyIiwidG9Mb3dlckNhc2UiLCJjaGFyYWN0ZXJzIiwidXBwZXJDYXNlQ2hhcmFjdGVyIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQUVnQkE7ZUFBQUE7O1FBaUJoQjtlQUFBOztRQVJnQkM7ZUFBQUE7OztBQVRULFNBQVNELHFCQUFxQkUsTUFBTTtJQUN6QyxPQUFPQSxPQUFPQyxPQUFPLENBQUMsWUFBWSxTQUFDQyxPQUFPQztRQUN4QyxJQUFNQyxxQkFBcUJELFVBQVVFLFdBQVcsSUFDMUNDLGFBQWEsQUFBQyxJQUFzQixPQUFuQkY7UUFFdkIsT0FBT0U7SUFDVDtBQUNGO0FBRU8sU0FBU1AscUJBQXFCQyxNQUFNO0lBQ3pDLE9BQU9BLE9BQU9DLE9BQU8sQ0FBQyxTQUFTLFNBQUNDLE9BQU9DO1FBQ3JDLElBQU1JLHFCQUFxQkosVUFBVUssV0FBVztRQUVoRCxPQUFPRDtJQUNUO0FBQ0Y7SUFFQSxXQUFlO0lBQ2JULHNCQUFBQTtJQUNBQyxzQkFBQUE7QUFDRiJ9
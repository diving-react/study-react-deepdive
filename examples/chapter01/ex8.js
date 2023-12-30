/**
 * @fileoverview 원시타입 String
 * @description 문자열은 불변이다.
 */
const foo = "bar";

console.log(foo[0]); // "b"

// 앞글자를 다른 글자로 변경
console.log(foo.replace("b", "f")); // "far"

// foo는 변경되지 않는다.
foo[0] = "e";
console.log(foo); // "bar"

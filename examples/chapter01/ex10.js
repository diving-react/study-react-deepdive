/**
 * @fileoverview 참조타입 Object
 * @description 객체, 배열, 함수의 타입 확인
 */
typeof [] === "object"; // true
typeof {} === "object"; // true
typeof function () {} === "function"; // true

function hello() {}
typeof hello === "function"; // true

const bar = () => {};
const baz = function () {};
const boo = function () {};

// arrow function과 일반 function의 차이점은 this의 바인딩이다.
bar === baz; // false

// baz와 boo는 참조가 다르기 때문에 false가 된다.
baz === boo; // false

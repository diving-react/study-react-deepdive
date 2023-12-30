/**
 * @fileOverview Object.js
 * @description Object.is를 사용하더라도 객체 비교 원리와 같다.
 */

Object.is({}, {}); // false

const obj1 = {
  a: 1,
};

const obj2 = obj1;

console.log(obj1 === obj2); // true
console.log(Object.is(obj1, obj2)); // true
// 일치비교 연산자와 Object.js는 객체간에 비교에 있어서 동일한 동작을 한다.

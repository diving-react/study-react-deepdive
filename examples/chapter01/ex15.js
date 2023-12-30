/**
 * @fileOverview Object.is
 * @description Object.is가 == 연산자와 === 연산자와 다른 점
 */

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

-0 === +0; // true
Object.is(-0, +0); // false

NaN === 0 / 0; // false
Object.is(NaN, 0 / 0); // true

/**
 * @fileOverview 값을 저장하는 방식의 차이
 * @description 변수에 값을 저장하는 2가지 방식 중 하나는 값 자체를 저장하는 것이다.
 */
let hello = "hello";
let hi = hello;

console.log(hello === hi); // true // hello 값을 hi에 복사했기 때문에 true가 된다.

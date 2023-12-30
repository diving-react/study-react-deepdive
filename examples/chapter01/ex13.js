/**
 * @fileOverview Object
 *
 */
// 다음 객체는 완벽하게 동일한 내용을 가지고 있지만, 참조가 다르기 때문에 false가 된다.
// 참조가 다른 이유: 객체는 참조타입이기 때문에 객체를 생성할 때마다 새로운 참조를 생성한다.
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false

// 그러나 다음과 같이 원시값인 내부 속성값을 비교하면 동일하다.
console.log(obj1.a === obj2.a); // true

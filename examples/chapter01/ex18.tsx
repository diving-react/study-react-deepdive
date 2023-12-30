/**
 * @fileoverview 리액트에서의 동등 비교: shallowEqual
 * @description Object.is로 먼저 비교를 한 후, 객체간 얕은 비교를 수행
 * *객체간 얕은 비교? 객체의 첫번째 깊이의 프로퍼티 값들을 비교하는 것
 */

// Object.is는 참조가 다른 객체 비교가 불가능하다.
Object.is({ prop: "value" }, { prop: "value" }); // false

// 반면, shallowEqual은 참조가 다른 객체라도 프로퍼티 값이 동일하다면 true를 반환한다.
// 이때 shallowEqual은 객체의 첫번째 깊이의 프로퍼티 값들을 비교한다.
shallowEqual({ prop: "value" }, { prop: "value" }); // true

// 그러나 2번째 깊이의 프로퍼티 값들은 비교하지 않는다.
shallowEqual({ prop: { prop: "value" } }, { prop: { prop: "value" } }); // false

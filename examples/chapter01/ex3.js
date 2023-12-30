/**
 * @fileoverview 원시타입 Boolean
 * @description Truthy와 Falsy
 */
if (1) {
  // true
}

if (0) {
  // false
}

if (NaN) {
  // false
}

// 조건문 외에도 truthy와 falsy를 Boolean()을 통해 확인 할 수 도 있다.
Boolean(1); // true
Boolean(0); // false
Boolean(NaN); // false

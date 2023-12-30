/**
 * @fileoverview 원시타입 Number
 * @description 2진수, 8진수, 10진수, 16진수
 */
const 이진수_2 = 0b10; // 2
이진수_2 == (2).toString(2); // true (2)를 괄호로 선언한 이유는 2뒤에 .을 붙이면 실수로 인식하기 때문이다.

const 팔진수_8 = 0o10; // 8
팔진수_8 == (8).toString(8); // true

10 == (10).toString(10); // true

const 십육진수_16 = 0x10; // 16
십육진수_16 == (16).toString(16); // true

/**
 * @fileoverview 원시타입 Number
 * @description BigInt 등장 이전에 Number가 표현할 수 있는 숫자의 한계가 있었다. 이를 해결하기 위해 BigInt가 등장했다.
 */
const a = 1;

const maxInteger = Math.pow(2, 53);
maxInteger === Number.MAX_SAFE_INTEGER; // true

const minInteger = -Math.pow(2, 53);
minInteger === Number.MIN_SAFE_INTEGER; // true

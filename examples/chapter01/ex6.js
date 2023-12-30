/**
 * @fileoverview 원시타입 BigInt
 */
// 기존의 number의 한계
9007199254740992 === 9007199254740993; // true
// 마지막 숫자는 다른데 true가 나온다. 이는 더이상 숫자를 표현할 수 없기 때문이다.

const maxInteger = Number.MAX_SAFE_INTEGER;
console.log(maxInteger + 5 === maxInteger + 6); // true

const bigInt1 = 9007199254740992n; // 끝에 n을 붙여서 bigInt로 만들 수 있다.
const bigInt2 = BigInt(9007199254740992); // BigInt()를 사용해서 만들 수 있다.

const number = 9007199254740992;
const bigInt = 9007199254740992n;

typeof number;
typeof bigInt;

number == bigInt; // true
number === bigInt; // false

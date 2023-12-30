/**
 * @fileOverview 심볼
 * @description 심볼은 유일한 식별자를 만들기 위해 사용한다.
 */
// symbol함수에 같은 인수를 넘겨주더라도 이는 동일한 값으로 인정되지 않는다.
// 심볼 함수 내부에 넘겨주는 값은 Symbol 생성에 영향을 미치지 않는다.(예외: Symbol.for)
const symbol1 = Symbol("symbol");
const symbol2 = Symbol("symbol");
console.log(symbol1 === symbol2); // false

// 동일한 값을 사용하기 위해서는 Symbol.for를 사용한다.
const symbol3 = Symbol.for("symbol");
const symbol4 = Symbol.for("symbol");
console.log(symbol3 === symbol4); // true

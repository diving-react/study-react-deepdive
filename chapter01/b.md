# 01장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트

- [01장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트](#01장-리액트-개발을-위해-꼭-알아야-할-자바스크립트)
  - [1.1 자바스크립트의 동등 비교](#11-자바스크립트의-동등-비교)
    - [1.1.1 자바스크립트의 데이터 타입](#111-자바스크립트의-데이터-타입)
    - [1.1.2 값을 저장하는 방식의 차이](#112-값을-저장하는-방식의-차이)
    - [1.1.3 자바스크립트의 또 다른 비교 공식, `Object.is`](#113-자바스크립트의-또-다른-비교-공식-objectis)
      - [`Object.is()` 함수](#objectis-함수)
      - [`==` vs `Object.is`](#-vs-objectis)
      - [`===` vs `Object.is`](#-vs-objectis-1)
    - [1.1.4 리액트에서의 동등 비교](#114-리액트에서의-동등-비교)
      - [`shallowEqual` 함수](#shallowequal-함수)
      - [`Object.is()` 함수와의 차이점](#objectis-함수와의-차이점)
      - [`shallowEqual` 함수 사용 시 주의 사항](#shallowequal-함수-사용-시-주의-사항)
  - [1.2 함수](#12-함수)
    - [1.2.1 함수란 무엇인가?](#121-함수란-무엇인가)
      - [함수 선언](#함수-선언)
      - [함수 호출](#함수-호출)
    - [1.2.2 함수를 정의하는 4가지 방법](#122-함수를-정의하는-4가지-방법)
      - [함수 선언문](#함수-선언문)
      - [함수 표현식](#함수-표현식)
      - [화살표 함수](#화살표-함수)
      - [Function 생성자 함수](#function-생성자-함수)
      - [함수 정의 방법 비교](#함수-정의-방법-비교)
    - [1.2.3 다양한 함수 살펴보기](#123-다양한-함수-살펴보기)
      - [즉시 실행 함수(IIFE)](#즉시-실행-함수iife)
      - [고차 함수](#고차-함수)
    - [1.2.4 함수를 만들 때 주의해야 할 사항](#124-함수를-만들-때-주의해야-할-사항)
  - [1.3 클래스](#13-클래스)
    - [1.3.1 클래스란 무엇인가?](#131-클래스란-무엇인가)
    - [1.3.2 클래스와 함수의 관계](#132-클래스와-함수의-관계)
  - [1.4 클로저](#14-클로저)
    - [1.4.1 클로저의 정의](#141-클로저의-정의)
    - [1.4.2 변수의 유효 범위, 스코프](#142-변수의-유효-범위-스코프)
    - [1.4.3 클로저의 활용](#143-클로저의-활용)
    - [1.4.4 주의할 점](#144-주의할-점)
  - [1.5 이벤트 루프와 비동기 통신의 이해](#15-이벤트-루프와-비동기-통신의-이해)
    - [1.5.1 싱글 스레드 자바스크립트](#151-싱글-스레드-자바스크립트)
    - [1.5.2 이벤트 루프란?](#152-이벤트-루프란)
    - [1.5.3 태스크 큐와 마이크로 태스크 큐](#153-태스크-큐와-마이크로-태스크-큐)
  - [1.6 리액트에서 자주 사용하는 자바스크립트 문법](#16-리액트에서-자주-사용하는-자바스크립트-문법)
    - [1.6.1 구조 분해 할당](#161-구조-분해-할당)
    - [1.6.2 전개 구문](#162-전개-구문)
    - [1.6.3 객체 초기자](#163-객체-초기자)
    - [1.6.4 Array 프로토타입의 메서드: map, filter, reduce, forEach](#164-array-프로토타입의-메서드-map-filter-reduce-foreach)
    - [1.6.5 삼항 조건 연산자](#165-삼항-조건-연산자)
  - [1.7 선택이 아닌 필수, 타입스크립트](#17-선택이-아닌-필수-타입스크립트)
    - [1.7.1 타입스크립트란?](#171-타입스크립트란)
    - [1.7.2 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법](#172-리액트-코드를-효과적으로-작성하기-위한-타입스크립트-활용법)
    - [1.7.3 타입스크립트 전환 가이드](#173-타입스크립트-전환-가이드)

<br>

## 1.1 자바스크립트의 동등 비교

### 1.1.1 자바스크립트의 데이터 타입


| 데이터 타입         | 설명                                              | 예시                                         |
|------------------|-------------------------------------------------|-------------------------------------------|
| **원시 타입**      | 객체가 아닌 모든 타입                              |                                           |
| 숫자 (number)    | 정수 또는 실수                                      | `42`, `3.14`, `-100`                      |
| 문자열 (string)  | 텍스트 데이터                                       | `"Hello, world!"`, `'안녕하세요'`          |
| 불리언 (boolean) | 참 또는 거짓                                        | `true`, `false`                           |
| null             | 값이 없음을 나타냄                                    | `null`                                    |
| undefined        | 변수가 선언되었지만 값이 할당되지 않음 (자바스크립트에서 지원) | `undefined`                               |
| 심볼 (symbol)    | 유일한 값을 나타내는 식별자                              | `Symbol('unique')`                        |
| **객체 타입**      | 7가지 원시 타입 이외의 모든 것: 객체, 배열, 함수 등   |                                           |
| 객체 (object)    | 프로퍼티와 메서드의 집합                             | `{}`                                      |
| 배열 (array)     | 순서가 있는 데이터의 집합                            | `[1, "apple", true]`                      |
| 함수 (function)  | 코드를 실행하는 블록                                 | `function add(x, y) { return x + y; }`    |

<br>

### 1.1.2 값을 저장하는 방식의 차이

| 기능 | 기본 데이터 타입 | 참조 데이터 타입 |
|---|---|---|
| 값 저장 위치 | 실제 값을 메모리에 저장 | 값에 대한 참조를 메모리에 저장 |
| 가변성 (Mutability) | 값 변경은 원래 값에 영향을 미칩니다. | 한 변수를 통해 값을 변경하면 동일한 값을 참조하는 다른 모든 변수에도 영향을 미칩니다. |
| 예시 | 숫자, 문자열, 부울, 정의되지 않음, null | 객체, 배열 |

  ```js
// 두 개의 별도 변수에 값 10을 할당합니다.
let num1 = 10;
let num2 = 10;

console.log("변경 전:");
console.log("num1:", num1);
console.log("num2:", num2);

// num1의 값 변경
num1 = 20;

console.log("변경 후:");
console.log("num1:", num1);
console.log("num2:", num2); // num2는 10으로 유지됩니다.
```
> num1과 num2 모두 기본 값 10을 할당받습니다. num1의 값을 20으로 변경하면 실제 값을 메모리에 저장하기 때문에 num1만 영향을 받습니다.

```js
// 객체를 생성하여 두 변수에 할당합니다.
let person1 = { name: "Alice", age: 30 };
let person2 = person1;

console.log("변경 전:");
console.log("person1:", person1);
console.log("person2:", person2);

// person1의 age 속성 변경
person1.age = 35;

console.log("변경 후:");
console.log("person1:", person1);
console.log("person2:", person2); // person2도 age 변경을 반영합니다.
```
> person1과 person2 모두 메모리 상 동일한 객체를 참조합니다. person1의 age 속성을 변경하면 동일한 기본 객체를 참조하기 때문에 person2에도 영향을 미칩니다.

<br>

### 1.1.3 자바스크립트의 또 다른 비교 공식, `Object.is`

자바스크립트에는 값을 비교하는 다양한 방법이 있습니다. 가장 일반적인 방법은 `==`와 `===` 연산자를 사용하는 것입니다. 하지만 이러한 연산자는 특정 상황에서 예상치 못한 결과를 초래할 수 있습니다.

```javascript
console.log(0 == false); // true
console.log("" == false); // true
console.log(0 == ""); // true
```

이러한 문제를 해결하기 위해 `Object.is()` 함수가 도입되었습니다. 

#### `Object.is()` 함수

`Object.is()` 함수는 두 값이 **정확히** 동일한지 여부를 확인하는 데 사용됩니다.  `Object.is()` 함수는 두 값이 동일하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

```javascript
console.log(Object.is(0, false)); // false
console.log(Object.is("", false)); // false
console.log(Object.is(0, "")); // false

console.log(Object.is(0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

console.log(Object.is(1, "1")); // false
console.log(Object.is(1, true)); // false

console.log(Object.is(undefined, null)); // false

const a = { x: 1, y: 1 };
const b = { x: 1, y: 1 };
console.log(Object.is(a, b)); // false
```

#### `==` vs `Object.is`

| 특징 | `==` | `Object.is` |
|---|---|---|
| 타입 변환 | 수행됨 | 수행되지 않음 |
| `NaN` 비교 | `NaN` ≠ `NaN` | `NaN` = `NaN` |
| `+0` vs `-0` 비교 | `+0` = `-0` | `+0` ≠ `-0` |

`==` 연산자는 두 값을 비교할 때 타입 변환을 수행합니다. 한 값의 타입이 다른 값의 타입과 다르면 한 값을 다른 값의 타입으로 변환합니다. 예를 들어, `"10"`과 `10`을 비교하면 `==` 연산자는 두 값을 모두 숫자로 변환한 후 비교하기 때문에 `true`를 반환합니다.

하지만 `Object.is()` 함수는 타입 변환을 수행하지 않습니다. 따라서 두 값의 타입이 다르면 항상 `false`를 반환합니다.

또한 `==` 연산자는 `NaN`과 `+0`/`-0`을 다르게 처리합니다. `NaN`은 자체와 같지 않고 `+0`는 `-0`와 같습니다. 하지만 `Object.is()` 함수는 `NaN`과 `+0`/`-0`을 동일하게 처리합니다.

#### `===` vs `Object.is`

| 특징 | `===` | `Object.is` |
|---|---|---|
| 타입 검사 | 수행됨 | 수행되지 않음 |
| `NaN` 비교 | `NaN` ≠ `NaN` | `NaN` = `NaN` |
| `+0` vs `-0` 비교 | `+0` ≠ `-0` | `+0` ≠ `-0` |

`===` 연산자는 `==` 연산자와 유사하지만 타입 검사를 수행합니다. 두 값의 타입이 동일해야만 `true`를 반환합니다. 

`Object.is()` 함수는 타입 검사를 수행하지 않습니다. 따라서 두 값의 타입이 다르더라도 값과 참조가 동일하면 `true`를 반환합니다.

예를 들어, 다음 코드는 `===` 연산자는 `false`를 반환하지만 `Object.is()` 함수는 `true`를 반환합니다.

```javascript
const a = 1;
const b = new Number(1);

console.log(a === b); // false
console.log(Object.is(a, b)); // true
```

이 코드에서 `a`와 `b`는 값은 동일하지만 타입이 다릅니다. `a`는 숫자 타입이고 `b`는 객체 타입입니다. `===` 연산자는 타입 검사를 수행하기 때문에 `false`를 반환합니다. 하지만 `Object.is()` 함수는 타입 검사를 수행하지 않기 때문에 값과 참조가 동일하므로 `true`를 반환합니다.

<br>

### 1.1.4 리액트에서의 동등 비교

리액트에서 컴포넌트를 렌더링할지 여부를 결정하는 데 중요한 역할을 하는 것이 **동등 비교**입니다. 리액트는 두 값이 동등한지 여부를 확인하기 위해 `Object.is()` 함수를 기반으로 하는 `shallowEqual`이라는 함수를 사용합니다.

#### `shallowEqual` 함수

`shallowEqual` 함수는 두 개의 객체를 입력으로 받아 두 객체의 속성 값이 **얕은 수준**에서 동일한지 여부를 확인합니다. 두 객체의 속성 이름이 동일하고 각 속성의 값이 동일한지 여부만 확인합니다.

```js
const obj1 = { name: 'John Doe', age: 30 };
const obj2 = { name: 'John Doe', age: 30 };

console.log(shallowEqual(obj1, obj2)); // true
```

> 위 코드에서 `obj1`과 `obj2`는 속성 이름과 값이 모두 동일하기 때문에 `shallowEqual` 함수는 `true`를 반환합니다. 하지만 `shallowEqual` 함수는 객체의 속성 자체를 비교하지 않습니다. 객체의 속성이 다른 객체라면 `shallowEqual` 함수는 `true`를 반환할 수 있습니다.

```js
const obj1 = { name: 'John Doe', age: 30 };
const obj2 = { name: 'John Doe', age: { value: 30 } };

console.log(shallowEqual(obj1, obj2)); // true
```

> 위 코드에서 `obj1`과 `obj2`는 속성 이름과 값이 동일하지만 `age` 속성의 값 자체는 다릅니다. `age` 속성의 값은 `obj1`에서는 숫자이고 `obj2`에서는 객체입니다. 하지만 `shallowEqual` 함수는 객체의 속성 자체를 비교하지 않기 때문에 `true`를 반환합니다.

#### `Object.is()` 함수와의 차이점

* **타입 검사:** 
  * `shallowEqual` 함수는 타입 검사를 수행하지 않습니다.
  * 두 객체의 속성 값의 타입이 다르더라도 값 자체가 동일하면 `true`를 반환합니다. 하지만 `Object.is()` 함수는 타입 검사를 수행하기 때문에 두 값의 타입이 동일해야만 `true`를 반환합니다.
* **참조 비교:** 
  * `shallowEqual` 함수는 참조 비교를 수행하지 않습니다.
  * 두 객체가 서로 다른 참조를 갖더라도 속성 이름과 값이 동일하면 `true`를 반환합니다. 하지만 `Object.is()` 함수는 참조 비교를 수행하기 때문에 두 값이 동일한 참조를 가져야만 `true`를 반환합니다.

#### `shallowEqual` 함수 사용 시 주의 사항

* `shallowEqual` 함수는 객체의 속성 자체를 비교하지 않습니다. 따라서 객체의 속성이 다른 객체라면 `shallowEqual` 함수는 `true`를 반환할 수 있습니다.
* `shallowEqual` 함수는 참조 비교를 수행하지 않습니다. 따라서 두 객체가 서로 다른 참조를 갖더라도 속성 이름과 값이 동일하면 `true`를 반환합니다.

이러한 제약 사항 때문에 성능 최적화를 위해 `shallowEqual` 함수를 사용하는 경우 주의가 필요합니다. `shallowEqual` 함수는 객체의 변경 사항을 빠르게 감지하는 데 도움이 될 수 있지만 객체의 변경 사항을 정확하게 감지하지 못할 수도 있습니다.

<br>
<br>

## 1.2 함수

### 1.2.1 함수란 무엇인가?

함수는 코드를 재사용하고 코드를 더욱 효율적으로 만들 수 있도록 하는 자바스크립트의 기본적인 빌딩 블록입니다. 함수는 특정 작업을 수행하도록 설계된 코드 블록이며 필요에 따라 호출될 수 있습니다.

#### 함수 선언

```js
function functionName(parameter1, parameter2, ...) {
  // 코드 블록
}
```

> 위 코드에서 `functionName`은 함수 이름이고 `parameter1`과 `parameter2`는 함수의 매개 변수입니다. 매개 변수는 함수에 전달되는 값입니다. 함수 블록은 함수가 수행하는 코드를 포함합니다.


#### 함수 호출

```js
functionName(argument1, argument2, ...);
```

> 위 코드에서 `argument1`과 `argument2`는 함수에 전달되는 인수입니다. 인수는 함수 호출 시 매개 변수에 할당되는 값입니다.

<br>

### 1.2.2 함수를 정의하는 4가지 방법

#### 함수 선언문

함수 선언문은 `function` 키워드를 사용하여 함수를 정의하는 가장 기본적인 방법입니다.

```js
function functionName(parameter1, parameter2, ...) {
  // 코드 블록
}
```

> 위 코드에서 `functionName`은 함수 이름이고 `parameter1`과 `parameter2`는 함수의 매개 변수입니다. 매개 변수는 함수에 전달되는 값입니다. 함수 블록은 함수가 수행하는 코드를 포함합니다.

함수 선언문은 함수 이름을 사용하여 함수를 호출할 수 있도록 합니다. 또한 함수 선언문은 함수가 선언된 블록 범위 밖에서도 함수를 사용할 수 있도록 **함수 호이스팅**을 지원합니다.

```js
function sayHello() {
  console.log("Hello!");
}

sayHello(); // Hello!
```

> 위 코드에서 `sayHello` 함수는 함수 선언문을 사용하여 정의됩니다. `sayHello` 함수는 `sayHello()` 라는 이름으로 호출될 수 있습니다.


#### 함수 표현식

함수 표현식은 `=` 연산자와 함께 함수를 정의하는 방법입니다.

```js
const functionName = function(parameter1, parameter2, ...) {
  // 코드 블록
};
```

> 위 코드에서 `functionName`은 함수 이름이고 `parameter1`과 `parameter2`는 함수의 매개 변수입니다. 매개 변수는 함수에 전달되는 값입니다. 함수 블록은 함수가 수행하는 코드를 포함합니다.

함수 표현식은 함수 이름을 사용하지 않고 함수를 정의할 수 있도록 합니다. 또한 함수 표현식은 함수가 선언된 블록 범위 안에서만 함수를 사용할 수 있도록 **함수 호이스팅을 지원하지 않습니다.**

```js
const sayHello = function() {
  console.log("Hello!");
};

sayHello(); // Hello!
```

> 위 코드에서 `sayHello` 함수는 함수 표현식을 사용하여 정의됩니다. `sayHello` 함수는 `sayHello()` 라는 이름으로 호출될 수 있습니다. 하지만 `sayHello` 함수는 `sayHello` 블록 범위 밖에서 사용할 수 없습니다.

#### 화살표 함수

화살표 함수는 간단한 함수를 정의하는 간편한 방법입니다

```js
(parameter1, parameter2, ...) => {
  // 코드 블록
};
```
> 위 코드에서 `parameter1`과 `parameter2`는 함수의 매개 변수입니다. 매개 변수는 함수에 전달되는 값입니다. 함수 블록은 함수가 수행하는 코드를 포함합니다.

화살표 함수는 간단한 함수를 정의할 때 유용하지만 복잡한 함수를 정의할 때는 적합하지 않습니다. 또한 화살표 함수는 `this` 키워드를 사용하는 방식이 함수 선언문 및 함수 표현식과 다릅니다.

```js
const sayHello = () => {
  console.log(this); // Window 객체
};

sayHello();
```
> 위 코드에서 `sayHello` 함수는 화살표 함수를 사용하여 정의됩니다. `sayHello` 함수를 호출하면 `this` 키워드는 `Window` 객체를 참조합니다.

#### Function 생성자 함수

Function 생성자 함수는 함수를 동적으로 생성하는 방법입니다. 

```js
const newFunction = new Function(parameter1, parameter2, ..., functionBody);
```

> 위 코드에서 `parameter1`과 `parameter2`는 함수의 매개 변수입니다. 매개 변수는 함수에 전달되는 값입니다. `functionBody`는 함수가 수행하는 코드를 포함합니다.

Function 생성자 함수는 함수를 문자열로 생성할 때 사용합니다. Function 생성자 함수는 함수를 동적으로 생성하기 때문에 런타임에 함수를 생성할 때 유용합니다.

```js
const add = new Function("x", "y", "return x + y");

console.log(add(1, 2)); // 3
```

> 위 코드에서 `add` 함수는 Function 생성자 함수를 사용하여 정의됩니다. `add` 함수는 `add(1, 2)` 라는 이름으로 호출될 수 있습니다.


#### 함수 정의 방법 비교

| 방법         | 호이스팅 | `this` 키워드 | 설명                                             |
|--------------|-----------|--------------|-------------------------------------------------|
| 함수 선언문   | 지원     | 함수 정의 위치에 따라 다름                     | 가장 기본적인 함수 정의 방법                 |
| 함수 표현식   | 지원하지 않음 | 변수에 할당된 객체                              | 함수 이름 없이 변수에 할당                      |
| 화살표 함수   | 지원하지 않음 | 상위 스코프의 `this`를 상속                  | 간단한 함수 정의에 적합                         |
| Function 생성자 함수 | 지원하지 않음 | `Window` 객체를 참조                            | 런타임에 함수를 생성하는 방법                 |


* **함수 선언문:**
    * 함수를 코드 상단에서 선언하고 프로그램 전체에서 사용해야 하는 경우
    * 함수를 재귀적으로 호출해야 하는 경우 (함수가 자신을 호출하는 경우)
* **함수 표현식:**
    * 함수를 변수에 할당하여 사용하고 싶을 때
    * 익명 함수가 필요할 때 (함수 이름이 필요하지 않은 경우)
* **화살표 함수:**
    * 간단한 함수를 정의할 때 (특히 콜백 함수 또는 이벤트 리스너로 사용할 때)
    * 상위 스코프의 `this`를 사용해야 하는 경우
* **Function 생성자 함수:**
    * 함수를 문자열로 생성해야 하는 경우 (런타임에 함수를 생성해야 하는 경우)
    * 함수를 동적으로 생성해야 하는 경우: 사용자 입력을 기반으로 함수를 생성해야 하는 경우 - 보안 문제가 발생할 수 있음
<br>

### 1.2.3 다양한 함수 살펴보기

#### 즉시 실행 함수(IIFE)

즉시 실행 함수는 함수를 선언함과 동시에 실행하는 함수입니다. 즉시 실행 함수는 함수를 선언함과 동시에 실행하기 때문에 딱 한 번만 호출됩니다. 즉시 실행 함수는 함수 내부에 있는 변수를 외부에서 접근하지 못하도록 하고 싶을 때 사용합니다.

```js
(function() {
  // 코드 블록
})();
```
위 코드에서 함수 선언문은 즉시 실행되는 익명 함수로 둘러싸여 있습니다. 익명 함수는 함수 이름이 없기 때문에 호출할 수 없습니다. 하지만 함수 선언문이 실행되면서 함수 블록 내의 코드가 실행됩니다.

#### 고차 함수

고차 함수는 함수를 인자로 받아서 실행하는 함수입니다. 고차 함수는 함수를 인자로 받아서 실행하고, 함수를 리턴하는 함수입니다. 고차 함수는 함수형 프로그래밍을 할 때 사용합니다.

```js
function map(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i]));
  }
  return newArray;
}

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = map(numbers, function(number) {
  return number * 2;
});

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
```

- **콜백 함수**: 콜백 함수는 다른 함수에 전달되어 나중에 호출되는 함수입니다. 콜백 함수는 비동기 작업을 처리하는 데 유용합니다.
- **함수 컴포지션**: 함수 컴포지션은 하나 이상의 함수를 결합하여 새로운 함수를 만드는 프로세스입니다. 고차 함수는 함수 컴포지션을 쉽게 수행할 수 있도록 합니다.
- **함수 커링**: 함수 커링은 함수의 매개 변수 일부를 미리 설정하여 새로운 함수를 만드는 프로세스입니다. 고차 함수는 함수 커링을 쉽게 수행할 수 있도록 합니다.


### 1.2.4 함수를 만들 때 주의해야 할 사항

- 함수의 부수 효과를 최대한 줄이는 것이 좋음
- 가능한 한 함수의 입력과 출력 사이에 의존성이 적어야 함
  - 함수의 입력과 출력 사이에 의존성이 적다는 것은 함수의 입력이 같으면 항상 같은 출력을 내놓는다는 것을 의미
- 누구나 이해할 수 있는 이름을 사용하는 것이 좋음


<br>
<br>

## 1.3 클래스

### 1.3.1 클래스란 무엇인가?

- 클래스는 객체를 만들어 내기 위한 템플릿(template)이자, 객체를 정의하기 위한 문법
- 클래스는 객체를 만들어 내기 위한 템플릿이기 때문에, 클래스를 사용하면 객체를 쉽게 만들 수 있음
- 클래스는 객체를 정의하기 위한 문법이기 때문에, 클래스를 사용하면 객체의 프로퍼티와 메서드를 한 곳에서 정의할 수 있음

```javascript
const person = {
  name: "Lee",
  age: 20,
  getName() {
    return this.name;
  },
  getAge() {
    return this.age;
  },
};
```

- constructor:
  - 함수를 통해 새로운 객체를 만들 때 호출되는 함수
  - 클래스 내부에 `constructor` 키워드를 통해 정의
  - 클래스 내부에 `constructor` 키워드를 생략하면, 클래스 내부에 빈 함수가 `constructor` 함수로 정의됨
  - `constructor` 함수는 클래스 내부에서 딱 한 번만 정의할 수 있음

    ```javascript
    class Person {
      constructor(name) {
        this.name = name;
      }
    }
    ```

- property:
  - 클래스가 가지고 있는 속성
  - 인스턴스 생성 시점에 값을 할당할 수 있음
  - #을 붙이면 클래스 내부에서만 접근할 수 있는 private 필드로 만들 수 있음
  - 타입스크립트에서는 클래스의 프로퍼티에 타입을 지정할 수 있음
  - es2019에서는 클래스의 프로퍼티에 접근 제한자를 사용할 수 있음
    - public: 클래스 외부에서 접근 가능
    - private: 클래스 내부에서만 접근 가능
      - private 프로퍼티는 클래스 외부에서 접근할 수 없기 때문에, 클래스 내부에서만 사용하는 데이터를 보호할 수 있음
    - protected: 클래스 내부 또는 상속받은 자식 클래스에서 접근 가능
  - private이 없던 시절에는 프로퍼티 이름 앞에 \_(언더스코어)를 붙여서 private 프로퍼티임을 표시

    ```javascript
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }
    ```

- getter와 settter:

  - getter와 setter는 클래스 내부의 프로퍼티 값을 읽거나 변경할 때 사용하는 함수
  - getter: 클래스 내부의 프로퍼티 값을 사용할 때 호출되는 함수
  - setter: 클래스 내부의 프로퍼티 값을 변경할 때 호출되는 함수

  ```javascript
  class Person {
    constructor(name, age) {
      this._name = name;
      this._age = age;
    }

    get name() {
      return this._name;
    }

    set name(value) {
      this._name = value;
    }

    get age() {
      return this._age;
    }

    set age(value) {
      this._age = value;
    }
  }
  ```

- method:
  - 클래스 내부에서 선언한 함수
  - 클래스 내부에 `constructor` 함수를 제외한 모든 함수는 `prototype` 객체의 프로퍼티로 등록됨
  - prototype` 객체의 프로퍼티로 등록되는 이유는 메모리 효율성 때문
  - 클래스 내부에 선언한 함수는 인스턴스를 생성할 때마다 새로 만들어지지 않고, `prototype` 객체에 등록되기 때문에 메모리를 효율적으로 사용할 수 있음
  - Object.getPrototypeOf 함수를 통해 클래스의 prototype 객체에 접근할 수 있음
  - 클래스의 prototype 객체에 접근하면 클래스 내부에 선언한 모든 함수에 접근할 수 있음

  ```javascript
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    getName() {
      return this.name;
    }

    setName(value) {
      this.name = value;
    }

    getAge() {
      return this.age;
    }

    setAge(value) {
      this.age = value;
    }
  }

  const person = new Person("Lee", 20);
  console.log(Object.getPrototypeOf(person) === Person.prototype); // true
  console.log(person.getName()); // Lee
  console.log(person.getAge()); // 20
  ```

- static method:
  - 클래스 내부에 선언한 함수 앞에 static 키워드를 붙이면, 클래스의 정적(static) 메서드가 됨
  - 정적 메서드는 클래스의 인스턴스를 생성하지 않아도 호출할 수 있음
  - 정적 메서드는 클래스의 인스턴스를 생성하지 않아도 호출할 수 있기 때문에, 유틸리티 함수를 만들 때 사용
  - this를 사용할 수 없음
  - 리액트 클래스 컴포넌트에서는 라이프사이클 메서드를 정적 메서드로 만들면 안 됨

  ```javascript
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    static getPersonName(person) {
      return person.name;
    }
  }

  const person = new Person("Lee", 20);
  console.log(Person.getPersonName(person)); // Lee
  ```

- inheritance:
  - 클래스는 상속을 통해 기존 클래스를 확장하여 새로운 클래스를 만들 수 있음
  - 상속을 통해 클래스를 확장할 때는 extends 키워드를 사용
  - 상속을 통해 클래스를 확장할 때는 super 키워드를 사용

  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }

  class Programmer extends Person {
    constructor(name, age) {
      super(name);
      this.age = age;
    }

    getAge() {
      return this.age;
    }
  }

  const programmer = new Programmer("Lee", 20);
  console.log(programmer.getName()); // Lee
  console.log(programmer.getAge()); // 20
  ```

### 1.3.2 클래스와 함수의 관계

- 클래스는 함수의 한 종류
- 클래스는 함수이기 때문에, 클래스도 함수처럼 호출할 수 있음
- 클래스는 함수이기 때문에, 클래스도 일급 객체(first-class object)임
- 클래스는 문법적 설탕(syntactic sugar)이기 때문에, 클래스를 사용하지 않고도 함수로 충분히 객체를 생성할 수 있음

<br>
<br>

## 1.4 클로저

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합

```javascript
function createCounterClosure() {
  let count = 0;
  return function () {
    // 클로저? 함수와 함수가 선언된 어휘적 환경의 조합 - *ㅇㅓ휘적 환경? 함수가 선언될 당시의 외부 변수를 기억하는 함수
    count++;
    return count;
  };
}
```

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이기 때문에, 함수를 선언할 때 만들어짐
- 클로저는 함수를 선언할 때 만들어지는데, 함수를 선언할 때 만들어지는 환경은 함수가 호출될 때 사라지지 않고, 계속해서 유지됨

```javascript
function createCounterClosure() {
  let count = 0;
  return {
    increase: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter1 = createCounterClosure();
const counter2 = createCounterClosure();

counter1.increase();
counter1.increase();
console.log(counter1.getCount()); // 2

counter2.increase();
console.log(counter2.getCount()); // 1
```

### 1.4.1 클로저의 정의

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합
- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이기 때문에, 함수를 선언할 때 만들어짐
- 클로저는 함수를 선언할 때 만들어지는데, 함수를 선언할 때 만들어지는 환경은 함수가 호출될 때 사라지지 않고, 계속해서 유지됨
- 클로저는 자바스크립트의 근본적인 동작 방식 때문에 발생하는 현상
- 자바스크립트의 근본적인 동작 방식은 함수가 선언될 때 생성된 렉시컬 환경과 함수가 실행될 때 생성되는 실행 컨텍스트의 차이 때문에 발생하는 현상을 의미
- 함수가 선언될 때 생성되는 렉시컬 환경은 함수가 실행될 때 생성되는 실행 컨텍스트와는 다름

### 1.4.2 변수의 유효 범위, 스코프

- 변수의 유효 범위(scope)는 변수가 선언된 코드의 어디서부터 어디까지 유효한지를 나타냄
- 변수의 유효 범위는 코드의 가장 바깥 영역을 전역 유효 범위(global scope)라고 하고, 가장 안쪽 영역을 지역 유효 범위(local scope)라고 함
- 변수의 유효 범위는 함수의 매개변수와 변수에서만 적용되는 것이 아니라, 함수 내부에서 선언한 내부 함수에서도 적용됨
- 전역 유효 범위에 선언된 변수는 어디서든지 참조할 수 있지만, 지역 유효 범위에 선언된 변수는 자신이 선언된 지역과 하위 지역에서만 참조할 수 있음
- 자바스크립트는 함수가 선언될 때마다 새로운 유효 범위가 생기기 때문에, 함수 내부에서 선언한 변수는 함수 외부에서 참조할 수 없음
- 전역 스코프와 함수 스코프의 차이는 변수의 생명 주기와 관련이 있음
  - 생명주기? 변수가 생성되어 유효한 값을 가지는 시점부터 메모리에서 제거되어 더 이상 유효하지 않은 값을 가지게 되는 시점까지의 과정

### 1.4.3 클로저의 활용

- 리액트에서의 클로저의 원리를 사용하고 있는 대표적인 예는 `useState` 함수
- useState함수 말고 다른 함수 `useReducer`, `useCallback`, `useMemo`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useEffect` 등 모두 클로저를 사용하고 있음
- `useState` 함수는 함수를 호출하면 배열을 반환하는데, 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 변경하는 함수
- `useState` 함수는 함수를 호출할 때마다 새로운 상태 값과 상태를 변경하는 함수를 만들어서 배열에 담아서 반환

```javascript
function useState(initialValue) {
  let _val = initialValue;
  function setState(newVal) {
    _val = newVal;
  }
  return [_val, setState];
}

const [count, setCount] = useState(1);
console.log(count); // 1
setCount(2);
console.log(count); // 2
```

### 1.4.4 주의할 점

- 클로저를 만들 때는 주의해야 할 점이 있는데, 바로 클로저로 만든 함수에서 클로저에 저장된 값을 변경하거나 참조할 수 있다는 점이 있음

<br>
<br>

## 1.5 이벤트 루프와 비동기 통신의 이해

- 동기(synchronous) 방식은 코드를 순서대로 실행하는 방식
- 비동기(asynchronous) 방식은 코드를 순서대로 실행하지 않는 방식
- 자바스크립트는 싱글 스레드(single thread) 방식으로 동작
  - 싱글 스레드 방식은 한 번에 하나의 작업만 처리할 수 있음

### 1.5.1 싱글 스레드 자바스크립트

- 프로그램이 실행되면 프로세스(process)가 생성되고, 프로세스는 스레드를 생성
- 프로세스(process)란 실행 중인 프로그램을 의미
- 스레드(thread)란 프로그램이 동작할 때 실행되는 흐름의 단위

### 1.5.2 이벤트 루프란?

- 호출 스택(call stack)은 함수의 호출을 기록하는 자료구조
- 호출 스택은 함수가 호출되면 스택에 쌓고, 함수가 종료되면 스택에서 제거
- 이벤트 루프(event loop)는 호출 스택과 백그라운드, 태스크 큐를 관리
- 백그라운드(Background)는 타이머나 이벤트 리스너와 같은 비동기 함수들이 실행되는 곳
- 태스크 큐(Task Queue)는 비동기 함수의 콜백 함수나 이벤트 리스너의 콜백 함수가 일시적으로 보관되는 곳
- 이벤트 루프는 호출 스택이 비어있으면 태스크 큐에서 함수를 꺼내서 호출 스택에 쌓음

```javascript
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
  foo();
}

function baz() {
  console.log("baz");
  bar();
}

baz();
```

### 1.5.3 태스크 큐와 마이크로 태스크 큐

- 태스크 큐는 비동기 함수의 콜백 함수나 이벤트 리스너의 콜백 함수가 일시적으로 보관되는 곳
- 마이크로 태스크 큐(micro task queue)는 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 곳
- 마이크로 태스크 큐는 태스크 큐보다 우선순위가 높음
- 마이크로 태스크 큐는 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 곳
- 마이크로 태스크 큐는 태스크 큐보다 우선순위가 높기 때문에, 태스크 큐에 대기 중인 함수보다 마이크로 태스크 큐에 대기 중인 함수가 먼저 호출됨
- 테스크 큐와 마이크로 태스크 큐에 대기 중인 함수가 모두 있다면, 마이크로 태스크 큐에 대기 중인 함수가 모두 호출된 후에 테스크 큐에 대기 중인 함수가 호출됨

- 라이프 사이클 메서드는 렌더링 결과가 실제 돔에 반영된 후에 호출되는 메서드

```javascript
function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
  setTimeout(foo, 0);
}

function baz() {
  console.log("baz");
  bar();
}

setTimeout(baz, 0);

promise.resolve().then(() => console.log("promise"));
```


<br>
<br>

## 1.6 리액트에서 자주 사용하는 자바스크립트 문법

### 1.6.1 구조 분해 할당

- 구조 분해 할당(destructuring assignment)은 객체나 배열을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트 표현식
- 구조 분해 할당은 비구조화 할당이라고도 함

```javascript
const object = { a: 1, b: 2 };
const { a, b } = object;
console.log(a); // 1
console.log(b); // 2

const array = [1, 2];
const [one, two] = array;
console.log(one); // 1
console.log(two); // 2
```

```jsx
const key = "a";

const object = {
  a: 1,
  b: 2,
};

const { [key]: one, b: two } = object;

console.log(one); // 1
console.log(two); // 2

const array = [1, 2];

const [one, two] = array;

console.log(one); // 1
console.log(two); // 2
```

### 1.6.2 전개 구문

- 전개 구문(spread syntax)은 객체 혹은 배열을 펼칠 수 있게 해주는 자바스크립트 표현식
- 전개 구문은 펼침 연산자(spread operator)라고도 함

```javascript
const object = { a: 1, b: 2, c: 3 };
const { a, ...c } = object;
console.log(a); // 1
console.log(c); // { b: 2, c: 3 }

const array = [1, 2, 3, 4, 5];
const [one, ...rest] = array;
console.log(one); // 1
console.log(rest); // [2, 3, 4, 5]
```

### 1.6.3 객체 초기자

- 객체 초기자(object initializer)는 객체를 만들 때 변수 이름과 객체의 프로퍼티 이름이 동일하다면 프로퍼티 이름을 생략할 수 있음

```javascript
const x = 0;
const y = 0;

const obj = { x, y };
console.log(obj); // { x: 0, y: 0 }
```

### 1.6.4 Array 프로토타입의 메서드: map, filter, reduce, forEach

- Array 프로토타입의 메서드는 배열을 순회하면서 배열의 각 원소에 대해 특정 작업을 수행할 때 사용
- map 메서드는 배열의 각 원소에 대해 특정 작업을 수행한 후, 그 결과를 새로운 배열에 담아서 반환
- filter 메서드는 배열의 각 원소에 대해 특정 조건을 만족하는 원소만을 따로 추출하여 새로운 배열에 담아서 반환
- reduce 메서드는 배열의 각 원소에 대해 특정 작업을 수행한 후, 그 결과를 새로운 배열에 담아서 반환
- forEach 메서드는 배열의 각 원소에 대해 특정 작업을 수행

```javascript
const array = [1, 2, 3, 4, 5];

const squared = [];
for (let i = 0; i < array.length; i++) {
  squared.push(array[i] * array[i]);
}

console.log(squared); // [1, 4, 9, 16, 25]
```

```javascript
const array = [1, 2, 3, 4, 5];

const squared = array.map((n) => n * n);
console.log(squared); // [1, 4, 9, 16, 25]
```

```javascript
const array = [1, 2, 3, 4, 5];

const even = array.filter((n) => n % 2 === 0);
console.log(even); // [2, 4]
```

```javascript
const array = [1, 2, 3, 4, 5];

const sum = array.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15
```

```javascript
const array = [1, 2, 3, 4, 5];

array.forEach((n) => {
  console.log(n);
});
```

### 1.6.5 삼항 조건 연산자

- 삼항 조건 연산자(ternary operator)는 조건문의 축약형
- 삼항 조건 연산자는 조건문의 결과에 따라 반환할 값을 결정

```javascript
const array = [1, 2, 3, 4, 5];

const squared = array.map((n) => (n % 2 === 0 ? n * n : n));
console.log(squared); // [1, 4, 3, 16, 5]
```

<br>
<br>

## 1.7 선택이 아닌 필수, 타입스크립트

### 1.7.1 타입스크립트란?

- 타입스크립트(TypeScript)는 자바스크립트의 슈퍼셋(superset)이자 확장된 언어
- 타입스크립트는 자바스크립트의 모든 기능을 포함하면서 정적 타입(static type)을 지원하는 객체지향 프로그래밍 언어

### 1.7.2 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

- any 대신 unknown 타입을 사용
  - unknown 타입은 타입을 확정할 수 없는 경우에 사용
  - unknown 타입은 타입을 확정할 수 없기 때문에, 타입을 확정하기 전까지는 다른 타입으로 사용할 수 없음
  - unknown 타입은 타입을 확정하기 전까지는 다른 타입으로 사용할 수 없기 때문에, 타입을 확정하기 전까지는 타입 체크를 강제함
- 타입 가드를 사용
- 타입 단언을 사용
- 제네릭을 사용
- 타입스크립트의 유틸리티 타입을 사용

```javascript
function printAge(age: number) {
  console.log(`나이는 ${age}살 입니다.`);
}

printAge(20);
printAge("20"); // error TS2345: Argument of type '"20"' is not assignable to parameter of type 'number'.
```

```javascript
function printAge(age: number | string) {
  if (typeof age === "number") {
    console.log(`나이는 ${age}살 입니다.`);
  } else {
    console.log("나이는 숫자만 입력해주세요.");
  }
}

printAge(20);
printAge("20");
```

```javascript
function printAge(age: number | string) {
  if (typeof age === "number") {
    console.log(`나이는 ${age}살 입니다.`);
  } else {
    console.log("나이는 숫자만 입력해주세요.");
  }
}

printAge(20);
printAge("20" as number);
```

```javascript
function printAge<T>(age: T) {
  console.log(`나이는 ${age}살 입니다.`);
}

printAge < number > 20;
printAge < string > "20";
```

```javascript
type Person = {
  name: string;
  age: number;
};

function printAge<T extends Person>(person: T) {
  console.log(`나이는 ${person.age}살 입니다.`);
}

printAge({ name: "Lee", age: 20 });
```

### 1.7.3 타입스크립트 전환 가이드

- tsconfig.json 파일을 생성
- JSDoc 과 @ts-check를 사용
- @types 패키지를 설치
- 타입스크립트의 유틸리티 타입을 사용

# 01장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트

책을 읽기 전에 자바스크립트에 대한 기본적인 지식을 다루는 장입니다.
이 장에서는 리액트를 사용하면서 자주 사용하는 자바스크립트 문법과 개념을 간단히 정리합니다.

<br>

- [01장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트](#01장-리액트-개발을-위해-꼭-알아야-할-자바스크립트)
  - [1.1 자바스크립트의 동등 비교](#11-자바스크립트의-동등-비교)
    - [1.1.1 자바스크립트의 데이터 타입](#111-자바스크립트의-데이터-타입)
    - [1.1.2 값을 저장하는 방식의 차이](#112-값을-저장하는-방식의-차이)
    - [1.1.3 자바스크립트의 또 다른 비교 공식, `Object.is`](#113-자바스크립트의-또-다른-비교-공식-objectis)
    - [1.1.4 리액트에서의 동등 비교](#114-리액트에서의-동등-비교)
    - [1.1.5 정리](#115-정리)
  - [1.2 함수](#12-함수)
    - [1.2.1 함수란 무엇인가?](#121-함수란-무엇인가)
    - [1.2.2 함수를 정의하는 4가지 방법](#122-함수를-정의하는-4가지-방법)
    - [1.2.3 다양한 함수 살펴보기](#123-다양한-함수-살펴보기)
    - [1.2.4 함수를 만들 때 주의해야 할 사항](#124-함수를-만들-때-주의해야-할-사항)
    - [1.2.5 정리](#125-정리)
  - [1.3 클래스](#13-클래스)
    - [1.3.1 클래스란 무엇인가?](#131-클래스란-무엇인가)
    - [1.3.2 클래스와 함수의 관계](#132-클래스와-함수의-관계)
    - [1.3.3 정리](#133-정리)
  - [1.4 클로저](#14-클로저)
    - [1.4.1 클로저의 정의](#141-클로저의-정의)
    - [1.4.2 변수의 유효 범위, 스코프](#142-변수의-유효-범위-스코프)
    - [1.4.3 클로저의 활용](#143-클로저의-활용)
    - [1.4.4 주의할 점](#144-주의할-점)
    - [1.4.5 정리](#145-정리)
  - [1.5 이벤트 루프와 비동기 통신의 이해](#15-이벤트-루프와-비동기-통신의-이해)
    - [1.5.1 싱글 스레드 자바스크립트](#151-싱글-스레드-자바스크립트)
    - [1.5.2 이벤트 루프란?](#152-이벤트-루프란)
    - [1.5.3 태스크 큐와 마이크로 태스크 큐](#153-태스크-큐와-마이크로-태스크-큐)
    - [1.5.4 정리](#154-정리)
  - [1.6 리액트에서 자주 사용하는 자바스크립트 문법](#16-리액트에서-자주-사용하는-자바스크립트-문법)
    - [1.6.1 구조 분해 할당](#161-구조-분해-할당)
    - [1.6.2 전개 구문](#162-전개-구문)
    - [1.6.3 객체 초기자](#163-객체-초기자)
    - [1.6.4 Array 프로토타입의 메서드: map, filter, reduce, forEach](#164-array-프로토타입의-메서드-map-filter-reduce-foreach)
    - [1.6.5 삼항 조건 연산자](#165-삼항-조건-연산자)
    - [1.6.6 정리](#166-정리)
  - [1.7 선택이 아닌 필수, 타입스크립트](#17-선택이-아닌-필수-타입스크립트)
    - [1.7.1 타입스크립트란?](#171-타입스크립트란)
    - [1.7.2 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법](#172-리액트-코드를-효과적으로-작성하기-위한-타입스크립트-활용법)
    - [1.7.3 타입스크립트 전환 가이드](#173-타입스크립트-전환-가이드)
    - [1.7.4 정리](#174-정리)

<br>

## 1.1 자바스크립트의 동등 비교

### 1.1.1 자바스크립트의 데이터 타입

1. 원시 타입

   - 객체가 아닌 모든 타입: 숫자, 문자열, 불리언, null, undefined, 심볼

2. 객체 타입
   - 7가지 원시 타입 이외의 모든 것: 객체, 배열, 함수 등

### 1.1.2 값을 저장하는 방식의 차이

- 원시 타입: 변경 불가능한 형태로 저장, 값을 복사할 때 값 자체를 복사
- 객체 타입: 변경 가능한 형태로 저장, 값을 복사할 때 참조를 복사

  ```javascript
  const a = 1;
  const b = a;
  console.log(a, b, a === b); // 1 1 true
  ```

  ```javascript
  const a = { x: 1 };
  const b = a;
  console.log(a, b, a === b); // { x: 1 } { x: 1 } true
  ```

  ```javascript
  const a = { x: 1 };
  const b = { x: 1 };
  console.log(a, b, a === b); // { x: 1 } { x: 1 } false
  ```

### 1.1.3 자바스크립트의 또 다른 비교 공식, `Object.is`

- `==` vs `Object.is`
  - ==(비교 연산자): 같은 타입이 아니라면 강제로 형변환(type casting)을 한 후에 비교
  - Obect.is: 같은 타입이 아니라면 형변환을 하지 않고 값을 비교
- `===` vs `Object.is`
  - `===`(엄격한 비교 연산자) : 타입 형변환을 하지 않고 값을 비교
  - `Object.is` : `===`와 동일한 결과를 반환하지만, `===`와 다른 결과를 반환하는 경우도 있음

```javascript
-0 === +0; // true
Object.is(-0, +0); // false

Number.NaN === NaN; // false
Object.is(Number.NaN, Nan); // true
```

- `Object.is`는 `===`와 동일한 결과를 반환하지만, `===`와 다른 결과를 반환하는 경우도 있음

  ```javascript
  console.log(Object.is(0, -0)); // false
  console.log(Object.is(NaN, NaN)); // true
  ```

- `Object.is`는 `===`와 다르게 동작하는 경우가 많아서 사용을 권장하지 않음
- `===`를 사용하면서 `0`과 `-0`, `NaN`과 `NaN`을 구분해야 하는 경우는 `Object.is`를 사용하면 됨

### 1.1.4 리액트에서의 동등 비교

- 리액트에서는 Object.is 기반의 `shallowEqual 함수`를 사용
- `shallowEqual 함수`는 두 개의 객체를 비교할 때 얕은 비교를 하기 때문에, 객체 내부의 값이 변경되었는지 확인할 수 없음

```javascript
const a = { x: 1, y: 1 };
const b = { x: 1, y: 1 };
console.log(shallowEqual(a, b)); // true
```

- `Object.is`를 통해 먼저 비교한 뒤 내부의 값이 변경되었는지 확인하는 방법을 사용

```javascript
const a = { x: 1, y: 1 };

const b = { ...a, y: 1 };
console.log(shallowEqual(a, b)); // true

const c = { ...a, y: 2 };
console.log(shallowEqual(a, c)); // false
```

### 1.1.5 정리

<br>

## 1.2 함수

### 1.2.1 함수란 무엇인가?

- 함수는 특정 기능을 하나의 단위로 묶어 놓은 것
- 함수를 사용하면 코드의 재사용성이 높아지고, 유지보수가 쉬워짐

```javascript
function add(a, b) {
  return a + b;
}

const sum = add(1, 2);
console.log(sum); // 3
```

### 1.2.2 함수를 정의하는 4가지 방법

1. 함수 선언문
   - 함수 선언문은 함수 이름을 반드시 사용해야 함
   - 함수 선언문은 호이스팅(hoisting)이 발생
   - 호이스팅: 함수 선언문이 코드의 최상단으로 끌어올려지는 현상
   - 함수 선언문은 함수 이름을 반드시 사용해야 하기 때문에 익명 함수를 만들 수 없음
   - 함수 선언문은 일반적으로 함수의 기능을 정의할 때 사용
   ```javascript
   function add(a, b) {
     return a + b;
   }
   ```
2. 함수 표현식
   - 함수 표현식은 함수 이름을 사용하지 않아도 됨
   - 함수 표현식은 호이스팅이 발생하지 않음
   - 함수 표현식은 익명 함수를 만들 수 있음
   - 함수 표현식은 일반적으로 함수를 변수에 할당할 때 사용
   ```javascript
   const add = function (a, b) {
     return a + b;
   };
   ```
3. 화살표 함수

   - 화살표 함수는 함수 표현식을 간결하게 만들어 줌
   - 화살표 함수는 항상 익명 함수로 정의
   - arguments 객체를 사용할 수 없음
   - this, super, new.target, constructor를을 사용할 수 없음
   - 화살표 함수 함수와 일반함수의 차이점은 this의 참조가 다름

   ```javascript
   const add = (a, b) => {
     return a + b;
   };
   ```

4. Function 생성자 함수
   - 클로저가 생성되지 않음
   ```javascript
   const add = new Function("a", "b", "return a + b");
   ```

### 1.2.3 다양한 함수 살펴보기

- 즉시 실행 함수

  - 함수를 선언함과 동시에 실행하는 함수
  - 함수를 괄호로 묶은 뒤에 함수의 뒤에 괄호를 붙여서 호출
  - 즉시 실행 함수는 함수를 선언함과 동시에 실행하기 때문에 딱 한 번만 호출됨
  - 즉시 실행 함수는 함수 내부에 있는 변수를 외부에서 접근하지 못하도록 하고 싶을 때 사용

  ```javascript
  (function () {
    const a = 1;
    const b = 1;
    return a + b;
  })();
  ```

- 고차 함수

  - 함수를 인자로 받아서 실행하는 함수
  - 고차 함수는 함수를 인자로 받아서 실행하고, 함수를 리턴하는 함수
  - 고차 함수는 함수형 프로그래밍을 할 때 사용

  ```javascript
  function add(a, b) {
    return a + b;
  }

  function double(value) {
    return value * 2;
  }

  function doubleAdd(a, b) {
    return double(add(a, b));
  }

  const result = doubleAdd(1, 2);
  console.log(result); // 6
  ```

  - 고차 함수를 사용하면 함수의 재사용성이 높아지고, 유지보수가 쉬워짐

### 1.2.4 함수를 만들 때 주의해야 할 사항

- 함수의 부수 효과를 최대한 줄이는 것이 좋음
- 가능한 한 함수의 입력과 출력 사이에 의존성이 적어야 함
  - 함수의 입력과 출력 사이에 의존성이 적다는 것은 함수의 입력이 같으면 항상 같은 출력을 내놓는다는 것을 의미
- 누구나 이해할 수 있는 이름을 사용하는 것이 좋음

### 1.2.5 정리

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

### 1.3.3 정리

<br>

## 1.4 클로저

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합
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

### 1.4.3 클로저의 활용

- 리액트에서의 클로저의 원리를 사용하고 있는 대표적인 예는 `useState` 함수
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

### 1.4.5 정리

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

### 1.5.4 정리

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

### 1.6.6 정리

<br>

## 1.7 선택이 아닌 필수, 타입스크립트

### 1.7.1 타입스크립트란?

- 타입스크립트(TypeScript)는 자바스크립트의 슈퍼셋(superset)이자 확장된 언어
- 타입스크립트는 자바스크립트의 모든 기능을 포함하면서 정적 타입(static type)을 지원하는 객체지향 프로그래밍 언어

### 1.7.2 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

- any 대신 unknown 타입을 사용
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

### 1.7.4 정리

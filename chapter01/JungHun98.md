# 1장

## 리액트의 장점

### 명시적 상태 변경

- 리액트는 단방향 바인딩만 지원
- 단방향 바인딩이란 말 그대로 데이터의 흐름이 한쪽으로만 가는 것
- 이와 반대되는 것이 양방향 바인딩
- 양방향 바인딩은 뷰의 변화가 컴포넌트에 영향을 미칠 수도, 컴포넌트의 상태가 변경되면 뷰의 상태도 변경될 가능성이 있음
    - 이는 코드의 규모가 커질수록 상태 변화가 뷰에서 일어났는지, 컴포넌트에서 일어났는지 파악하기 어려워짐
- 리액트의 상태 변화는 단방향으로 명시적으로 이뤄짐
- 상태가 변화했다면 그 상태 변화를 명시적으로 일으키는 함수만 찾으면 됨
    - 단방향 바인딩은 양방향 바인딩에 비해 데이터 변화의 흐름이 단순하므로 코드를 읽기 쉽고 버그를 야기할 가능성이 비교적 적다.
    - 만약 버그가 발생하더라도 복잡한 데이터의 흐름을 따라서 디버깅 안해도 됨
    
    (**공감되는 부분)**
    

## JSX (JavaScript XML)

- Angular, Vue와 같은 프레임워크는 자체적으로 제공하는 문법을 익혀야 함
- 리액트의 JSX는 기존 HTML 문법을 확장한 것으로 고유의 특징 몇 가지만 알면 쉽게 구현이 가능함
    - JSX는 자바스크립트 문법에 친화적임
    - null은 아무것도 렌더링하지않고, JSX 내부 자바스크립트 문법을 `{}` 로 감싸야한다는 사실만 안다면 쉽게 구현가능

### 비교적 배우기 쉽고 간결함

- 자바스크립트와 JSX의 결합은 리액트를 처음 접하더라도 기존의 자바스크립트, HTML을 알고 있다면 빠르고 쉽게 컴포넌트와 웹 페이지를 만들 수 있음
- 처음 배울 땐 쉽게 배우지만 이를 완벽히 이해하고 성능을 최적화하는 것은 상대적으로 다른 기술보다 어려운 축에 속함

리액트는 단순히 UI를 위한 라이브러리로만 역학을 부여하고 그 외의 모든 것에 자유도를 둠

개발자들은 리액트를 기반으로 다양한 것들을 시도할 수 있었고 그만큼 큰 커뮤니티를 가짐

## 리액트의 역사

- 리액트 16.8.0 버전, hook 이등장하고 많은 인기를 끌었고 클래스 컴포넌트가 오히려 생소하게 됨

### 리액트 이전 웹 생태계

- 2000년대 : Linux, Apache 웹 서버, MySQL, PHP를 활용한 웹 개발이 주
- 대부분 웹 서비스는 데이터베이스에서 필요한 데이터를 불러온 다음, 웹 서버에서 HTML 페이지를 만들고 클라이언트에 제공하는 방식

- 2010년대 : 제이쿼리, 로컬스토리지, 캔버스, ES5가 등장하면서 웹 생태계는 변화를 맞이함
- 자바스크립트는 적극적으로 DOM을 수정해 사용자에게 다양한 인터랙션을 보여줌
- AJAX의 등장으로 서버뿐만 아니라 클라이언트에서도 서버와 통신해 데이터를 불러오기 시작함
- 이에 따라 자바스크립트의 코드가 점차 복잡해짐
- Angular와 같은 프레임워크, MVVM, MVC모델을 기반으로 자바스크립트의 복잡성을 해결하려 노력함

- 애플리케이션에서 API의 변화에 따라 무언가 변경되면 단순이 UI를 초기화하고 새로 렌더링하자는 아이디어
- 이 당시 대부분의 프레임워크는 양방향 바인딩 구조로, 모델과 뷰가 밀접한 관계를 맺고 서로가 서로를 변경할 수 있는 구조
    - 변경 된 DOM 추적, 변경의 원인 추적이 어려웠음 → 많은 버그 발생
- 이러한 방식 대신 단방향, 모델이 뷰를 변경하는 방식을 바탕으로 모델의 데이터가 변경되어 뷰가 변경되어야 한다면 이전 DOM을 버리고 새롭게 렌더링하는 방식을 제안
- 이를 바탕으로 리액트 프로젝트 시작

- JSX구문과 Flux 패턴
- 리액트의 관심사는 HTML,CSS, JS로 분리하는 것이 아니라 컴포넌트를 기준으로 분리

Q. 기능이 많고 복잡한 웹 애플리케이션에서 MVC 패턴이 좋지 않은 이유가 무엇인가요?

[MVC](https://www.notion.so/MVC-658479284a9947e4b420765e0c617758?pvs=21)

- 상태를 관리하기 위한 컨트롤러 대신, 리액트는 단지 상태에 따른 UI를 선언적으로 구현 가능, 결과적으로 간결한 코드 완성

# 리액트 개발을 위해 꼭 알아야 할 자바스크립트

## 자바스크립트의 동등 비교

pops의 동등 비교는 얕은 비교로 이뤄진다. 가상 DOM과 실제 DOM의 비교, 리액트가 렌더링할지를 판단하는 방법, 변수나 함수의 메모이제이션 등 모든 작업은 자바스크립트의 동등 비교를 기반으로 한다.

### 데이터 타입

원시타입: boolean, null, undefined, number, string, symbol, bigint (ES2022 기준)

- 객체가 아닌 모든 타입

객체 타입: object

undefined는 선언됐지만 할당되지 않은 값, null은 명시적으로 비어 있음을 나타내는 값

flasy: false, 0, -0, 0n, 0x0n, NaN, ‘’,””, ``, null, undefined

truthy: falsy외 든 값

자바스크립트의 문자열이 원시 타입이며 변경 불가 (indexing으로 문자열을 변경할 수 없다.)

객체 타입은 원시 타입과 달리 참조 타입이다. 이는 값이 아닌 참조를 전달한다.

### 값을 저장하는 방식의 차이

원시 타입과 객체 타입의 가장 큰 차이점은 값을 저장하는 방식의 차이

원시 타입은 불변 형태의 값으로 저장되는 반면, 객체는 참조를 저장

객체에 저장된 값이 같아도 참조는 다르므로 동등 비교에서 false를 반환

### Object.is

참조를 활용하는 객체 비교를 할 수 있는 메서드

== 비교는 비교하기 전에 양쪽이 같은 타입이 아니라면 비교할 수 있도록 강제 형변환 후 비교

=== 보다 더 엄격한 검사

하지만 이 마저도 객체 동등비교 원리는 같다.

### 리액트에서의 동등 비교

리액트에서는 연산자가 아닌 Object.is를 사용한다.

Object.is로 먼저 비교를 하고, 객체를 비교해야 할 경우 얕은 비교 즉, 객체의 첫 번째 깊이에 저장된 값들만 비교한다.

그런데 왜 이렇게 만들었을까?
리액트 JSX에서 사용하는 props에서 객체이고, 이 props만 일차적으로 계산하면 되기 때문

> 따라서 props에 객체를 전달한다면 예상치 못한 렌더링이 발생할 수 있음
> 

**props depth가 2 이상이면 false임 → 반드시 렌더링**

## 함수

### 함수를 정의하는 4가지 방법

1. 함수 선언문

```jsx
function sum(a, b) {
	return a + b;
}

const sum = function add(a, b) {
	return a + b;
}
/** 이렇게 쓰면 안됨
sum(10, 20)은 호출되지만 add는 외부에서 호출 불가능함
**/
```

- 리액트 컴포넌트를 만들 때 내가 많이 사용하는 방식이다.

1. 함수 표현식
    - 일급 객체: 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체 (할당, 매개변수 전달, 반환 등)
    

```jsx
const sum = function(a, b) {
	return a + b;
}
```

선언문과 표현식의 차이는 `호이스팅`  여부

함수 선언문은 호이스팅되어 실행 전에 메모리에 등록됨. 따라서 선언문 위에서도 호출 가능

반면 변수에 할당하면 호이스팅이 되긴하지만 const 변수는 초기화 되지 않음 (메모리에 등록되나 실행 가능하지는 않은 상태임)

1. 화살표 함수

```jsx
const sum = (a, b) => {
	return a + b;
}
```

기존 함수 선언 방식과 차이점

- 생성자로 사용불가 (왜요? prototype 프로퍼티가 없음)
- arguments 프로퍼티가 없음
- **this 바인딩 - 정적 바인딩, 일반적인 this와 달리 화살표 함수에서의 this는 상위 스코프의 this에 고정됨**

```jsx
const hello = () => {
	console.log(this)
}

//-------바벨로 트랜스 파일링

var _this = void 0; // undefined

var hello = function hello() {
	console.log(_this)
}
```

### 함수를 만들 때 주의해야 할 사항

1. 순수하게 만들어라
    1. 웹 애플리케이션에서 부수 효과는 피할 수 없는 요소이지만 최대한 억제할 수 있는 방향으로 함수를 설계해야 한다.
    2. 이를 바탕으로 함수의 실행와 결과를 최대한 예측 가능하도록 설계해야 한다.
2. 가능한 작게 만들어라
    1. 하나의 역할만 하게 하자.
3. 누구나 이해할 수 있는 이름을 붙이자 

## 클래스

16.8 버전이 나오기 전까지 리액트는 모든 컴포넌트가 클래스로 작성돼 있었다.

### 클래스란?

특정한 객체를 만들기 위한 템플릿과 같은 개념, 자바스크립트의 클래스는 함수로 동작하고 구현할 수 있다.

- constructor(생성자): 객체를 생성할 때 사용하는 특수한 메서드 (유일해야 하며, 생략 가능)
- 프로퍼티: 클래스로 인스턴스를 생성할 때 내부에 정의할 수 있는 속성값
- 인스턴스 메서드: 클래스 내부에서 선언한 메서드 (prototype에 선언)
- 정적 메서드: 정적 메서드 내부의 this는 클래스로 생성된 인스턴스가 아닌 클래스 자신을 가리킴, 인스턴스를 생성하지 않아도 사용가능

### 클래스와 함수의 관계

클래스도 결국 함수이며, 프로토타입을 이용해 자바스크립트에서 구현이 가능하다.

즉 자바스크립트에서 클래스는 객체지향 언어를 사용하던 다른 개발자가 좀 더 자바스크립트 객체지향에 접근하기 쉽게 만들어주는 일종의 문법적 설탕의 역할

## 클로저

함수형 컴포넌트에 대한 이해를 위해 필수적으로 익혀야 하는 개념

함수형 컴포넌트의 구조와 작동 방식, 훅의 원리, 의존석 배열 등 함수형 컴포넌트의 대부분의 기술이 모두 클로저에 의존하고 있기 때문

### 클로저란?

클로저는 함수와 함수가 선언된 어휘적 환경 - MDN

선언된 어휘적 환경이라는 것은 변수가 코드 내부 어디에 선언되었는지를 말하는 것

이를 이용해 개발하는 것이 클로저다.

### 스코프

- 전역스코프(global scope) - window객체, global 객체 등이 전역 레벨에서 선언한 스코프가 바인딩 된 것
    - V8엔진이 설정하는 것인가? 브라우저인 경우, Node인 경우 각각 어떻게 처리하는 것인지?
- 함수 스코프 - 기본적인 자바스크립트의 스코프, 가장 가까운 스코프에서 변수가 존재하는지를 먼저 확인

### 클로저의 활용

만약 컴포넌트의 상태가 전역 스코프에 정의되어 있다면 애플리케이션이 망가질 가능성이 높아진다. 클로저로 감싸 접근에 제한을 두는 것

- 직접적으로 데이터 노출을 막음으로써 사용자가 직접 수정하는 것을 방지
- 업데이트 로직을 따로 만들어서 무분별 수정을 방지
- 전역 스코프의 사용을 막고, 개발자가 원하는 정보만 개발자가 원하는 방향으로 노출시킬 수 있다는 장점이 있음

**⭐리액트에서의 클로저**

- 대표적으로 useState가 있음

```jsx
function Component() {
	const [state, setState] = useState();
	
	// ...
}
```

useState의 호출은 첫 줄에서 종료 됐지만, setState는 useState 내부의 상태 값을 확인하고 업데이트 할 수 있다. 외부 함수(useState)가 자신이 선언된 외부 함수가 선언된 환경을 기억하고 있음

그렇기에 useState 호출이 끝난 상황에서도 setState를 통해 상태를 업데이트 할 수 있음

### 주의할 점

1. 스코프를  신경쓰자 (var 쓰지마 그냥)
2. 메모리 누수

## 이벤트루프와 비동기 통신

자바스크립트는 싱글 스레드에서 작동한다. 기본적으로 한 번에 하나의 작업만 동기 방식으로 처리할 수 있음.

그런데 현재 자바스크립트에서는 많은 비동기 작업이 이뤄진다. 어떻게 가능한걸까?

### 싱글스레드 자바스크립트

자바스크립트는 왜 싱글스레드일까?

스레드는 하나의 프로세스 메모리를 공유하기 때문에 동시성에 대한 처리가 필요함

공유하는 특성 때문에 하나의 스레드에 문제가 생기면 다른 스레드에도 문제가 발생할 수 있음

자바스크립트는 브라우저에서 HTML을 그리는 데 한정적인 도움을 주는 보조적인 역할로 만들어짐

만약 JS가 멀티스레딩이 가능해서 여러개의 DOM을 동시 조작한다고 생각해보자. 같은 DOM에 동시에 여러개의 스레드가 접근한다고 생각하면 벌써부터 머리아프다.

### 이벤트 루프

이벤트 루프는 자바스크립트 런타임 외부에서 비동기 실행을 돕기 위해 만들어진 장치

- 호출 스택과 이벤트 루프
    - 호출 스택은 자바스크립트에서 수행해야 할 코드나 함수를 순차적으로 담아두는 스택
    - 이 호출 스택이 비었는지 확인하는 것이 이벤트 루프
    - `코드를 실행하는 것` , `호출 스택이 비어있는지 확인하는 것` 모두 단일 스레드에서 일어남
    - 태스크 큐: 실행해야 할 태스크의 집합, 이벤트 루프는 태스크 큐가 여러개임
        - **이름은 큐(queue)지만 실제 자료구조는 집합(set)이다 → 큐에 등록되어 있는 태스크들 중에서 실행 가능한 `가장 오래된 작업`을 가져와야 하기 때문**
- 이벤트 루프의 역할
    - 호출 스택에 실행 중인 코드가 있는지 확인
    - 태스크 규에 대기 중인 함수가 있는지 확인
    - 이 작업을 실행 가능한 오래된 것부터 순차적으로 꺼내와서 실행함 (오래된 것? 그럼 FIFO로 해도 괜찮지 않나 왜 Set으로 하는 거지? 오래 되었다는 게 큐에 담긴 시간인지, 아니면 브라우저 백그라운드에 등록된 시간인지 아리송하다.)
- 몇 초 뒤에 setTimeout 요청을 하거나 fetch를 기반으로 실행되는 네트워크 요청은 태스크 큐가 할당되는 별도의 스레드에서 수행된다. 메인 스레드에서 처리하지 않는다. 이 스레드를 할당하는 것은 브라우저, Node.js 등 런타임이ㅡ 몫

### 태스크 큐와 마이크로 태스크 큐

이벤트 루프는 하나의 마이크로 태스크 큐를 갖고 있는데, Promise(fetch, async/await … )와 같은 비동기 처리를 담당하며 기존 태스크 큐보다 우선순위를 갖는다. 즉, 마이크로 태스크 큐가 빌 때까지는 기존 태스크 큐의 비동기 작업이 실행되지 않는다.

마이크로 태스크 큐 → 렌더링 → 태스크 순으로 진행 

## 리액트에서 자주 사용하는 JS 문법

### 구조분해 할당(디스트럭처링)

배열 또는 객체의 값을 말 그대로 분해해 개별 변수에 즉시 할당하는 것

- 배열 구조 분해 할당
    - hooks가 배열을 반환하는 이유: 객체를 반환하게 되면 반환된 값들을 저장할 변수들의 이름을 변경하는 것이 번거롭다. 배열을 사용한 구조 분해 할당은 자유롭게 이름을 선언할 수 있기 때문에 배열을 반환한다.

배열 구조 분해 할당에는 기본값을 사용할 수 있다.

```jsx
const array = [1, 2];
const [a = 10, b = 10, c = 10] = array;

// a 1
// b 2
// c 10
```

주의 할 점은 undefined일 때만 기본값을 사용한다. null과 같은 falsy한 값은 할당이 이뤄진다.

- 객체 구조 분해 할당

새로운 이름의 변수에 할당하는 것 역시 가능하며, 기본값을 주는 것도 가능하다.

```jsx
const object = {  a: 1, b: 1 };

const { a: first, b: second } = object;
// first 1
// second 1

const { a = 10, b = 10, c = 10 } = object;
// a 1
// b 1
// c 10
```

리액트에서는 props 값을 바로 꺼내올 때 매우 자주 쓰는 방식이다.

변수에 있는 값을 바탕으로 객체의 값을 꺼내올 수 있다.

```jsx
const key = 'a';
const object = {  a: 1, b: 1 };

const { [key]: a } = object;
// a 1
```

객체 구조 분해 할당의 트랜스파일 코드는 복잡하다. 따라서 번들링 크기가 상대적으로 크기 때문에 만약 웹 애플리케이션 개발 환경이 ES5를 고려해야 하며, 객체 구조 분해 할당을 자주 쓰지 않는다면 꼭 써야하는지 검토할 필요가 있다.

### 스프레드

전개 구문은 배열이나 객체, 문자열과 같이 순회할 수 있는 값에 대해 전개하여 간결하게 사용할 수 있는 구문

배열의 경우 `concat` 과 같은 전개구문을 사용지 않아도 되며, 기존 배열에 영향을 주지 않고 복사도 가능하다.

## 타입스크립트

타입스크립트는 런타임에서만 타입을 체크할 수 있는 한계를 극복해 코드를 더욱 안전하게 작성하면서 잠재적인 버그도 크게 줄일 수 있는 기회를 얻게 한다.

자바스크립트는 기본적으로 동적 타입의 언어이기 때문에 대부분의 에러를 런타임에서 확인할 수 있다는 문제점이 있다.

타입스크립트는 타입 체크를 정적으로 런타임이 아닌 빌드 타임에 수행 할 수 있게 해준다.

### 타입스크립트 활용법

- 아직 타입을 특정할 수 없는 경우 any대신 unknown을 사용하자
    - unknown으로 선언된 변수를 사용하기 위해서 type narrowing, 즉 타입을 의도했던 대로 적절히 좁혀야 한다.
    - 예상치 못한 타입을 받아들일 수 있음은 물론, 사용하는 쪽에서도 더욱 안전하게 쓸 수 있다.
- never 어떠한 타입도 올 수 없다는 의미
    - Record<string, nerver>
- 타입 가드를 적극 활용
    - instanceof와 typeof
    - in: property in object로 사용되는데 주로 어떤 객체에 키가 존재하는지 확인하는 용도로 사용된다.
- 제네릭
    - 제네릭은 함수나 클래스 내부에서 단일 타입이 아닌 다양한 타입에 대응할 수 있도록 도와주는 도구다.
    - 리액트에서 제네릭을 사용하는 예시로 useState<T>를 떠올릴 수 있다. 상태의 타입을 지정할 수 있는 것
    - 만약 useState()와 같은 기본형식으로 기본값을 넘기지 않는다면 undefined로 추론한다.
- 인덱스 시그니처
    - 객체의 키를 정의하는 방식, 키에 원하는 타입을 부여할 수 있다.
    - 키를 동적으로 생성할 수 있지만 키의 범위가 string과 같이 광범위한 경우 객체에 정의 되지 않은 키에 접근하더라도 undefined를 반환하고 에러를 발생시키지 않는다
    - 키를 동적으로 선언되는 경우를 최대한 지양

# 01장: 리액트 개발을 위해 꼭 알아야 할 자바스크립트



---

## 목차

1. [리액트가 선호된 이유](#리액트가 선호된 이유)
2. [JS 데이터 타입](#JS 데이터 타입)
3. [값을 지정하는 방식의 차이](#값을 지정하는 방식의 차이)
4. [비교](#비교)
5. [함수](#함수)
6. [클로저](#클로저)
7. 



---

## 리액트가 선호된 이유

- MVC 패턴에서 오는 복잡성, 양방향 바인딩으로 인하여 버그의 논점을 찾기가 어려웠다.
- 단방향 바인딩
- 페이스북에서 커뮤니티 관리 참여
- 코드 크기의 감소
- 상대적으로 완만한 학습 곡선

등등



## JS 데이터 타입

### 원시타입

- `boolean`
- `null`
- `undefined`
- `string`
- `number`
- `symbol`
- `bigint`

### 참조타입

- `object`



### Falsy 한 값

```jsx
false, 0, -0, 0n, 0x0n, NaN, '', "", ``, null, undefined
```



### Object 타입

- 배열
- 함수
- 정규식
- 클래스

등등



## 값을 지정하는 방식의 차이

```jsx
// 같은 값을 가진 기준으로 하여
원시타입 === 원시타입 // true
객체타입 === 객체타입 // false
```



## 비교

## Object.is

== , === , Object.is 로 비교를 하여 boolean값을 표현할 수 있다.

다만, 각 비교의 대한 로직이 살짝 다르다.

```jsx
'0' == 0 // true
'0' === 0 // false
Object.is('0', 0) // false

-0 == +0 // true
-0 === +0 // true
Object.is(-0, +0) // false

NaN == 0/0 // false
NaN === 0/0 // false
Object.is(NaN, 0/0) // true
```

**단, 객체 비교에선 Object.is 역시 ==, ===과 동일하다.**



### 리액트에서의 동등비교

- 리액트에서는 shallowEqual  얕은비교를 한다.

  ```jsx
  Object.is({ a: 1}, {a : 1}) // false
  shallowEqual({ a: 1}, {a : 1}) // true
  shallowEqual({ a: { b : 1}}, {a : { b : 1}}) // false
  ```

  1차 까지만 비교를 한다.



## 함수

### 함수표현 4가지 방법

- 함수선언문
- 함수표현식
- Function 생성자 : new Function
- 화살표 함수 : () => {}

### 함수를 만들 때 주의사항

- 부수효과를 억제해라
  - useEffect를 적게 사용해라.
- 가능한 한 함수를 작게 만들어라.
  - SRP 와 유사
- 누구나 이해 가능한 이름을 붙여라.



## 클로저

>  함수와 함수가 선언된 어휘적 환경의 조합

```js
var counter = 0;

function handleClick() {
	counter++;
}
```

위 코드에서 counter는 전역레벨이기 때문에 누구나 수정이 가능하다는 문제를 가지고 있다.

위 문제를 클로저로 해결해보자.

```js
function Counter() {
	var counter = 0;
	
	return {
		increase : () => {
			return ++counter;
		},
		decrease : () => {
			return --counter;
		},
		counter : () => {
			console.log('카운터 접근');
			return counter;
		}
	}
}

var c = Counter();
console.log(c.increase()); // 1;
console.log(c.increase()); // 2;
```



## 테스크 큐, 렌더링, 마이크로 테스크 큐 실행순서

1. 동기 코드
2. 마이크로 테스크 큐 : Promise, process.nextClick, queueMicroTask, MutationObserver
3. 렌더링
4. 테스크 큐 : setTimeout, setInterval, setImmediate


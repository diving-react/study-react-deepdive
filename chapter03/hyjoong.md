# 03장: 리액트 훅 깊게 살펴보기

리액트를 이루는 핵심 요소들을 깊게 살펴보고, 리액트의 렌더링 과정을 이해하는 장입니다.

<br>

- [03장: 리액트 훅 깊게 살펴보기](#03장-리액트-훅-깊게-살펴보기)
  - [3.1 리액트 훅 깊게 살펴보기](#31-리액트-훅-깊게-살펴보기)
    - [3.1.1 useState](#311-usestate)
    - [3.1.2 useEffect](#312-useeffect)
    - [3.1.3 useMemo](#313-usememo)
    - [3.1.4 useCallback](#314-usecallback)
    - [3.1.5 useRef](#315-useref)
    - [3.1.6 useContext](#316-usecontext)
    - [3.1.7 useReducer](#317-usereducer)
    - [3.1.8 useImperativeHandle](#318-useimperativehandle)
    - [3.1.9 useLayoutEffect](#319-uselayouteffect)
    - [3.1.10 useDebugValue](#3110-usedebugvalue)
    - [3.1.11 훅의 규칙](#3111-훅의-규칙)
    - [3.1.12 정리](#3112-정리)
  - [3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#32-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [3.2.1 사용자 정의 훅](#321-사용자-정의-훅)
    - [3.2.2 고차 컴포넌트](#322-고차-컴포넌트)
    - [3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#323-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [3.2.4 정리](#324-정리)

<br>

## 3.1 리액트 훅 깊게 살펴보기

### 3.1.1 useState

- 함수형 컴포넌트 내부에서 상태를 정의하고 관리할 수 있게 해주는 훅

- useState를 사용하지 않고 함수 내부에서 자체적으로 변수를 사용해 상태값을 관리해도 변화가 발생하지 않는다
- 리액트에서 렌더링은 컴포넌트의 return을 실행한 다음, 이전의 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트를 한다

- useState 내부에 선언된 함수(setState)가 함수의 실행이 종료된 이후에도 지역변수인 state를 계속 참조하는 클로저 형태로 구현되어 있다.

#### 게으른 초기화(lazy initialization)

- useState에는 원시 값 뿐만 아니라 함수를 넣어서 함수의 반환값을 활용할 수 있다.
- useState에 인수로 특정한 값을 넘기는 함수를 인수로 넣어줄 수 있다. 이때 함수를 넘기는 것을 **게으른 초기화(lazy initialization)** 라고 한다.
- state가 처음 만들어질 때만 사용되며, 이후에 리렌더링이 발생하더라도 이 함수의 실행은 무시된다.

useState에 넘긴 함수는 초기 렌더링에 실행이 된다. `setNumber2`으로 값을 업데이트 할 때 리렌더링이 발생하면서 즉시 실행 함수로 값을 넘긴 경우는 호출이 반복되는것을 확인할 수 있다. 반면에 게으른 초기화 방법을 이용한 `number1`` 같은 경우는 초기 렌더링에만 실행이 되고 setState로 값을 변경해도 함수가 실행되지 않는다

```javascript
const page = () => {
  const [number1, setNumber1] = useState(() => {
    console.log("함수 참조"); // 처음에만 실행되고, 리렌더링시에는 실행되지 않음
    return 0;
  });
  const [number2, setNumber2] = useState(
    (() => {
      console.log("즉시 실행함수");
      return 1;
    })()
  );
  return (
    <>
      <h1>number1 : {number1}</h1>
      <h1>number2 : {number2}</h1>
      <button onClick={() => setNumber1(number1 + 1)}>number1 +1 </button>
      <button onClick={() => setNumber2(number2 + 1)}>number2 +1 </button>
    </>
  );
};
```

<img width="327" alt="image" src="https://github.com/react-project-study/react-project/assets/70426440/45dac806-f3ef-4bb0-80e1-5be75af04bf1">

### 3.1.2 useEffect

- 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘
  - 이 부수효과가 '언제' 일어나는지보다 **어떤 상태값과 함께 실행되는지**가 중요하다.

#### 클린 업 함수

- 이벤트를 등록하고 지울 때 사용
- 클린업 함수는 언마운트가 아닌 함수형 컴포넌트가 리렌더링될 때, 의존성이 변했을 때 이전 상태를 정리해 주는 개념

```javascript
useEffect(() => {
  window.addEventListener("click", addMouseEvent);
  return () => {
    console.log("클린업 함수 실행");
    window.removeEventListener("click", addMouseEvent);
  };
}, [counter]);
```

### 3.1.3 useMemo

- 비용이 큰 연산에 대한 결과를 저장해 두고, 이 저장된 값을 반환하는 훅

### 3.1.4 useCallback

- 인수로 넘겨받은 콜백을 기억하는 훅으로, 특정 함수를 새로 만들지 않고 재사용한다

### 3.1.5 useRef

- 변경 가능한 상태값을 저정하는 훅으로, DOM에 접근하고 상태값을 저장할 때 사용된다
- 주로 이전 상태값을 저장하거나 DOM에 직접 접근해야 할 떄 활용한다
- useRef의 중요한 특징은 값을 변경해도 컴포넌트를 리렌더링하지 않는다
- useState와의 차이점은 useRef가 반환하는 객체 내부의 current 프로퍼티를 통해 값에 접근하고 변경할 수 있다.

### 3.1.6 useContext

- 상위 컴포넌트에서 만들어진 Context를 함수형 컴포넌트에서 사용할 수 있도록 하는 훅

#### useContext를 사용할 때 주의할 점

1. 컴포넌트 재활용이 어려워 진다

- useContext가 선언돼 있으면 Provider에 의존성을 가지고 있어서 재사용이되지 않을만한 컴포넌트에서 사용해야 한다.

2. Context API는 상태관리 API가 아닌 **상태를 주입해주는 API**다

- 상태 관리 라이브러리가 되기 위해서는 다음과 같은 두 가지 조건을 만족해야 한다
  - 1. 어떠한 상태를 기반으로 다른 상태를 만들어 낼 수 있어야 한다.
  - 2. 필요에 따라 이러한 상태 변화를 최적화할 수 있어야 한다.

그러나 Context는 둘 중 어느것도 하지 못 한다. 단순히 props값을 하위로 전달해 줄 뿐이라 useContext를 사용한다 해서 렌더링이 최적화되지는 않는다

3. Provider 값이 변경되면 자식 전체가 리렌더링이 발생하므로 React.memo를 사용해서 최적화할 필요가 있다

> Context란? </br>
> props drilling을 극복하기 위해 등장한 개념으로, props 전달 없이도 선언한 하위 컴포넌트에서 값을 사용할 수 있다

### 3.1.7 useReducer

- useState의 심화 버전으로, 복잡한 상태값을 사전에 정의된 시나리오에 따라 관리할 수 있도록 도와주는 훅
- 복잡한 형태의 state를 미리 정의된 dispatcher로만 수정할 수 있게 하여 state에 대한 접근을 제한하고, state의 업데이트를 미리 정의해 둔 dispatcher로만 가능하게 한다
- 이를 통해 state를 변경하는 시나리오를 제한적으로 두고 변경 사항을 빠르게 확인할 수 있다

### 3.1.8 useImperativeHandle

### 3.1.9 useLayoutEffect

### 3.1.10 useDebugValue

### 3.1.11 훅의 규칙

### 3.1.12 정리

<br>

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

### 3.2.1 사용자 정의 훅

### 3.2.2 고차 컴포넌트

### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

### 3.2.4 정리

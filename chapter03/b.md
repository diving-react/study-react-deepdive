## 03장: 리액트 훅 깊게 살펴보기

<br>

- [03장: 리액트 훅 깊게 살펴보기](#03장-리액트-훅-깊게-살펴보기)
- [3.1 리액트의 모든 훅 파헤치기](#31-리액트의-모든-훅-파헤치기)
  - [3.1.1 `useState`](#311-usestate)
  - [3.1.2 `useEffect`](#312-useeffect)
  - [3.1.3 `useMemo`](#313-usememo)
  - [3.1.4 `useCallback`](#314-usecallback)
  - [3.1.5 `useRef`](#315-useref)
  - [3.1.6 `useContext`](#316-usecontext)
  - [3.1.7 `useReducer`](#317-usereducer)
  - [3.1.8 `useImperativeHandle`](#318-useimperativehandle)
  - [3.1.9 `useLayoutEffect`](#319-uselayouteffect)
  - [3.1.10 `useDebugValue`](#3110-usedebugvalue)
  - [3.1.11 훅의 규칙](#3111-훅의-규칙)
  - [3.1.12 정리](#3112-정리)
- [3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#32-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
  - [3.2.1 사용자 정의 훅](#321-사용자-정의-훅)
  - [3.2.2 고차 컴포넌트](#322-고차-컴포넌트)
  - [3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#323-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
  - [3.2.4 정리](#324-정리)
- [References](#references)
- [Articles](#articles)

<br>

## 3.1 리액트의 모든 훅 파헤치기

| 훅 이름          | 타입        | 정의                                                    | 예제                                                  |
|-----------------|-------------|---------------------------------------------------------|-----------------------------------------------------------|
| useState        | 상태 훅     | 상태 값을 관리하고 업데이트하는 데 사용                   | `const [count, setCount] = useState(0);`                   |
| useEffect       | 효과 훅     | 컴포넌트의 생명주기에 따른 작업을 수행하는 데 사용         | `useEffect(() => { console.log('Component mounted'); }, []);` |
| useMemo         | 메모이제이션 훅 | 계산 결과를 기억하고 재사용하는 데 사용                    | `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);` |
| useCallback    | 콜백 훅     | 콜백 함수를 기억하고 재사용하는 데 사용                    | `const memoizedCallback = useCallback(() => { /* callback logic */ }, [dependency]);` |
| useRef          | 참조 훅     | 컴포넌트 내에서 변경 가능한 값을 저장하는 데 사용           | `const refContainer = useRef(initialValue);`               |
| useContext      | 컨텍스트 훅 | React의 컨텍스트를 사용하는 데 사용                         | `const value = useContext(MyContext);`                     |
| useReducer      | 리듀서 훅   | 상태와 액션을 받아 새로운 상태를 반환하는 리듀서 함수와 함께 사용 | `const [state, dispatch] = useReducer(reducer, initialState);` |
| useImperativeHandle | 인퍼런스 훅 | 부모 컴포넌트에서 자식 컴포넌트의 인스턴스를 조작하는 데 사용 | `useImperativeHandle(ref, () => ({ method() { /* method logic */ } }));` |
| useLayoutEffect | 레이아웃 훅 | DOM 업데이트 이후 동기적으로 작업을 수행하는 데 사용        | `useLayoutEffect(() => { /* layout effect logic */ }, []);` |
| useDebugValue   | 디버그 훅   | 커스텀 훅에서 디버깅 정보를 제공하는 데 사용                | `useDebugValue(value);`                                    |


### 3.1.1 `useState`

```jsx
/** 
 * * @description useState 훅의 기본적인 사용법 (p. 190) 
 * * useState는 React에서 상태를 관리하기 위해 사용되는 훅입니다. 
 * * 이 훅은 두 개의 요소로 이루어진 배열을 반환합니다: 
 * * - 첫 번째 요소인 state는 현재 상태 값을 나타냅니다. 
 * * - 두 번째 요소인 setState는 상태 값을 업데이트하기 위해 사용되는 함수입니다. 
 * * * @param {*} initialState 초기 상태 값을 나타냅니다. 제공되지 않으면 undefined로 초기화됩니다. 
* */

import { useState } from "react";
const [state, setState] = useState(initialState);
```

- `useState`를 사용하여 상태를 업데이트할 때, 이전 상태와 새로운 상태를 병합하지 않고 새로운 상태로 대체합니다.
- `useState`를 사용하여 상태를 업데이트할 때 이전 상태와 새로운 상태를 병합하고 싶다면, 개별적인 상태 변수를 사용하거나 `useReducer` 훅을 사용할 수 있습니다.
- `useState` 훅은 상태를 변경할 때마다 전체 상태 객체를 대체하는 것이 아니라, 변경된 부분만 업데이트합니다. 이전 상태와 새로운 상태를 병합하지 않는 이유는 React가 불필요한 렌더링을 방지하고 성능을 최적화하기 위해서입니다.
- `useState`는 클래스 컴포넌트에서 찾을 수 있는 `setState` 메서드와 달리 업데이트 객체를 자동으로 병합하지 않습니다. 그러나 함수 업데이터 형식과 객체 전개 구문을 결합하여 이 동작을 복제할 수 있습니다.
- `useState`는 클래스 컴포넌트와 함수 컴포넌트에서 각각 사용됩니다.
- React에서 상태 업데이트는 비동기적으로 처리됩니다. 따라서 업데이트가 요청되었을 때 즉시 업데이트가 이루어질 것을 보장할 수는 없습니다. 이는 React의 내부 동작 원리에 따라 상태 업데이트는 일괄 처리되며, React는 업데이트가 발생한 컴포넌트를 감지하고 필요한 경우에만 화면을 다시 렌더링하기 때문입니다.
- `useState` 훅은 React에서 동기적으로 작동하지만, 재렌더링 과정 때문에 상태 변경이 비동기적으로 보일 수 있습니다.
- React에서 `useState` 훅은 함수형 컴포넌트에서 상태를 관리하기 위해 사용됩니다. 이 훅을 사용하면 상태 값을 저장하고 업데이트할 수 있습니다.
- `useState` 훅은 동기적으로 작동하지만, React는 상태 변경이 발생하면 컴포넌트를 재렌더링합니다. 재렌더링은 React가 가상 DOM을 사용하여 변경된 상태를 실제 DOM에 반영하는 과정입니다. 이 과정은 비동기적으로 처리됩니다. 따라서 상태 변경 후에 컴포넌트가 즉시 재렌더링되지 않을 수 있습니다. 대신, React는 상태 변경을 큐에 저장하고, 다음 렌더링 사이클에서 변경된 상태를 적용합니다.이러한 비동기적인 재렌더링 과정 때문에, `useState` 훅을 사용하여 상태를 변경한 후에도 즉시 변경된 상태를 접근할 수 없을 수 있습니다.
- `useState`는 클래스 컴포넌트에서 찾을 수 있는 `setState` 메서드와 달리 업데이트 객체를 자동으로 병합하지 않습니다. 그러나 함수 업데이터 형식과 객체 전개 구문을 결합하여 이 동작을 복제할 수 있습니다.

```jsx
// spread 연산자
const [state, setState] = useState({});
setState(prevState => {
  return {...prevState, ...updatedValues};
});
```

```jsx
// Object.assign
const [state, setState] = useState({});
setState(prevState => {
  return Object.assign({}, prevState, updatedValues);
});
```

```jsx
// useReducer 사용
// - 여러 하위 값이 포함된 상태 객체를 관리하기에 더 적합합니다.
const initialState = {};
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({type: 'UPDATE_STATE', payload: updatedValues});
```

### 3.1.2 `useEffect`
### 3.1.3 `useMemo`
### 3.1.4 `useCallback`
### 3.1.5 `useRef`
### 3.1.6 `useContext`
### 3.1.7 `useReducer`
### 3.1.8 `useImperativeHandle`
### 3.1.9 `useLayoutEffect`
### 3.1.10 `useDebugValue`
### 3.1.11 훅의 규칙
### 3.1.12 정리

<br>

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?
### 3.2.1 사용자 정의 훅
### 3.2.2 고차 컴포넌트
### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?
### 3.2.4 정리

## References
- [리액트 공식문서, Introducing Hooks](https://legacy.reactjs.org/docs/hooks-intro.html)
- [리액트 공식문서, Hooks API Reference](https://legacy.reactjs.org/docs/hooks-reference.html)
- [useState](https://react.dev/reference/react/useState)

## Articles
- [DEV, Why useeffect is running twice in react](https://dev.to/jahid6597/why-useeffect-is-running-twice-in-react-18c6#:~:text=In%20React%2C%20the%20useEffect%20hook,as%20%22dependencies%22)%20change)
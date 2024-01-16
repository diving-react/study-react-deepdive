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
  - [3.1.11 훅 규칙(Rules of hooks)](#3111-훅-규칙rules-of-hooks)
  - [3.1.12 정리](#3112-정리)
- [3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#32-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
  - [3.2.1 사용자 정의 훅](#321-사용자-정의-훅)
  - [3.2.2 고차 컴포넌트](#322-고차-컴포넌트)
  - [3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#323-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [사용자 정의 훅이 필요한 경우](#사용자-정의-훅이-필요한-경우)
    - [고차 컴포넌트를 사용해야 하는 경우](#고차-컴포넌트를-사용해야-하는-경우)
  - [3.2.4 정리](#324-정리)
- [References](#references)
- [Articles](#articles)

<br>

## 3.1 리액트의 모든 훅 파헤치기

| 훅 이름          |  정의                                                    | 예제                                                  |
|-----------------|---------------------------------------------------------|-----------------------------------------------------------|
| useState        | 상태 값을 관리하고 업데이트하는 데 사용                   | `const [count, setCount] = useState(0);`                   |
| useEffect       | 컴포넌트의 생명주기에 따른 작업을 수행하는 데 사용         | `useEffect(() => { console.log('Component mounted'); }, []);` |
| useMemo         | 계산 결과를 기억하고 재사용하는 데 사용                    | `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);` |
| useCallback    | 콜백 함수를 기억하고 재사용하는 데 사용                    | `const memoizedCallback = useCallback(() => { /* callback logic */ }, [dependency])` |
| useRef          | 컴포넌트 내에서 변경 가능한 값을 저장하는 데 사용           | `const refContainer = useRef(initialValue);`               |
| useContext      | React의 컨텍스트를 사용하는 데 사용                         | `const value = useContext(MyContext);`                     |
| useReducer      | 상태와 액션을 받아 새로운 상태를 반환하는 리듀서 함수와 함께 사용 | `const [state, dispatch] = useReducer(reducer, initialState);` |
| useImperativeHandle | 부모 컴포넌트에서 자식 컴포넌트의 인스턴스를 조작하는 데 사용 | `useImperativeHandle(ref, () => ({ method() { /* method logic */ } }));` |
| useLayoutEffect | DOM 업데이트 이후 동기적으로 작업을 수행하는 데 사용        | `useLayoutEffect(() => { /* layout effect logic */ }, []);` |
| useDebugValue   | 커스텀 훅에서 디버깅 정보를 제공하는 데 사용                | `useDebugValue(value);`                                    |


### 3.1.1 `useState`

```jsx
/**
 * 
 * 상태와 상태를 갱신하는 함수를 반환하는 훅입니다.
 * @param initialState — 초기 상태 값입니다.
 */
useState(initialState);
```

### 3.1.2 `useEffect`

```jsx
/**
 * 
 * 부수 효과를 포함하는 명령형 코드를 포함하는 함수를 받습니다.
 * @param effect — 정리(clean-up) 함수를 반환할 수 있는 명령형 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 효과가 활성화됩니다.
 */
useEffect(() => {
  /**
   * 이 함수는 컴포넌트가 렌더링될 때마다,
   * 그리고 의존성 중 어느 것이든 변경될 때마다 호출됩니다.
   */
},
[dependencies] // 이 useEffect 훅에 대한 의존성 배열입니다.
               // 의존성이 변경되면, useEffect에 전달된 함수가 다시 호출됩니다.
);
```

### 3.1.3 `useMemo`

```jsx
/**
 * 
 * 계산된 값을 기억하는 데 사용되는 훅입니다.
 * @param factory — 새로운 값을 계산하는 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 새로운 값을 다시 계산합니다.
 */
useMemo(() => {
  /**
   * 이 함수는 의존성이 변경될 때마다 호출되며,
   * 새로운 값을 계산하여 반환합니다.
   */
},
[dependencies] // 이 useMemo 훅에 대한 의존성 배열입니다.
               // 의존성이 변경되면, useMemo에 전달된 함수가 다시 호출되고
               // 새로운 값을 반환합니다.
);
```

### 3.1.4 `useCallback`

```jsx
/**
 * 
 * 이전에 생성된 콜백 함수를 기억하는 데 사용되는 훅입니다.
 * @param callback — 새로운 콜백 함수를 생성하는 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 새로운 콜백 함수를 다시 생성합니다.
 */
useCallback(() => {
  /**
   * 이 함수는 의존성이 변경될 때마다 호출되며,
   * 새로운 콜백 함수를 생성하여 반환합니다.
   */
},
[dependencies] // 이 useCallback 훅에 대한 의존성 배열입니다.
               // 의존성이 변경되면, useCallback에 전달된 함수가 다시 호출되고
               // 새로운 콜백 함수를 반환합니다.
);
```

### 3.1.5 `useRef`

```jsx
/**
 * 
 * 변경 가능한 값을 유지하는 데 사용되는 훅입니다.
 * @param initialValue — 초기 값으로 사용할 값입니다.
 */
useRef(initialValue);
```

### 3.1.6 `useContext`

```jsx
/**
 * 
 * 컨텍스트(Context) 값을 반환하는 훅입니다.
 * @param context — 컨텍스트 객체입니다.
 */
useContext(context);
```

### 3.1.7 `useReducer`

```jsx
/**
 * 
 * 상태와 상태를 갱신하는 함수를 반환하는 훅입니다.
 * @param reducer — 상태 갱신을 처리하는 리듀서 함수입니다.
 * @param initialState — 초기 상태 값입니다.
 * @param initializer — 초기 상태를 설정하는 함수입니다. 선택적 매개변수입니다.
 */
useReducer(reducer, initialState, initializer);
```

### 3.1.8 `useImperativeHandle`

```jsx
/**
 * 
 * 외부에서 접근 가능한 인스턴스의 특정 함수를 정의하는 훅입니다.
 * @param ref — 외부에서 접근 가능한 인스턴스의 ref 객체입니다.
 * @param createHandle — 외부에서 접근 가능한 인스턴스에 정의할 함수를 생성하는 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 새로운 핸들을 생성합니다.
 */
useImperativeHandle(ref, createHandle, deps);
```

### 3.1.9 `useLayoutEffect`

```jsx
/**
 * 
 * 명령형 코드를 포함하는 함수를 받아 렌더링 이후에 동기적으로 실행되는 훅입니다.
 * @param effect — 정리(clean-up) 함수를 반환할 수 있는 명령형 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 효과가 활성화됩니다.
 */
useLayoutEffect(() => {
  /**
   * 이 함수는 컴포넌트가 렌더링된 직후에 동기적으로 호출됩니다.
   * 의존성 중 어느 것이든 변경될 때마다 호출됩니다.
   */
},
[dependencies] // 이 useLayoutEffect 훅에 대한 의존성 배열입니다.
               // 의존성이 변경되면, useLayoutEffect에 전달된 함수가 다시 호출됩니다.
);
```

### 3.1.10 `useDebugValue`

```jsx
/**
 * 
 * 디버깅 목적으로 사용되는 훅입니다.
 * @param value — 디버그할 값입니다.
 * @param formatter — 값의 표시 형식을 지정하는 함수입니다. 선택적 매개변수입니다.
 */
useDebugValue(value, formatter);
```

### 3.1.11 훅 규칙(Rules of hooks)
- React 훅(Hooks) 규칙은 React 함수 컴포넌트에서 훅을 사용할 때 지켜야 하는 원칙들입니다.
- React 개발 팀은 이 규칙들을 준수하도록 돕기 위해 ESLint 플러그인인 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)를 제공하고 있으며, 이를 사용하면 위반 사항을 쉽게 찾아낼 수 있습니다

> - [React 공식 문서, Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)
> - (한국어 버전)[React 공식 문서, Rules of Hooks](https://ko.legacy.reactjs.org/docs/hooks-rules.html)
> - [React Dev, Rule of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

**훅 규칙(Rules of hooks)**
- Hooks는 함수형 컴포넌트 내에서만 사용되어야 합니다. 대신, 커스텀 훅을 만들어 사용할 수 있습니다.
  - 클래스 컴포넌트에서는 Hooks를 사용할 수 없습니다.
- Hooks는 항상 최상위 레벨에서 호출되어야 합니다. 조건문, 반복문, 중첩 함수 내에서는 Hooks를 호출할 수 없습니다. 이는 훅의 호출 순서를 보장하기 위함입니다.
- 커스텀 Hooks는 `use`로 시작되어야 합니다. 예를 들어, `useCounter`, `useFetch` 등과 같이 이름을 지정해야 합니다.
- Hooks는 컴포넌트의 동일한 순서로 호출되어야 합니다. Hooks는 호출 순서에 의존하기 때문에, 조건문 안에서 Hooks를 사용하면 예상치 못한 동작을 할 수 있습니다.

**훅(Hooks) 규칙이 만들어진 이유**
1. **훅 호출 순서의 보장**:  React는 훅이 호출되는 순서에 의존하여 내부 상태를 관리합니다. 만약 조건문이나 반복문 내에서 훅을 호출한다면, 훅의 호출 순서가 보장되지 않아 React가 내부 상태를 올바르게 관리하지 못할 수 있습니다.
2. **컴포넌트 간의 코드 재사용 촉진**: 훅 규칙을 따르면 커스텀 훅을 만들어 다른 컴포넌트 간에 상태 로직을 쉽게 재사용할 수 있습니다.
3. **버그 예방**: 규칙을 준수하면 훅의 잘못된 사용으로 인한 버그 발생 가능성을 줄일 수 있습니다.
4. **코드의 이해와 유지보수 용이**: 모든 훅이 컴포넌트 최상단에서 호출되어야 한다는 규칙은 코드의 일관성을 유지하고, 다른 개발자들이 코드를 이해하고 유지보수하기 쉽게 만듭니다.

### 3.1.12 정리

<br>

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?
### 3.2.1 사용자 정의 훅
### 3.2.2 고차 컴포넌트
### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?
#### 사용자 정의 훅이 필요한 경우
#### 고차 컴포넌트를 사용해야 하는 경우

### 3.2.4 정리

<br>

## References
- [리액트 공식문서, Introducing Hooks](https://legacy.reactjs.org/docs/hooks-intro.html)
- [리액트 공식문서, Hooks API Reference](https://legacy.reactjs.org/docs/hooks-reference.html)
- [useState](https://react.dev/reference/react/useState)

<br>

## Articles
- [DEV, Why useEffect is running twice in react](https://dev.to/jahid6597/why-useeffect-is-running-twice-in-react-18c6#:~:text=In%20React%2C%20the%20useEffect%20hook,as%20%22dependencies%22)%20change)
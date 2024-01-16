## 03장: 리액트 훅 깊게 살펴보기

<br>

- [03장: 리액트 훅 깊게 살펴보기](#03장-리액트-훅-깊게-살펴보기)
- [3.1 리액트의 모든 훅 파헤치기](#31-리액트의-모든-훅-파헤치기)
  - [3.1.1 `useState`](#311-usestate)
    - [게으른 초기화(lazy initialization)](#게으른-초기화lazy-initialization)
    - [`useState` 훅의 규칙](#usestate-훅의-규칙)
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
  - [3.2.1 사용자 정의 훅(Custom Hook)](#321-사용자-정의-훅custom-hook)
  - [3.2.2 고차 컴포넌트(Higher Order Component;HOC)](#322-고차-컴포넌트higher-order-componenthoc)
  - [3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#323-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [사용자 정의 훅이 필요한 경우](#사용자-정의-훅이-필요한-경우)
    - [고차 컴포넌트를 사용해야 하는 경우](#고차-컴포넌트를-사용해야-하는-경우)
  - [3.2.4 정리](#324-정리)
- [References](#references)
- [Articles](#articles)

<br>

## 3.1 리액트의 모든 훅 파헤치기

| 훅 이름             | 정의                                                              | 예제                                                                                 |
| ------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| useState            | 상태 값을 관리하고 업데이트하는 데 사용                           | `const [count, setCount] = useState(0);`                                             |
| useEffect           | 컴포넌트의 생명주기에 따른 작업을 수행하는 데 사용                | `useEffect(() => { console.log('Component mounted'); }, []);`                        |
| useMemo             | 계산 결과를 기억하고 재사용하는 데 사용                           | `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`          |
| useCallback         | 콜백 함수를 기억하고 재사용하는 데 사용                           | `const memoizedCallback = useCallback(() => { /* callback logic */ }, [dependency])` |
| useRef              | 컴포넌트 내에서 변경 가능한 값을 저장하는 데 사용                 | `const refContainer = useRef(initialValue);`                                         |
| useContext          | React의 컨텍스트를 사용하는 데 사용                               | `const value = useContext(MyContext);`                                               |
| useReducer          | 상태와 액션을 받아 새로운 상태를 반환하는 리듀서 함수와 함께 사용 | `const [state, dispatch] = useReducer(reducer, initialState);`                       |
| useImperativeHandle | 부모 컴포넌트에서 자식 컴포넌트의 인스턴스를 조작하는 데 사용     | `useImperativeHandle(ref, () => ({ method() { /* method logic */ } }));`             |
| useLayoutEffect     | DOM 업데이트 이후 동기적으로 작업을 수행하는 데 사용              | `useLayoutEffect(() => { /* layout effect logic */ }, []);`                          |
| useDebugValue       | 커스텀 훅에서 디버깅 정보를 제공하는 데 사용                      | `useDebugValue(value);`                                                              |

### 3.1.1 `useState`

```jsx
/**
 *
 * 상태와 상태를 갱신하는 함수를 반환하는 훅입니다.
 * @param initialState — 초기 상태 값입니다.
 */
useState(initialState);
```

```jsx
const [현재 상태, value를 업데이트하는 함수] = useState(초기값);
```

- `useState`는 React 함수 컴포넌트에서 상태(state)를 관리하기 위한 훅(hook)입니다.
- `useState`를 사용할 때는 상태의 초기값을 설정하기 위해 매개변수로 전달합니다.

  - 이 훅을 호출하면 배열이 반환되는데, 이 배열의 첫 번째 원소는 현재 상태 값을 나타내고, 두 번째 원소는 해당 상태 값을 업데이트하는 함수인 'Setter 함수'입니다.
  - useState 훅을 사용할 때 상태 변수와 그 상태를 업데이트하는 함수에 대한 명명 규칙은 <u>배열 구조 분해</u>를 통해 `[something, setSomething]`과 같이 이름을 지정하는 것입니다.

    <details>
    <summary>배열 비구조화 할당</summary>
    배열 비구조화 할당은 JavaScript ES6에 도입된 기능으로, 배열의 요소들을 변수에 쉽게 할당할 수 있도록 해주는 문법입니다. 이 방법을 사용하면 배열 내부의 요소를 개별 변수에 할당하기 위해 인덱스를 사용할 필요가 없어 코드가 더 간결하고 읽기 쉬워집니다.

    예를 들어, 다음과 같은 배열이 있다고 가정해 보겠습니다:

    ```javascript
    let numbers = [1, 2, 3];
    ```

    전통적인 방식으로는 각각의 요소를 변수에 할당하기 위해 다음과 같이 작성해야 합니다:

    ```javascript
    let one = numbers[0];
    let two = numbers[1];
    let three = numbers[2];
    ```

    하지만 배열 비구조화 할당을 사용하면 다음과 같이 훨씬 간단하게 작성할 수 있습니다:

    ```javascript
    let [one, two, three] = numbers;
    ```

    이렇게 하면 numbers 배열의 첫 번째 요소가 one 변수에, 두 번째 요소가 two 변수에, 세 번째 요소가 three 변수에 각각 할당됩니다.

    또한 배열 비구조화 할당은 기본값 설정, 나머지 요소(rest elements) 수집 등의 추가적인 기능도 제공합니다. 예를 들어, 다음과 같은 경우를 살펴보겠습니다:

    ```javascript
    let [one, two, three, four = 4] = numbers;
    ```

    위 코드에서 numbers 배열에는 세 개의 요소만 존재하지만, four 변수에는 기본값으로 4가 할당됩니다.

    나머지 요소를 수집하는 예시는 다음과 같습니다:

    ```javascript
    let [one, ...rest] = numbers;
    ```

    rest 변수는 배열의 나머지 부분을 담게 되며, 이 경우 [2, 3]이 됩니다.
    </details>

- 리액트의 함수형 컴포넌트는 매 렌더링마다 새로운 함수 호출로 간주되기 때문에, 컴포넌트의 로컬 변수들은 호출이 끝날 때 사라지고 다음 렌더링 때 새로 생성됩니다. 하지만 `useState`와 같은 훅을 사용하면, 리액트가 내부적으로 상태를 관리하여 컴포넌트가 다시 실행되어도 이전 상태 값을 유지할 수 있게 합니다. 이 상태 관리는 클로저와 밀접한 관련이 있습니다. 클로저는 함수가 선언될 때의 렉시컬 환경을 기억하는 함수를 말합니다. React에서 클로저는 주로 이벤트 핸들러나 비동기 작업에서 이전 상태 값을 참조할 때 중요한 역할을 합니다.

```jsx
import React, { useState } from "react";

function Counter() {
  // useState를 사용하여 'count'라는 상태 변수와 이를 업데이트하는 'setCount' 함수를 선언합니다.
  const [count, setCount] = useState(0);

  // 클릭 이벤트 핸들러에서 클로저를 사용합니다.
  // 이 함수는 'count' 상태를 참조하며, 클릭 시에 'setCount'를 호출하여 상태를 업데이트합니다.
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1); // 클로저를 통해 이전 상태 값을 참조합니다.
  };

  // 컴포넌트가 렌더링될 때마다 'handleIncrement' 함수는 새로 생성되지만,
  // 'setCount' 함수는 항상 최신 'count' 상태에 접근할 수 있습니다.
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={handleIncrement}>증가</button>
    </div>
  );
}

export default Counter;
```

> 위 코드에서 `handleIncrement` 함수는 `setCount` 함수를 호출할 때마다 `count` 상태를 업데이트합니다. 이 때 `handleIncrement` 내부에서 참조하는 `count` 값은 클로저를 통해 함수가 선언될 당시의 `count` 값으로 고정됩니다.
> `useEffect`의 의존성 배열이 빈 배열인 경우, `handleIncrement`는 컴포넌트가 처음 마운트될 때의 `count` 값인 0을 '기억'합니다. 따라서 `setInterval`에 의해 호출되는 `handleIncrement`는 항상 `count`를 `1`로만 설정하게 됩니다. 이 문제를 해결하기 위해서는, `count`에 대한 의존성을 `useEffect`의 배열에 추가하거나, `Setter` 함수에 함수를 전달하여 이전 상태 값을 기반으로 새 상태 값을 설정하도록 해야 합니다.
>
> ```jsx
> function handleIncrement() {
>   setCount((prevCount) => prevCount + 1);
> }
> ```
>
> 이렇게 하면 `setCount는` 현재의 `count` 값에 접근하는 대신, 업데이트 시점의 가장 최신 상태 값을 사용하여 업데이트를 수행하게 됩니다.

#### 게으른 초기화(lazy initialization)

컴포넌트의 상태를 초기화할 때 초기 상태 계산이 복잡하거나 계산 비용이 높을 경우에 사용되는 기법입니다. `useState` 훅을 사용할 때, 초기 상태를 함수로 전달함으로써 컴포넌트가 처음 렌더링될 때만 해당 상태의 초기값을 계산하도록 할 수 있습니다.

```jsx
import React, { useState } from "react";

function ExpensiveInitialStateComponent() {
  // 상태의 초기값을 설정하는 함수를 useState에 전달합니다.
  // 이 함수는 컴포넌트가 처음 렌더링될 때 한 번만 호출됩니다.
  const [expensiveState, setExpensiveState] = useState(() => {
    console.log("이 로그는 컴포넌트가 처음 렌더링될 때만 나타납니다.");
    // 복잡한 계산이나 데이터 추출 로직을 여기에 작성합니다.
    // 예를 들어, 큰 배열을 생성하거나, 복잡한 연산을 수행하는 등의 작업을 할 수 있습니다.
    const initialState = performExpensiveCalculation();
    return initialState;
  });

  // ...

  return <div>{/* 렌더링 로직 */}</div>;
}

function performExpensiveCalculation() {
  // 복잡하고 시간이 많이 걸리는 계산을 수행하는 함수입니다.
  // 실제로는 여기에 실제 계산 로직이 들어갑니다.
  console.log("비싼 계산을 수행합니다.");
  return "계산된 초기 상태";
}

export default ExpensiveInitialStateComponent;
```

> 이 코드에서 `useState`는 초기 상태를 계산하기 위한 함수를 인자로 받습니다. 이 함수는 컴포넌트가 처음 렌더링될 때 한 번만 호출되고, 그 결과값은 상태의 초기값으로 사용됩니다. 이렇게 함으로써 불필요한 계산을 매 렌더링마다 반복하는 것을 방지할 수 있어 성능을 최적화할 수 있습니다.

#### `useState` 훅의 규칙

```jsx
import React, { useState } from "react";

function MyComponent() {
  // 최상위 레벨에서 useState를 호출하여 'count' 상태 변수를 선언하고 초기값을 0으로 설정합니다.
  const [count, setCount] = useState(0);

  // 컴포넌트의 나머지 부분...
}
```

- 컴포넌트의 최상위 레벨에서 `useState`를 호출하여 상태 변수를 선언해야 합니다.
  - `useState`는 반드시 함수의 최상위에서만 호출되어야 하며, 조건문, 반복문, 중첩된 함수 내부에서 호출되어서는 안 됩니다. 이 규칙은 React의 훅이 항상 동일한 순서로 호출되어야 하는 '훅 규칙'을 따르기 위함입니다
- `useState`는 함수 컴포넌트 내에서만 호출되어야 합니다.
  - 클래스 컴포넌트에서는 `useState`를 사용할 수 없습니다.

### 3.1.2 `useEffect`

```jsx
/**
 *
 * 부수 효과를 포함하는 명령형 코드를 포함하는 함수를 받습니다.
 * @param effect — 정리(clean-up) 함수를 반환할 수 있는 명령형 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 효과가 활성화됩니다.
 */
useEffect(
  () => {
    /**
     * 이 함수는 컴포넌트가 렌더링될 때마다,
     * 그리고 의존성 중 어느 것이든 변경될 때마다 호출됩니다.
     */
    return () => {
      // clean-up(optional)
    };
  },
  [dependencies] // 이 useEffect 훅에 대한 의존성 배열입니다.
  // 의존성이 변경되면, useEffect에 전달된 함수가 다시 호출됩니다.
);
```

- **`clean-up function`**:
  - 이 클린업 함수는 훅에서 생성된 리소스나 효과를 정리하는 데 사용됩니다.
  - API에서 데이터를 가져오거나 이벤트 리스너를 설정하거나 간격이나 타임아웃을 생성하는 등의 부작용을 정리할 수 있습니다.

### 3.1.3 `useMemo`

```jsx
/**
 *
 * 계산된 값을 기억하는 데 사용되는 훅입니다.
 * @param factory — 새로운 값을 계산하는 함수입니다.
 * @param deps — 제공된 값이 변경될 때만 새로운 값을 다시 계산합니다.
 */
useMemo(
  () => {
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
useCallback(
  () => {
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
useLayoutEffect(
  () => {
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
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 설치:
    ```bash
    npm install eslint-plugin-react-hooks@next
    ```
    ```json
    // ESLint config 파일
    {
      "plugins": [
        // ...
        "react-hooks"
      ],
      "rules": {
        // ...
        "react-hooks/rules-of-hooks": "error"
      }
    }
    ```
- Hooks 규칙을 어길 경우에는 에러가 발생할 수 있습니다.
  ```bash
  # console
  Hooks can only be called inside the body of a function component.
  ```

**훅 규칙(Rules of hooks)**

- <u>Hooks는 함수형 컴포넌트 내에서만 사용되어야 합니다.</u> 대신, 커스텀 훅을 만들어 사용할 수 있습니다.
  - 커스텀 Hooks는 `use`로 시작되어야 합니다. 예를 들어, `useCounter`, `useFetch` 등과 같이 이름을 지정해야 합니다.
  - 클래스 컴포넌트에서는 Hooks를 사용할 수 없습니다.
- <u>Hooks는 항상 최상위 레벨에서 호출되어야 합니다.</u> 조건문, 반복문, 중첩 함수 내에서는 Hooks를 호출할 수 없습니다. 이는 훅의 호출 순서를 보장하기 위함입니다.
  - Hooks는 컴포넌트의 동일한 순서로 호출되어야 합니다. Hooks는 호출 순서에 의존하기 때문에, 조건문 안에서 Hooks를 사용하면 예상치 못한 동작을 할 수 있습니다.

```jsx
// ✅ Good: 함수 컴포넌트 내에서 훅을 최상위 레벨에서 호출하는 경우
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

```jsx
// ✅ Good: 최상위 레벨에서 커스텀 훅을 호출하는 경우
import React, { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

function MyComponent() {
  const windowWidth = useWindowWidth();

  return <p>Window Width: {windowWidth}</p>;
}

export default MyComponent;
```

**훅 규칙(Rules of hooks)이 만들어진 이유**

1. **훅 호출 순서의 보장**: React는 훅이 호출되는 순서에 의존하여 내부 상태를 관리합니다. 만약 조건문이나 반복문 내에서 훅을 호출한다면, 훅의 호출 순서가 보장되지 않아 React가 내부 상태를 올바르게 관리하지 못할 수 있습니다.
2. **컴포넌트 간의 코드 재사용 촉진**: 훅 규칙을 따르면 커스텀 훅을 만들어 다른 컴포넌트 간에 상태 로직을 쉽게 재사용할 수 있습니다.
3. **버그 예방**: 규칙을 준수하면 훅의 잘못된 사용으로 인한 버그 발생 가능성을 줄일 수 있습니다.
4. **코드의 이해와 유지보수 용이**: 모든 훅이 컴포넌트 최상단에서 호출되어야 한다는 규칙은 코드의 일관성을 유지하고, 다른 개발자들이 코드를 이해하고 유지보수하기 쉽게 만듭니다.

### 3.1.12 정리

<br>

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

- Custom Hook과 Higher Order Component(HOC)는 React에서 재사용 가능한 로직을 공유하기 위한 두 가지 다른 패턴입니다.

### 3.2.1 사용자 정의 훅(Custom Hook)

- 사용자 정의 훅(Custom Hook)은 React에서 재사용 가능한 로직을 추상화하는 기법 중 하나입니다.

  - 예를 들어, HTTP 요청을 하는 fetch를 기반으로 한 사용자 정의 훅인 `useFetch`를 만들 수 있습니다. 이 훅은 내부에 `useState와` `useEffect와` 같은 리액트 훅을 사용하여 로직을 구현합니다.
  - 이렇게 사용자 정의 훅을 만들면, 사용하는 쪽에서는 `useFetch`만 사용하여 중복된 로직을 손쉽게 관리할 수 있습니다.

    ```jsx
    import { useState, useEffect } from "react";

    /**
     * HTTP 요청을 하는 fetch를 기반으로 한 사용자 정의 훅인 useFetch를 만들 수 있습니다.
     * 이 훅은 내부에 useState와 useEffect와 같은 리액트 훅을 사용하여 로직을 구현합니다.
     *
     * @param {string} url - 데이터를 가져올 URL
     * @returns {{ data: any, loading: boolean }} - 데이터와 로딩 상태를 반환하는 객체
     */
    const useFetch = (url) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        /**
         * 데이터를 가져오는 비동기 함수
         */
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setData(jsonData);
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      }, [url]);

      return { data, loading };
    };

    export default useFetch;
    ```

- 사용자 정의 훅(Custom Hook)은 `use`라는 접두사로 시작하는 함수로, 여러 컴포넌트에서 사용할 수 있는 로직을 캡슐화하여 재사용할 수 있게 해줍니다.
  - 예를 들어, `useForm`이라는 사용자 정의 훅(Custom Hook)을 만들어 폼 처리 로직을 여러 컴포넌트에서 사용할 수 있습니다.
    ```jsx
    const [formData, handleInputChange] = useForm(initialValues);
    ```

### 3.2.2 고차 컴포넌트(Higher Order Component;HOC)

- 고차 컴포넌트(Higher Order Component;HOC)는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다.
- HOC는 주로 React의 클래스 컴포넌트에서 사용되었으며, 컴포넌트 간에 공유할 수 있는 로직을 추상화하는 데 사용됩니다.
  - 예를 들어, `withUser`라는 HOC를 사용해 여러 컴포넌트에 사용자 데이터를 주입할 수 있습니다.
- 고차 컴포넌트 사용 시 주의 해야할 점
  - 고차 컴포넌트(Higher Order Component;HOC)는 `with`라는 접두사를 시작해야한다.
    ```jsx
    const EnhancedComponent = withUser(BaseComponent);
    ```
  - 부수 효과를 최소화해야 한다.
  - 여러개의 고차 컴포넌트로 컴포넌트를 감쌀 경우 복잡성이 커질 수 있다.
- `React.memo`
  - `React.memo`는 React의 기능 중 하나로, 컴포넌트를 메모이제이션하는 데 사용됩니다.
  - `React.memo`는 컴포넌트가 동일한 props로 렌더링될 때 이전에 렌더링한 결과를 재사용합니다. 이를 통해 불필요한 렌더링을 방지하고 애플리케이션의 성능을 향상시킬 수 있습니다.
  - `React.memo`를 사용하려면 함수형 컴포넌트를 생성하고 `React.memo` 함수로 해당 컴포넌트를 감싸주면 됩니다.
  - `React.memo`는 두 번째 매개변수로 이전 props와 다음 props를 비교하는 함수를 받을 수도 있습니다. 이 함수를 사용하면 어떤 prop이 변경되었을 때에만 컴포넌트가 다시 렌더링되도록 할 수 있습니다.
  - `React.memo`는 주로 무거운 계산이나 비용이 많이 드는 작업을 수행하는 컴포넌트의 성능을 최적화하는 데 사용됩니다. 그러나 모든 컴포넌트에 `React.memo`를 사용하는 것은 권장되지 않습니다. 성능 향상이 미미하거나 컴포넌트 자체가 빈번하게 업데이트되는 경우에는 오히려 부작용이 발생할 수 있습니다.

### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

고차 컴포넌트는 주로 렌더링 로직이나 생명주기 메서드와 같은 컴포넌트의 구조적인 부분에 관여하는 반면, 사용자 정의 훅은 보다 세밀한 데이터 관리나 사이드 이펙트 로직 등에 더 적합할 수 있습니다.

#### 사용자 정의 훅이 필요한 경우

- 리액트의 기본 훅(`useState`, `useEffect` 등)을 사용하여 간단하게 공통 로직을 분리할 수 있는 경우
- 컴포넌트 내부에서의 영향을 최소화하고, 개발자가 원하는 방식으로 훅을 사용하고자 할 때
- 컴포넌트 전반에 걸쳐 동일한 로직을 적용하거나, 특정한 상태 관리 패턴을 구현하고 싶을 때

#### 고차 컴포넌트를 사용해야 하는 경우

- 컴포넌트가 에러를 처리하고 에러 발생 시 대체 컴포넌트를 보여주어야 할 때
- 컴포넌트의 렌더링 결과에 직접적인 영향을 주어야 하거나, 컴포넌트 트리에 추가적인 요소를 삽입해야 할 때

### 3.2.4 정리

<br>

## References

- [리액트 공식문서, Introducing Hooks](https://legacy.reactjs.org/docs/hooks-intro.html)
- [리액트 공식문서, Hooks API Reference](https://legacy.reactjs.org/docs/hooks-reference.html)
- [useState](https://react.dev/reference/react/useState)
- [React 공식 문서, Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)
  - (한국어 버전) [React 공식 문서, Rules of Hooks](https://ko.legacy.reactjs.org/docs/hooks-rules.html)
- [React Dev, Rule of Hooks](https://react.dev/warnings/invalid-hook-call-warning)

<br>

## Articles

- [DEV, Why useEffect is running twice in react](https://dev.to/jahid6597/why-useeffect-is-running-twice-in-react-18c6#:~:text=In%20React%2C%20the%20useEffect%20hook,as%20%22dependencies%22)%20change)
- [Cleanup Function with useEffect in React: The Right Way to Clean Up After Yourself!](https://www.linkedin.com/pulse/cleanup-function-useeffect-react-right-way-clean-up-after-mushnik/)
- [HOC Vs Custom Hooks which is better for code sharing? Or simply write a function and import it and use it?](https://www.reddit.com/r/reactjs/comments/rzmowa/hoc_vs_custom_hooks/)
- [What is the difference between custom Hooks and HOC?](https://www.turing.com/blog/custom-react-js-hooks-how-to-use/#:~:text=HOCs%20can%20introduce%20complexity%20with,for%20inheritance%20or%20prop%20drilling)
- [How do you name custom Hooks?](https://www.linkedin.com/pulse/understanding-custom-hooks-reactjs-simplifying-logic-hossein-safari#:~:text=The%20naming%20convention%20for%20custom,the%20necessary%20rules%20and%20optimizations)
- [Why use custom Hooks?](https://react.dev/learn/reusing-logic-with-custom-hooks#:~:text=Custom%20Hooks%20let%20you%20share%20stateful%20logic%2C%20not%20state%20itself&text=They%20happened%20to%20have%20the,whether%20the%20network%20is%20on).&text=There's%20some%20repetitive%20logic%20for,state%20(%20firstName%20and%20lastName%20))
- [React.memo 현명하게 사용하기](https://ui.toast.com/weekly-pick/ko_20190731#reactmemo-%ED%98%84%EB%AA%85%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [A guide to memoization using React.memo](https://github.com/RicardoMorato/React.memo)
- [Higher-Order Components In React](https://www.smashingmagazine.com/2020/06/higher-order-components-react/)
- [HOC Pattern](https://www.patterns.dev/react/hoc-pattern/)
- [Cleaning up with useEffect function](https://www.zipy.ai/blog/understanding-react-useeffect-cleanup-function#:~:text=This%20cleanup%20function%20is%20used,side%20effects%20one%20by%20one.)

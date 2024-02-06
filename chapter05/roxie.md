# 05장: 리액트와 상태 관리 라이브러리

<br>

- [05장: 리액트와 상태 관리 라이브러리](#05장-리액트와-상태-관리-라이브러리)
  - [5.1 상태 관리는 왜 필요한가?](#51-상태-관리는-왜-필요한가)
    - [5.1.1 리액트 상태 관리의 역사](#511-리액트-상태-관리의-역사)
  - [5.2 리액트 훅으로 시작하는 상태 관리](#52-리액트-훅으로-시작하는-상태-관리)
    - [5.2.1 가장 기본적인 방법: useState와 useReducer](#521-가장-기본적인-방법-usestate와-usereducer)
    - [5.2.2 지역 상태의 한계를 벗어나보자: useState의 상태를 바깥으로 분리하기](#522-지역-상태의-한계를-벗어나보자-usestate의-상태를-바깥으로-분리하기)
    - [5.2.3 useState와 Context를 동시에 사용해 보기](#523-usestate와-context를-동시에-사용해-보기)
    - [5.2.4 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기](#524-상태-관리-라이브러리-recoil-jotai-zustand-살펴보기)

<br>

## 5.1 상태 관리는 왜 필요한가?

- 상태란?
  - 어떠한 의미를 지닌 값이며 애플리케이션의 시나리오에 따라 지속적으로 변경될 수 잇는 값을 의미.
- 대표적으로 상태로 분류될 수 있는 것들
  - `UI` : 상호 작용이 가능한 모든 요소의 현재 값을 의미.(다크/라이트 모드, 각종 input, 알림창 노출 여부 등)
  - `URL` : 브라우저에서 관리되고 있는 상태값. 사용자의 라우팅에 따라 변동되는 값.
  - `form` : loading, submit, disabled, validation 등
  - `서버에서 가져온 값` : 클라이언트에서 서러보 요청을 통해 가져온 값(API 요청)
- 상태에 따라 다양한 요소들이 각 상태에 맞는 UI를 보여 주기 위해 고려해야 할 사항
  1. 상태를 전역변수 또는 별도의 클로저 생성을 통해 관리할 것인가?
  2. 별도의 클로저를 생성한다면 상태의 유효한 범위는 어떻게 제한 할 것인가?
  3. 상태의 변화에 따라 변경되야 하는 자식 요소들은 어떻게 상태의 변화를 감지할 것인가?
  4. 상태 변화가 일어남에 따라 즉각적으로 모든 요소들이 변경되어 애플리케이션이 찢어지는 현상(tearing)을 어떻게 방지할 것인가?

### 5.1.1 리액트 상태 관리의 역사

- 리액트는 단순히 사용자 인터페이스를 만들기 위한 라이브러리일 뿐, 그 이상의 기능을 제공하지 않고 있다. 따라서 개발자 성향이나 시간에 따라 상태를 관리하는 방법에 많은 차이가 있다.
- 상태 관리를 하기 위한 방법

  **1. Flux 패턴의 등장**

  - 웹 애플리 케이션이 비대힞고 상태도 많아짐에 따라 어디서 어떤 일이 일어나서 이 상태가 변햇는지 추적하고 이해하기 어려운 상황을 해결하기 위해 뷰(HTML)와 모델(Javascript)이 양방향이 아닌, 단방향으로 데이터 흐름을 변경하는 것을 제안하는데 이것이 바로 Flux 패턴의 시작이다.
  - 대표적인 단방향 라이브러리 (Flux, alt, RefluxJS, NuclearJs, Fluxible, Fluxxor)
  - Flux 패턴 코드로 이해하기

    ```tsx
    // 카운터의 현재 값을 저장
    type StoreState = {
      count: number;
    };

    // add 타입의 액션만을 정의하며, payload     속성을 통해 카운터를 얼마나 증가시킬지를 전달
    type Action = { type: "add"; payload: number };

    function reducer(prevState: StoreState, action: Action) {
      const { type: ActionType } = action;

      // 3. 전달 받은 add 액션을 처리
      // prevState의 count 값에 action.payload 값을 더하여 새로운 상태를 리턴.
      if (ActionType === "add") {
        return {
          count: prevState.count + action.payload,
        };
      }
      // 정의되지 않은 액션 타입이 전달되면 에러 발생
      throw new Error(`Unexpected Action [${ActionType}]`);
    }

    // View
    export default function App() {
      // dispatcher: 상태 업데이트
      // useReducer 훅을 사용하여 reducer 함수와 초기 상태를 연결
      const [state, dispatcher] = useReducer(reducer, { count: 0 });

      function handleClick() {
        // Action
        // 2. dispatcher를 통해 reducer에 add 액션을 발송하여 count 값을 1 증가
        dispatcher({ type: "add", payload: 1 });
      }

      return (
        <div>
          <h1>{state.count}</h1>
          // 1. 이벤트 발생
          <button onClick={handleClick}>+</button>
        </div>
      );
    }
    ```

  **2. 시장 지배자 리덕스의 등장**

  - 리덕스(Redux)는 최초에는 Flux 구조를 구혀하기 위해 만들어진 라이브러리 중 하나 였으나 `Elm 아키텍처`를 도입했다는 점에 차이가 있다.
  - **Elm**은 웹페이지를 선언적으로 작성하기 위한 언어이며 `모델(model)`, `뷰(view)`, `업데이트(update)` 세 가지로 데이터 흐름을 분류하고 단방향으로 강제해 웹 어플리케이션의 상태를 안정적으로 관리하고자 노력했다.
  - 리덕스 코드

    ```tsx
    import { createStore } from "redux";

    // 액션 타입 정의. 일반적으로 상수로 정의하여 오타를 방지.
    const INCREMENT = "INCREMENT";
    const DECREMENT = "DECREMENT";

    // 액션 객체를 반환하는 함수.
    // 카운터를 증가시키는 액션 생성 함수를 정의
    const increment = () => ({
      type: INCREMENT,
    });
    // 카운터를 감소시키는 액션
    const decrement = () => ({
      type: DECREMENT,
    });

    // 현재 상태와 액션을 인자로 받아 새 상태를 반환하는 리듀서 함수   정의
    const counterReducer = (state = 0, action) => {
      // 모델(Model)   : 초기 상태를 0으로 설정.
      switch (
        action.type // 업데이트(Update)
      ) {
        case INCREMENT: // INCREMENT 액션 처리.
          return state + 1; // 상태를 1 증가
        case DECREMENT: // DECREMENT 액션 처리
          return state - 1; // 상태를 1 감소
        default: // 매칭되는 액션 타입이 없을 경우 현재 상태를 반환
          return state;
      }
    };

    // createStore 함수에 리듀서를 인자로 전달하여 호출하는 스토어   생성.
    const store = createStore(counterReducer);

    const render = () => {
      // 현재 상태를 콘솔에 출력
      console.log(store.getState());
    };

    // 스토어의 상태가 변경될 때마다 render 함수 호출.
    store.subscribe(render);

    // 액션을 디스패치하여 상태 변경
    store.dispatch(increment()); // 카운터를 1 증가
    store.dispatch(decrement()); // 카운터를 1 감소
    ```

  - 리덕스의 장.단점
    | | |
    |------|---|
    |장점|• 글로벌 상태 객체를 통해 하위 컴포넌트에 전파할 수 있기 때문에 깊은 prop 내려주기 문제 해결. <br> • connect 키워드로 스토어에 바로 접근 가능.|
    |단점|단순한 상태 변경을 위한 작업이 복잡함.|

  **3. Context API와 useContext**

  - 리덕스의 단점을 보완하기 위해 리액트 16.3에서 전역 상태를 하위 컴포넌트에 주입할 수 있는 새로운 Context API를 출시 했다.
  - Context API는 상태 관리가 아닌 주입을 도와주는 기능이며, 렌더링을 막아주는 기능 이 존재하지 않으니 사용할 때 주의가 필요하다.

  **4. 훅의 탄생, 그리고 REact Query와 SWR**

  - 리액트 16.8 버전에서 함수형 컴포넌트에 사용할 수 있는 당양한 훅 API를 추가했다.
  - React Query와 SWR은 외부에서 데이터를 불러오는 fetch를 관리하는데 특화된 라이브러리다.
  - SWR을 사용한 코드

    ```jsx
    import React from 'react';
    import useSWR from 'swr';

    const fetcher = (url) => fetch(url.then((res) => res.json()));

    export default function App() {
        const {data, error} = useSWR(
            'https://api.github.com/repos/vercel/swr',
            fetcher,
        );

        if (error) retrun 'An error has occurred.';
        if (!data) return 'Loading...';

        return (
            <div>
                <p>{JSON.stringify(data)}</p>
            </div>
        );
    }
    ```

  **5. Recoil, Zustand, Jotai, Valtio에 이르기까지**

  - 훅이라는 새로운 패러다임의 등장에 따라, 훅을 활용해 상태를 가져오거나 관리할 수 있는 다양한 라이브러리가 등장한다.
  - 리덕스와 차이점은 별도 라이브러리 설치 없이 훅을 이용해 작은 크기의 상태를 효율적으로 관리할 수 있다.
  - 개발자가 원하는 만큼의 상태를 지역적으로 관리하는 것을 가능하게 만듦.
  - 함수형 컴포넌트에서 손쉽게 사용 가능.
    <br>

## 5.2 리액트 훅으로 시작하는 상태 관리

### 5.2.1 가장 기본적인 방법: useState와 useReducer

- 지역 상태 컴포넌트
- 재사용할 수 있는 지역 상태를 만들어 주지만 여러 컴포넌트에 걸쳐 공유하기 위해서는 컴포넌트 트리를 재설계하는 수고로움이 필요하다.

### 5.2.2 지역 상태의 한계를 벗어나보자: useState의 상태를 바깥으로 분리하기

- 로직을 재사용할 수 있도록 Custom Hook을 만들어 useState와 다른 로직을 포함시킬 수 있다. 이 방법은 상태 관리 로직을 컴포넌트로부터 분리하고 싶을 때 유용하다.

  ```javascript
  import { useState } from "react";

  // Custom Hook 정의, 초기값을 매개변수로 받는다.
  function useCustomState(initialValue) {
    // useState를 사용하여 상태와 상태를 업데이트하는 함수 초기화.
    const [value, setValue] = useState(initialValue);

    // 상태에 대해 수행할 수 있는 추가적인 커스텀 로직 정의
    function doSomethingWithValue() {
      //  상태 값을 사용하여 수행할 작업 정의
    }

    // 커스텀 훅에서 상태 값, 상태를 업데이트하는 함수, 정의한 추가 로직을 반환
    return [value, setValue, doSomethingWithValue];
  }

  // useCustomState를 호출하여 상태 값, 상태를 업데이트하는 함수 추가 로직을 사용
  function SomeComponent() {
    const [value, setValue, doSomethingWithValue] = useCustomState(0); //    Custom Hook 사용, 초기 상태 값으로 0을 설정

    // 컴포넌트의 나머지 부분에서 value, setValue, doSomethingWithValue를 사용
  }
  ```

### 5.2.3 useState와 Context를 동시에 사용해 보기

```javascript
import React, { useState, useContext } from "react";

// Context 생성
const StateContext = React.createContext();

// Context를 제공하는 컴포넌트
export function StateProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

// Context를 사용하는 컴포넌트에서는 useContext 훅을 이용
function SomeComponent() {
  const { state, setState } = useContext(StateContext);

  // 이제 state와 setState를 사용할 수 있음
}
```

### 5.2.4 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기

- 각 라이브러리는 상태 관리를 단순화하고 효율적으로 만들기 위해 고안되었으며, 각각의 고유한 특성과 접근 방식을 가지고 있다.

  #### 1. Recoil

  - Recoil은 Facebook에서 개발한 React용 상태 관리 라이브러리로, React의 훅과 같은 기능을 사용하여 편리한 상태 관리를 제공한다. Recoil은 atoms와 selectors를 사용하여 상태를 관리한다.
  - Recoil은 React의 Context API와 유사한 패턴을 사용하지만, 더욱 세밀한 구독 관리와 효율적인 업데이트를 가능하게 합니다.

  #### 2. Jotai

  - Jotai는 "minimalist" 상태 관리 라이브러리로, Recoil과 유사한 개념을 사용하지만, 더 간단하고 직관적인 API를 제공한다. Jotai도 atoms를 사용하여 상태를 관리하며, React의 Context API에 의존하지 않고도 상태를 전역적으로 관리할 수 있다.
  - Jotai는 상태 로직을 컴포넌트로부터 분리하고, 필요한 컴포넌트에만 상태를 주입하여 성능 최적화를 돕는다.

  #### 3. Zustand

  - Zustand는 Redux와 같은 전통적인 상태 관리 라이브러리보다 훨씬 적은 설정과 보일러플레이트 코드를 요구한다. Zustand는 상태를 하나의 저장소(store)에서 관리하며, React 컴포넌트 외부에서도 상태를 쉽게 업데이트하고 구독할 수 있다.
  - Zustand는 특히 작고 간단한 애플리케이션에서 상태 관리를 쉽게하기 위해 설계되었으며, 미들웨어를 사용하여 기능을 확장할 수 있다.

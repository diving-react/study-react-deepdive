# 10장: 리액트 17과 18의 변경 사항 살펴보기
이번 장에서는 React의 최신 버전인 17과 18의 변경 사항을 살펴보겠습니다.

<br>

- [10장: 리액트 17과 18의 변경 사항 살펴보기](#10장-리액트-17과-18의-변경-사항-살펴보기)
  - [10.1 리액트 17 버전 살펴보기](#101-리액트-17-버전-살펴보기)
    - [10.1.1 리액트의 점진적인 업그레이드](#1011-리액트의-점진적인-업그레이드)
    - [10.1.2 이벤트 위임 방식의 변경](#1012-이벤트-위임-방식의-변경)
    - [10.1.3 `import React from ‘react’`가 더 이상 필요 없다: 새로운 `JSX transform`](#1013-import-react-from-react가-더-이상-필요-없다-새로운-jsx-transform)
    - [10.1.4 그 밖의 주요 변경 사항](#1014-그-밖의-주요-변경-사항)
    - [10.1.5 정리](#1015-정리)
  - [10.2 리액트 18 버전 살펴보기](#102-리액트-18-버전-살펴보기)
    - [10.2.1 새로 추가된 훅 살펴보기](#1021-새로-추가된-훅-살펴보기)
    - [10.2.2 `react-dom/client`](#1022-react-domclient)
    - [10.2.3 `react-dom/server`](#1023-react-domserver)
    - [10.2.4 자동 배치(Automatic Batching)](#1024-자동-배치automatic-batching)
    - [10.2.5 더욱 엄격해진 엄격 모드](#1025-더욱-엄격해진-엄격-모드)
    - [10.2.6 `Suspense` 기능 강화](#1026-suspense-기능-강화)
    - [10.2.7 인터넷 익스플로러 지원 중단에 따른 추가 폴리필 필요](#1027-인터넷-익스플로러-지원-중단에-따른-추가-폴리필-필요)
    - [10.2.8 그 밖에 알아두면 좋은 변경사항](#1028-그-밖에-알아두면-좋은-변경사항)
    - [10.2.9 정리](#1029-정리)
  - [References](#references)

<br>

[React의 웹사이트 사용 통계 및 시장 점유율 보고서](https://w3techs.com/technologies/details/js-react)
이 통계는 웹 개발에서 React JavaScript 라이브러리의 사용 통계와 시장 점유율에 대한 정보를 제공합니다.

**React의 전체 웹사이트 대비 사용률**
- 전체 대비 React 사용 비율: JavaScript 라이브러리로 알려진 모든 웹사이트 중 7.6%(이는 전체 웹사이트의 6.2%에 해당)가 React를 사용합니다. 


**React 버전별 사용 통계**: React를 사용하는 웹사이트에서 각 버전별로 차지하는 비율
- 버전 16: React를 사용하는 웹사이트 중 78.9%가 버전 16을 사용합니다.
- 버전 15: 21.1%의 웹사이트가 버전 15를 사용합니다.

> 이 데이터는 React가 웹 개발에서 얼마나 중요한 위치를 차지하고 있는지를 보여줍니다. 특히, 버전 16은 React 사용자 사이에서 압도적인 선호도를 보이고 있습니다.
>  React 16이 React를 사용하는 웹사이트의 78.9%에서 사용되고 있다 하더라도, 개발자와 기업들은 기술 스택을 최신으로 유지하고, 성능을 개선하며, 호환성을 보장하고, 커뮤니티 트렌드를 따라가기 위해 최신 버전의 변화를 주의 깊게 모니터링합니다.


<br>

## 10.1 리액트 17 버전 살펴보기

**[React v17.0 Release Candidate: No New Features](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#no-new-features)**

: React 17 릴리스는 새로운 개발자를 위한 기능을 추가하지 않는다는 점에서 이례적입니다. 대신, 이번 릴리스는 React 자체를 업그레이드하기 쉽게 만드는 데 주로 초점을 맞추고 있습니다. 이는 React의 미래 버전을 위한 "stepping stone" 역할을 하기 때문입니다. "Stepping stone"은 길을 걷는 동안 발을 옮기기 위해 사용하는 작은 돌이나 블록을 의미합니다. 이 용어는 비유적으로 어떤 목표를 달성하기 위한 중간 단계나 도구를 가리킬 때 사용됩니다. 즉, React 17이 "stepping stone" 릴리스라는 것은 React의 다른 버전으로 관리되는 트리를 안전하게 포함할 수 있는 중간 단계로서의 역할을 한다는 의미입니다.

### 10.1.1 리액트의 점진적인 업그레이드
- React는 버전 업그레이드 시 더 이상 권장되지 않는 API 문제를 해결하기 위해, 17 버전부터 점진적 업그레이드를 도입했습니다.
- React 17 버전부터는 오래된 코드베이스를 가진 사용자들이 전체 앱을 한 번에 업그레이드하는 부담 없이 점진적으로 주요 버전을 업그레이드할 수 있는 새로운 선택지를 제공합니다. 이는 기존에 오래된 API와 새로운 API를 함께 사용하려는 시도에서 발생했던 이벤트 핸들링 문제를 해결합니다.
- 비록 전체 앱을 한 번에 업그레이드하는 것이 가장 이상적일 수 있지만, 이제 React 17은 점진적 업그레이드를 통해 더 유연한 전환을 지원하여 이러한 문제를 해결하였습니다.

- [React17의 점진적인 React 업그레이드에 관한 다른 예제: 이전 버전의 React를 지연 로딩하는 방법](https://github.com/reactjs/react-gradual-upgrade-demo/)

**서로 다른 버전의 React를 한 어플리케이션 내에서 사용하는 시나리오**
이 시나리오를 더 이해하기 쉽도록, 마이크로 프론트엔드 아키텍처를 사용하는 예를 들겠습니다. 마이크로 프론트엔드 아키텍처는 여러 개의 프론트엔드 어플리케이션을 하나의 큰 어플리케이션으로 통합하는 아키텍처입니다. 이 아키텍처는 각 마이크로 프론트엔드 어플리케이션을 독립적으로 개발하고 배포할 수 있도록 해줍니다. 이러한 아키텍처를 사용하면, 각 마이크로 프론트엔드 어플리케이션은 서로 다른 버전의 React를 사용할 수 있습니다. 예를 들어, 마이크로 프론트엔드 어플리케이션 A는 React 16을 사용하고, 마이크로 프론트엔드 어플리케이션 B는 React 17을 사용할 수 있습니다. 이러한 시나리오에서는, 마이크로 프론트엔드 어플리케이션 A와 B가 메인 애플리케이션과 함께 동작하도록 하기 위해, 메인 애플리케이션은 서로 다른 버전의 React를 함께 사용할 수 있어야 합니다.

```tsx
// A: 마이크로 프론트엔드의 엔트리 포인트 (React 16)
// - 마이크로 프론트엔드는 독립적으로 기능을 수행하며, 메인 애플리케이션으로 메시지를 전달하는 기능을 포함합니다.
import React from 'react';
import ReactDOM from 'react-dom';

class MicroFrontend extends React.Component {
  sendMessageToMainApp(message) {
    const event = new CustomEvent('microFrontendMessage', { detail: message });
    window.dispatchEvent(event);
  }

  render() {
    return (
      <div>
        <h2>마이크로 프론트엔드 - React 16</h2>
        <button onClick={() => this.sendMessageToMainApp('안녕하세요, 메인 애플리케이션!')}>
          메인 애플리케이션에 메시지 보내기
        </button>
      </div>
    );
  }
}

ReactDOM.render(<MicroFrontend />, document.getElementById('micro-frontend-container'));


```

```tsx
// B: 메인 애플리케이션의 엔트리 포인트 (React 17)
// - 메인 애플리케이션은 사용자 인터페이스의 나머지 부분을 담당하며, 마이크로 프론트엔드에서 전달된 메시지를 받아 처리하는 기능을 포함합니다.
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function MainApp() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.addEventListener('microFrontendMessage', (event) => {
      setMessage(event.detail);
    });
  }, []);

  return (
    <div>
      <h1>메인 애플리케이션 - React 17</h1>
      <div id="micro-frontend-container"></div>
      {message && <p>마이크로 프론트엔드로부터 받은 메시지: {message}</p>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<MainApp />);
```
**[구현상의 주의사항]**
- **이벤트 리스너 관리**: 메인 애플리케이션과 마이크로 프론트엔드 간의 메시지 전달은 `window.dispatchEvent()`와 `window.addEventListener()`를 사용하여 이벤트 기반으로 처리됩니다. 이벤트 리스너는 메모리 누수를 방지하기 위해 적절히 추가 및 제거되어야 합니다.
- **보안 고려사항**: 외부에서 전달된 메시지를 처리할 때는 보안을 고려해야 합니다. `XSS` 공격과 같은 취약점을 방지하기 위해 메시지의 내용을 검증하고 적절히 이스케이프 처리하는 것이 중요합니다.
- **성능 최적화**: 마이크로 프론트엔드 아키텍처는 추가적인 리소스 로딩과 초기화 시간을 필요로 할 수 있습니다. 필요한 경우 코드 스플리팅, 레이지 로딩 등의 기법을 사용하여 성능을 최적화해야 합니다.

### 10.1.2 이벤트 위임 방식의 변경

이전 버전인 `React 16`까지는 대부분의 이벤트에 대하여 React가 `문서(document)` 레벨에서 `addEventListener()`를 사용하여 이벤트 위임(event delegation)을 통해 전역적으로 이벤트를 관리했습니다. 그러나 `React 17`부터는 이벤트 핸들러를 문서 레벨이 아닌 각각의 루트 컨테이너에 이벤트 핸들러를 연결하여 독립적인 이벤트 관리가 가능해졌습니다.

**[목적]**
- **이벤트 핸들링의 호환성 개선**: React 앱과 다른 애플리케이션 또는 라이브러리 간의 이벤트 핸들링 충돌을 줄이기 위함입니다. 예를 들어, React 외부에서 추가된 이벤트 리스너와 충돌 없이 동작할 수 있도록 하기 위해 이 변경이 도입되었습니다.
- **React 트리 내의 이벤트 핸들링 개선**: 이전에는 React 이벤트 핸들러가 `document` 레벨에서 작동했기 때문에, 여러 React 루트가 존재하는 경우 이벤트가 예측하지 못한 방식으로 전파될 수 있었습니다. `React 17`에서는 각각의 루트에 대해 독립적인 이벤트 핸들링이 가능해졌습니다.


![이벤트 위임 방식의 변경](https://legacy.reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/31868/react_17_delegation.png)

```jsx
// (예제1) React17 이하 버전의 이벤트 핸들링
// index.html 파일 내에 있는 루트 엘리먼트
<div id="app"></div>

// App.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  handleClick = () => {
    console.log('클릭 이벤트가 document에서 처리됩니다.');
  }

  componentDidMount() {
    // document에 직접 이벤트 리스너를 추가
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    // document에서 이벤트 리스너를 제거
    document.removeEventListener('click', this.handleClick);
  }

  render() {
    return (
      <div>
        <button>클릭</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
> React 17 이전 버전에서는 `componentDidMount`와 `componentWillUnmount` 생명주기 메서드를 사용하여 `document`에 직접 이벤트 리스너를 추가하고 제거했습니다.

```jsx
// (예제2) React17 이후 버전의 이벤트 핸들링
// index.html 파일 내에 있는 루트 엘리먼트
<div id="app"></div>

// App.js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  handleClick = () => {
    console.log('클릭 이벤트가 루트 컨테이너에서 처리됩니다.');
  }

  render() {
    return (
      // 루트 컨테이너에 직접 이벤트 리스너를 연결
      <div onClick={this.handleClick}>
        <button>클릭</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
> 반면, React 17 이후 버전에서는 React 요소에 직접 이벤트 핸들러를 선언하여 루트 컨테이너에 연결된 이벤트를 처리합니다. 이러한 변경으로 인해, 각각의 루트 컨테이너 내에서 독립적으로 이벤트를 관리할 수 있게 되었으며, 애플리케이션의 다른 부분(예: jQuery)과의 이벤트 충돌을 줄일 수 있게 되었습니다.


**[추가]**
- **다중 버전 통합의 용이성**: 이전에는 `e.stopPropagation()`이 여러 버전의 React 트리 사이에서 예상대로 작동하지 않아, 다른 버전의 `React`를 내장하는 것이 어려웠습니다. `React 17`의 변경으로, 이벤트 전파를 보다 명확하게 제어할 수 있게 되어, 점진적 업그레이드가 용이해졌습니다.
- **비-React 코드와의 통합 개선**: `React` 코드 내에서 `e.stopPropagation()`을 사용하면 이제 `jQuery`와 같은 외부 코드로 이벤트가 전파되는 것을 예상대로 방지할 수 있습니다. 이는 React 애플리케이션을 다른 기술로 구축된 앱에 통합할 때 유용합니다.
- **포탈(Portals)과의 호환성**: 루트 컨테이너 바깥에 있는 포탈에 대한 우려가 있었으나, React는 포탈 컨테이너에서도 이벤트를 감지하기 때문에 문제가 되지 않습니다.

**[주의사항]**
- 이 변경사항은 React 17 이상에서만 적용됩니다.

### 10.1.3 `import React from ‘react’`가 더 이상 필요 없다: 새로운 `JSX transform`

**[기존 JSX 변환 방식과의 차이점]**
- **기존 방식**: JSX 사용 시 매번 `React.createElement` 호출 필요 → 파일 상단에 `import React from 'react'` 필수
- **React 17 새 방식**: `jsx` 및 `jsxs` 함수 자동 호출 → 명시적인 `React import` 불필요

**[빌드 도구 및 Babel 설정 변경]**
- **영향**: 주로 빌드 도구와 Babel 설정에 영향
- **Babel 설정 예시**:
  - `.babelrc` 파일 또는 Babel 설정에 `@babel/plugin-transform-react-jsx` 플러그인 추가
  - `runtime`: `'automatic'` 옵션으로 새 JSX 변환 활성화

**[새 JSX 변환 방식의 선택적 사용]**
- **호환성**: React 17은 기존 변환 방식과 새 변환 방식 모두 지원
- **권장 사항**: 새 프로젝트 또는 기존 프로젝트 업데이트 시 새 방식으로 전환 고려


```jsx
// React 17 이전
import React from 'react'; // 필수

function App() {
  return <h1>Hello, world!</h1>;
}
```

```jsx
// React 17 이후: 새로운 JSX 변환 방식
// import React from 'react'; // 이제 생략 가능

function App() {
  return <h1>Hello, world!</h1>;
}
```

```bash
# Babel이 React.createElement 대신 jsx 또는 jsxs 함수를 사용하도록 설정 변경
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", { "runtime": "automatic" }]
  ]
}
```

**[주의]**
- React 17 이후에는 React를 명시적으로 `import`하지 않아도 되지만, 여전히 훅을 사용하기 위해서는 해당 훅(`useState`, `useEffect` 등)을 `import`해야 합니다.
   - React의 네임스페이스를 직접 사용하지 않는 한, import React를 생략할 수 있지만, 훅들은 각각 필요에 따라 import해야 합니다.

```jsx
// React 17 이전: 함수형 컴포넌트에서 상태 관리를 위해 useState 훅을 사용하는 경우
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

```jsx
// React 17 이후: 새로운 JSX 변환 방식
// import React, { useState } from 'react'; // 이제 생략 가능
import { useState } from 'react'; // React import는 생략하고, useState만 import

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

**`npx react-codemod update-react-imports` 적용**
`npx react-codemod update-react-imports` 명령어는 React 코드베이스에서 React 17 이상에서 도입된 자동 JSX 변환을 활용하기 위해 React의 import 방식을 업데이트하는 데 사용됩니다.

**[사용 전 준비사항]**
  - 프로젝트의 백업을 만들거나, Git과 같은 버전 관리 시스템을 사용하여 변경 전 상태를 커밋해두세요.
  - 프로젝트에 대한 모든 의존성이 설치되어 있고, 프로젝트가 정상적으로 빌드되는지 확인하세요.

```bash
# 이 명령어를 프로젝트의 루트 디렉토리에서 실행하면, 프로젝트 내의 모든 JavaScript 파일들이 새로운 JSX 변환 방식에 맞게 업데이트됩니다.
npx react-codemod update-react-imports
```

**`react-codemod rename-unsafe-lifecycles` 적용**
`react-codemod rename-unsafe-lifecycles` 명령어는 React 생명주기 메소드 중에서 안전하지 않은 것들을 새로운 이름으로 변경합니다.

- **사용 전 준비사항**:
  - 위와 동일하게 프로젝트의 백업을 만들거나, 버전 관리 시스템을 사용하여 변경 전 상태를 커밋해두세요.

```bash
# 명령어 실행
npx react-codemod rename-unsafe-lifecycles --force
```
> `--force` 옵션을 사용하면 경고 없이 파일을 덮어쓸 수 있습니다. 하지만 예상치 못한 부작용을 일으킬 수 있기 때문에, 실행 후 반드시 애플리케이션이 여전히 올바르게 작동하는지 확인해야 합니다.

- **참고**: [React, Introducing the New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

### 10.1.4 그 밖의 주요 변경 사항
### 10.1.5 정리

<br>

## 10.2 리액트 18 버전 살펴보기

### 10.2.1 새로 추가된 훅 살펴보기
React 18에서 새롭게 추가되었으며, 애플리케이션의 성능 최적화와 비동기 처리, 외부 상태 관리 등 다양한 고급 기능을 제공하여 개발자가 보다 효율적으로 UI를 구축할 수 있도록 돕습니다.

| Hook 이름                | 설명                                                   |
|------------------------|-------------------------------------------------------|
| `useId`                | 컴포넌트 내에서 유일하고 안정적인 식별자(ID)를 생성합니다. 이는 서버 렌더링과 클라이언트 렌더링에서 동일한 ID를 생성하여 hydration 중에 일치 문제를 방지할 수 있습니다. |
| `useInsertionEffect`   | 스타일을 DOM에 삽입하기 전에 실행되어야 하는 코드를 작성할 때 사용합니다. 주로 CSS-in-JS 라이브러리가 이용하여 스타일의 깜빡임을 방지하고 성능을 향상시키기 위해 사용됩니다. |
| `useDeferredValue`     | 빠른 반응이 필요한 작업(예: 사용자 입력 처리)과 동시에 처리 속도가 느린 작업(예: 대량 데이터 렌더링)을 분리할 때 사용합니다. 이를 통해 덜 중요한 업데이트는 나중에 처리할 수 있도록 합니다. |
| `useTransition`        | 컴포넌트 상태의 업데이트를 "transition"으로 표시할 때 사용되며, 상태 업데이트를 비동기적으로 처리하고, 업데이트 중인 상태를 사용자에게 알릴 수 있는 기능을 제공합니다. 이는 로딩 인디케이터와 같은 UI를 관리하는데 유용합니다. |
| `useSyncExternalStore` | 외부 저장소(예: Redux)의 상태를 구독하고 React의 상태 업데이트와 동기화할 때 사용합니다. Redux와 같은 상태 관리 라이브러리와의 통합에 주로 사용됩니다. |

### 10.2.2 `react-dom/client`
### 10.2.3 `react-dom/server`
### 10.2.4 자동 배치(Automatic Batching)

> 자동 배치(Automatic Batching) 기능은 성능 향상을 위해 여러 상태 업데이트를 단일 재렌더링으로 그룹화하는 기능입니다.

리액트 18 이전 버전에서는 `Promise`, `setTimeout`, 네이티브 이벤트 핸들러 또는 기타 이벤트 내부의 업데이트는 기본적으로 React에서 배치 처리되지 않았습니다. 그러나 자동 배치 기능을 통해 이제 이러한 업데이트들도 자동으로 배치 처리됩니다. 예를 들어, `setTimeout` 내부에서 상태를 두 번 업데이트하는 경우, React 18 이전에는 각 상태 업데이트마다 별도의 렌더링이 발생했을 것입니다. 하지만 React 18에서는 이러한 업데이트들이 자동으로 배치 처리되어 단 한 번의 렌더링으로 처리됩니다.

```javascript
// 이전: 오직 React 이벤트만 배치 처리됨.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React가 각 상태 업데이트마다 두 번 렌더링함 (배치 처리 없음)
}, 1000);

// 이후: setTimeout, Promise,
// 네이티브 이벤트 핸들러 또는 기타 이벤트 내부의 업데이트도 배치 처리됨.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React가 마지막에 한 번만 렌더링함 (배치 처리!)
}, 1000);
```

이렇게 자동 배치 기능을 통해 애플리케이션의 성능 향상과 불필요한 렌더링을 줄여 사용자 경험을 개선되는 것을 기대할 수 있습니다.

**[React 18에서 도입된 자동 배치 기능의 비활성화]**
- React 18에서 도입된 자동 배치 기능을 비활성화하고 싶다면, `unstable_batchedUpdates API`를 사용하여 직접 배치 처리를 관리할 수 있습니다. 
- `React 16`을 사용 중이고 특정 상황에서 배치 처리를 피하고 싶다면, 이미 그러한 동작이 기본적으로 일어나지 않기 때문에 별도의 조치를 취할 필요가 없습니다.
- `React 18` 이상 버전에서 자동 배치 기능을 제어하고 싶다면, `React 18`의 기능을 끄는 것이 아니라, 해당 기능을 명시적으로 관리하는 코드를 작성해야 합니다. 예를 들어, `flushSync` 함수를 사용하여 React가 상태 업데이트를 즉시 반영하도록 강제할 수 있습니다. 그러나 이는 `React 18` 이상 버전에서만 해당되는 내용이며, `React 16`에서는 적용되지 않습니다.

### 10.2.5 더욱 엄격해진 엄격 모드
### 10.2.6 `Suspense` 기능 강화
### 10.2.7 인터넷 익스플로러 지원 중단에 따른 추가 폴리필 필요
### 10.2.8 그 밖에 알아두면 좋은 변경사항
### 10.2.9 정리

## References
- [React v17.0 Release Candidate: No New Features](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html)
- [React, Changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md)
- [React, React v18.0](https://react.dev/blog/2022/03/29/react-v18)
- [React, New feature: Automatic Batching](https://github.com/reactjs/rfcs/blob/react-18/text/0212-react-18.md#new-feature-automatic-batching)
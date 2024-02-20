# 10장: 리액트 17과 18의 변경 사항 살펴보기
이번 장에서는 React의 최신 버전인 17과 18의 변경 사항을 살펴보겠습니다.

<br>

- [10장: 리액트 17과 18의 변경 사항 살펴보기](#10장-리액트-17과-18의-변경-사항-살펴보기)
  - [10.1 리액트 17 버전 살펴보기](#101-리액트-17-버전-살펴보기)
    - [10.1.1 리액트의 점진적인 업그레이드](#1011-리액트의-점진적인-업그레이드)
    - [10.1.2 이벤트 위임 방식의 변경](#1012-이벤트-위임-방식의-변경)
    - [10.1.3 import React from ‘reac’가 더 이상 필요 없다: 새로운 JSX transform](#1013-import-react-from-reac가-더-이상-필요-없다-새로운-jsx-transform)
    - [10.1.4 그 밖의 주요 변경 사항](#1014-그-밖의-주요-변경-사항)
    - [10.1.5 정리](#1015-정리)
  - [10.2 리액트 18 버전 살펴보기](#102-리액트-18-버전-살펴보기)
    - [10.2.1 새로 추가된 훅 살펴보기](#1021-새로-추가된-훅-살펴보기)
    - [10.2.2 react-dom/client](#1022-react-domclient)
    - [10.2.3 react-dom/server](#1023-react-domserver)
    - [10.2.4 자동 배치(Automatic Batching)](#1024-자동-배치automatic-batching)
    - [10.2.5 더욱 엄격해진 엄격 모드](#1025-더욱-엄격해진-엄격-모드)
    - [10.2.6 Suspense 기능 강화](#1026-suspense-기능-강화)
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
- **이벤트 리스너 관리**: 메인 애플리케이션과 마이크로 프론트엔드 간의 메시지 전달은 window.dispatchEvent()와 window.addEventListener()를 사용하여 이벤트 기반으로 처리됩니다. 이벤트 리스너는 메모리 누수를 방지하기 위해 적절히 추가 및 제거되어야 합니다.
- **보안 고려사항**: 외부에서 전달된 메시지를 처리할 때는 보안을 고려해야 합니다. XSS 공격과 같은 취약점을 방지하기 위해 메시지의 내용을 검증하고 적절히 이스케이프 처리하는 것이 중요합니다.
- **성능 최적화**: 마이크로 프론트엔드 아키텍처는 추가적인 리소스 로딩과 초기화 시간을 필요로 할 수 있습니다. 필요한 경우 코드 스플리팅, 레이지 로딩 등의 기법을 사용하여 성능을 최적화해야 합니다.




### 10.1.2 이벤트 위임 방식의 변경
### 10.1.3 import React from ‘reac’가 더 이상 필요 없다: 새로운 JSX transform
### 10.1.4 그 밖의 주요 변경 사항
### 10.1.5 정리

<br>

## 10.2 리액트 18 버전 살펴보기

### 10.2.1 새로 추가된 훅 살펴보기
### 10.2.2 react-dom/client
### 10.2.3 react-dom/server
### 10.2.4 자동 배치(Automatic Batching)
### 10.2.5 더욱 엄격해진 엄격 모드
### 10.2.6 Suspense 기능 강화
### 10.2.7 인터넷 익스플로러 지원 중단에 따른 추가 폴리필 필요
### 10.2.8 그 밖에 알아두면 좋은 변경사항
### 10.2.9 정리

## References
- [React v17.0 Release Candidate: No New Features](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html)
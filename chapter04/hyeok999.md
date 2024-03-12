# 04장: 서버 사이드 렌더링

<br>

## 서버 사이드 렌더링이란?

### SPA와 SSR을 모두 알아야 하는 이유

- 서버 사이드 렌더링 역시 만능이 아니다
- 성능 수준 : 매우 최적화 잘 된 SPA > 매우 최적화 잘 된 MPA > 애매한 MPA > 애매한 SPA 

<br>

## 4.2 서버 사이드 렌더링을 위한 리액트 API 살펴보기

### 4.2.1 renderToString

- 리액트 컴포넌트를 렌더링하고 HTML 문자열을 생성
- root에 `data-react` 속성을 제공. 즉, `hydrate`가 가능.

### 4.2.2 renderToStaticMarkup

- root에 `data-react` 속성을 제공하지 않음. 즉, `hydrate`가 불가능.
- 리액트 컴포넌트를 렌더링하고 HTML 문자열을 생성

### 4.2.3 renderToNodeStream

- return 타입 : Node.js의 ReadableStream
- 브라우저가 아닌 서버에서 사용 

### 4.2.4 renderToStaticNodeStream

- return 타입 : Node.js의 ReadableStream
- 브라우저가 아닌 서버에서 사용.
- hydrate 가 불가능

### 4.2.5 hydrate

-  `renderToString`과 `renderToNodeStream`으로 생성된 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할 제공.

# 04장: 서버 사이드 렌더링

<br>

- [04장: 서버 사이드 렌더링](#04장-서버-사이드-렌더링)
  - [4.1 서버 사이드 렌더링이란?](#41-서버-사이드-렌더링이란)
    - [4.1.1 싱글 페이지 애플리케이션의 세상](#411-싱글-페이지-애플리케이션의-세상)
    - [4.1.2 서버 사이드 렌더링이란?](#412-서버-사이드-렌더링이란)
    - [4.1.3 SPA와 SSR을 모두 알아야 하는 이유](#413-spa와-ssr을-모두-알아야-하는-이유)
    - [4.1.4 정리](#414-정리)
  - [4.2 서버 사이드 렌더링을 위한 리액트 API 살펴보기](#42-서버-사이드-렌더링을-위한-리액트-api-살펴보기)
    - [4.2.1 renderToString](#421-rendertostring)
    - [4.2.2 renderToStaticMarkup](#422-rendertostaticmarkup)
    - [4.2.3 renderToNodeStream](#423-rendertonodestream)
    - [4.2.4 renderToStaticNodeStream](#424-rendertostaticnodestream)
    - [4.2.5 hydrate](#425-hydrate)
    - [4.2.6 서버 사이드 렌더링 예제 프로젝트](#426-서버-사이드-렌더링-예제-프로젝트)
    - [4.2.7 정리](#427-정리)
  - [4.3 Next.js 톺아보기](#43-nextjs-톺아보기)
    - [4.3.1 Next.js란?](#431-nextjs란)
    - [4.3.2 Next.js 시작하기](#432-nextjs-시작하기)
    - [4.3.3 Data Fetching](#433-data-fetching)
    - [4.3.4 스타일 적용하기](#434-스타일-적용하기)
    - [4.3.5 \_app.tsx 응용하기](#435-_apptsx-응용하기)
    - [4.3.6 next.config.js 살펴보기](#436-nextconfigjs-살펴보기)
    - [4.3.7 정리](#437-정리)

<br>

## 4.1 서버 사이드 렌더링이란?
### 4.1.1 싱글 페이지 애플리케이션의 세상
- 웹 사이트에 사용자가 처음 방문했을 때 HTML에 렌더링할 전체 javascript를 다운로드 받고 페이지 이동은 프론트엔드에서 처리하는 방식
- 렌더링과 라우팅에 필요한 대부분의 기능을 서버가 아닌 브라우저의 자바스크립트에 의존하는 방식
- 화면을 이동할 때 다시 HTML을 요청하지 않으므로 화면 깜빡임 없이 매끄러운 이동 가능

### 4.1.2 서버 사이드 렌더링이란?
- 렌더링이 필요한 작업을 모두 서버에서 수행하고 웹 페이지 렌더링을 제공한다.
- 장점
    - 최초 페이지 진입이 빠르다
    - 검색 엔진과 SNS 공유 등 메타 데이터 제공이 쉽다.
    - 누적 레이아웃 이동이 적다
    - 사용자의 디바이스 성능에 비교적 자유롭다
    - 보안에 좀 더 안전하다
- 단점
    - 소스코드를 작성할 때 항상 서버를 고려해야 한다
    - 적절한 서버가 구축돼 있어야 한다
    - 서비스 지연에 따른 문제
### 4.1.3 SPA와 SSR을 모두 알아야 하는 이유
- 한 가지 방식이 모든 문제의 해결책이 될순 없다.
- 현대의 서버 사이드 렌더링은 최초 웹사이트 진입 시에는 서버 사이드 렌더링 방식으로 서버에서 완성된 HTML을 제공받고, 이후 라우팅에서는 서버에서 내려받은 자바스크립트를 바탕으로 마치 싱글페이지 애플리케이션처럼 작동한다.
### 4.1.4 정리

<br>

## 4.2 서버 사이드 렌더링을 위한 리액트 API 살펴보기
### 4.2.1 renderToString
- 인수로 넘겨 받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수

### 4.2.2 renderToStaticMarkup
- renderToString과 유사하나 리액트에서만 사용하는 추가적인 DOM 속성을 만들지 않는다.
- 리액트의 이벤트 리스너가 필요 없는 완전 순수한 HTML만을 만들 때만 사용된다.
- 블로그 글이나 상품의 약관 정보와 같이 아무런 브라우저 액션이 없는 정적인 내용만 필요한 경우에 유용하다.

### 4.2.3 renderToNodeStream
- renderToString과 결과물이 완전 동일하지만 두가지 차이점이 있다.
    - renderToNodeStream은 브라우저에서 사용하는 것이 완전히 불가능하다.
    - renderToString은 결과물이 문자열이지만, renderToNodeStream은 결과물이 Node.js의 ReadableStream(utf-8로 인코딩된 바이트 스트림) 이다.
- ReadableStream
    - 브라우저에서도 사용할 수 있는 객체지만 만드는 과정은 브라우저에서 불가능하게 구현돼 있다.
    - 브라우저에 제공해야 할 큰 HTML을 작은 단위로 쪼개 연속적으로 작성함으로써 리액트 애플리케이션을 렌더링하는 Node.js의 부담을 덜어준다.

### 4.2.4 renderToStaticNodeStream
- renderToNodeStream과 제공하는 결과물은 동일하나, renderToStaticMarkup과 마찬가지로 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않는다.
- hydrate를 할 필요 없는 순수 HTML 결과물이 필요할 때 사용하는 메서드다.

### 4.2.5 hydrate
- renderToString과 renderToNodeStream으로 생성된 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할을 한다.
- 정적으로 생성된 HTML에 이벤트와 핸들러를 붙여 완전한 웹페이지 결과물을 만든다.
- render함수와 비슷한 역할을 하지만 hydrate는 이미 렌더링된 HTML이 있다는 가정하에 작업이 수행되고, 이 렌더링된 HTML을 기준으로 이벤트를 붙이는 작업만 실행한다.
### 4.2.6 서버 사이드 렌더링 예제 프로젝트
### 4.2.7 정리

<br>

## 4.3 Next.js 톺아보기
### 4.3.1 Next.js란?
- Vercel에서 만든 리액트 기반 서버 사이드 렌더링 프레임워크

### 4.3.2 Next.js 시작하기
- next/link로 이동하는 경우 서버 사이드 렌더링이 아닌, 클라이언트에서 필요한 자바스크립트만 불러온 뒤 라우팅하는 클라이언트 라우팅/렌더링 방식으로 작동한다.
- getServerSideProps 함수가 페이지에 없으면 서버에서 실행하지 않아도 되는 페이지로 처리한다.
- Next.js는 서버 사이드 렌더링 프레임워크지만 모든 작업이 서버에서 일어나는 것은 아니다.

### 4.3.3 Data Fetching
- Next.js에는 서버사이드 렌더링을 지원하기 위한 몇 가지 데이터 불러오기 전략이 있는데, 이를 Data Fetching이라고 한다.
- HTML을 렌더링할 때 필요한 데이터를 미리 가져와서 그 결과물을 HTML에 포함시키는 것과 비슷

### 4.3.4 스타일 적용하기
- 전역 스타일은 _app.tsx를 활용
- 컴포넌트 레벨 CSS는 [name].module.css와 같이 명명한다.
- 컴포넌트 레벨 CSS는 다른 컴포넌트의 클래스명과 충돌이 일어나지 않도록 고유한 클래스명을 제공한다.
- 자바스크립트 내부에 스타일 시트를 삽입하는 CSS-in-JS 라이브러리는 styled-jsx, styled-components 등이 있으며 styled-components가 가장 많은 사용자를 보유하고 있다.

### 4.3.5 _app.tsx 응용하기
- _app.tsx가 Next.js로 만든 모든 서비스가 진입하는 최초 진입점
- 사용자가 처음 서비스에 접근했을 때 처리할 동작을 등록해 둘 수있다.
### 4.3.6 next.config.js 살펴보기
- Next.js 실행에 필요한 설정을 추가할 수 있는 파일

### 4.3.7 정리

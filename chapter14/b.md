# 14장: 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈

이 장에서는 프론트 엔드 개발자가 주의해야 할 보안 이슈와 Next.js 등에서 발생할 수 있는 문제를 살펴봅니다.

<br>

- [14장: 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈](#14장-웹사이트-보안을-위한-리액트와-웹페이지-보안-이슈)
  - [14.1 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)](#141-리액트에서-발생하는-크로스-사이트-스크립팅xss)
    - [14.1.1 `dangerouslySetInnerHTML prop`](#1411-dangerouslysetinnerhtml-prop)
    - [dangerouslySetInnerHTML의 사용법](#dangerouslysetinnerhtml의-사용법)
    - [주의사항](#주의사항)
      - [안전하지 않은 컨텐츠](#안전하지-않은-컨텐츠)
      - [성능 문제](#성능-문제)
    - [안전한 사용을 위한 권장사항](#안전한-사용을-위한-권장사항)
    - [14.1.2 `useRef`를 활용한 직접 삽입](#1412-useref를-활용한-직접-삽입)
    - [14.1.3 리액트에서 XSS 문제를 피하는 방법](#1413-리액트에서-xss-문제를-피하는-방법)
      - [새니타이징(Sanitizing; 이스케이핑)](#새니타이징sanitizing-이스케이핑)
      - [리액트에서 XSS 공격을 방지하기 위해 사용할 수 있는 라이브러리](#리액트에서-xss-공격을-방지하기-위해-사용할-수-있는-라이브러리)
  - [14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자](#142-getserversideprops와-서버-컴포넌트를-주의하자)
    - [getServerSideProps 사용법](#getserversideprops-사용법)
    - [`getServerSideProps` 사용 시 XSS 방지 방법](#getserversideprops-사용-시-xss-방지-방법)
      - [데이터 검증과 살균 처리](#데이터-검증과-살균-처리)
  - [14.3 태그의 값에 적절한 제한을 둬야 한다](#143-태그의-값에-적절한-제한을-둬야-한다)
    - [`<a href="javascript:">`](#a-hrefjavascript)
    - [리액트에서 href 속성을 사용할 때 피싱 사이트로의 이동을 방지](#리액트에서-href-속성을-사용할-때-피싱-사이트로의-이동을-방지)
      - [안전한 `href` 속성 관리](#안전한-href-속성-관리)
      - [주의 사항](#주의-사항)
    - [`origin` 속성을 사용하여 피싱 사이트로의 이동 방지](#origin-속성을-사용하여-피싱-사이트로의-이동-방지)
  - [14.4 HTTP 보안 헤더 설정하기](#144-http-보안-헤더-설정하기)
    - [14.4.1 `Strict-Transport-Security`](#1441-strict-transport-security)
    - [14.4.2 `X-XSS-Protection`](#1442-x-xss-protection)
    - [14.4.3 `X-Frame-Options`](#1443-x-frame-options)
    - [14.4.4 `Permissions-Policy`](#1444-permissions-policy)
    - [14.4.5 `X-Content-Type-Options`](#1445-x-content-type-options)
    - [14.4.6 `Referrer-Policy`](#1446-referrer-policy)
    - [14.4.7 `Content-Security-Policy`](#1447-content-security-policy)
    - [14.4.8 보안 헤더 설정하기](#1448-보안-헤더-설정하기)
      - [Next.js에서 보안 헤더 설정하기](#nextjs에서-보안-헤더-설정하기)
    - [1. Custom Server를 사용하는 방법](#1-custom-server를-사용하는-방법)
    - [2. `next.config.js` 파일을 사용하는 방법](#2-nextconfigjs-파일을-사용하는-방법)
    - [nginx 설정 파일에 보안 헤더 추가하기](#nginx-설정-파일에-보안-헤더-추가하기)
      - [Nginx에서 보안 헤더를 설정하는 방법](#nginx에서-보안-헤더를-설정하는-방법)
    - [14.4.9 보안 헤더 확인하기](#1449-보안-헤더-확인하기)
  - [14.5 취약점이 있는 패키지의 사용을 피하자](#145-취약점이-있는-패키지의-사용을-피하자)
  - [14.6 `OWASP` Top 10](#146-owasp-top-10)
  - [14.7 정리](#147-정리)
  - [참고](#참고)

<br>

## 14.1 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)

XSS(Cross-Site Scripting) 공격은 악의적인 스크립트가 웹 어플리케이션의 페이지에 주입되어, 사용자의 브라우저에서 실행될 때 발생합니다. 이러한 스크립트는 사용자의 세션 쿠키를 탈취하거나, 악성 코드를 실행시키는 등의 행위를 할 수 있습니다.


### 14.1.1 `dangerouslySetInnerHTML prop`

### dangerouslySetInnerHTML의 사용법

React에서 `dangerouslySetInnerHTML`는 웹 페이지에 직접 HTML을 삽입할 수 있는 속성입니다. 이 기능은 자바스크립트의 `innerHTML`과 유사하며, React에서는 이를 통해 HTML 문자열을 직접 DOM에 삽입할 수 있습니다.

```jsx
// `dangerouslySetInnerHTML`를 사용하는 방법
function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: 'HTML 코드' }} />;
}
```

### 주의사항

#### 안전하지 않은 컨텐츠

외부에서 가져온 HTML 컨텐츠가 안전한지 확인하는 것이 중요합니다. 사용자가 제공한 데이터를 포함하는 경우, XSS 공격을 방지하기 위해 데이터를 적절히 살균 처리해야 합니다.

#### 성능 문제

`dangerouslySetInnerHTML`을 사용하면 React의 가상 DOM과 실제 DOM 간의 차이 비교(diffing) 과정에 영향을 줄 수 있으며, 이는 성능 저하를 초래할 수 있습니다.

### 안전한 사용을 위한 권장사항

1. **데이터 살균 처리**: 

2. **필요한 경우에만 사용**: 가능하면 `dangerouslySetInnerHTML`의 사용을 피하고, React의 일반적인 데이터 흐름과 컴포넌트 구조를 활용하세요. 예를 들어, JSX를 사용하여 동적으로 컴포넌트를 생성하는 것이 좋습니다.

3. **최신 보안 패치 적용**: React와 관련 라이브러리들은 정기적으로 업데이트되므로, 보안과 관련된 최신 패치를 적용하는 것이 중요합니다.

### 14.1.2 `useRef`를 활용한 직접 삽입

액트에서 `useRef` 훅은 주로 DOM 요소에 직접적인 접근을 필요로 할 때 사용됩니다. 그러나 이 훅을 사용하여 XSS 공격을 직접적으로 방지하는 것은 아닙니다. 그럼에도 불구하고, `useRef`를 사용하여 안전하지 않은 직접 DOM 조작을 피하고 리액트의 선언적인 방식을 유지함으로써 간접적으로 XSS 공격에 대한 보호를 강화할 수 있습니다.

```jsx
import React, { useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';

function SafeContent({ dangerousHtml }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // DOMPurify를 사용하여 살균 처리
      const cleanHtml = DOMPurify.sanitize(dangerousHtml);
      // 안전하게 살균 처리된 HTML을 요소에 적용
      contentRef.current.innerHTML = cleanHtml;
    }
  }, [dangerousHtml]);

  return <div ref={contentRef} />;
}
```

> 직접적인 DOM 조작은 리액트의 가상 DOM 메커니즘을 우회하기 때문에 예상치 못한 부작용을 일으킬 수 있으므로 가능한 한, 리액트의 선언적인 패러다임 안에서 작업하는 것이 가장 좋으며, dangerouslySetInnerHTML의 사용은 최소화하고 살균 처리를 통해 안전하게 관리해야 합니다.

### 14.1.3 리액트에서 XSS 문제를 피하는 방법

리액트 애플리케이션에서 XSS(Cross-Site Scripting) 공격을 방지하기 위해 사용할 수 있는 여러 라이브러리가 있습니다. 이러한 라이브러리들은 사용자 입력을 살균(sanitize)하여 악의적인 스크립트가 실행되는 것을 방지합니다.

#### 새니타이징(Sanitizing; 이스케이핑)

사용자 입력을 받아들일 때, 사용자가 입력한 데이터를 안전한 형태로 변환하는 것을 말합니다. 이를 통해 XSS 공격을 방지할 수 있습니다.

```jsx
import React from 'react';
import DOMPurify from 'dompurify';

function MyComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
```

#### 리액트에서 XSS 공격을 방지하기 위해 사용할 수 있는 라이브러리

**1. [DOMPurify](https://github.com/cure53/DOMPurify)**: DOMPurify는 HTML과 MathML을 살균하는 데 사용되는 라이브러리입니다. XSS 공격으로부터 안전한 HTML을 생성하기 위해 사용자 입력을 살균할 수 있습니다.

```bash
# 설치
npm install dompurify
```

```jsx
import DOMPurify from 'dompurify';

function MyComponent({ dangerousHtml }) {
  const safeHtml = DOMPurify.sanitize(dangerousHtml);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
```

**2. [js-xss](https://github.com/leizongmin/js-xss)**: sanitize-html은 HTML을 살균하기 위한 라이브러리로, 불필요하거나 위험한 태그와 속성을 제거합니다.

```bash
# 설치
npm install sanitize-html
```

```jsx
import sanitizeHtml from 'sanitize-html';

function MyComponent({ dangerousHtml }) {
  const cleanHtml = sanitizeHtml(dangerousHtml);
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
```

라이브러리를 사용하는 것 외에도, 안전한 코딩 관행을 유지하는 것이 중요합니다. 예를 들어, 가능하면 `dangerouslySetInnerHTML`의 사용을 피하고, 리액트가 기본적으로 제공하는 JSX를 통해 컴포넌트를 생성하는 것이 좋습니다. JSX는 기본적으로 대부분의 XSS 공격을 방지하는 이스케이프 처리를 자동으로 수행합니다.

<br>

## 14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자

### getServerSideProps 사용법

`getServerSideProps`는 Next.js 프레임워크에서 제공하는 함수로, 서버 측에서 데이터를 미리 가져와 페이지를 렌더링할 때 이용할 수 있습니다. 이는 클라이언트 측에서 처리하기에 부담스러운 큰 데이터를 서버에서 처리하거나, 사용자마다 다른 데이터를 보여줘야 할 때 사용됩니다.

`getServerSideProps` 함수는 페이지 컴포넌트에 대한 서버 측 로직을 정의하기 위해 사용되며, `context` 객체를 인자로 받습니다. 이 `context` 객체에는 HTTP 요청에 대한 정보가 포함되어 있습니다.

```jsx
// getServerSideProps 함수를 사용하는 예
export async function getServerSideProps(context) {
  // 서버 측에서 API 호출 또는 데이터베이스 쿼리 등의 작업 수행
  const response = await fetch(`https://api.example.com/data`);
  const data = await response.json();

  // 반환된 props는 페이지 컴포넌트로 전달됨
  return {
    props: {
      data
    }
  };
}

function Page({ data }) {
  // 서버에서 전달받은 데이터를 이용하여 페이지 렌더링
  return <div>{data.content}</div>;
}

export default Page;
```

### `getServerSideProps` 사용 시 XSS 방지 방법
Next.js의 `getServerSideProps` 함수를 사용할 때, 서버로부터 받아오는 데이터가 사용자의 입력에 기반하는 경우 XSS 공격을 방지하기 위한 조치가 필요합니다.

#### 데이터 검증과 살균 처리
서버로부터 데이터를 받아올 때, 해당 데이터가 안전한지 검증하고 살균 처리하는 과정을 거쳐야 합니다. 예를 들어, HTML로부터 데이터를 추출할 때는 sanitize-html과 같은 라이브러리를 사용하여 입력값에서 위험한 코드를 제거할 수 있습니다.

```jsx
import sanitizeHtml from 'sanitize-html';

export async function getServerSideProps(context) {
  // 데이터를 가져온 후
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  // 데이터를 살균 처리
  const cleanData = sanitizeHtml(data.content, {
    // 필요한 옵션을 설정하여 살균 처리 수준을 조정할 수 있음
  });

  // 살균 처리된 데이터를 props로 전달
  return {
    props: {
      content: cleanData
    }
  };
}
```

**1. 안전한 콘텐츠 사용**: `dangerouslySetInnerHTML`와 같은 속성을 사용할 때는 항상 살균 처리된 데이터만을 사용해야 합니다. 이는 React에서 제공하는 속성이며, 직접적으로 HTML을 렌더링할 때 XSS 공격에 취약할 수 있기 때문입니다.

```
function Page({ content }) {
  // 안전하게 처리된 콘텐츠를 렌더링
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
```

**2. HTTP 헤더 설정**: 서버에서 응답을 보낼 때, XSS 보호를 위한 HTTP 헤더를 설정할 수 있습니다. 예를 들어, Content-Security-Policy (CSP) 헤더를 설정하여 특정 소스에서만 스크립트가 실행되도록 제한할 수 있습니다.

```jsx
export async function getServerSideProps(context) {
  context.res.setHeader('Content-Security-Policy', "script-src 'self';");
  // 나머지 로직...
}
```

<br>

## 14.3 태그의 값에 적절한 제한을 둬야 한다

### `<a href="javascript:">`

`<a href="javascript:">` 는 자바스크립트 pseudo-protocol을 사용하는 방식으로, 이는 보안상의 이유로 권장되지 않습니다.

```jsx
function MyComponent() {
  const handleClick = (event) => {
    event.preventDefault(); // 기본 동작 방지
    // 클릭 이벤트 로직 처리
    console.log('링크가 클릭되었습니다!');
  };

  return (
    <a href="#" onClick={handleClick} role="button">클릭하세요</a>
  );
}
```

위의 코드에서 `handleClick` 함수는 링크 클릭 시 호출됩니다. `href="javascript:"` 대신에 `href="#"`를 사용하고 있지만, `#`는 페이지가 스크롤되는 것을 야기할 수 있으므로, 이벤트 내에서 `event.preventDefault()`를 호출하여 기본 동작을 방지하는 것이 좋습니다.

### 리액트에서 href 속성을 사용할 때 피싱 사이트로의 이동을 방지

리액트에서 `href` 속성을 사용할 때 피싱 사이트로의 이동을 방지하기 위해서는 몇 가지 주의 사항을 따라야 합니다. 아래에 그 방법들을 설명하겠습니다.

#### 안전한 `href` 속성 관리

1. **사용자 입력에 의존하는 `href` 값 검증**: 사용자로부터 입력받은 URL이나 동적으로 생성된 링크의 경우, 해당 URL이 안전한지 검증하는 과정이 필요합니다. 이는 서버 측에서도 수행할 수 있지만, 클라이언트 측에서도 추가적인 검증을 할 수 있습니다.

2. **정적인 URL 사용**: 가능한 한, 애플리케이션 내에서 정의된 정적인 URL을 사용하고, 외부로부터 입력받은 URL에 대해서는 항상 신중을 기해 처리합니다.

3. **안전한 링크 속성 설정**: `rel="noopener noreferrer"` 속성을 사용하여 새 탭에서 열리는 링크의 경우, 이전 페이지와의 참조를 끊어 피싱 사이트가 이용자의 데이터에 접근하는 것을 방지할 수 있습니다.


```jsx
function SafeLink({ url, children }) {
  // URL 검증 로직 (여기서는 간단한 예로 시작합니다)
  const isSafeUrl = (url) => {
    // 여기에 안전한 URL인지를 검사하는 로직을 추가하세요.
    // 예를 들어, 허용된 도메인 리스트를 두고 확인할 수 있습니다.
    return url.startsWith('https://안전한-도메인.com');
  };

  // 클릭 핸들러
  const handleClick = (event) => {
    if (!isSafeUrl(url)) {
      event.preventDefault(); // 안전하지 않은 URL의 경우 기본 동작 방지
      alert('이 링크는 안전하지 않은 사이트로 연결될 수 있습니다.');
      return;
    }
    // 추가적인 로직...
  };

  return (
    <a href={url} onClick={handleClick} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}
```

위의 `SafeLink` 컴포넌트는 `url` prop을 받아서 안전한 URL인지 확인한 후에 링크를 렌더링합니다. 안전하지 않은 경우, 사용자에게 경고를 주고 기본 동작을 방지합니다. 또한, `rel="noopener noreferrer"` 속성을 추가하여 보안성을 높입니다.

#### 주의 사항

- URL 검증 로직은 프로젝트의 요구사항과 보안 정책에 따라 달라질 수 있습니다.
- 사용자 입력을 통해 URL을 받는 경우, 항상 서버 측과 클라이언트 측 모두에서 검증을 수행해야 합니다.
- `target="_blank"` 를 사용할 때는 항상 `rel="noopener noreferrer"` 속성을 추가하여 성능과 보안 문제를 예방합니다.

### `origin` 속성을 사용하여 피싱 사이트로의 이동 방지

`origin` 속성은 현재 페이지의 URL의 origin을 반환합니다. 이를 통해 현재 페이지의 origin과 링크의 origin을 비교하여, 피싱 사이트로의 이동을 방지할 수 있습니다.

```jsx
import React from 'react';

function SafeLink({ href, children }) {
  // 안전한 도메인 리스트
  const trustedOrigins = ['https://trusted.com', 'https://safe.co.kr'];

  // URL이 신뢰할 수 있는 origin에서 왔는지 확인
  const isTrustedOrigin = (url) => {
    try {
      const { origin } = new URL(url);
      return trustedOrigins.includes(origin);
    } catch (error) {
      // URL 생성 실패 시 (잘못된 URL 형식 등), 링크를 신뢰하지 않음
      return false;
    }
  };

  // 클릭 핸들러
  const handleClick = (event) => {
    if (!isTrustedOrigin(href)) {
      console.warn('신뢰할 수 없는 링크입니다:', href);
      event.preventDefault(); // 기본 동작 방지
      // 추가적인 액션을 여기에 배치할 수 있습니다 (예: 경고창 표시)
    }
  };

  return (
    <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default SafeLink;
```

> 위의 `SafeLink` 컴포넌트는 `href` prop을 받아서 안전한 URL인지 확인한 후에 링크를 렌더링합니다. 안전하지 않은 경우, 사용자에게 경고를 주고 기본 동작을 방지합니다. 또한, `rel="noopener noreferrer"` 속성을 추가하여 보안성을 높입니다.

<br>

## 14.4 HTTP 보안 헤더 설정하기

HTTP 보안 헤더란 웹 서버와 브라우저 간의 통신에서 보안을 강화하기 위해 HTTP 응답에 추가되는 헤더들을 말합니다. 

### 14.4.1 `Strict-Transport-Security`

이 헤더를 사용하면 웹 사이트가 HTTPS를 통해서만 접근될 수 있도록 강제하며, 이는 중간자 공격(Man-in-the-Middle Attack)을 방지하는 데 도움이 됩니다.

### 14.4.2 `X-XSS-Protection`

이 헤더는 브라우저의 내장된 반사형 XSS 필터를 활성화하고 구성하여, 사용자를 반사형 XSS 공격으로부터 보호합니다.

### 14.4.3 `X-Frame-Options`

이 헤더는 웹페이지가 `<iframe>`, `<object>`, `<embed>` 등의 태그 내에서 렌더링되는 것을 제한합니다. 이를 통해 클릭재킹(clickjacking) 공격을 방지할 수 있습니다.

### 14.4.4 `Permissions-Policy`

Permissions-Policy 헤더(과거에는 Feature-Policy로 알려져 있음)는 웹사이트에서 사용할 수 있는 브라우저 기능을 세밀하게 제어할 수 있게 해주는 보안 관련 HTTP 응답 헤더입니다.


### 14.4.5 `X-Content-Type-Options`

이 헤더를 사용하면 브라우저가 MIME 타입을 추측하지 않고, 서버가 명시한 MIME 타입대로만 리소스를 해석하도록 강제합니다. 일반적으로 X-Content-Type-Options: nosniff 값이 사용됩니다.

### 14.4.6 `Referrer-Policy`

이 헤더는 다른 도메인으로의 요청 시 HTTP Referer 헤더를 어떻게 전송할지를 결정합니다. 이를 통해 사용자의 개인정보를 보호하고 데이터 유출을 방지할 수 있습니다.

### 14.4.7 `Content-Security-Policy`

웹 페이지에서 실행하거나 로드할 수 있는 리소스의 종류를 브라우저에 지시하여, 크로스 사이트 스크립팅(Cross-Site Scripting, XSS) 공격과 데이터 주입 공격을 방지합니다.

### 14.4.8 보안 헤더 설정하기

#### Next.js에서 보안 헤더 설정하기

Next.js에서 보안 헤더를 설정하는 방법은 여러 가지가 있지만, 일반적으로는 Next.js의 Custom Server 기능을 사용하거나, `next.config.js` 파일을 통해 설정하는 방법이 있습니다.

### 1. Custom Server를 사용하는 방법

Custom Server를 사용하여 각 요청에 대한 응답에 보안 헤더를 추가할 수 있습니다. 예를 들어, Express.js를 사용하는 경우 다음과 같이 설정할 수 있습니다.

```jsx
const express = require('express');
const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

### 2. `next.config.js` 파일을 사용하는 방법
Next.js 10 이상부터는 `next.config.js` 파일에 `async headers()` 함수를 추가하여 보안 헤더를 설정할 수 있습니다.

```jsx
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
```

이 설정은 빌드 타임에 적용되므로 서버를 재시작할 필요가 없고, 각 페이지에 대해 자동으로 적용됩니다.

두 방법 모두 Next.js 애플리케이션에 보안 헤더를 추가하는 데 사용할 수 있으며, 프로젝트의 요구사항과 설정에 따라 적합한 방법을 선택하면 됩니다.

### nginx 설정 파일에 보안 헤더 추가하기

Next.js 애플리케이션을 Nginx 서버 뒤에서 운영할 때 보안 헤더를 설정하는 것은 Nginx의 설정 파일을 통해 이루어집니다.
이 경우, Nginx는 리버스 프록시로 동작하며 모든 HTTP(S) 요청을 Next.js 애플리케이션으로 전달하기 전에 보안 헤더를 추가할 수 있습니다.

#### Nginx에서 보안 헤더를 설정하는 방법

1. Nginx 설정 파일을 엽니다. 이 파일은 일반적으로 `/etc/nginx/nginx.conf` 또는 `/etc/nginx/sites-available/` 디렉토리에 위치한 도메인별 설정 파일일 수 있습니다.

2. `server` 블록 또는 `location` 블록 내에 `add_header` 지시문을 사용하여 필요한 보안 헤더를 추가합니다.

3. 설정을 추가한 후, Nginx를 다시 로드하거나 재시작하여 변경 사항을 적용합니다.


```bash
# nginx.conf 또는 도메인별 설정 파일
server {
    listen 80;
    server_name example.com;

    # 기타 설정 ...

    location / {
        proxy_pass http://localhost:3000; # Next.js 애플리케이션으로 프록시
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 보안 헤더 추가
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; style-src 'self' 'unsafe-inline';";
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options DENY;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-XSS-Protection "1; mode=block";
        add_header Permissions-Policy "camera=(), microphone=(), geolocation=()";
    }

    # 기타 설정 ...
}
```

> CSP, X-Content-Type-Options, X-Frame-Options, HSTS, X-XSS-Protection 및 Permissions-Policy와 같은 여러 보안 헤더를 설정했습니다.

Nginx 설정을 변경한 후에는 항상 Nginx 구성을 테스트하고 서비스를 재시작하거나 다시 로드해야 합니다:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` 명령은 구성 파일의 문법 오류를 확인하고, `systemctl reload nginx` 또는 `service nginx reload` 명령은 Nginx를 재시작하지 않고 설정을 적용합니다.


### 14.4.9 보안 헤더 확인하기

보안 헤더 현황 확인: https://securityheaders.com/

<br>

## 14.5 취약점이 있는 패키지의 사용을 피하자

<br>

## 14.6 `OWASP` Top 10

<br>

## 14.7 정리

<br>

## 참고
- [Using dangerouslySetInnerHTML in a React application](https://blog.logrocket.com/using-dangerouslysetinnerhtml-react-application/)
- [Preventing XSS in React (Part 2): dangerouslySetInnerHTML](https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2)
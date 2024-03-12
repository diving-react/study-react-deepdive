# 14장: 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈

<br>

- [14장: 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈](#14장-웹사이트-보안을-위한-리액트와-웹페이지-보안-이슈)
  - [14.1 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)](#141-리액트에서-발생하는-크로스-사이트-스크립팅xss)
    - [14.1.1 `dangerouslySetInnerHTML prop`](#1411-dangerouslysetinnerhtml-prop)
    - [14.1.2 `useRef`를 활용한 직접 삽입](#1412-useref를-활용한-직접-삽입)
    - [14.1.3 리액트에서 XSS 문제를 피하는 방법](#1413-리액트에서-xss-문제를-피하는-방법)
  - [14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자](#142-getserversideprops와-서버-컴포넌트를-주의하자)
  - [14.3 태그의 값에 적절한 제한을 둬야 한다](#143-태그의-값에-적절한-제한을-둬야-한다)
  - [14.4 HTTP 보안 헤더 설정하기](#144-http-보안-헤더-설정하기)
    - [14.4.1 `Strict-Transport-Security`](#1441-strict-transport-security)
    - [14.4.2 `X-XSS-Protection`](#1442-x-xss-protection)
    - [14.4.3 `X-Frame-Options`](#1443-x-frame-options)
    - [14.4.4 `Permissions-Policy`](#1444-permissions-policy)
    - [14.4.5 `X-Content-Type-Options`](#1445-x-content-type-options)
    - [14.4.6 `Referrer-Policy`](#1446-referrer-policy)
    - [14.4.7 `Content-Security-Policy`](#1447-content-security-policy)
    - [14.4.8 보안 헤더 설정하기](#1448-보안-헤더-설정하기)
    - [14.4.9 보안 헤더 확인하기](#1449-보안-헤더-확인하기)
  - [14.5 취약점이 있는 패키지의 사용을 피하자](#145-취약점이-있는-패키지의-사용을-피하자)
  - [14.6 `OWASP` Top 10](#146-owasp-top-10)
  - [14.7 정리](#147-정리)

<br>

## 14.1 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)

웹 애플리케이션에서 가장 많이 보이는 취약점 중 하나로, 제 3자가 웹사이트에 악성 스크립트를 삽입해 실행할 수 있는 취약점을 의미한다. 이 취약점은 주로 게시판 같이 사용자가 입력할 수 있고, 입력을 다른 사용자에게 보여줄 수 있는 경우에 발생한다.

예를들어 사용자가 다음과 같은 글을 올린다고 가정하자

```javascript
<p>사용자가 글을 작성했습니다.</p>
<script>
  alert('CSS)
</script>
```

위의 글을 방문했을 때 별도의 조치가 없다면 script도 같이 실행돼서 alert가 실행될 것이다. script가 실행될 수 있다면 웹사이트 개발자가 할 수 있는 모든 작업을 수행할 수 있으며, 쿠키를 획득해 사용자의 로그인 세션 등을 탈취하거나 사용자의 데이터를 변경하는 등의 위험성이 있다.

리액트에서 XSS이슈가 발생하는 경우를 알아보자

### 14.1.1 `dangerouslySetInnerHTML prop`

특정 부라우저 DOM의 innerHTML을 특정한 내용으로 교체할 수 있는 방법이다. 일반적으로 사용자나 관리자가 입력한 내용을 브라우저에 표시하는 용도로 사용된다

```javascript
function App() {
  return <div dangerousltSetInnerHTML={{ __html: "First &middot; Second" }} />;
}
```

### 14.1.2 `useRef`를 활용한 직접 삽입

dangerousltSetInnerHTML과 비슷한 방법으로 DOM에 직접 내용을 삽입할 수 있는 방법으로 useRef가 있다. useRef는 직접 DOM에 접근할 수 있어서, innerHTML에 보안 취약점이 있는스크립트를 삽입하면 문제가 발생한다.

### 14.1.3 리액트에서 XSS 문제를 피하는 방법

삽입할 수 있는 HTML을 안전한 HTML 코드로 한 번 치환하는 것이다. 이러한 과정을 새니타이즈(sanitize)나 이스케이프(escape)라고 한다. 새니타이즈는 직접 구현할 수 있지만 라이브러리를 사용하는 것이 가장 확실한 방법이다.
<br>

## 14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자

SSR과 RSC는 성능 이점과 서버의 개발 환경을 프론트엔드 개발자가 담당하게 됐다. 서버에는 일반 사용자에게 노출되면 안 되는 정보들이 담겨있기 때문에 클라이언트, 즉 브라우저에 정보를 내려줄 때는 조심해야 한다.

<br>

## 14.3 태그의 값에 적절한 제한을 둬야 한다

href 내에 JS코드가 존재할 수 있다.

```javascript
return <a href="javascript:alert('hello');">링크</a>;
```

XSS에서 다룬 내용과 비슷하게, href에 사용자가 입력한 주소를 넣을 수 있다면 피싱 사이트로 이동시키는 보안이슈로 이어질 수 있다.

<br>

## 14.4 HTTP 보안 헤더 설정하기

HTTP 보안 헤더란 브라우저가 렌더링하는 내용과 관련된 보안 취약점을 미연에 방지하기 위해 브라우저와 함께 작동하는 헤더다. HTTP 보안 헤더만 효율적으로 사용할 수 있어도 많은 보안 취약점을 방지할 수 있다.

### 14.4.1 `Strict-Transport-Security`

모든 사이트가 HTTPS를 통해 접근해야 하며, 만약 HTTP로 접근하는 경우 모든 시도는 HTTPS로 변경되게 한다.

### 14.4.2 `X-XSS-Protection`

비표준 기술로, 현재 사파리와 구형 브라우저에서만 제공되는 기능이다.
이 헤더는 페이지에서 XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더다.

### 14.4.3 `X-Frame-Options`

페이지를 frame, iframe, embed, object 내부에서 렌더링을 허용할지를 나타낼 수 있다. 네이버와 비슷한 주소를 가진 페이지에서 네이버를 iframe으로 렌더링한다고 가정할 때 사용자는 이 페이지를 진짜 네이버로 오해할 수도 있다. 공격자는 사용자의 개인정보를 탈취할 수 있다.

```javascript
 <div>
  <iframe src='https://www.naver.com'>
 </div>
```

코드를 실행해보면 네이버 페이지가 정상적으로 노출되지 않는다.

### 14.4.4 `Permissions-Policy`

웹 사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더다.

### 14.4.5 `X-Content-Type-Options`

Content-type 헤더에서 제공하는 MIME유형이 브라우저에 의해 임의로 변경되지 않게 하는 헤더다.

### 14.4.6 `Referrer-Policy`

Referer 헤더에서 사용할 수 있는 데이터를 나타낸다.

### 14.4.7 `Content-Security-Policy`

XSS 공격이나 삽입 공격 공격과 같은 다양한 보안 위협을 막기 위해 설계됐다.

### 14.4.8 보안 헤더 설정하기

**Next.js**
HTTP경로별로 보안 헤더를 적용할 수 있다. next.config.js에서 다음과 같이 추가할 수 있다.

```javascript
const securityHeaders = [{ key: "key", value: "value" }];

module.exports = {
  async headers() {
    return [
      {
        // 모든 주소에 설정한다.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
```

### 14.4.9 보안 헤더 확인하기

`https://securityheaders.com/` 을 방문해서 보안 헤더의 현황을 확인할 수 있다.
<br>

## 14.5 취약점이 있는 패키지의 사용을 피하자

<br>

## 14.6 `OWASP` Top 10

<br>

## 14.7 정리

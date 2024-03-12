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

가장 많이 보이는 취약점 중 하나로 웹사이트 개발자가 아닌 제3자가 웹사이트에 악성 스크립트를 삽입해 실행할 수 있는 취약점을 의미.

### 14.1.1 `dangerouslySetInnerHTML prop`

특정 브라우저 DOM의 innerHTML을 틀정한 내용으로 교체할 수 있는 방법이다.
일반적으로 게시판과 같이 사용자나 관리자가 입력한 내용을 브라우저에 표시하는 용도로 사용

오직 \_\_html을 키를 가지고 있는 객체만 인수로 받을 수 있으며, 이 인수로 넘겨받을 문자열을 DOM에 그대로 표시하는 역활을 한다. 그러나 dangerouslySetInnerHTML의 위험성은 dangerouslySetInnerHTML이 인수로 받는 문자열에는 제한이 없다는 것이다.

### 14.1.2 `useRef`를 활용한 직접 삽입

DOM에 직접 내용을 삽입할 수 있는 방법으로 useRef가 있다.
useRef를 활용하면 직접 DOM에 접근할 수 있으므로 이DOM에 앞서와 비슷한 방식으로 innerHTML에 보안 취약점이 있는 스크립트를 삽입하면 동일한 문제가 발생한다.

### 14.1.3 리액트에서 XSS 문제를 피하는 방법

리액트에서 XSS이슈를 피하는 가장 확실한 방법은 제3자가 삽입할 수 있는 HTML을 안전한 HTML 코드로 한 번 치환한다는 것이다.

이러한 과정을 새니타이즈(sanitize)또는 이스케이프(escape)라고 하는데, 새니타이즈를 직접 구현해 사용하는 등 다양한 방법이 있지만 가장 확실한 방법은 npm 라이브러리를 사용하는 것이다.
<br>

## 14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자

서버에는 일반 사용자에게 노출도면 안되는 정보들이 담겨 있기 때문에 클라이언트, 즉 브라우저에 정보를 내려줄 때는 조심해야 한다.
<br>

## 14.3 태그의 값에 적절한 제한을 둬야 한다

웹 개발 시에 a태그의 href에 javascript:로 시작하는 자바스크립트 코드를 넣어둔 경우를 본 적이 있을 것이다.
이는 주로 a태그의 기본기능, 즉 href로 선언된 URL로 페이지를 이동하는 것을 막고 onClick 이벤트와 같이 별도 이벤트 핸들러만 작동시키기 위한 용도로 주로 사용된다.

```
function APP(){
  function handleClick(){
    console.log('hello)
  }
  return(
    <>
    <a href="javascript:;" onClick={handleClick}>
    링크
    </a>
  )
}
```

이렇게 하면 a의 href가 작동하지 않아 페이지 이동이 일어나지 않는 대신 onClick의 핸들러만 실행되는 것을 볼 수 있다.
a 태그는 반드시 페이지 이동이 있을 때만 사용하는 것이 좋다.

그러나 이 코드를 정확히 이야기하면 href가 작동하지 않는 것이 아니라 href의 javascript:;만 실행된 것이다.
즉, href내에 자바스크립트 코드가 존재한다면 이를 실행한다는 뜻이다.

따라서 href로 들어갈 수 있는 값을 제한해야 한다.
<br>

## 14.4 HTTP 보안 헤더 설정하기

HTTP 보안 헤더란 브라우저가 렌더링하는 내용과 관련된 보안 취약점을 미연에 방지하기 위해 브라우저와 함께 작동하는 헤더를 의미한다. 이는 보안에 가장 기초적인 부분으로, HTTP 보안 헤더만 효율적으로 사용할 수 있어도 많은 취약점을 방지 할 수 있다.

### 14.4.1 `Strict-Transport-Security`

모든 사이트가 HTTPS를 통해 접근해야 하며, 만약 HTTP로 접근하는 경우 이러한 모든 시도는 HTTPS로 변경되게 한다.

```
Strict-Transport-Security: max-age=<expire-time>; includeSubDomains
```

expire-time은 이 설정을 브라우저가 기억해야 하는 시간을 의미하며, 초 단위로 기록된다. 이 기간내에는 HTTP로 사용자가 요청한다 하더라도 브라우저는 이 시간을 기억하고 있다가 자동으로 HTTPㄴ로 요청하게 된다.

### 14.4.2 `X-XSS-Protection`

비표준 기술로, 현재 사파리와 구형 브라우저에서만 제공하는 기능이다.
이헤더는 페이지에서 XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더다.

### 14.4.3 `X-Frame-Options`

페이지를 frame,iFrame,embed,object 내부에서 렌더링을 허용할지를 나타낼 수 있다.

### 14.4.4 `Permissions-Policy`

웹사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더다.

```
# 모든 geolocation 사용을 막는다.
Permissions-Policy: geolocation=()
```

### 14.4.5 `X-Content-Type-Options`

이 헤더를 이해하려면 먼저 MIME이 무엇인지 알아야 한다. MIME란 Multipurpose Internet Mail Extensions의 약자로,현재는 Content-type의 값으로 사용된다.
Content-type 헤더에서 제공하는 MIME 유형이 브라우저에 의해 임의로 변경되지 않게 하는 헤더다.
즉, 웹서버가 브라우저에 강제로 이 파일을 읽는 방식을 지정하는 것이 바로 이 헤더다.

### 14.4.6 `Referrer-Policy`

이 헤더에는 현재 요청을 보낸 페이지의 주소가 나타난다.

참고로 Referer와 Referrer-Policy의 철자가 다른 이유는 Referer라는 오타가 이미 표준으로 등록된 이후에 뒤늦게 오타임을 발견했기 때문이다.

### 14.4.7 `Content-Security-Policy`

콘텐츠 보안 정책은 XSS 공격이나 데이터 삽입 공격과 같은 다양한 보안 위협을 막기 위해 설계 됐다.

### 14.4.8 보안 헤더 설정하기

### 14.4.9 보안 헤더 확인하기

<br>

## 14.5 취약점이 있는 패키지의 사용을 피하자

<br>

## 14.6 `OWASP` Top 10

오픈소스 웹 애플리케이션 보안 프로젝트를 의미한다.

주로 웹에서 발생할 수 있는 정보 노출, 악성 스크립트, 보안 취약점 등을 연구하며, 주기적으로 10대 웹 애플리케이션 취약점을 공개하는데 이를 OWASP Top 10 이라고 한다.
<br>

## 14.7 정리

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
- 개발자가 작성하지 않은 코드를 제3자가 주입하여 하는 공격
### 14.1.1 `dangerouslySetInnerHTML prop`
### 14.1.2 `useRef`를 활용한 직접 삽입
### 14.1.3 리액트에서 XSS 문제를 피하는 방법
- sanitize-html, escape 등 라이브러리 사용
- 서버에서 사용자 입력 이스케이프
- 클라이언트에서 사용자가 입력한 데이터는 일단 의심한다.
- 의심스러운 데이터가 DB에 저장되지 않도록한다.

<br>

## 14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자
- 서버에서 클라이언트로 props를 전달할 때 노출이 되지 않아야 하는 정보가 있는지 확인

<br>

## 14.3 태그의 값에 적절한 제한을 둬야 한다
- 사용자가 입력한 href등의 속성이  안전한지 확인한다.

<br>

## 14.4 HTTP 보안 헤더 설정하기
### 14.4.1 `Strict-Transport-Security`
- 모든 사이트가 HTTPS로 접근해야함
- 만약 HTTP로 요청해도 자동으로 HTTPS로 요청변경

### 14.4.2 `X-XSS-Protection`
- 비표준 기술로, 현재 사파리와 구형 브라우저에서만 제공
- XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더

### 14.4.3 `X-Frame-Options`
- 페이지를 frame, iframe, embed, object 내부에서 렌더링을 허용할지를 나타냄

### 14.4.4 `Permissions-Policy`
- 웹사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더

### 14.4.5 `X-Content-Type-Options`
- Content-type 헤더에서 제공하는 MIME 유형이 브라우저에 의해 임의로 변경되지 않게 하는 헤더

### 14.4.6 `Referrer-Policy`
- HTTP 요청에는 Referrer라는 헤더가 존재하는데 이 헤더에서 사용할 수 있는 데이터를 나타냄

### 14.4.7 `Content-Security-Policy`
- -src: src attribute에 의한 요청을 제한
- form-action: 폼으로 전송할 수 있는 URL 제한

### 14.4.8 보안 헤더 설정하기
- Next.js: HTTP 경로별로 보안 헤더 설정 가능
- NGINX: 경로별로 add_header 지시자를 사용해 응답 헤더 설정 가능

### 14.4.9 보안 헤더 확인하기
- https://securityheaders.com 방문해서 보안 헤더 상황 확인

<br>

## 14.5 취약점이 있는 패키지의 사용을 피하자

<br>

## 14.6 `OWASP` Top 10
- Open Wolrdwide (web) Application Security Project라는 오픈소스 웹 애플리케이션 보안 프로젝트
- 주로 웹에서 발생할 수 있는 정보 노출, 악성 스크립트, 보안 취약점 등을 연구하며, 주기적으로 10대 웹 애플리케이션 취약점을 공개하는데 이를 OWASP Top 10이라 한다.

<br>

## 14.7 정리

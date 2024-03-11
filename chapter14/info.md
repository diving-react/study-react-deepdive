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
### 14.1.1 `dangerouslySetInnerHTML prop`
### 14.1.2 `useRef`를 활용한 직접 삽입
### 14.1.3 리액트에서 XSS 문제를 피하는 방법

<br>

## 14.2 `getServerSideProps`와 서버 컴포넌트를 주의하자

<br>

## 14.3 태그의 값에 적절한 제한을 둬야 한다

<br>

## 14.4 HTTP 보안 헤더 설정하기
### 14.4.1 `Strict-Transport-Security`
### 14.4.2 `X-XSS-Protection`
### 14.4.3 `X-Frame-Options`
### 14.4.4 `Permissions-Policy`
### 14.4.5 `X-Content-Type-Options`
### 14.4.6 `Referrer-Policy`
### 14.4.7 `Content-Security-Policy`
### 14.4.8 보안 헤더 설정하기
### 14.4.9 보안 헤더 확인하기

<br>

## 14.5 취약점이 있는 패키지의 사용을 피하자

<br>

## 14.6 `OWASP` Top 10

<br>

## 14.7 정리
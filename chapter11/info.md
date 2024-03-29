# 11장: Next.js 13과 리액트 18

이 장은 Next.js 13과 리액트 18의 새로운 기능을 소개합니다.

<br>

- [11장: Next.js 13과 리액트 18](#11장-nextjs-13과-리액트-18)
  - [11.1 app 디렉터리의 등장](#111-app-디렉터리의-등장)
    - [11.1.1 라우팅](#1111-라우팅)
  - [11.2 리액트 서버 컴포넌트](#112-리액트-서버-컴포넌트)
    - [11.2.1 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계](#1121-기존-리액트-컴포넌트와-서버-사이드-렌더링의-한계)
    - [11.2.2 서버 컴포넌트란?](#1122-서버-컴포넌트란)
    - [11.2.3 서버 사이드 렌더링과 서버 컴포넌트의 차이](#1123-서버-사이드-렌더링과-서버-컴포넌트의-차이)
    - [11.2.4 서버 컴포넌트는 어떻게 작동하는가?](#1124-서버-컴포넌트는-어떻게-작동하는가)
  - [11.3 Next.js에서의 리액트 서버 컴포넌트](#113-nextjs에서의-리액트-서버-컴포넌트)
    - [11.3.1 새로운 fetch 도입과 getServerSideProps, getStaticProps, getInitial Props의 삭제](#1131-새로운-fetch-도입과-getserversideprops-getstaticprops-getinitial-props의-삭제)
    - [11.3.2 정적 렌더링과 동적 렌더링](#1132-정적-렌더링과-동적-렌더링)
    - [11.3.3 캐시와 mutating, 그리고 revalidating](#1133-캐시와-mutating-그리고-revalidating)
    - [11.3.4 스트리밍을 활용한 점진적인 페이지 불러오기](#1134-스트리밍을-활용한-점진적인-페이지-불러오기)
  - [11.4 웹팩의 대항마, 터보팩의 등장(beta)](#114-웹팩의-대항마-터보팩의-등장beta)
  - [11.5 서버 액션(alpha)](#115-서버-액션alpha)
    - [11.5.1 form의 action](#1151-form의-action)
    - [11.5.2 input의 submit과 image의 formAction](#1152-input의-submit과-image의-formaction)
    - [11.5.3 startTransition과의 연동](#1153-starttransition과의-연동)
    - [11.5.4 server mutation이 없는 작업](#1154-server-mutation이-없는-작업)
    - [11.5.5 서버 액션 사용 시 주의할 점](#1155-서버-액션-사용-시-주의할-점)
  - [11.6 그 밖의 변화](#116-그-밖의-변화)
  - [11.7 Next.js 13 코드 맛보기](#117-nextjs-13-코드-맛보기)
    - [11.7.1 getServerSideProps와 비슷한 서버 사이드 렌더링 구현해 보기](#1171-getserversideprops와-비슷한-서버-사이드-렌더링-구현해-보기)
    - [11.7.2 getStaticProps와 비슷한 정적인 페이지 렌더링 구현해 보기](#1172-getstaticprops와-비슷한-정적인-페이지-렌더링-구현해-보기)
    - [11.7.3 로딩, 스트리밍, 서스펜스](#1173-로딩-스트리밍-서스펜스)
  - [11.8 정리 및 주의사항](#118-정리-및-주의사항)

<br>

## 11.1 app 디렉터리의 등장

### 11.1.1 라우팅
- 기존 /pages로 정의하던 라우팅 방식이 /app 디렉터리로 이동했다.
- 파일명 라우팅 불가능
- /app/a/b는 /a/b로 변환되며, 파일명은 무시된다. 폴더명까지만 주소로 변환된다.

> layout.js: Next.js 13부터는 app 디렉터리 내부의 폴더명이 라우팅이 되며, 이 폴더에 포함될 수 있는 파일명은 몇 가지로 제한돼 이다. 그중 하나가 layout.js다. 이 파일은 페이지의 기본적인 레이아웃을 구성하는 요소다. 해당 폴더에 layout이 있다면 그 하위 폴더 및 주소에 모두 영향을 미친다.

<br>

## 11.2 리액트 서버 컴포넌트

### 11.2.1 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계
- 자바스크립트 번들 크기가 0인 컴포넌트를 만들 수 없다.
- 백엔드 리소스에 대한 직접적인 접근이 불가능하다.
- 자동 코드 분할이 불가능하다.
- 연쇄적으로 발생하는 클라이언트와 서버의 요청을 대응하기 어렵다.
- 추상화에 드는 비용이 증가한다.



### 11.2.2 서버 컴포넌트란?
- 하나의 언어, 하나의 프레임워크, 그리고 하나의 API와 개념을 사용하면서 서버와 클라이언트 모두에서 컴포넌트를 렌더링할 수 있는 기법


### 11.2.3 서버 사이드 렌더링과 서버 컴포넌트의 차이
>서버사이드 렌더링 : 응답받은 페이지 전체를 HTML로 렌더링하는 과정을 서버에서 수행한 후 그 결과를 클라이언트에 내려준다. 그리고 이후 클라이언트에서 하이드레이션 과정을 거쳐 서버의 결과물을 확인하고 이벤트를 붙이는 등의 작업을 수행한다. 서버 사이드 렌더링의 목적은 초기에 인터랙션은 불가능하지만 정적인 HTML을 빠르게 내려주는데 초점을 두고 있다. 따라서 여전히 초기 HTML이 로딩된 이후에는 클라이언트에서 자바스크립트 코드를 다운로드하고, 파싱하고, 실행하는 데 비용이 든다.

> 서버 컴포넌트: 서버에서 렌더링할 수 있는 컴포넌트는 서버에서 완성해서 제공받는다.

### 11.2.4 서버 컴포넌트는 어떻게 작동하는가?
1. 서버가 렌더링 요청을 받는다. 서버가 렌더링 과정을 수행해야 하므로 리액트 서버 컴포넌트를 사용하는 모든 페이지는 항상 서버에서 시작된다.
2. 서버는 받은 요청에 따라 컴포넌트를 JSON으로 직렬화(serialize)한다. 이때 서버에서 렌더링할 수 있는 것은 직렬화해서 보내주고, 클라이언트 컴포넌트로 표시된 부분은 해당 공간을 플레이스홀더 형식으로 비워두고 나타낸다. 브라우저는 이후에 이 결과물을 받아서 다시 역직렬화한 다음 렌더링을 수행한다.
3. 브라우저가 리액트 컴포넌트 트리를 구성한다. 브라우저가 서버로 스트리밍으로 JSON 결과물을 받았다면 이 구문을 다시 파싱한 결과물을 바탕으로 트리를 재구성해 컴포넌트를 만들어 나간다. M1과 같은 형태의 클라이언트 컴포넌트를 받았다면 클라이언트에서 렌더링을 진행할 것이고, 서버에서 만들어진 결과물을 받았다면 이 정보를 기반으로 리액트 트리를 그대로 만들것이다. 그리고 최종적으로 이 트리를 렌더링해 브라우저의 DOM에 커밋한다.

<br>

## 11.3 Next.js에서의 리액트 서버 컴포넌트

### 11.3.1 새로운 fetch 도입과 getServerSideProps, getStaticProps, getInitial Props의 삭제
- 모든 데이터 요청은 웹 표준 API인 fetch를 기반으로 이뤄진다.


### 11.3.2 정적 렌더링과 동적 렌더링
- Next.js 13에서는 정적인 라우팅에 대해서는 기본적으로 빌드 타임에 렌더링을 미리 해두고 캐싱해 재사용할 수 있게끔 해뒀고, 동적인 라우팅에 대해서는 서버에 매번 요청이 올 때마다 컴포넌트를 렌더링하도록 변경했다.


### 11.3.3 캐시와 mutating, 그리고 revalidating
- revalidate를 통한 캐시와 갱신이 이뤄지는 과정
> 1. 최초로 해당 라우트로 요청이 올 때는 미리 정적으로 캐시해 둔 데이터를 보여준다.
> 2. 이 캐시된 초기 요청은 revalidate에 선언된 값만큼 유지된다.
> 3. 만약 해당 시간이 지나도 일단은 캐시된 데이터를 보여준다.
> 4. Next.js는 캐시된 데이터를 보여주는 한편, 시간이 경과했으므로 백그라운드에서 다시 데이터를 불러온다.
> 5. 4번의 작업이 성공적으로 끝나면 캐시된 데이터를 갱신하고, 그렇지 않다면 과거 데이터를 보여준다.

### 11.3.4 스트리밍을 활용한 점진적인 페이지 불러오기
- 서버사이드 렌더링에서 처럼 하나의 페이지가 다 완성될 때까지 기다리는 것이 아니라 HTML을 작은 단위로 쪼개서 완성되는 대로 클라이언트로 점진적으로 보내는 스트리밍이 도입됐다. 스트리밍을 활용하면 모든 데이터가 로드될 때까지 기다리지 않더라도 먼저 데이터가 로드되는 컴포넌트를 빠르게 보여주는 방법이 가능하다.

<br>

## 11.4 웹팩의 대항마, 터보팩의 등장(beta)

<br>

## 11.5 서버 액션(alpha)
- API를 굳이 생성하지 않더라도 함수 수준에서 서버에 직접 접근해 데이터 요청 등을 수행할 수 있는 기능

### 11.5.1 form의 action
- <form />은 HTML에서 양식을 보낼 때 사용되는 태그로, action props를 추가해서 이 양식 데이터를 처리할 URI를 넘겨줄 수 있다

### 11.5.2 input의 submit과 image의 formAction
- input type="submit" 또는 input type="image"에 formAction prop으로도 서버액션을 추가할 수 있다.

### 11.5.3 startTransition과의 연동
- 서버액션은 useTransition에서 제공하는 startTransition에서도 사용할 수 있따.

### 11.5.4 server mutation이 없는 작업
- server mutation이 필요하다면 반드시 서버 액션을 useTransition과 함께 사용해야 하지만 별도의 server mutation을 실행하지 않는다면 바로 이벤트 핸들러에 넣어도 된다.

### 11.5.5 서버 액션 사용 시 주의할 점
- 서버 액션은 클라이언트 컴포넌트 내에서 정의될 수 없다.
- 서버 액션을 import하는 것뿐만 아니라, props 형태로 서버 액션을 클라이언트 컴포넌트에 넘기는 것 또한 가능하다.

<br>

## 11.6 그 밖의 변화

<br>

## 11.7 Next.js 13 코드 맛보기

### 11.7.1 getServerSideProps와 비슷한 서버 사이드 렌더링 구현해 보기

### 11.7.2 getStaticProps와 비슷한 정적인 페이지 렌더링 구현해 보기

### 11.7.3 로딩, 스트리밍, 서스펜스
- streaming, suspense를 활용해 컴포넌트가 렌더링 중이라는 것을 나타낼 수 있다.
- suspense로 컴포넌트를 감싸 부분적으로 로딩을 보여준다.
- loading이라고 하는 파일 예약어를 통해 로딩 라우팅별로 로딩 상태를 나타낼 수 있다.

<br>

## 11.8 정리 및 주의사항

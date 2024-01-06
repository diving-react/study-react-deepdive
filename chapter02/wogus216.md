# 02장: 리액트 핵심 요소 깊게 살펴보기

책을 읽기 전에 자바스크립트에 대한 기본적인 지식을 다루는 장입니다.
이 장에서는 리액트를 사용하면서 자주 사용하는 자바스크립트 문법과 개념을 간단히 정리합니다.

<br>

- [02장: 리액트 핵심 요소 깊게 살펴보기](#02장-리액트-핵심-요소-깊게-살펴보기)
  - [2.1 JSX란?](#21-jsx란)
    - [2.1.1 JSX의 정의](#211-jsx의-정의)
    - [JSXElement](#jsxelement)
    - [JSXElementName](#jsxelementname)
    - [JSXAttributes](#jsxattributes)
    - [JSXChildren](#jsxchildren)
    - [JSXStrings](#jsxstrings)
    - [2.1.2 JSX 예제](#212-jsx-예제)
    - [2.1.3 JSX는 어떻게 자바스크립트에서 변환될까?](#213-jsx는-어떻게-자바스크립트에서-변환될까)
    - [JSX 코드](#jsx-코드)
    - [플러그인 변환 코드](#플러그인-변환-코드)
    - [리액트 17, 바벨 7.9.0 이후 버전에서 추가된 자동 런타임으로 트랜스한 결과](#리액트-17-바벨-790-이후-버전에서-추가된-자동-런타임으로-트랜스한-결과)
    - [2.1.4 정리](#214-정리)
  - [2.2 가상 DOM과 리액트 파이버](#22-가상-dom과-리액트-파이버)
    - [2.2.1 DOM과 브라우저 렌더링 과정](#221-dom과-브라우저-렌더링-과정)
    - [2.2.2 가상 DOM의 탄생 배경](#222-가상-dom의-탄생-배경)
    - [2.2.3 가상 DOM을 위한 아키텍처, 리액트 파이버](#223-가상-dom을-위한-아키텍처-리액트-파이버)
    - [2.2.4 파이버와 가상 DOM](#224-파이버와-가상-dom)
    - [2.2.5 정리](#225-정리)
  - [2.3 클래스형 컴포넌트와 함수형 컴포넌트](#23-클래스형-컴포넌트와-함수형-컴포넌트)
    - [2.3.1 클래스형 컴포넌트](#231-클래스형-컴포넌트)
    - [2.3.2 함수형 컴포넌트](#232-함수형-컴포넌트)
    - [2.3.3 함수형 컴포넌트 vs. 클래스형 컴포넌트](#233-함수형-컴포넌트-vs-클래스형-컴포넌트)
    - [2.3.4 정리](#234-정리)
  - [2.4 렌더링은 어떻게 일어나는가?](#24-렌더링은-어떻게-일어나는가)
    - [2.4.1 리액트의 렌더링이란?](#241-리액트의-렌더링이란)
    - [2.4.2 리액트의 렌더링이 일어나는 이유](#242-리액트의-렌더링이-일어나는-이유)
    - [2.4.3 리액트의 렌더링 프로세스](#243-리액트의-렌더링-프로세스)
    - [2.4.4 렌더와 커밋](#244-렌더와-커밋)
    - [2.4.5 일반적인 렌더링 시나리오 살펴보기](#245-일반적인-렌더링-시나리오-살펴보기)
    - [2.4.6 정리](#246-정리)
  - [2.5 컴포넌트와 함수의 무거운 연산을 기억해 두는 메모이제이션](#25-컴포넌트와-함수의-무거운-연산을-기억해-두는-메모이제이션)
    - [2.5.1 주장 1: 섣부른 최적화는 독이다, 꼭 필요한 곳에만 메모이제이션을 추가하자](#251-주장-1-섣부른-최적화는-독이다-꼭-필요한-곳에만-메모이제이션을-추가하자)
    - [2.5.2 주장 2: 렌더링 과정의 비용은 비싸다, 모조리 메모이제이션해 버리자](#252-주장-2-렌더링-과정의-비용은-비싸다-모조리-메모이제이션해-버리자)
    - [2.5.3 결론 및 정리](#253-결론-및-정리)

<br>

## 2.1 JSX란?

- 메타에서 소개한 새로운 구문
- XML과 유사한 내장형 구문
  - XML(Extensible Markup Language)은 데이터를 정의하는 규칙을 제공하는 마크업 언어
- 리액트에 종속적이지 않은 독자적 구문
- 트랜스파일러를 거쳐야 자바스크립트 런타임이 이해할 수 있는 자바스크립트 코드로 변환됨

### 2.1.1 JSX의 정의

### JSXElement

JSX를 구성하는 가장 기본요소

- JSXOpeningElement: 이 요소로 시작했다면 JSXClosingElement가 동일한 요소로 같은 단계에서 선언돼 있어야 올바른 JSX 문법으로 간주된다.
  > <JSXElement JSXAttributes(optional)>
- JSXClosingElement: JSXOpeningElement가 종료됐음을 알리는 요소
  > <JSXElement />
- JSXSelfClosingElement: 요소가 시작되고 스스로 종료되는 형태를 의미
  > <JSXElement JSXAttributes(optional) />
- JSXFragment: 아무런 요소가 없는 형태
  > <>JSXChildren(optional) </>

### JSXElementName

JSXElement의 요소 이름으로 쓸 수 있는 것을 의미

- JXSIdentifer: JSX 내부에서 사용할 수 있는 식별자를 의미,JS 식별자 규칙과 동일
  - JS 식별자 규칙: 반드시 글자나 달러 기호( $ ), 밑줄( \_ )로 시작해야 합니다.
    식별자는 글자, 숫자, 달러 기호, 밑줄만 사용할 수 있습니다.
- JXSNamespaceName:JXSIdentifer:JXSIdentifer의 조합, 즉: 을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급된다.
- JSXMemberExpression: JXSIdentifer.JXSIdentifer의 조합 즉. 을 통해 서로 다른 식별자를 이어주는 것도 하나의 식별자로 취급된다. JXSNamespaceName와 다르게 .을 여러 개 이어서 하는 것도 가능

### JSXAttributes

JSXElement에 부여할 수 있는 속성을 의미한다. 단순히 속성을 의미하기 때문에 필수값이 아니고 없어도 에러가 나지 않는다.

- JSXSpreadAttributes: 자바스크립트의 전개연산자와 동일한 역활을 한다고 볼 수 있다.
  > {...AssignmentExpression}
- JSXAttribute: 속성을 나타내는 키와 값으로 짝을 이루어서 표현한다.
  - JSXAttributeName: 속성키의 값
  - JSXAttributeValue: 속성의 키에 할당할 수 있는 값으로

### JSXChildren

JSXElement의 자식 값을 나타낸다. JSX는 속성을 가진 트리구조를 나타내기 위해 만들어졌기 때문에 JSX로 부모와 자식 관계를 나타낼 수 있다.

- JSXChild: JSXChildren을 이루는 기본단위다. JSXChild를 0개 이상 가질 수 있다.
  - JSXText: {,<,>}을 제외한 문자열
- JSXElement: 값으로 다른 JSX요소가 들어갈 수 있다.
- JSXFragment: 값으로 빈 JSX요소인 <></>가 들어갈 수 있다.

### JSXStrings

JSXAttributeValue와 JSXText는 HTML과 JSX 사이에 복사와 붙여넣기를 쉽게 할 수 있도록 설계

> JSX는 HTML처럼 \ 이스케이프 문자열로 처리하고 있지 않다. JS는 let es2 ='\\'로 사용해야함

### 2.1.2 JSX 예제

```
{
  // 하나의 요소로 구성된 가장 단순한 형태
  const ComponentA = <A>안녕하세요</A>

  // 자식이 없이 SelfClosingTag로 닫혀있는 형태도 가능하다.
  const ComponentB = <A />

  // 옵션을 {}와 전개 연산자로 넣을 수 있다.
  const ComponentC = <A {...{required: true}} />

  // 속성만 넣어도 가능하다.
  const ComponentD = <A required />

  // 속성과 속성을 넣어도 가능하다.
  const ComponentE = <A required={false} />

  const ComponentF = (
    <A>
    {/* 문자열은 큰따옴표 및 작은 따옴표 모두 가능하다. */}
    <B text="리액트"/>
    </A>
  )

    const ComponentG = (
    <A>
    {/* 옵션의 값으로 JSXElement를 넣은 것 또한 올바른 문법이다. */}
    <B optionalChildren={<>안녕하세요.</>} />
    </A>
  )


    const ComponentH = (
    <A>
    {/* 여러 개의 자식도 포함 할 수 있다. */}
    안녕하세요
    <B text="리액트" />
    </A>
  )

  }
```

### 2.1.3 JSX는 어떻게 자바스크립트에서 변환될까?

@babel/plugin-transform-react-jsx 플러그인을 알아야 한다.
JSX구문을 자바스크립트가 이해할 수 있는 형태로 변환한다.

### JSX 코드

```
const ComponentA = <A required={true}>Hello World</A>
const ComponentB = <>Hello World</>
const ComponentC =(
  <div>
  <span>hello world</span>
  </div>
)
```

### 플러그인 변환 코드

```
'use strict'
const ComponentA = React.creatElement(
  A,
  {
required={true}
  },
'Hello World'
)

const ComponentB = React.createElement(React.Fragment,null 'Hello World')
const ComponentC =React.createElement(
  'div'
  null,
  React.createElement('span',null,'hello world')
  </div>
)
```

### 리액트 17, 바벨 7.9.0 이후 버전에서 추가된 자동 런타임으로 트랜스한 결과

```
'use strict'

var _jsxRuntime = require('custom-jsx-library/jsx-runtime')

const ComponentA = (0, _jsxRuntime.jsx)(A,{
  required: true,
  children: 'Hello World',
})

const ComponentB = (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment,{children:'Hello world'})
const ComponentC = (0, _jsxRuntime.jsx)('div',{
  children:(0, _jsxRuntime.jsx)('span',{
    children: 'hello world'
  })
})

```

### 2.1.4 정리

JSX는 자바스크립트 코드 내부에 HTML과 같은 트리 구조를 가진 컴포넌트를 표현할 수 있다는 점에서 각광
그러나 JSX가 HTML문법과 자바스크립트 문법이 뒤섞여 코드 가독성을 해친다는 의견도 있음
내부에 자바스크립트 문법이 많아지수록 복잡성이 증대하면서 코드의 가독성을 해치니 주의해서 사용
<br>

## 2.2 가상 DOM과 리액트 파이버

### 2.2.1 DOM과 브라우저 렌더링 과정

### 2.2.2 가상 DOM의 탄생 배경

### 2.2.3 가상 DOM을 위한 아키텍처, 리액트 파이버

### 2.2.4 파이버와 가상 DOM

### 2.2.5 정리

<br>

## 2.3 클래스형 컴포넌트와 함수형 컴포넌트

### 2.3.1 클래스형 컴포넌트

### 2.3.2 함수형 컴포넌트

### 2.3.3 함수형 컴포넌트 vs. 클래스형 컴포넌트

### 2.3.4 정리

<br>

## 2.4 렌더링은 어떻게 일어나는가?

### 2.4.1 리액트의 렌더링이란?

### 2.4.2 리액트의 렌더링이 일어나는 이유

### 2.4.3 리액트의 렌더링 프로세스

### 2.4.4 렌더와 커밋

### 2.4.5 일반적인 렌더링 시나리오 살펴보기

### 2.4.6 정리

<br>

## 2.5 컴포넌트와 함수의 무거운 연산을 기억해 두는 메모이제이션

### 2.5.1 주장 1: 섣부른 최적화는 독이다, 꼭 필요한 곳에만 메모이제이션을 추가하자

### 2.5.2 주장 2: 렌더링 과정의 비용은 비싸다, 모조리 메모이제이션해 버리자

### 2.5.3 결론 및 정리

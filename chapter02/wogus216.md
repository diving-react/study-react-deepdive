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
      - [리액트 파이버란](#리액트-파이버란)
      - [리액트 파이버 트리](#리액트-파이버-트리)
      - [파이버 작업 순서](#파이버-작업-순서)
    - [2.2.4 파이버와 가상 DOM](#224-파이버와-가상-dom)
    - [2.2.5 정리](#225-정리)
  - [2.3 클래스형 컴포넌트와 함수형 컴포넌트](#23-클래스형-컴포넌트와-함수형-컴포넌트)
    - [2.3.1 클래스형 컴포넌트](#231-클래스형-컴포넌트)
      - [클래스형 컴포넌트 생명주기 메서드](#클래스형-컴포넌트-생명주기-메서드)
        - [render()](#render)
        - [componentDidMount()](#componentdidmount)
        - [componentDidUpdate()](#componentdidupdate)
        - [componentWillUnmount()](#componentwillunmount)
        - [shouldComponentUpdate()](#shouldcomponentupdate)
      - [static getDerivedStateFromProps()](#static-getderivedstatefromprops)
        - [getSnapShotBeforeUpdate()](#getsnapshotbeforeupdate)
        - [getDerivedStateFromError()](#getderivedstatefromerror)
        - [componentDidcatch](#componentdidcatch)
      - [클래스형 컴포넌트의 한계](#클래스형-컴포넌트의-한계)
    - [2.3.2 함수형 컴포넌트](#232-함수형-컴포넌트)
    - [2.3.3 함수형 컴포넌트 vs. 클래스형 컴포넌트](#233-함수형-컴포넌트-vs-클래스형-컴포넌트)
        - [생명주기 메서드의 부재](#생명주기-메서드의-부재)
        - [함수형 컴포넌트와 렌더링된 값](#함수형-컴포넌트와-렌더링된-값)
    - [2.3.4 정리](#234-정리)
  - [2.4 렌더링은 어떻게 일어나는가?](#24-렌더링은-어떻게-일어나는가)
    - [2.4.1 리액트의 렌더링이란?](#241-리액트의-렌더링이란)
    - [2.4.2 리액트의 렌더링이 일어나는 이유](#242-리액트의-렌더링이-일어나는-이유)
    - [2.4.3 리액트의 렌더링 프로세스](#243-리액트의-렌더링-프로세스)
    - [2.4.4 렌더와 커밋](#244-렌더와-커밋)
      - [렌더](#렌더)
      - [커밋](#커밋)
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

리액트는 실제 DOM(Document Object Model)이 아닌 가상DOM을 운영한다는 것

### 2.2.1 DOM과 브라우저 렌더링 과정

먼저 DOM은 웹페이지에 대한 인터페이스로 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고있다.

브라우저 웹사이트 접근 요청을 받고 화면을 그리는 과정

1. 브라우저가 사용자가 요청한 주소를 방문해 HTML 파일을 다운로드한다.
2. 브라우저의 렌더링 엔진은 HTML을 파싱해 DOM 노드로 구성된 트리를 만든다.
3. 2번 과정에서 CSS파일을 만나면 해당 CSS파일도 다운로드 한다.
4. 브라우저의 렌터링 엔진은 이 CSS도 파싱해 CSS 노드로 구성된 트리(CSSOM)를 만든다.
5. 5번에서 제외된, 눈에 보이는 노드를 대상으로 해당 노드에 대한 CSSOM 정보를 찾고 여기서 발견한 CSS 스타일 정보를 이 노드에 적용한다. 이 DOM노드에 CSS를 적용하는 과정은 크게 두 가지로 나눌 수 있다.

- 레이아웃: 각 노드가 브라우저 화면의 어느 좌표에 정확히 나타나야 하는지 계산 과정, 이 과정을 거치면 반드신 페인팅 과정도 거침
- 페인팅: 레이아웃 단계를 거친 노드에 색과 같은 실제 유효한 모습을 그리는 과정

### 2.2.2 가상 DOM의 탄생 배경

웹페이지를 렌더링하는 과정은 매우 복잡하고 많은 비용이든다.
먼저 특정한 요소의 색상이 변화되는 경우 이때 페인팅만 일어나므로 비교적 빠르게 처리가능
어떤 특정요소의 노출여부나 사이즈 변경되는 경우 레이아웃이 일어나고 레이아웃은 필연적으로 리페인팅이 발생하기 때문에 더 많은 비용이 든다.
DOM 변경이 일어나는 요소가 많은 자식 요소를 가지고 있는 경우에는 하위 자식 요소도 덩달아 변경돼야 하기에 더 많은 비용을 브라우저가 지불
이러한 렌더링 이후 추가 렌더링 작업은 하나의 페이지에서 모든 작업이 일어나는 SPA에서 더욱 많아진다.
그만큼 DOM을 관리하는 과정에서 부담해야 할 비용이 커졌다.
사용자의 인터랙션에 따라 DOM의 모든 변경 사항을 추적하는 것은 개발자 입장에 너무나 수고스러운 일이다.
개발자는 인터랙션의 모든 DOM의 변경보다는 결과적으로 만들어지는 DOM 결과물 하나만 알고 싶을 것
이러한 문제점을 해결하기 위해 탄생한 것이 가상 DOM

가상 DOM은 말 그대로 실제 브라우저의 DOM이 아닌 리액트가 관리하는 가상 DOM을 의미한다.
가상 DOM에 대하 가지고 있는 일반적인 오해는 브라우저의 일반적인 DOM을 관리하는 브라우저보다 빠르다는 사실이다.
무조건 빠른 것이 아니라 리액트 이 가상 DOM 방식은 대부분의 상황에서 웸만한 애플리케이션을 만들 수 있을 정도로 충분히 빠르다는 것이다.

### 2.2.3 가상 DOM을 위한 아키텍처, 리액트 파이버

가상 DOM과 렌터링 과정 최적화를 가능하게 해주는 것이 **리액트 파이어(React Fiber)**

#### 리액트 파이버란

리액트에서 관리하는 평범한 자바스크립트 객체다.
파이버는 **파이버 재조정자**가 관리하는데 가상 DOM 실제 DOM을 비교해 변경 사항을 수집하며, 둘 사이에 차이가 있으면 파이버를 기준으로 화면에 렌더링을 요청하는 역활

리액트 파이버의 목표는 리액트 웹 애플리케이션에서 발생하는 애니메이션,레이아웃 그리고 사용자 인터랙션에 올바른 결과물을 만드는 반응성 문제를 해결하는 것이다.
그리고 모든과정은 비동기로 일어난다.

과거 리액트 조정 알고리즘은 스택 알고리즘 하나의 스택에 렌더링에 필요한 작업들이 쌓이면 이 스택이 빌 때까지 동기적으로 작업이 이루어짐
자바스크립크의 특징인 싱글 스레드라는 점으로 인해 동기 작업은 중단 될 수 없고, 다른 작업이 수행되고 싶어도 중단 할 수 없었으며 결국 이는 리액트 비효율성으로 이어짐
기존 렌터링 스택의 비효율성을 타파하기 위해 리액트 팀은 스택 조정자 대신 파이버라는 개념을 탄생시켰다.

파이버는 리액트 요소와 유사하다고 느낄 수 있지만 한 가지 중요한 차이점은 리액트 요소는 렌더링이 발생할 때 마다 새롭게 생성되지만 파이버는 컴포넌트가 최초로 마운트되는 시점에 생성되어 이후에는 가급적이면 재사용됨

생성된 파이버는 state가 변경되거나 생명주기 메서드가 실행되거 DOM의 변경이 필요한 시점등에 실행
그리고 중요한 것은 리액트가 파이버를 처리할 때마다 이러한 작업을 직접 바로 처리하기도 하고 스케줄링하기도 한다는 것

리액트 개발팀은 사실 리액트는 가상 DOM이 아닌 Value UI, 즉 값을 가지고 있는 UI를 관리하는 라이브러리라는 내용을 피력한바 있다. 파이버의 객체 값에서 알 수 있듯이 리액트의 핵심 원칙은 UI를 문자열,숫자,배열 같은 값으로 관리한다는 것이다.

#### 리액트 파이버 트리

파이버 트리는 리액트 내부에 두 개가 존재

- 현재 모습을 담은 파이버 트리
- 작업 중인 상태를 나타내는 workInProgress

리액트 파이버의 작업이 긑나면 리액트 단순히 포인터만 변경해 workInProgres트리를 현재 트리로 바꿔버린다.
이러한 기술을 더블 버퍼렁

> 더블 버퍼링 : 컴퓨터 그래픽 분야에서 사용, 사용자에게 다 그리지 못한 모습을 방지하기 위해 보이지 않는 곳에서 그다음으로 그려야할 그림을 미리 그린 다음, 이것이 완성되면 현재 상태를 새로운 그림으로 바꾸는 기법을 의미

순서

1. 현재 UI 렌더링을 위해 존재하는 트리인 current를 기준으로 모든 작업이 시작
2. 업데이트가 발생하면 파이버는 리액트에서 새로 받은 데이터로 새로운 workInProgress 트리 빌드 시작
3. workInProgress 트리 빌드 작업이 끝나면 다음 렌더링에 이 트리를 사용
4. workInProgress 트리가 UI에 최종적으로 렌더링되어 반영이 완료되면 current가 이 workInProgress로 변경된다.

#### 파이버 작업 순서

```

<A1>
  <B1>안녕하세요.</B1>
   <B2>
      <C1>
         <D1/>
         <D2/>
      </C1>
</B2>
<B3/>
</A1>
```

1. A1의 beginWork()가 수행된다.
2. A1은 자식이 있으므로 B1로 이동해 beginWork()를 수행한다.
3. B1은 자식이 없으므로 completeWork()가 수행됐다. 자식은 없으므로 형제인 B2로 넘어간다.
4. B2의 beginwork()가 수행된다. 자식이 있으므로 C1로 이동한다.
5. C1의 beginwork()가 수행된다. 자식이 있으므로 D1로 이동한다.
6. D1의 beginwork()가 수행된다.
7. D1은 자식이 없으므로 completeWork()가 수행됐다. 형제인 D2로 넘어감
8. D2는 자식이 없으므로 completeWokr()가 수행됐다.
9. D2는 자식도 더 이상의 형제도 없으므로 위로 이동해 D1,C1,B2 순으로 completeWork()를 호출
10. B2는 형제인 B3으로 이동해 beginWork()를 수행한다.
11. B3의 completeWork()가 수행되면 반환해 상위로 타고 올라간다.
12. A1의 completeWork()가 수행된다.
13. 루트 노드가 완성되는 순간, 최종적으로 commitWork()가 수행되고 이 중에 변경 사항을 비교해 업데이트가 필요한 변경사항이 DOM에 반영된다.

여기서 setState 등으로 업데이트가 발생하면 이미 리액트는 앞서 만든 current 트리가 존재하고 setState로 인한 업데이트 요청을 받아 workInProgree 트리를 다시 빌드하기 시작한다.
최초 렌더링 시에는 모든 파이버를 새롭게 만들어야 했지만 이제는 파이버가 이미 존재해 되도록 생성하지않고 기존 파이버에서 업데이트된 props를 받아 파이버 내부에서 처리한다.
앞서 언급한 "가급적 새로운 파이버를 생성하지 않는다"가 바로 이것이다.

그리고 과거 동기식으로 처리했다느 작업이 바로 이작업이다. 트리 업데이트 과정,재귀적으로 하나의 트리를 순회해 새로운 트리를 만드는 작업은 동기식이고 중단될 수 없었다. 그러나 현재 리액트는 이러한 작업을 파이버 단위로 나눠서 수행한다.

### 2.2.4 파이버와 가상 DOM

리액트 컴포넌트에 대한 정보를 1:1로 가지고 있는 것이 파이버이며, 파이버는 리액트 아키텍처 내부에서 비동기로 이뤄진다.
실제 브라우저에 반영하는 것은 동기적으로 일어나야하고 즉 메모리상에서 먼저 수행해서 최종적인 결과물만 실제 브라우저 DOM에 적용하는 것이다.

가상 DOM은 오직 웹 애플리케이션에서만 통용되는 개념이니 명심할 것

### 2.2.5 정리

가상 DOM이뭔지 또 구현 하기위해 만들어진 리액트 파이버의 개념과 이를 조정하는 재조정자
가상 DOM과 파이버는 단순히 브라우저에 DOM을 변경하는 작업보다 빠르다는 이유로 만들어 진것이 아니다.
DOM을 수동으로 하나하나 변경해야 한다면 어떤 값이 바뀌었는지, 또 그 값에 따라 어떠한 값이 변경됐고 관련된 것들을 파악하기 매우 어렵다.
이 어려움을 리액트 내부의 파이버와 재조정자가 내부적인 알고리즘을 통해 관리해줌으로 효율적인 유지보수와 관리를 할수 있다.

가상 DOM과 리액트의 핵심은 브라우저의 DOM을 더욱 빠르게 그리고 반영하는 것이 아니라 바로 값으로 UI을 표현하는 것 화면에 표시되는 UI를 자바스크립트의 문자열,배열 등과 마찬가지로 값으로 관리하고 이러한 흐름을 효율적으로 관리하기 위한 메커니즘이 바로 리액트의 핵심

<br>

## 2.3 클래스형 컴포넌트와 함수형 컴포넌트

함수형 컴포넌트는 리액트 0.14부터 만들어진 생각보다 오래된 선언방식이다.
0.14 버전에서는 별도의 상태없이 어떠한 요소를 정적으로 렌더링 하는 목적
함수형 컴포넌트가 각광받기 시작한 것은 16.8에서 훅이 소개된 이후였다.

### 2.3.1 클래스형 컴포넌트

클래스형 컴포넌트를 만들려면 클래스를 선언하고 extends로 만들고 싶은 컴포넌트를 extends해야한다.
넣을 수 있는 클래스

- React.Component
- React.PureComponent

```
// props 타입을 선언한다.
interface SampleProps{
  required: boolean
  text: string
}

// state 타입을 선언한다.
interface SampleState {
  counter: number
  isLimited:boolean
}

// Component에 제네릭으로 Props,state를 순서대로 넣어준다.
class SampleComponent extends React.Component<SampleProps,SampleState>{
  // constructor에서 props를 넘겨주고,state의 기본 값을 설정한다.
  private constructor에서(props:SampleProps) {
    super(props)
    this.state = {
      count:0,
      isLimited:fasle,
    }
  }

  // render 내부에서 쓰일 함수를 선언한다.
  private handleClick =()=>{
    const newValue = this.state.count +1
    this.setState({count:newValue,isLimited: newValue >=10})
  }

  // render에서 이 컴포넌트가 렌더링할 내용을 정의한다.
  public render(){
    // props 와 state 값을 this, 즉 해당 클래스에서 꺼낸다ㅣ.
    const {
      props: {required,text},
      state: {count, isLimited}
    } = this

    return(
      <h2>
      Sample Component
      <div>{required? '필수' : '필수아님'}</div>
      <div>문자 : {text}</div>
      <div>count: {count}</div>
      <button>onClick={this.handleClick} disabled={isLimited}>증가</button>
      </h2>
    )
  }
}
```

- constructor: 컴포넌트 내부에 생성자 함수가 있다면 컴포넌트가 초기화되는 시점에 호출된다. 여기서 state초기화 할수 있다. 여기에 선언되 super()는 생성자를 함수를 먼저 호출해 상위 컴포넌트에 접근 할 수 있게 해준다.
- props: 함수에 인수를 넣은 것과 비슷하게 컴포넌트에 특정 속성을 전달하는 용도로 쓰인다.
- state: 클래스형 컴포넌트 내부에서 관리하는 값. 이 값은 항상 객체여야만한다. 값에 변화가 있다면 리렌더링 발생
- 메서드: 렌더링 함수 내부에서 사용되는 함수 보통 DOM에서 발생하는 이벤트와 함께 사용

  - constructor에서 this 바인드를 하는 방법 :일반함수로 메서드를 만들면 this가 undefined로 나오는 현상을 겪는다. 이유는 생성자가 아닌 일반 함수로 호출 시 this에 전역 객체가 바인딩되기 때문이다.
    따라서 생성된 함수에 bind를 활용해 강제로 this를 바인딩해야한다.

  ```
  //빈 Props 선언
  type Props =Record<string,never>

  interface State{
    count:number
  }

  class SampleComponet extends Component<Props,State>{
    private constuctor(props:Props){
      super(props)
      this.state = {count:1}
    }
    // handleClick의 this를 현재 클래스로 바인딩한다.
    this.handleClick = this.handleClick.bind(this)
  }

  private handleClick(){
    this.setState((prev)=> ({count:prev.count +1}))
  }

  public render(){
    const {
      state: {count},
    }=this
    return(
      <div>
      <button onClick={this.handleClick}>증가</button>
      {count}</div>
    )
  }
  ```

  - 화살표 함수를 쓰는 방법: 앞선 예제처럼 실행 시점이 아닌 작성 시점에 this가 상위 스코프로 결정되는 화살표함수를 사용한다면 굳이 바인딩하지 않더라도 사용할 수 있다.
  - 렌더링 함수 내부에서 함수를 새롭게 만들어 전달하는 방법: <button onClick={()=>this.handleClick()}>증가</button>

  그러나 이방법을 사용하게 되면 매번 렌더링 발생 최적화가 어려움

  #### 클래스형 컴포넌트 생명주기 메서드

  클래스형 컴포넌트에서 자주 언급되는 것이 생명주기

  먼저 생명주기 메서드가 실행되는 시점은 크게 3가지

  - 마운트(mount): 컴포넌트가 마운팅(생성)되는 시점
  - 업데이트(update): 이미 생성된 컴포넌트의 내용이 변경(업데이트)되는 시점
  - 언마운트(unmount): 컴포넌트가 더 이상 존재하지 않는 시점

##### render()

생명주기 메서드 중 하나로 리액트 클래스형 컴포넌트의 유일한 필수값으로 항상 쓰인다.
컴포넌트가 UI를 렌더링하기 위해서 쓰인다.
한가지 주의할점은 render() 함수는 항상 순수해야 하며 부수 효과가 없어야 한다는 것이다.
따라서 render() 내부에서 state를 직접 업데이트하는 this.setState를 호출해서는 안 된다. state를 변경하는 일은 클래스형 컴포넌트의 메서드나 다른 생명주기 메서드 내부에서 발생해야 한다.

##### componentDidMount()

클래스형 컴포넌트가 마운트되고 준비가 됐다면 다음으로 호출되는 생명주기 메서드
이함수는 컴포넌트가 마운트 되고 준비되느 즉시 실행
render()와는 다르게 함수내부에서 this.setState()로 state값을 변경하는 것이 가능
변경되면 그즉시 다시 한번 렌더링을 시도하는데, 이 작업은 브라우저 실제로 UI를 업데이트 하기전에 변경됨

일반적으로 state를 변경하는 것 생성자에서 하는 것이 좋다.
허용하는 이유는 생성자 함수에서 할 수 없는 것 API호출 후 업데이트 등을 하기 위해 있다.

##### componentDidUpdate()

컴포넌트 업데이트가 일어난 이후 바로 실행된다. 일반적으로 state나 Props의 변화에 따라 DOM을 업데이트하는 등에 쓰인다.
여기서도 this.setState 사용하는하나 조건문으로 감싸지 않는다면 계속해서 호출되는 일 발생

##### componentWillUnmount()

컴포넌트가 언마운트가 되거나 더이상 사용되지 않을 때 호출
메모리 누수나 불필요한 작동을 막기위한 클린업 함수를 호출하기 위한 최적의 위치

##### shouldComponentUpdate()

state나 Props의 변경으로 리액트 검포넌트가 다시 리렌더링되는 것을 막고 싶다면 이 생명주기 메서드를 사용하면 된다.
state 변화에 따라 리렌더링 되는 것은 굉장히 자연스러운 일이므로 특정한 성능 최적화 상황에서만 고려해야함

---

앞서 클래스형 컴포넌트는 두가지 유형 Component와 PureComponent가 있다고 나왔다.
둘으 차이점은 바로 이 생명주기를 다루는 데 있다.
두 컴포넌트 모두 버튼을 클릭하면 count를 1씩 올려주지만 정작 해당 값은 사용하지 않는다.

```
interface State{
  count:number
}
type Props = Record<string,never>

export class ReactComponent extends React.Component<Props,State>{
  private renderCounter = 0

  private constructor(props:Props){
    super(props)
    this.state = {
      count: 1,
    }
  }

  private handleClick = ()=>{
    this.setState({count:1})
  }
}

public render(){
  console.log('ReactComponent', ++this.renderCounter)//

return(
  <h1>
  ReactComponent: {this.state.count}{''}
  <button onClick={this.handleClick}>+</button>
  </h1>
)
}


export class ReactPureComponent extends React.PureComponent<Props,State>{
  private renderCounter = 0

  private constructor(props: Props){
    super(props)
    this.state = {
      count: 1
    }
  }

  private handleClick = ()=>{
    this.setState({count:1})
  }

  public render(){
    console.log('ReactPureComponent',++this.renderCounter)

    return(
      <h1>
      ReactPureComponent:{this.state.count}{''}
      <button onClick={this.handleClick}>+</button>
    </h1>
    )
  }
}

```

Component의 경우 버튼을 누르는 대로, 즉시 업데이트가 되는 대로 렌더링이 발생
Pure는 State값이 업데이트 되지 않아서 렌더링이 일어나지 않았다.
Pure는 state 값에 대해 얕은 비교를 수행해 결과가 다를 때만 렌더링을 수행한다.

> 얕은 비교,깊은 비교 ???/질문

그래서 state가 객체와 같이 복작한 구조의 데이터 변경은 감지 하지 못하기 때문에 제대로 동작하지 않는다.

#### static getDerivedStateFromProps()

가장 최근에 도입된 생명주기 메서드 중 하나, 이전에 존재했으나 이제는 사라진 componentWillReceiveProps를 대체할 수 있는 메서드다. render()를 호출하기 직전에 호출
명심할 점은 모든 render() 실행 시에 호출된다는 점

##### getSnapShotBeforeUpdate()

componentWillUpdate()를 대체할 수 있는 메서드다.
이는 DOM이 업데이트 되기 직전에 호출된다. 여기서 반환되는 값은 componentDidUpdate로 전달된다.

##### getDerivedStateFromError()

이메서드와 뒤이어 소개할 메서드 componentDidCatch 메서드는 에러상황에서 실행되는 메서드다.
또한 이 두메서드와 앞서 소개한 getSnapShotBeforeUpdate는 훅으로 구현돼 있지 않아 필요하다면 클래스 컴포넌트를 사용해야한다.
getDerivedStateFromError 자식 컴포넌트에서 에러가 발생했을 때 호출되는 에러 메서드다.

##### componentDidcatch

자식 컴포넌트에서 에러가 발생했을 때 실행되며,
getDerivedStateFromError에서 에러를 잡고 state를 결정한 이후에 실행된다.
componentDidcatch 두개의 인수를 받는데, 첫번째는 getDerivedStateFromError에서와 동일한 error,
그리고 정확히 어떤 컴포넌트가 에러를 발생 시켰는 지 정보를 가지고 있는 Info다.
리액트에서 에러 발생 시 이 메서드에서 제공하는 에러 정보를 바탕으로 로깅하는 등의 용도로 사용 가능함

#### 클래스형 컴포넌트의 한계

- 데이터 흐름을 추적하기 어렵다: state의 흘므울 추적하기가 매우 어렵다.
  코드작성 시 메서드의 순서가 강제돼 있는 것이 아니기 때문에 사람이 읽기 매우 어렵다.
- 내부 로직의 재사용이 어렵다.: 컴포넌트간에 중복되는 로직이 있고 이를 재사용하고 싶다고 가정하면
  컴포넌트를 또 다른 고차 컴포넌트로 감싸거나,props로 넘겨주는 방식이 있을 것이다. 그러나 모두 심각한 단점이 존재함 공통로직이 많이 질수록 이를 감싸는 고차 컴포넌트 내지는 props가 많아지는 래퍼지옥에 빠져들 위험성이 ㅋ큼

- 기능이 많아질수록 컴포넌트 크기가 커진다.: 내부에 로직이 많아질수록 내부에서 처리하는 데이터흐름이 복잡해져 생명주기 메서드 사용이 잦아지는 경우 크기가 기하급수적으로 커짐
- 클래스는 함수에 비해 상대적으로 어렵다.
- 코드 크기를 최적화하기 어렵다.: 최종 결과물 번들 크기를 줄이는데도 어려움을 겪는다.
- 핫 리로딩을 하는데 상대적을 불리하다.
  - 핫로딩(hot reloading)이란 코드에 변경 사항이 발생했을 때 앱을 다시 시작하지 않고서도 해당 변경된 코드만 업데이트해 변경 사항을 빠르게 적용하는 기법

### 2.3.2 함수형 컴포넌트

16.8에서 함수형 컴포넌트에서 사용 가능 한 훅이 등장함녀서 각광받기 시작
클래스형과 비교했을 때 render 내부에서 필요한 함수를 선언할 때 this바인을 조심하 필요도 없으며 state는 객체가 아닌 각각의 원시값으로 관리되어 사용하기 편함

### 2.3.3 함수형 컴포넌트 vs. 클래스형 컴포넌트

##### 생명주기 메서드의 부재

클래스형 생명주기 메서드가 함수형에는 존재하지 않음
함수형 컴포넌트는 props를 받아 단순히 리액트 요소를 반환하는 함수인 반면,클래스형은 render메서드가 있는 React.Component를 상속 받아 구현하는 자바스크립트 클래스이기 때문이다.

##### 함수형 컴포넌트와 렌더링된 값

함수형 컴포넌트는 렌더링이 일어날 때마다 그 순간의 값인 props와 State를 기준으로 렌더링된다. props와 state가 변경된다면, 다시 한 번 그값을 기준을 함수가 호출된다. 반면 클래스형 컴포넌트는 시간의 흐름에 따라 변화하는 this를 기준으로 렌더링이 일어난다.

### 2.3.4 정리

숙련된 리액트 개발자가 되려면 그동안 리액트가 어떠한 고민을 통해 발전했는지 이해할 필요가 있다.

<br>

## 2.4 렌더링은 어떻게 일어나는가?

렌더링이란 HTML과 CSS 리소스를 기반으로 웹페이지에 필요한 UI를 그리고 과정이다.
리액트 렌더링은 브라우저가 렌더링에 필요한 DOM 트리를 만드는 과정
리액트의 렌더링은 시간과 리소스를 소비해 수행되는 과정

### 2.4.1 리액트의 렌더링이란?

렌더링은 브라우저에서도 혼용되는 용어이므로 두 가지를 혼동해서는 안된다.
리액트에서는 리액트 안에서 모든 컴포넌트들이 현재 자신들이 가지고 있는 props와 state의 값을 기반으로 어떻게 UI를 구성하고 어떤 DOM 결과를 브라우저에게 제공할 것 인지 계산하는 일련의 과정

### 2.4.2 리액트의 렌더링이 일어나는 이유

1. 최초 렌더링
2. 리렌더링: 최소 렌더링이 발생한 이후로 발생하는 모든 렌더링을 의미


    리렌더링 발생하는 경우는 다음과 같다.
    * 클래스형  setState가 실행되는 경우: state의 변화는 컴포넌트 상태의 변화를 의미
    * 클래스형 forceUpdate가 실행되는 경우
    * 함수형 useState 두 번째 배열요소 setter가 실행되는 경우
    * 함수형 useReducer 두 번째 배열요소 dispatch가 실행되는 경우: useReducer도 useState와 마찬가지로 상태를 업데이트 함수를 배열로 제공
    * 컴포넌트의 key props가 변경되는 경우: 리액트에서 Key는 리렌더링이 발생하는 동안 형제요소들 사이에서 동일한 요소를 식별하는 값.
    * props가 변경되는 경우: 부모로 전달 받는 값이 props가 달라지면 자식 컴포넌트 변경이 필요
    * 부모 컴포넌트가 렌더링될 경우

### 2.4.3 리액트의 렌더링 프로세스

리액트의 새로운 트리인 가상 DOM과 비교해 실제DOM에 반영하기 위한 모든 변경 사항을 차례차례 수집한다.
계산 과정을 리액트 재조정이라고 한다.
재조정 과정이 모두 끝나면 모든 변경 사항을 하나의 동기 시퀀스로 DOM에 적용해 변경된 결과물이 보이게 된다.
여기서 한가지 주목할 점은 리액트의 렌더링은 **렌더 단계와 커밋 단계라는 총 두 단계로 분리**되어 실행된다는 것

### 2.4.4 렌더와 커밋

#### 렌더

컴포넌트를 렌더링하고 변경 사항을 계산하는 모든 작업 즉, 변경이 필요한 컴포넌트를 체크하는 단계
비교하는 것은 크게 세가지(type,props,key) 중 하나라도 변경된 것이 있으면 변경이 필요한 컴포넌트로 체크

#### 커밋

렌더 단계의 변경 사항을 실제 DOM에 적용해 사용자에게 보여주는 과정
이단계가 끝나야 비로소 브라우저의 렌더링이 발생

여기서 알 수 있는 중요한 사실은 리액트의 렌더링이 일어난다고 해서 무조건 DOM 업데이트가 일어나는 것 아니라는 것이다.
즉 변경사항을 계산했는데 아무런 변경사항이 감지되지 않는다면 커밋단계는 생략될 수 있다.
이 두가지 과정을 이뤄진 리액트 렌더링은 항상 동기식으로 진행됐다.
그럼에도 이러한 비동기 렌더링 시나리오도 몇가지 상황에 유효 할 수 있다.

### 2.4.5 일반적인 렌더링 시나리오 살펴보기

컴포넌트는 렌더링하는 작업은 별도로 렌더링을 피하기 위한 조치가 돼 있는 않는 한 하위 모든 컴포넌트에 영향을 미친다.

상위 컴포넌트, 특히 루트에서 무언가 렌더링을 발생시키는 작업이 일어난다는 것은 하위 모든 컴포넌트의 리렌더링을 트리거 한다는 뜻이다.

### 2.4.6 정리

<br>

## 2.5 컴포넌트와 함수의 무거운 연산을 기억해 두는 메모이제이션

useMemo, useCallback 훅과 고차 컴포넌트인 memo는 리액트에서 발생하는 렌더링을 최소한으로 줄이기 위해서 제공된다.
정확히 언제 사용하는지 대해서는 정확히 명확하게 답변하기 어렵다.
메모제이션 최적화는 리액트 커뮤니티에서 오랜 논쟁중 하나

### 2.5.1 주장 1: 섣부른 최적화는 독이다, 꼭 필요한 곳에만 메모이제이션을 추가하자

메모이제이션은 어디까지나 비용이 드느 작업이므로 최적화에 대한 비용을 지불 할 때는 항상 신중해야 한다고 주장한다.
메모이제이션은 모든것을 해결하는 마법이 아니다. 마찬가지로 비용이 든다.

- 값을 비교하고 렌더링 도는 재계산이 필요한지 확인하는 적업
- 이전에 결과물을 저장해 두었다가 다시 꺼내와야 한다는 두가지 비용

과연 이 비용이 리렌더링 비용보다 저렴하다고 할 수 있을까?? 그것은 상황에 따라 다르다.
항상 메모이제이션은 신중하게 접근해야 하며 섣부른 최적화는 항상 경계해야 한다.

일단 애플리케이션을 어느정도 만든 이후에 개발자 도구나 useEffect를 사용해 실제로 어떻게 렌더링이 일어나느지 확인하고 필요한 곳에서만 최적화하는 것이 옳다.

### 2.5.2 주장 2: 렌더링 과정의 비용은 비싸다, 모조리 메모이제이션해 버리자

memo나 다른 메모제이션 방법을 사용하는 것이 이점이 있을 때가 분명히 있다.
두가지 선택권

- memo를 컴포넌트의 사용에 따라 잘 살펴보고 일부에만 적용하는 방법
- memo를 일단 그냥 다 적용하는 방법

잘못된 memo로 지불해야 하는 비용을 바로 props에 대한 얕은 비교가 발생하면서 지불해야 하는 비용이다.
메모제이션을 위해서는 cpu와 메모리를 사용해 이전 렌더링 결과물을 저장해 둬야하고 이전 결과물을 사용해야한다.
리액트는 이전 렌더링결과를 다음 렌더링과 구별하기 위해 저장해 둬야한다.
즉 어차피 리액트의 기본 알고리즘 때문에 이전 결과물은 어떻게든 저장해 두고 있다.
따라서 우리가 memo로 지불해야 하는 비용은 props에 대한 얕은 비교뿐인 것이다.

반면 memo를 하지 않았을 때 발생하는 문제

- 렌더링을 함으로써 발생하는 비용
- 컴포넌트 내부의 복잡한 로직의 재실행
- 위 두가지 모두가 모든 자식 컴포넌트에서 반복해서 일어남
- 리액트가 구 트리와 신규 트리를 비교

얼핏 봐도 memo를 하지 않았을 때 치러야할 잠재적인 위험비용이 더 커보인다.

### 2.5.3 결론 및 정리

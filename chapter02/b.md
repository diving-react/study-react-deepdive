# 02장: 리액트 핵심 요소 깊게 살펴보기

리액트를 이루는 핵심 요소들을 깊게 살펴보고, 리액트의 렌더링 과정을 이해하는 장입니다.

<br>

- [02장: 리액트 핵심 요소 깊게 살펴보기](#02장-리액트-핵심-요소-깊게-살펴보기)
  - [2.1 JSX란?](#21-jsx란)
    - [2.1.1 JSX의 정의](#211-jsx의-정의)
    - [2.1.2 JSX 예제](#212-jsx-예제)
    - [2.1.3 JSX는 어떻게 자바스크립트에서 변환될까?](#213-jsx는-어떻게-자바스크립트에서-변환될까)
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
  - [References](#references)
  - [Articles](#articles)

<br>

## 2.1 JSX란?

- JSX는 리액트(React)에서 사용되는 독자적인 문법으로, JavaScript XML의 약자입니다.
- JSX는 XML과 유사한 내장형 구문을 가지고 있어서 HTML과 비슷한 형태로 JavaScript 코드 안에 마크업을 작성할 수 있습니다. 그러나 JSX는 자바스크립트 표준 문법이 아니며, 자바스크립트 엔진에서 바로 실행되지 않습니다. 대신, JSX는 바벨과 같은 트랜스파일러를 통해 일반 자바스크립트 형태의 코드로 변환되어 실행됩니다.
- JSX의 설계 목적은 다양한 트랜스파일러에서 다양한 속성을 가진 트리 구조를 토큰화해 ECMAScript로 변환하는 것입니다.

```jsx
// JSX 문법 예제
import React from "react";

function App() {
  const name = "B";
  const isLoggedIn = true;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      {isLoggedIn ? <p>Welcome!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default App;
```

### 2.1.1 JSX의 정의

- JSX는 4가지 컴포넌트를 기반으로 구성: JSXElement, JSXAttributes, JSXChildren, JSXStrings

  - JSXElement

    - JSXElement는 JSX를 사용할 때 만나게 되는 기본적인 구성 요소
    - JSXOpeningElement, JSXClosingElement, JSXSelfClosingElement, JSXFragment로 구성
    - 상세:
      - JSXOpeningElement: `<div>`와 같이 열린 태그
      - JSXClosingElement: `</div>`와 같이 닫힌 태그
      - JSXSelfClosingElement: `<img />`와 같이 self-closing 태그
      - JSXFragment: `<>`와 같이 열린 태그와 `</>`와 같이 닫힌 태그로 구성된 빈 태그
    - JSXElementName: JSXElement의 이름

      - JSXIdentifier: JSXElementName을 구성하는 식별자
      - JSXNamespacedName:
        - JSXNamespacedName은 JSX에서 네임스페이스를 가진 컴포넌트를 참조할 때 사용
        - `<Namespace:ComponentName`
        - 여기서 Namespace는 컴포넌트가 속한 네임스페이스를 나타내고, ComponentName은 실제 컴포넌트의 이름을 나타냄
        - JSXNamespacedName을 사용하면 네임스페이스가 지정된 컴포넌트를 JSX에서 사용할 수 있음
      - JSXMemberExpression:

        - 네임스페이스와는 다른 개념으로, 특정 컴포넌트 내에 중첩된 컴포넌트에 접근할 때 사용
        - `<ComponentName.SubComponentName />`: ComponentName은 부모 컴포넌트를 나타내고, SubComponentName은 해당 부모 컴포넌트 내의 서브 컴포넌트를 나타냄
        - React 컴포넌트의 정적 속성(static properties)이나 메서드로 구현 가능

          ```jsx
          class Form extends React.Component {
            //...
          }

          Form.Input = function Input(props) {
            return <input {...props} />;
          };

          Form.Button = function Button(props) {
            return <button {...props} />;
          };

          // 사용 예
          function App() {
            return (
              <Form>
                <Form.Input type="text" placeholder="이름을 입력하세요" />
                <Form.Button type="submit">확인</Form.Button>
              </Form>
            );
          }
          ```

  - JSXAttributes: JSXElement의 속성
    - JSXAttribute: JSXAttributes를 구성하는 속성
    - JSXAttributeName: JSXAttribute의 이름
    - JSXAttributeValue: JSXAttribute의 값
    - JSXSpreadAttribute: JSXAttributes를 구성하는 스프레드 속성
  - JSXChildren: JSXElement의 자식 요소
    - JSXChild: JSXChildren을 구성하는 자식 요소로 0개 이상의 JSXText, JSXElement, JSXFragment, JSXChildExpression으로 구성
      - JSXText: JSX에서의 텍스트 노드
      - JSXElement: JSX의 기본 구성 요소로, HTML 태그 또는 다른 컴포넌트를 나타냄
      - JSXFragment: 여러 자식을 그룹화하지만 추가적인 DOM 엘리먼트를 추가하지 않는 컨테이너 역할
      - JSXChildExpression: 중괄호 {}로 감싼 JavaScript 표현식
        ```jsx
        function App() {
          const name = "B";
          return (
            <>
              <h1>제목</h1>
              <p>이것은 단락입니다.</p>
              {true && <span>이 조건이 참일 때 보여집니다.</span>}
            </>
          );
        }
        // <h1>과 <p>는 JSXElement이며, "제목"과 "이것은 단락입니다."는 JSXText입니다.
        // {true && <span>...</span>} 부분은 JSXExpression에 해당하며, 전체 코드는 JSXFragment로 감싸져 있습니다.
        ```
  - JSXStrings: JSXElement의 문자열

- **JSX 컴포넌트의 명명규칙**:
  - **파스칼 케이스(PascalCase) 사용**: `MyComponent`와 같이 각 단어의 첫 글자를 대문자로 표기(일반 HTML 태그와 구분하기 위함)
  - **명확한 컴포넌트 이름 사용**: 데이터 테이블을 표시하는 컴포넌트를 `DataTable`로 정의하는 것과 같이 컴포넌트의 역할을 명확히 알 수 있도록 이름을 지정
  - **짧지만 의미 있는 이름**: 너무 긴 이름은 코드를 읽기 어렵게 만들 수 있으므로, 짧지만 의미 있는 이름을 사용하는 것이 좋음
    - 예: `Post` 컴포넌트는 `PostItem`보다는 `Post`로, `PostList`보다는 `Posts`로 정의
  - **특수문자 사용 금지**: `_`나 `-`와 같은 특수문자는 사용하지 않는 것이 좋음
  - **예악어 사용 금지**: `class`나 `for`와 같은 예약어는 사용하지 않도록 함

### 2.1.2 JSX 예제

### 2.1.3 JSX는 어떻게 자바스크립트에서 변환될까?

- @babel/plugin-transform-react-jsx 플러그인을 사용하면 JSX를 일반 자바스크립트로 변환할 수 있음

### 2.1.4 정리

<br>

## 2.2 가상 DOM과 리액트 파이버

### 2.2.1 DOM과 브라우저 렌더링 과정

- DOM(Document Object Model): HTML 문서의 구조를 표현하는 트리 구조 형태의 데이터 모델로, 브라우저가 HTML 문서를 파싱한 결과물
- **브라우저가 웹 사이트 접근 요청을 받고 화면을 그리는 과정**:
  1. **URL 입력 또는 링크 클릭:** 사용자가 웹 사이트의 URL을 입력하거나 링크를 클릭하여 웹 사이트에 접근 요청을 보냅니다.
  2. **DNS 조회:** 브라우저는 해당 URL에 대한 DNS 조회를 수행하여 서버의 IP 주소를 가져옵니다.
  3. **HTTP 요청:** 브라우저는 서버에 HTTP 요청을 보내고, 요청 메서드(GET, POST 등)와 함께 요청 헤더와 데이터를 포함시킵니다.
  4. **서버의 응답 처리:** 서버는 요청을 받고, 요청에 따라 필요한 데이터를 처리하여 HTTP 응답을 생성합니다.
  5. **응답의 파싱:** 서버는 생성된 응답을 브라우저로 보냅니다. 응답은 일반적으로 HTML, CSS, JavaScript, 이미지 등의 리소스로 구성됩니다. 브라우저는 응답을 받아서 파싱하고, HTML 문서를 DOM(Document Object Model) 트리로 변환합니다. CSS 파일도 파싱하여 CSSOM(CSS Object Model) 트리를 생성합니다.
  6. **리플로우:** DOM 트리와 CSSOM 트리를 사용하여 브라우저는 화면에 요소들을 배치하고 스타일을 적용합니다. 이 과정을 리플로우(Reflow)라고도 합니다. 리플로우는 요소의 크기, 위치, 레이아웃 등을 계산하는 과정입니다.
  7. **페인팅:** 리플로우 후, 브라우저는 화면에 내용을 그리기 위해 페인팅(Painting) 작업을 수행합니다. 페인팅은 실제로 화면에 픽셀을 그리는 과정입니다.
  8. **사용자 상호작용 및 JavaScript 실행:** 내용이 그려진 후, 브라우저는 사용자의 입력을 대기하거나 애니메이션 및 이벤트 처리를 위해 JavaScript 코드를 실행합니다.

### 2.2.2 가상 DOM의 탄생 배경

- 리치 해리스는 ["가상 DOM은 순수한 오버헤드입니다"](https://svelte.dev/blog/virtual-dom-is-pure-overhead)라는 글에서 리액트와 같은 프레임워크에서 널리 알려진 기능인 가상 DOM이 많은 개발자가 생각하는 것만큼 효율적이지 않다고 주장합니다. 이어서 그는 이 기능의 작동 방식을 비판하며 대안적인 접근 방식을 제시합니다.
- 가상 DOM은 실제 DOM을 직접 조작하는 것에서 오는 성능 이슈를 해결하기 위해 만들어진 기술입니다. 가상 DOM은 메모리 상에 실제 DOM의 경량화된 복사본을 유지하면서, 실제 DOM과의 차이점을 계산하여 필요한 부분만 실제 DOM에 적용하는 방식으로 동작합니다.
- 컴포넌트가 렌더링될 때, 가상 DOM은 새로운 상태와 이전 상태를 비교하는 과정(비교(diffing)을 거쳐서 업데이트가 필요한 부분을 파악합니다. 그 후, 가상 DOM은 계산된 차이점을 바탕으로 실제 DOM에 최소한의 변경만을 적용하여 두 상태를 동기화하는 과정(재조정(reconciliation))을 수행합니다. 이러한 과정을 통해 애플리케이션의 성능을 향상시키고, 사용자 경험을 개선할 수 있습니다.

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

## References

- [JSX Introduction](https://facebook.github.io/jsx/#sec-introl)

## Articles

- [How your browser loads, parses, and renders a webpage](https://www.zachgollwitzer.com/posts/how-browser-loads-parses-renders-webpage)
- [브라우저의 작동 방식](https://web.dev/articles/howbrowserswork?hl=ko)
- [가상 DOM: 블록으로 돌아가기 - 가상 DOM의 동작 원리](https://million.dev/blog/virtual-dom#visual-example)
- [Difference between Virtual DOM and Real DOM](https://www.geeksforgeeks.org/difference-between-virtual-dom-and-real-dom/)

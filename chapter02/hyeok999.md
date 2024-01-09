# 02장: 리액트 핵심요소 깊게 살펴보기



---

## 목차

1. [JSX란?](#JSX란?)
2. [리액트 파이버](#리액트 파이버)

---

## JSX란?

> - Facebook이 임의로 만든 문법
> - JS 내부에서 표현하기 까다로운 XML의 트리구무을 작성하는데 많은 도움을 주는 새로운 문법



### JSX 정의

- **JSXElement** : HTML의 요소와 비슷한 역할 (가장 기본 요소)

  - JSXOpeningElement
  - JSXClosingElement
  - JSXSelfClosingElement
  - JSXFragment

  

### JSX -> JS 변환

> `@babel/plugin-transform-react-jsx` 플러그인을 이용한다.

```jsx
const CompA = <A required={true}>Hello World</A>
// @babel/plugin-transform-react-jsx 로 변환한 결과
var CompA = React.createElement(
	A, 
  {
    required: true,
  },
  'Hello World'
)
// 17이후, 바벨 7.9.0 버전 이후 @babel/plugin-transform-react-jsx 로 변환한 결과
var CompA = (0, _jsxRuntime.jsx)(A, {
  required: true,
  children: 'Hello World'
});

      
const CompB = <>Hello World</>
// @babel/plugin-transform-react-jsx 로 변환한 결과
var CompB = React.createElement(
	React.Fragment, 
  null,
  'Hello World'
)      
// 17이후, 바벨 7.9.0 버전 이후 @babel/plugin-transform-react-jsx 로 변환한 결과
var CompB = (0, _jsxRuntime.jsx)(jsxRuntime.Fragment, {
  children: 'Hello World'
});      
      
const CompC = <div><span>hello world</span></div>
// @babel/plugin-transform-react-jsx 로 변환한 결과
var CompC = React.createElement(
	'div', 
  null,
  React.createElement('span', null, 'Hello World'),
)         
// 17이후, 바벨 7.9.0 버전 이후 @babel/plugin-transform-react-jsx 로 변환한 결과
var CompC = (0, _jsxRuntime.jsx)('div', {
  children: (0, _jsxRuntime.jsx)('span', {
    children: 'Hello World'
  }),
});  
```

- JSX 반환값이 `React.createElement` 으로 모두 동일하다.



## 리액트 파이버

> 리액트에서 관리하는 JS 객체
>
> 가상DOM 과 실제DOM을 비교하고 정보를 수집해, 변경사항이 존재할 경우 화면에 렌더링을 요청함.

**파이버가 하는 역할**

- 작업을 작은 단위로 분할하고 우선순위를 매긴다.
- 작업을 일시정지하거나 나중에 재시작할 수 있다.
- 이전에 했던 작업을 다시 재사용하거나 필요하지 않는 경우 폐기할 수 있다.
- 위 과정은 모두 비동기로 이뤄진다. (엣날에는 스택알고리즘)

**파이버 역할**

- 하나의 작업단위로 구성
- 리액트는 이러한 작업 단위를 하나씩 처리하고 `finishWork()` 라는 작업으로 마무리함.
- 리액트 요소는 렌더링이 발생할 때마다 생성되지만, 파이버는 컴포넌트가 최초로 마운트 되는 시점에 생성되고 이후 재사용된다.

**파이버가 가시적 변경사항을 만들어내는 단계**

1. 렌더 단계 : 사용자에게 노출되지 않는 모든 비동기 작업을 수행. 우선순위를 지정하거나 중지, 버리기 등의 작업이 발생함.
2. 커밋 단계 : DOM에 실제 변경사항을 반영하기 위한 작업, `commitWork()`가 실행되고, 이 과정을 앞과 다르게 동기식으로 일어나며, 중단이 불가능함.


# 03장: 리액트 훅 깊게 살펴보기

리액트를 이루는 핵심 요소들을 깊게 살펴보고, 리액트의 렌더링 과정을 이해하는 장입니다.

<br>

- [03장: 리액트 훅 깊게 살펴보기](#03장-리액트-훅-깊게-살펴보기)
  - [3.1 리액트 훅 깊게 살펴보기](#31-리액트-훅-깊게-살펴보기)
    - [3.1.1 useState](#311-usestate)
      - [게으른 초기화(lazy initialization)](#게으른-초기화lazy-initialization)
    - [3.1.2 useEffect](#312-useeffect)
      - [클린업 함수의 목적](#클린업-함수의-목적)
      - [의존성 배열](#의존성-배열)
      - [useEffect의 구현](#useeffect의-구현)
      - [useEffect 사용할 때 주의할 점](#useeffect-사용할-때-주의할-점)
      - [useEffect의 첫 번째 인수에 함수명을 부여하라](#useeffect의-첫-번째-인수에-함수명을-부여하라)
      - [거대한 useEffect 만들지 마라](#거대한-useeffect-만들지-마라)
      - [불필요한 외부 함수를 만들지 마라](#불필요한-외부-함수를-만들지-마라)
        - [왜 useEffect의 콜백 인수로 비동기 함수를 바로 넣을 순 없을까??](#왜-useeffect의-콜백-인수로-비동기-함수를-바로-넣을-순-없을까)
    - [3.1.3 useMemo](#313-usememo)
    - [3.1.4 useCallback](#314-usecallback)
    - [3.1.5 useRef](#315-useref)
    - [3.1.6 useContext](#316-usecontext)
    - [3.1.7 useReducer](#317-usereducer)
    - [3.1.8 useImperativeHandle](#318-useimperativehandle)
      - [forwardRef 살펴보기](#forwardref-살펴보기)
      - [useImperativeHandle 이란?](#useimperativehandle-이란)
    - [3.1.9 useLayoutEffect](#319-uselayouteffect)
    - [3.1.10 useDebugValue](#3110-usedebugvalue)
    - [3.1.11 훅의 규칙](#3111-훅의-규칙)
    - [3.1.12 정리](#3112-정리)
  - [3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#32-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [3.2.1 사용자 정의 훅](#321-사용자-정의-훅)
    - [3.2.2 고차 컴포넌트](#322-고차-컴포넌트)
    - [3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?](#323-사용자-정의-훅과-고차-컴포넌트-중-무엇을-써야-할까)
    - [3.2.4 정리](#324-정리)

<br>

## 3.1 리액트 훅 깊게 살펴보기

함수형 컴포넌트에서 가장 중요한 개념은 바로 훅이다.
클래스형 컴포넌트만 가능했던 리액트 핵심적인 기능을 함수에서도 가능하게 만들었다.

### 3.1.1 useState

함수형 컴포넌트 내부에서 상태를 정의하고, 이 상태를 관리할 수 있게 해주는 훅이다.

```
function Component(){
  let state = 'hello'
}

function handleButtonClick(){
  state =hi
}

return(
  <>
  <h1>{state}</h1>
  <button onClick={handleButtonClick}>hi</button>
)
```

위코드가 동작하지 않은 이유 리액트에서 렌더링은 함수형 컴포넌트 return과 클래스형 render 함수를 실행한 다음, 이 실행 결과를 이전의 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트해 이뤄진다.
위 코드에서는 리렌더링 발생 조건을 전혀 충족하지 못하고 있다.

> 리렌더링 발생조건
> 리렌더링 발생하는 경우는 다음과 같다.

- 클래스형 setState가 실행되는 경우: state의 변화는 컴포넌트 상태의 변화를 의미
- 클래스형 forceUpdate가 실행되는 경우
- 함수형 useState 두 번째 배열요소 setter가 실행되는 경우
- 함수형 useReducer 두 번째 배열요소 dispatch가 실행되는 경우: useReducer도 useState와 마찬가지로 상태를 업데이트 함수를 배열로 제공
- 컴포넌트의 key props가 변경되는 경우: 리액트에서 Key는 리렌더링이 발생하는 동안 형제요소들 사이에서 동일한 요소를 식별하는 값.
- props가 변경되는 경우: 부모로 전달 받는 값이 props가 달라지면 자식 컴포넌트 변경이 필요
- 부모 컴포넌트가 렌더링될 경우

```
function Component(){
const [,triggerRender]=useState()
  let state = 'hello'
}

function handleButtonClick(){
  state =hi
  triggerRender()
}

return(
  <>
  <h1>{state}</h1>
  <button onClick={handleButtonClick}>hi</button>
)
```

useState 반환값의 두번째 원소를 실행해 렌더링이 일어나게 변경했다.
그래도 변경값이 렌더링이 되고 있지 않다.
이유는 리액트의 렌더링은 함수형 컴포넌트에서 반환한 결과물인 return의 값을 비교해 실행되기 때문이다.
즉, 매번 렌더링이 발생할때 마다 함수는 다시 새롭게 실행되고 새롭게 실행되는 함수의 state는 매번 hello로 초기화됨 아무리 state를 변경해도 hello로 초기화 된다.
그렇다면 useState의 훅의 결과 값은 어떻게 함수가 실행돼도 그 값을 유지하고 있을까 ?

useState 상상 코드

```
function useState(initialValue){
  let internalState = initialValue


function setState(newValue){
  internalState = newValue
}
return [internalState, setState]
}

const [value,setValue]=useState(0)
setValue(1)
console.log(value)  // 0

```

setValue로 값을 변경했음에도 이미 구조 분해 할당으로 state 값이 이미 value에 할당해 놓은 상태이기 때문에
훅 내부 setState를 호출하더라도 변경된 새로운 값을 변환 못함

useState 상상 코드2

```
function useState(initialValue){
  let internalState = initialValue

function state(){
  return internalState
}

function setState(newValue){
  internalState = newValue
}
return [state, setState]
}

const [value,setValue]=useState(0)
setValue(1)
console.log(value)  // 1
```

이를 해결 하기 위해 리액트는 클로저를 이용했다.

> 클로저 어떤 함수(useState) 내부에 선언된 함수가(setState)가 함수의 실행이 종료된 이후에도(useState가 호출된 이후에도)지역변수인 state를 계속 참조할 수 있다는 것을 의미

useState 내부 구현 모습 --> 작동 방식으로 흉내낸 코드

```
const MyReact = function(){
  const global ={}
  let index = 0

  function useState(initialState){
    if(!global.states){
      // 애플리케이션 전체의 states 배열을 초기화한다.
      // 최초 접근이라면 빈 배열로 초기화한다.
      global.states=[]
    }

    // states 정보를 조회해서 현재 상태값이 있는 지 확인하고,
    // 없다면 초깃값으로 설정한다.
    const currentState = global.states[index] || initialState
    // states의 값을 위에서 조회한 현재 값으로 업데이트한다.
    global.states[index]= currentState

  // 즉시 실행 함수로 setter를 만든다.
  const setState =(function(){
    // 현재 index를 클로저로 가둬놔서 이후에도 계속해서 동일한 index에 접근할 수 있음
    let currentIndex = index
    return function(value){
      global.states[currentIndex]=value
      // 컴포넌트를 렌더링한다. 실제로 컴포넌트를 렌더링하는 코드는 생략
    }
  })()
  // useState를 쓸때마다 index를 추가 이 index는 setState에서 사용된다.
  // 즉, 하나의 state마다 index가 할당돼 있어, 그 index가 배열의 값(global.states)을
  // 가리키고 필요할 때 마다 그 값을 가여옴
  index = index+1

  return [currentState,setState]


}
```

여기서 함수의 실행이 끝났음에도 함수가 선언된 환경을 기억할 수 있는 방버은 1장에서 소개된 클로저다.
매번 실행되는 함수형 컴포넌트 환경에서 state의 값을 유지하고 사용하기 위해서 리액트는 클로저를 활용하고 있다.

useState는 자바스크립트의 특징 중 하나인 클로저에 의존해 구현돼 있을 것이라는 사실을 짐작할 수 있다.
클로저를 사용함으로 써 외부에 해당 값을 노출시키지 않고 오직 리액트에서만 가능하고 함수 컴포넌트가 매번 실행되더라도 useState에서 이전의 값을 정확하게 꺼낼 쓸 수 있게 됐다.

#### 게으른 초기화(lazy initialization)

useState() 인수로 원시값을 넣은게 대부분이다.
useState에 변수 대신 함수를 넘기는 것을 게으른 초기화라고 한다.

```
일반 useState 사용
const [count,setCount]=useState(Number.parseInt(window.localStorage.getItem(cacheKey)))

게으른 초기화
위 코드와의 차이점은 함수를 실행해 값을 반환한다는 것
cosnt [count, setCount]=useState(()=>Number.parseInt(window.localStorage.getItem(cacheKey)))
```

공식문서에서 이러한 게으른 초기화는 useState의 초깃값이 복잡하거나 무거운 연산을 포함하고 있을 때 사용하라고 돼있다.
게으른 초기화 함수는 오로지 useState가 처음 만들어질 때만 사용 이후에 리렌더링이 발생하면 함수의 실행은 무시된다.

리액트에서 렌더링이 실행될 때마다 함수형 컴포넌의 함수가 다시 실행된다는 점을 명심하자
useState의 값도 재실행된다. 내부에는 클로저가 존재하면 클로저를 통해 값을 가져오며 초깃값은 최초에만 사용된다.
useState의 인수로 자바스크립트에 많은 비용을 요구하는 작업이 들어가있다면 계속해서 실행될 위험이 존재할 것이다.
우려와는 다르게 useState 내부에 함수를 넣으면 이는 최초 렌더링 이후에는 실행되지 않고 최초의 state 값을
넣을 때만 실행된다.

그렇다면 게으른 초기화는 언제 쓰는 것이 좋을까 ??
리액트에서 무거운 연산이 요구될 때 사용하라고 한다.
즉, localStorage나 sessionStorage에 대한 접근,map,filter,find 같은 배열에 대한 접근,혹시 초깃값 계산을 위해 호출이 필요할때와 같이 무거운 연산을 포함해 실행 비용이 많이 드는 경우에 사용하면 좋다.

### 3.1.2 useEffect

useEffect의 정의를 정확하게 내리자면 useEffect는 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 매커니즘이다. 그리고 이 부수효과가 '언제'일어나는지 보다 어떤 상태값과 함께 실행되는지 살펴보는 것이 중요하다.

```
function Component(){
  useEffect(()=>{
    // do something
  },[props,state])
}
```

첫 번째 인수로는 실행할 부수 효과가 포함된 함수를, 두 번째 인수로는 의존성 배열을 전달한다.
의존성 배열은 어느 정도 길이를 가진 배열일수도, 아무런 값이 없는 배열일 수도 있고, 배열 자체를 넣지 않고 생략할 수도 있다.

의존성 배열이 변경될 때 마다 useEffect의 첫 번째 인수인 콜백을 실행한다는 것은 널리 알려진 사실
하지만 useEffect는 어떻게 의존성 배열이 변경된 것을 알고 실행할까 ?
여기서 한 가지 기억해야 할 사실은 함수형 컴포넌트는 매번 함수를 샐힝해 렌더링을 수행한다는것

useEffect는 렌더링 할 때 마다 의존성에 있는 겂을 보면서 의존성의 값이 이전과 다른게 하나라도 있으면 부수 효과를 실행하는 평범한 함수 따라서 useEffect는 state와 props의 변화속에서 일어나는 렌더링 과정에는 실행되는 부수효과 함수라고 볼 수 있다.

##### 클린업 함수의 목적

클린업 함수는 이벤트를 등록하고 지울 때 사용해야 한다고 알려져 있다.

```
export default function App(){
  const [counter,setCounter]=useState(0);

  function handleClick(){
    setCounter(prev=>prev+1)
  }

  useEffect(()=>{
    function addMouseEvent(){
      console.log(counter)
    }

    window.addEventListener('click',addMouseEvent)

    // 클린업 함수
    return ()=>{
      console.log('클린업 함수 실행',counter)
      window.removeEventListener('click',addMouseEvent)
    }
  },[counter])

return(
  <>
  <h1>{counter}</>
  </h1>
  <button onClick={handleClick}>+</button>
)

}

실행결과
클린업 함수 실행! :0
1

클린업 함수 실행! :1
2

클린업 함수 실행! :2
3

클린업 함수 실행! :3
4
```

클린업 함수는 이전 counter 값, 즉 이전 state를 참조해 실행된다는 것을 알 수 있다.
클린업 함수는 새로운 값을 기반으로 렌더링 뒤에 실행되지만 이 변경된 값을 읽는 것이 아니라 함수가
정의됐을 당시에 선언됐던 이전 값을 보고 실행된다는 것이다.

useEffect는 그 콜백이 실행될 때마다 이전의 클린업 함수가 존재한다면 그 클린업 함수를 실행한 뒤에 콜백을 실행한다. 따라서 이벤트를 추가하기 전에 이전에 등록했던 이벤트 핸드러를 삭제하는 코드를 클린업 함수에 추가하는 것이다. 특정 이벤트의 핸들러가 무한히 추가되는 것을 방지할 수 있다.

클린업 함수는 생명주기의 언마운트 개념과는 조금의 차이가 있을 수 있다.
언마운트는 특정 컴포넌트가 DOM에서 사라진다는 것을 의미하는 클래스형 컴포넌트의 용어다.
클린업 함수는 리렌더링 시에 의존성 변화가 있었을 당시에 이전의 값을 기준으로 실행되는 말 그대로 이전 상태를 청소해주는 개념으로 보는 것이 옳다.

#### 의존성 배열

만약 빈 배열으 둔다면 리액트가 이 useEffect는 비교할 의존이 없다고 판단해 최초 렌더링 직후에 실행된 다음부터는 더 이상 실행되지 않는다.
아무런 값도 넘겨주지 않는다면 이때는 의존성을 비교할 필요 없이 렌더링할 때 마다 실행이 필요하다고 판단해 렌더링이 발생 할때 마다 실행된다.
의존성 배열이 없는 useEffect가 매 렌더링 마다 실행된다면 useEffect 없이 써도 되는게 아닐까 ?

```
function Component(){
  console.log('렌더링 됨)
}

function Component(){
  useEffect(()=>{
    console.log('렌더링됨)
  })
}
```

두 코드의 차이점

1. 서버 사이드 렌더링 관점에서 useEffect는 클라이언트 사이드에서 실행되는 것을 보장해준다.
   useEffect 내부에서는 window 객체의 접근에 의존하는 코드를 사용해도 된다.
2. useEffect는 컴포넌트의 렌더링이 완료된 이후에 실행된다. 반면 직접 실행은
   렌더링되는 도중에 실행된다. 따라서 1번과는 달리 서버 사이드 렌더링의 경우에 서버에서도 실행된다.
   그리고 이작업은 함수형 컴포넌트의 반환을 지연시키는 행위다. 즉 무거운 작업일 경우 렌더링을 방해하르모 성능에 악영향

useEffect는 컴포넌트의 사이드 이펙트, 즉 부수 효과를 의미한다는 것을 명심하자.
useEffect는 컴포넌트가 렌더링된 후에 어떠한 부수효과를 일으키고 싶을 때 사용하는 훅이다.

#### useEffect의 구현

핵심은 의존성 배열의 이전 값과 현재 값의 얕은 비교다.
리액트는 값을 비교할 때 Object.is를 기반으로 얕은 비교를 수행한다.

> Object.is() 정적 메서드는 두 값이 같은 값인지 결정합니다.

1. == 연산자는 같음을 테스트하기 전에 양 쪽(이 같은 형이 아니라면)에 다양한 강제(coercion)를 적용하지만("" == false가 true가 되는 것과 같은 행동을 초래), Object.is는 어느 값도 강제하지 않습니다.
2. === (en-US) 연산자와도 같지 않습니다. Object.is()와 ===의 유일한 차이는 부호 있는 0과 NaN 값들의 처리입니다. === 연산자(및 == 연산자)는 숫자값 -0과 +0을 같게 처리하지만, NaN은 서로 같지 않게 처리합니다.

> 얕은 비교

숫자, 문자열 등 원시 자료형(Primitive Type)은 값을 비교한다.
배열, 객체 등 참조 자료형(Reference Type)은 값 혹은 속성을 비교하지 않고, 참조되는 위치를 비교한다.

- React.memo() 에서 props를 비교할 때
- 리액트 컴포넌트가 리렌더링을 하기 전

#### useEffect 사용할 때 주의할 점

- eslint-disable 주석은 최대한 자제하라

  빈배열 []을 의존성을 할 때 즉 컴포넌트를 마운트 하는 시점에만 무언가를 하고 싶다라는 의도로 작성하곤 한다. 클래스형 컴포넌트의 생명주기 메서드 componentDidMount에 기반한 접근버으로 가급적이면 사용해서 안된다.

useEffect는 반드시 의존성 배열로 전달한 값의 변경에 의해 실행되야 하는 훅이다.
그러나 의존성을 넘기지 않은 채 콜백 함수 내부에서 특정 값을 사용한다는 것은
이 부수 효과가 실제로 실행돼야하는 값과 관찰해야 하는 값과는 별개로 작동한다는 것을 의미한다.

```

function Component({log}:{log:striing}){
  useEffect(()=>{
    logging(log)
  },[])//eslint-disable
}
```

위 코드는 당장 문제가 없을지 라도 버그의 위험성을 안고있다.
log가 아무리 변해도 useEffect의 부수효과는 실행되지 않고, useEffect의 흐름과 props.log 흐름이 맞지 않게 된다.

useEffect에 빈 배열을 넘기기전에는 정말로 useEffect의 부수 효과가 컴포넌트의 상태가 별개로 작동해야만 하는지, 혹은 여기서 호출하는 게 최선인지 한 번 더 검토해 봐야 한다.

#### useEffect의 첫 번째 인수에 함수명을 부여하라

useEffect의 수가 적거나 복잡성이 낮다면 이러한 익명 함수를 사용해도 큰 문제는 없다.
그러나 useEffect의 코드가 복잡하고 많아질수록 무슨 일을 하는 useEffect 코드인지 파악하기 어려워진다.
이때 적절한 이름을 사용한 기명 함수로 바꾸는 것이 좋다. 적절한 이름을 붙이면 목적을 파악하기 쉬워진다.

```
useEffect(
  function logActiveUser(){
    logging(user.id)
  },
  [user.id]
)
```

#### 거대한 useEffect 만들지 마라

useEffect는 의존성 배열을 바탕으로 렌더링 시 의존성이 변경될 때 마다 부수효과를 실행한다.
이 부수효과의 크기가 커질수록 애플리케이션 성능에 악영향을 미친다.
비록 useEffect가 렌더링이후 실행되기 때문에 렌더링 작업에는 영향이 적게 미치지만, 자바스크립트 실행 성능에 영향을 미친다는 것은 변함없다.
그래서 가능한 useEffect 간결하고 가볍게 유지하는 것이 좋다.
만약 큰 useEffect를 만들어야 하다면 적은 의존성 배열을 사용하는 여러개의 useEffect 분리하는 것이 좋다.

#### 불필요한 외부 함수를 만들지 마라

useEffect 내에서 사용할 부수 효과라면 내부에서 만들어서 정의해서 사용하는 편이 훨씬 도움이 된다.

##### 왜 useEffect의 콜백 인수로 비동기 함수를 바로 넣을 순 없을까??

useEffect의 인수로 비동기 함수가 사용 가능하다면 비동기 함수의 응답 속도에 따라 결과가 이상하게 나올 수 있다.

극단적인 예제로 이전 state 기반의 응답이 10초가 걸렸고, 이후 바뀐 state 기반의 응답이 1초 뒤에 왔다면
이전 state 기반으로 나오는 불상사가 생길 수 있다. 이러한 문제를 useEffect의 경쟁상태(race condition)라고한다.

내부에서 useEffect내부에서 비동기 함수를 선언해 실행하거나, 즉시 실행 비동기 함수를 만들어서 사용하는 것은 가능하다.

비동기함수가 내부에 존재하면 생성되고 실행되는 것을 반복하므로 이전 비동기 함수에 대한 처리를 추가하는 것이 좋다.

비동기 useEffect는 state의 경쟁 상태를 야기할 수 있고,클린업 함수의 실행순서도 보장 할수 없기 때문에
개발자의 편의성을 위해 비동기 함수를 인수로 받지 않는다고 볼 수 있다.

### 3.1.3 useMemo

비용이 큰 연산에 대해 결과를 저장(메모이제이션)해 두고, 이 저장된 값을 반환하는 훅이다.

```
const memoizedValue = useMemo(()=>expensiveComputation(a,b),[a,b])
```

첫 번째 인수로는 어떠한 값을 반환하는 생성 함수를, 두 번째 인수로는 해당 함수가 의존하는 값의 배열를 전달

useMemo는 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전에 기억해둔 해당 값을 반환하고, 의존성 배열의 값이 변경됐다면 첫 번째 인수의 함수를 실행한 후에 그 값을 반환하고 그 값을 다시 기억 해 둘 것이다. 이러한 메모제이션은 컴포넌트도 가능하다.
물론 React.memo를 쓰는 것이 더 현명하다.

useMemo는 연산 비용이 많이 든다면 사용해 봄 직하다.

> 비용이 많이 드는 연산 ? 이란 정확히 무엇일까

### 3.1.4 useCallback

인수로 넘겨 받은 콜백 자체를 기억한다.
쉽게 말해 특정함수를 새로 만들지 않고 다시 재사용한다는 의미다.
기명함수를 쓰는 이유는 디버깅을 용이하게 하기 위함

useMemo와 useCallback의 유일한 차이는 메모제이션을 하는 대상이 변수냐 함수냐일 뿐이다.

> useMemo와 useCallback 쓰는 적절한 예시 ??대한 질문

### 3.1.5 useRef

useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있다.
차이점 두가지

- useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경할 수 있다.
- useRef는 그 값이 변하더라도 렌더링을 발생시키지 않는다.

```
function RefComponent(){
  const inputRef = useRef()

  //이때는 렌더링 실행되기 전이므로 undefined를 반환한다.
  console.log(inputRef.current)


  useEffect(()=>{
    console.log(inputRef.current) // <input type="text" />
  },[inputRef])

  return <input ref={inputRef} type="text"/>
}
```

useRef는 최초에 넘겨받은 기본값을 가지고 있다.
useRef의 최초 기본값은 return문에 정의해 둔 DOM이 아니고 useRef()로 넘겨받은 것이라는 것이다.
선언된 당시에는 아직 컴포넌트가 렌더링되기 전이라 return으로 컴포넌트의 DOM이 반환되기 전이므로 undefined다.

유용한 경우는 렌더링을 발생시키지 않고 원하는 상태값을 저장할 수 있다는 특징
개발자가 원하는 시점의 값을 렌더링에 영향을 미치지 않고 보관하고 싶다면 사용하면 좋다.

### 3.1.6 useContext

리액트는 기본적으로 부모 컴포넌트와 자식 컴포넌트로 이뤄진 트리 구조를 갖고 있기 대문에 부모가 가지고 있는 데이터를 자식에서 사용하고 싶다면 props로 데이터를 넘겨주는 것이 일반적이다.
컴포넌트의 거리가 멀어질수록 코드는 복잡해진다.

```
<A props={something}>
  <B props={something}>
    <C props={something}>
      <D props={something}></D>
    </C>
  </B>
</A>
```

props를 하위 컴포넌트로 필요한 위치까지 계속해서 넘겨야한다. 이러한 기법을 prop(props drilling)내려주기라고 한다.

prop 내려주기를 극복하기 위해 등장한 개념이 바로 콘텍스트(Context)다.

useContext는 상태를 주입해주는 API다.

상태관리 라이브러리 최소한 두가지 조건을 만족해야한다.

1. 어떠한 상태를 기반으로 다른 상태를 만들어 낼 수 있어야한다.
2. 필요에 따라 이러한 상태 변화를 최적화할 수 있어야 한다.

콘텍스트는 둘 중 어느 것도 하지 못한다. 단순히 props 값을 하위로 전달해 줄 뿐,사용한다고 해서 렌더링이 최적화되지는 못한다.

콘텍스트는 단순히 상태만 주입할 뿐 그 이상의 기능도, 그 이하의 기능도 하지 않는다.

### 3.1.7 useReducer

useState의 심화버전 useState와 비슷한 형태를 띠지만, 좀 더 복잡한 상태값을 미리 정의해 놓은 시나리오에 따라 관리 할 수 있다.

- useReducer에서 사용하는 용어

  - state: 현재 Reducer가 가지고 있는 값을 의미
  - dispathcer: state를 업데이트 하는 함수,useReducer가 반환하는 배열의 두 번째 요소
    setState는 단순히 값을 넘겨주지만 여기는 action를 넘겨준다는 점이 다르다.
    이 action은 state를 변경할 수 있는 액션을 의미한다.

- 3개의 인수
  - reduer: 기본 action를 정의하는 함수
  - initialState: 두 번째 인수로, useReducer의 초깃값을 의미한다.
  - init: 필수 값은 아니며, useState의 인수로 함수를 넘겨줄 때 처럼 초깃값을 지연해서 생성시키고 싶을 때 사용하는 함수다.

useReducer의 목적은 간단하다.
state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 확인 할 수 있게끔 하는 것이 useReducer의 목적이다.

간단한 값을 관리하는 것은 useState로 충분하지만 state가 가져야 할 값이 복잡하고 이를 수정하는 경우가 많아진다면 useReduer를 사용해 state를 관리하면 state를 사용하는 로직과 이를 관리하는 비즈니스 로직을 분리 할수 있어 state를 관리하기가 한결 쉬워진다.

useReducer도 클로저를 활용해 값을 가둬서 state를 관리한다.

### 3.1.8 useImperativeHandle

자주 볼 수 없는 훅으로 널리 사용되지 않음

useImperativeHandle 이해가기 위해서는 React.forwardRef에 알아야 한다.

#### forwardRef 살펴보기

ref를 하위 컴포넌트로 전달하고 싶다면 어떻게 해야할까 ?

ref는 props로 쓸 수 없다는 경고문과 함께 접근을 시도할 경우 undefined를 반환한다.
ref대신 다른 props 받으면 잘 동작한다.
forwadRef는 동일한 작업을 하는 API다.
탄생한 배경을 ref를 전달하는데 있어서 일관성을 제공하기 위해서다.

#### useImperativeHandle 이란?

부모에게서 넘겨받은 ref를 원하는 대로 수정할 수 있는 훅이다.

### 3.1.9 useLayoutEffect

공식문서에 따르면

> 이함수의 시그니처는 useEffect와 동일하나, 모든 DOM의 변경 후에 동기적으로 발생한다.
> 함수의 시그니처 동일하다는 것은 두 훅의 형태나 사용 예제가 동일하다는 것을 의미한다.

useLayoutEffect를 이해하기 위한 중요한 사실은 '모든 DOM의 변경 후에 useLayoutEffect의 콜백 함수 실행이 동기적으로 발생'한다는 점이다. 여기서 말하는 DOM 변경이란 렌더링이지, 브라우저에 실제로 해당사항 변경 사항이 반영되는 시점을 의미하는 것은 아니다.

실행 순서

1. 리액트가 DOM을 업데이트
2. useLayoutEffect 실행
3. 브라우저에 변경 사항을 반영
4. useEffect를 실행

useLayoutEffect가 useEffect 보다 먼저 실행된다.
이는 useLayoutEffect가 브라우저에 변경사항이 반영되기전에 실행되면 반면
useEffect는 브라우저에 변경 사항이 반영된 이후에 실행되기 때문이다.

동기적으로 발생한다는 것은 리액트 컴포넌트가 useLayoutEffect가 실행이 종료될 때까지 기다린 다음에 화면을 그린다는 것을 의미한다.
따라서 이러한 작동 방식으로 인해 성능에 문제가 생길 수 있다.

useLayoutEffect특징상 DOM은 계산 됐지만 화면에 반영되기전에 하고 작업이 있을때와 같이 반드시 필요할 때만 사용하는 것이 좋다.

### 3.1.10 useDebugValue

디버깅하고 싶은 정보를 이 훅에다 사용시 리액트 개발자도구에서 볼 수 있다.
사용자 정의 훅 내부의 내용에 대한 정보를 남길 수 있는 훅이다.
오직 다른 훅 내부에서만 실행할 수 있다.

### 3.1.11 훅의 규칙

1. 최상위에서 훅을 호출해야한다. 반복문이나 조건문,중첩된 함수 내에서 훅을 실행할 수 없다.
2. 훅을 호출할 수 있는것은 리액트 함수형 컴포넌트,사용자 정의 훅은 두 가지 경우 뿐이다.

리액트 훅은 파이버 객체의 링크드 리스트의 호출 순서에 따라 저장된다.
그 이유는 각 훅이 파이버 객체 내에서 순서에 의존해 state나 effect의 결과에 대한 값을 저장하고 있기 때문이다.

고정된 순서에 의존해 훅과 관련된 정보를 저장함으로써 이전 값에 대한 비교와 실행이 가능해진다.

순서가 깨지거나 보장되지 않을 경우 에러를 발생시킨다.

### 3.1.12 정리

<br>

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

### 3.2.1 사용자 정의 훅

### 3.2.2 고차 컴포넌트

### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

### 3.2.4 정리

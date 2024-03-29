# 05장: 리액트와 상태 관리 라이브러리

<br>

- [05장: 리액트와 상태 관리 라이브러리](#05장-리액트와-상태-관리-라이브러리)
  - [5.1 상태 관리는 왜 필요한가?](#51-상태-관리는-왜-필요한가)
    - [5.1.1 리액트 상태 관리의 역사](#511-리액트-상태-관리의-역사)
  - [5.2 리액트 훅으로 시작하는 상태 관리](#52-리액트-훅으로-시작하는-상태-관리)
    - [5.2.1 가장 기본적인 방법: useState와 useReducer](#521-가장-기본적인-방법-usestate와-usereducer)
    - [5.2.2 지역 상태의 한계를 벗어나보자: useState의 상태를 바깥으로 분리하기](#522-지역-상태의-한계를-벗어나보자-usestate의-상태를-바깥으로-분리하기)
    - [5.2.3 useState와 Context를 동시에 사용해 보기](#523-usestate와-context를-동시에-사용해-보기)
    - [5.2.4 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기](#524-상태-관리-라이브러리-recoil-jotai-zustand-살펴보기)

<br>

## 5.1 상태 관리는 왜 필요한가?

웹 애플리케이션에서 상태로 분류될 수 있는 것들은 대표적으로 다음과 같은 것이 있다.

**1. UI**

다크/라이트 모드, 라디오를 비롯한 각종 input, 알림창의 노출 여부 등

**2. URL**

브라우저에서 관리되고 있는 상태값으로 `https://www.airbnb.ci.kr/rooms/34113?adults=2`와 같은 주소가 있을 때 roomId=34113과 adults=2라는 상태가 존재한다.

**3. form**

로딩 중인지(loading), 현재 제출됐는지(submit), 접근이 불가능한지(disabled), 값이 유요한지(validate) 등 모두가 상태로 관리된다.

**4. 서버에서 가져온 값**

서버로 요청을통해 가져온 값도 상태로 볼 수 있다. 대표적으로 API 요청이 있다.

### 5.1.1 리액트 상태 관리의 역사

#### Flux 패턴의 등장

2014년, 리액트가 등장한 시기에 Flux 패턴이 소개되었다. Flux는 웹 애플리케이션이 점점 더 복잡해지고 상태 데이터가 증가함에 따라, 상태 변화를 추적하고 이해하기 어려운 문제에 대응하기 위해 고안되었다.
그당시 웹 애플리케이션이 비대해지고 상태(데이터)도 많아짐에 따라 어디서 어떤 일이 일어나서 이 상태가 변했는지 등을 추적하고 이해하기 여려운 상황이었다.

페이스북 팀은 이러한 문제의 원인을 양방향 데이터 바인딩에서 비솟된 것으로 보았다. 양방향 바인딩은 뷰(HTML)가 모델(JS)을 변경할 수 있고, 반대로 모델도 뷰를 변경할 수 있는 구조를 말한다. 이는 초기에는 간단해 보일 수 있지만, 코드의 양과 복잡성이 증가함에 따라 관리가 어려워진다.
페이스북 팀은 이러한 문제에 대응하기 위해 단방향 데이터 흐름을 제안했고, 이것이 바로 Flux패턴의 시작이되었다.

![](https://velog.velcdn.com/images/hyunjoong/post/fdafdb3e-b455-4d35-8f79-3047b8340090/image.png)

- 액션(action): 어떠한 작업을 처리할 액션과 그 액션 발생 시 함께 포함시킬 데이터를 의미한다. 액션 타입과 데이터를 각각 정의해 이를 디스패처로 보낸다.
- 디스패처(dispatcher): 액션을 스토어로 보내는 역할을 한다.
- 스토어(store): 실제 상태에 따른 값과 상태를 변경할 수 있는 메서드를 가지고 있다.
- 뷰(view): 리액트의 컴포넌트에 해당하는 부분으로, 스토어에서 만들어진 데이터를 가져와 화면을 렌더링하는 역할을 한다.

#### 시장 지배자 리덕스의 등장

리액트와 단방향 데이터 흐름이 점차 더 주목받는 다운데, 리덕스(Redux)가 등장했다. 리덕스는 Flux 구조를 구현하기 위해 만들어진 라이브러리 중 하나로 시작되었으며, 이후 Elm 아키텍처를 도입하여 발전했다. 리덕스는 하나의 상태 객체를 스토어에 저장하고, 이를 업데이트하는 작업을 디스패치하여 수행한다. 이 작업은 reducer함수를 통해 이루어지며,이 함수는 웹 애플리케이션의 상태에 대한 완전한 복사본을 반환한 후에 새롭운 상태를 애플리케이션에 전파한다

리덕스의 등장은 리액트 생태계의 많은 영향을 미쳤다. 이를 통해 상태값을 하위 컴포넌트로 전달하는데 필요한 props의 계층 구조 문제를 해결할 수 있었고, 스토어가 필요한 컴포넌트는 connect를 사용하여 스토어에 쉽게 접근할 수 있었다.
그러나 상태를 변경하기 위해서는 많은 과정이 필요했다. 액션 타입을 선언하고, 액션을 수행할 함수를 만들고, 디스패처와 셀렉터도 필요했기 때문데 보일러플레이트가 많았다.

  <br>

## 5.2 리액트 훅으로 시작하는 상태 관리

### 5.2.1 가장 기본적인 방법: useState와 useReducer

useState의 등장으로 리액트에서는 여러 컴포넌트에 걸쳐 손쉽게 동일한 인터페이스의 상태를 생성하고 관리할 수 있게 됐다.

### 5.2.2 지역 상태의 한계를 벗어나보자: useState의 상태를 바깥으로 분리하기

useState는 리액트가 만든 클로저 내부에서 관리되어 지역 상태로 생성되기 때문에 해당 컴포넌트에서만 사용할 수 있다는 단점이 있다. 그러나 만약 useState가 클로저가 아닌 다른 자바스크립트 실행 문맥 어디에서든 초기화되고 관리된다면 어떨까?

### 5.2.3 useState와 Context를 동시에 사용해 보기

서로 다른 스코프에서 스토어의 구조는 동일하되, 여러 개의 서로 다른 데이터를 공유해 사용하고 싶다면?
가장 먼저 떠오르는 방법은 `createSotre`를 이용해 동일한 타입으로 스토어를 여러 개 만드는 것이다.

```javascript
const store1 = createStore({ count: 0 });
const store2 = createStore({ count: 0 });
const store3 = createStore({ count: 0 });
```

그러나 이 방법은 완벽하지도 않고 매우 번거롭다.
이 문제를 해결하는 좋은 방법으로는 리액트의 `Context`다. 이 것을 활용해 해당 스토어를 하위 컴포넌트에 주입한다면 컴포넌트에서는 자신이 주입된 스토어에 대해서만 접근할 수 있게 될 것이다.

- useState, useReducer가 가지고 있는 한계, 컴포넌트 내부에서만 사용할 수 있는 지역 상태라는 점을 극복하기 위해 외부 어딘가에 상태를 둔다. 이는 컴포넌트의 최상단 내지는 상태가 필요한 부모가 될 수도 있고, 혹은 격리된 자바스크립트 스코프 어딘가일 수도 있다.
- 이 외부의 상태 변경을 각자의 방식으로 감지해 컴포넌트의 렌더링을 일으킨다.

### 5.2.4 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기

`Recoil`과`Jotai`는 Context과 Provider, 그리고 훅을 기반으로 가능한 작은 상태를 효율적으로 관리하는 데 초점을 맞추고 있다. 그리고 Zustand는 리덕스와 비슷하게 하나의 큰 스토어를 기반으로 상태를 관리하는 라이브러리다.

`Zustand`는 리덕스와 비슷하게 큰 스토어를 기반으로 상태를 라이브러리다. Recoil, Jotail와는 다르게 이 하나의 큰 스토어는 Context가 아니라 **스토어가 가지는 클로저를 기반으로 생성되며**, 이 스토어의 상태가 변경되면 이 상태를 구독하고 있는 컴포넌트에 전파해 리렌더링을 알리는 방식이다.

#### Recoil

- 리액트에서 훅의 개념으로 상태 관리를 시작한 최초의 라이브러리 중 하나이며, 최소 상태 개념인 Atom을 처음 리액트 생태계에서 선보이기도 했다.
- 2020년 처음 만들어졌지만 정식으로 출시한 라이브러리가 아니라 실험적으로 개발되고 운영되는 라이브러리다.

#### Jotail

- jotai는 상향식(bottom-up)접근법을 취하고 있다고 나와있는데 이는 리덕스와 같이 하나의 큰 상태를 애플리케이션에 내려주는 방식이 아니라, 작은 단위의 상태를 위로 전파할 수 있는 구조를 취하고 있음을 의미한다. 리액트 Context의 문제점인 불필요한 리렌더링이 일어난다는 문제점을 해결하고자 설계돼 있으며, 추가적으로 개발자들이 메모이제이션이나 최적화를 거치지 않아도 리렌더링이 발생되지 않도록 설계돼 있다.

#### Zutand

jotail가 Recoil의 영감을 받아 만들어졌다면, Zustand는 리덕스에 영감을 받아 만들어졌다. 즉 atom이라는 개념으로 최소 단위의 상태를 관리하는 것이 아니라 Zustand에서는 하나의 스토어를 중앙 집중형으로 활용해 이 스토어 내부에서 상태를 관리하고 있다. 따라서 Zutand를 이해하려면 하나의 큰 스토어가 어떻게 만들어지는지를 먼저 살펴봐야 한다.

### 5.2.5 정리

각 상태 관리 라이브러리가 상태를 관리하는 방식에는 조금씩 차이가 있지만 리액트에서 리렌더링을 일으키기 위한 방식은 제한적이기 때문에 어떠한 방식으로 상태를 관리하든지 간에 리렌더링을 만드는 방법은 모두 거의 동일하다. 따라서 각 라이브러리별로 특징을 잘 파악하고, 현재 애플리케이션의 상황과 철학에 맞는 상태 관리 라이브러리를 적절하게 선택해 사용한다면 효율적인 애플리케이션을 만드는 데 도움이 될 것이다.

한 가지 더 중요한 점은 npm에서 제공하는 모든 라이브러리와 마찬가지로 메인테이너가 많고 다운로드가 활발하며 이슈가 관리가 잘 되고 있는 라이브러리를 선택하는 것이 좋다

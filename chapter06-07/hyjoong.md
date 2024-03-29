# 06장: 리액트 개발 도구로 디버깅하기

<br>

- [06장: 리액트 개발 도구로 디버깅하기](#06장-리액트-개발-도구로-디버깅하기)
  - [6.1 리액트 개발 도구란?](#61-리액트-개발-도구란)
  - [6.2 리액트 개발 도구 설치](#62-리액트-개발-도구-설치)
  - [6.3 리액트 개발 도구 활용하기](#63-리액트-개발-도구-활용하기)
    - [6.3.1 컴포넌트](#631-컴포넌트)
    - [6.3.2 프로파일러](#632-프로파일러)

<br>

## 6.1 리액트 개발 도구란?

react-dev-tool은 애플리케이션을 디버깅하기 위해 만들어졌으며, 리액트 웹뿐만 아니라 리액트 네이티브 등 다양한 플랫폼에서 사용할 수 있다.
웹 개발 환경에서 브라우저 확장 프로그램을 사용하면 편리하게 사용할 수 있다.
<br>

## 6.2 리액트 개발 도구 설치

브라우저에 리액트 개발 도구를 브라우저 확장 도구로 설치한다
<br>

## 6.3 리액트 개발 도구 활용하기

크롬 개발자 도구에 `Components`와 `Profiler`가 추가된 것을 확인할 수 있다.
이 두 탭이 리액트 개발자 도구에서 제공하는 디버그 도구다.

### 6.3.1 컴포넌트

Components 탭에서는 리액트 애플리케이션의 컴포넌트 트리를 확인할 수 있다. 컴포넌트의 구조뿐만 아니라 props와 내부 hooks 등 다양한 정보를 확인할 수 있다.

#### 6.3.2 컴포넌트 트리

components의 왼쪽 영역은 리액트 페이지의 컴포넌트 트리를 나타낸다. 트리 구조로 구성돼 있으며, 리액트 애플리케이션 전체의 트리 구조를 한눈에 보여준다

#### 컴포넌트 props

해당 컴포넌트가 받은 props를 확인할 수 있다. 단순한 원시값뿐만 아니라 함수도 포함돼 있다.

#### 컴포넌트 hooks

컴포넌트에서 사용 중인 훅 정보를 확인할 수 있다.

### 6.3.2 프로파일러

컴포넌트 메누가 정적인 현재 리액트 컴포넌트 트리의 내용을 디버깅하기 위한 도구라면 프로파일러는 리액트가 렌더링하는 과정에서 발생하는 상황을 확인하기 위한 도구다. 즉 리액트 애플리케이션이 렌더링되는 과정에서 어떤 컴포넌트가 렌더링됐는지, 또 몇 차례나 렌더링이 일어났으며 어떤 작업에서 오래 걸렸는지 등 컴포넌트 렌더링 과정에서 발생하는 일을 확인할 수 있다.

> 컴포넌트가 렌더링될 때마다 강조 표시를 하고싶으면 `Highlight updates when components render` 옵션을 키면 된다.

#### 프로파일링 메뉴

리액트가 렌더링할 때 어떠한 일이 벌어지는지 확인할 수 있는 도구다.

첫 번째 버튼을 눌러서 프로파일링을 시작하고 두 번째 버튼을 눌러서 새로고침 후 프로파일링 시작 버튼을 누른 후 다시 첫 번째 버튼을 눌러서 프로파일링을 중단해서 디버깅을 해볼 수 있다

#### FlameGraph

![image](https://github.com/hyjoong/ncnc/assets/70426440/073d0569-6779-40aa-9d7c-4c2ade92d34d)

![image](https://github.com/hyjoong/ncnc/assets/70426440/946cb9bf-e518-4e39-9751-7a92cf9049b7)

> 7번 째 렌더링에서는 styled-components로 작성한 컴포넌트까지 렌더링이될 예정인 것을 확인할 수 있다.

위에 차트처럼 생긴 `FlameGraph`탭에서 렌더 커밋별로 어떠한 작업이 일어났는지 확인할 수 있다.

> 노란색에 가까울수록 렌더링에 오래 걸린 컴포넌트며, 녹색에 가까울수록 빠르게 렌더링된 컴포넌트다. 회색으로 표시된 컴포넌트는 아예 렌더링되지 않은 컴포넌트다

#### Ranked

해당 커밋에서 렌더링하는 데 오랜 시간이 걸린 컴포넌트를 순서대로 나열한 그래프다

![image](https://github.com/hyjoong/ncnc/assets/70426440/c59e2b78-5250-4361-aa58-c33c412e4de1)

앞서 다룬 FlameGraph와의 차이점은 모든 컴포넌트를 보여주는 것이 아니라 **렌더링이 발생한** 컴포넌트만 보여준다.

#### 타임라인

Timeline에는 시간이 지남에 따라 컴포넌트에서 어떤 일이 일어났는지를 확인할 수 있다

![image](https://github.com/hyjoong/ncnc/assets/70426440/281b9abd-e933-4948-a475-651f9bbb0214)

#### 프로파일러로 렌더링 원인 파악해서 수정해 보기

<br>

# 07장: 크롬 개발자 도구를 활용한 애플리케이션 분석

<br>

- [07장: 크롬 개발자 도구를 활용한 애플리케이션 분석](#07장-크롬-개발자-도구를-활용한-애플리케이션-분석)
  - [7.1 크롬 개발자 도구란?](#71-크롬-개발자-도구란)
  - [7.2 요소 탭](#72-요소-탭)
    - [7.2.1 요소 화면](#721-요소-화면)
    - [7.2.2 요소 정보](#722-요소-정보)
  - [7.3 소스 탭](#73-소스-탭)
  - [7.4 네트워크 탭](#74-네트워크-탭)
  - [7.5 메모리 탭](#75-메모리-탭)
    - [7.5.1 자바스크립트 인스턴스 VM 선택](#751-자바스크립트-인스턴스-VM-선택)
    - [7.5.2 힙 스냅샷](#752-힙-스냅샷)
    - [7.5.3 타임라인 할당 계측](#753-타임라인-할당-계측)
    - [7.5.4 할당 샘플링](#754-할당-샘플링)
  - [7.6 Next.js 환경 디버깅하기](#76-Next.js-환경-디버깅하기)
    - [7.6.1 Next.js 프로젝트를 디버그 모드로 실행하기](#761-Next.js-프로젝트를-디버그-모드로-실행하기)
    - [7.6.2 Next.js 서버에 트래픽 유입시키기](#762-Next.js-서버에-트래픽-유입시키기)
    - [7.6.3 Next.js의 메모리 누수 지점 확인하기](#763-Next.js의-메모리-누수-지점-확인하기)

<br>

## 7.1 크롬 개발자 도구란?

웹 페이지에서 일어나는 거의 모든 일을 확인할 수 있는 강력한 개발 도구다.
웹사이트에서 제대로 디버깅하고 싶다면 시크릿 모드에서 개발자 도구를 여는 것을 권장한다. (브라우저에 설치돼 있는 확장프로그램 없이 사용 환경 구성)
<br>

## 7.2 요소 탭

Element탭으로 웹페이지를 구성하는 HTML, CSS 등의 정보를 확인할 수 있다.

### 7.2.1 요소 화면

HTML을 보는 것뿐만 아니라 직접 코드를 수정해서 웹페이지에서 어떻게 보이는지 빠르게 확인할 수 있다.

### 7.2.2 요소 정보

요소 탭 오른쪽에서는 해당 요소와 관련된 정보를 얻을 수 있다.
<br>

## 7.3 소스 탭

웹 애플리케이션을 불러오기 위해 실행하거나 참조된 모든 파일을 확인할 수 있다. JS파일부터, CSS, HTML, 폰트까지 다양한 파일 정보를 확인할 수 있다.

![image](https://github.com/hyjoong/ncnc/assets/70426440/1f5bfaa1-85dc-4ebe-a8fe-dfa0cc16fc44)

> 개발 모드로 실행한 웹사이트에서 크롬 개발자 도구를 연 뒤 '열기'로 파일을 찾는 모습

소스 탭의 장점은 단순히 파일을 볼 수 있다는 데서 그치지 않고, DOM 중단점을 만들어 DOM이 변경되는 과정을 디버깅해 볼 수 있었던 것과 마찬가지로 여기서도 소스 중단점을 생성해 자바스크립트 실행을 중단시키고 디버깅을 수행할 수 있다. 이는 debugger을 선언하는 것과 동일한 역할을 한다
<br>

## 7.4 네트워크 탭

웹 페이지를 접속하는 순간부터 발생하는 모든 네트워크 관련 작동이 기록된다.

스크린 숏 캡처 기능을 활용하면 네트워크 요청 흐름에 따라 웹페이지가 어떻게 로딩되고 있는지 확인할 수 있다.
![image](https://github.com/hyjoong/ncnc/assets/70426440/984548b3-1f07-4769-a36b-a930f43a0f51)

#### 네트워크 탭을 통해 집중적으로 확인해 봐야 하는 부분

1. 불필요한 요청 또는 중복되는 요청이 없는지
2. 웹페이지 구성에 필요한 리소스 크기가 너무 크지 않은지
3. 리소스를 불러오는 속도는 적절한지 또는 너무 속도가 오래 걸리는 리소스는 없는지
4. 리소스가 올바른 우선순위로 다운로드되어 페이지를 자연스럽게 만들어가는지

   <br>

## 7.5 메모리 탭

현재 웹페이지가 차지하고 있는 메모리 관련 정보를 확인할 수 있다.

- 힙 스냅샷: 메모리 상황을 사진 찍듯이 촬영할 수 있다. 현재 시점의 메모리 상황을 알고싶다면 힙 스냅샷을 활용하면 된다.
- 타임라인의 할당 계측: 현재 시점의 메모리 상황이 아닌, 시간의 흐름에 따라 메모리의 변화를 살펴보고 싶다면 타임라인의 할당 게측을 사용하면 된다. 주로 로딩이 되는 과정의 메모리 변화 또는 페이지에서 어떠한 상호작용을 했을 때 메모리의 변화 과정을 알고 싶을 때 사용한다.

- 할당 샘플링: 메모리 공간을 차지하고 있는 자바스크립트 함수를 볼 수 있다.

### 7.5.1 자바스크립트 인스턴스 VM 선택

![image](https://github.com/hyjoong/ncnc/assets/70426440/38ef6794-d158-41ca-8190-e73854196142)

### 7.5.2 힙 스냅샷

현재 페이지의 메모리 상태를 확인해 볼 수 있는 메모리 프로파일 도구다. 힙 스냅샷을 촬영하는 시점을 기준으로 마치 사진으로 촬영하듯 메모리 현황을 보여준다.

### 7.5.3 타임라인 할당 계측

시간의 흐름에 따라 메모리 변화를 확인할 수 있는 기능이다. 시간의 흐름에 따라 메모리의 변화를 모두 기록하기 때문에 상대적으로 많은 부담이 발생한다.

![image](https://github.com/hyjoong/ncnc/assets/70426440/8e1a9f3d-9d8e-428a-bde7-fe50a090c2cc)

### 7.5.4 할당 샘플링

시간의 흐름에 따라 발생하는 메모리 점유를 확인할 수 있다는 점에서 할당 계측과 비슷하지만 JS 실행 스택별로 분석할 수 있고, 이 분석을 함수 단위로 한다는 차이점이 있다.
![image](https://github.com/hyjoong/ncnc/assets/70426440/fb35ceac-76f7-42f1-9db8-3552eba6d1aa)
<br>

## 7.6 Next.js 환경 디버깅하기

만약 서버 사이드 렌더링을 수행하는 자바스크립트 환경에서 메모리 누수가 발생한다면 어떻게 될까? 메모리 누수가 발생한다면 서버 자체에 부담이 발생할 것이고, 서버의 부담은 곧 모든 사용자가 서비스를 사용할 수 없는 심각한 상황을 초래하게 될 것이다.

### 7.6.1 Next.js 프로젝트를 디버그 모드로 실행하기

Next.js 프로젝트를 디버그 모드로 실행하는 것이다. 디버그 모드로 실행하려면 다음과 같은 방법으로 Next.js 프로젝트를 실행한다.

```javascript
"dev": NODE_OPTIONS='--inspect' next dev
```

![image](https://github.com/hyjoong/ncnc/assets/70426440/1ab5f156-d5d0-4928-876f-0e697009033a)

이렇게 웹소켓 주소가 나타나면 디버거에 연결된 준비가 된 것이다.

크롬 부라우저에서 `chrome://inspect`로 이동하자
![image](https://github.com/hyjoong/ncnc/assets/70426440/7a9b7b91-1e19-4df7-a120-0a4114b01626)

`Open dedicated DevTools for Node`를 클릭해서 새로운 개발자 도구를 열수도 있다.

### 7.6.2 Next.js 서버에 트래픽 유입시키기

서버 사이드 렌더링과 같이 서버에서 제공되는 서비스의 경우 서버를 실행한 뒤 사용자가 서서히 유입되면서 메모리 누수가 발생하는 경우가 많다. 따라서 서버에 직접 트래픽을 발생시켜서 확인하는 편이 제일 확실한 방법이다.

### 7.6.3 Next.js의 메모리 누수 지점 확인하기

Next.js 프로젝트에서 getServerSideProps에 메모리 누수가 발생할 코드를 작성해서 프로파일링해보면 메모리 누수를 확인할 수 있다 (466p~468p)

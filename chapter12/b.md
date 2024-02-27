# 12장: 모든 웹 개발자가 관심을 가져야 할 핵심 웹 지표

- [12장: 모든 웹 개발자가 관심을 가져야 할 핵심 웹 지표](#12장-모든-웹-개발자가-관심을-가져야-할-핵심-웹-지표)
  - [12.1 웹사이트와 성능](#121-웹사이트와-성능)
  - [12.2 핵심 웹 지표(Core Web Vitals)란?](#122-핵심-웹-지표core-web-vitals란)
  - [12.3 최대 콘텐츠풀 페인트(LCP)](#123-최대-콘텐츠풀-페인트lcp)
    - [`DocumentContentLoaded` 이벤트와 `IntersectionObserver` API 그리고 LCP](#documentcontentloaded-이벤트와-intersectionobserver-api-그리고-lcp)
      - [`DocumentContentLoaded` 이벤트](#documentcontentloaded-이벤트)
      - [`IntersectionObserver`](#intersectionobserver)
    - [개선 방안1: 코드 스플리팅](#개선-방안1-코드-스플리팅)
    - [개선 방안2: 이미지 최적화](#개선-방안2-이미지-최적화)
    - [개선 방안3: 서버 사이드 렌더링(SSR) 또는 정적 사이트 생성(SSG)](#개선-방안3-서버-사이드-렌더링ssr-또는-정적-사이트-생성ssg)
    - [개선 방안4: 자바스크립트 및 CSS 최적화](#개선-방안4-자바스크립트-및-css-최적화)
    - [개선 방안5: 캐싱 전략](#개선-방안5-캐싱-전략)
  - [12.4 최초 입력 지연(FID)](#124-최초-입력-지연fid)
    - [12.4.1 정의](#1241-정의)
    - [12.4.2 의미](#1242-의미)
    - [12.4.3 예제](#1243-예제)
    - [12.4.4 기준 점수](#1244-기준-점수)
    - [12.4.5 개선 방안](#1245-개선-방안)
  - [12.5 누적 레이아웃 이동(CLS)](#125-누적-레이아웃-이동cls)
    - [12.5.1 정의](#1251-정의)
    - [12.5.2 의미](#1252-의미)
    - [12.5.3 예제](#1253-예제)
    - [12.5.4 기준 점수](#1254-기준-점수)
    - [12.5.5 개선 방안](#1255-개선-방안)
    - [12.5.6 핵심 웹 지표는 아니지만 성능 확인에 중요한 지표들](#1256-핵심-웹-지표는-아니지만-성능-확인에-중요한-지표들)
  - [12.6 정리](#126-정리)
  - [References](#references)

<br>

## 12.1 웹사이트와 성능

<br>

## 12.2 핵심 웹 지표(Core Web Vitals)란?

**[정의]**

Core Web Vitals은 구글이 웹사이트의 사용자 경험을 평가하기 위해 도입한 지표입니다. 이 지표들은 웹 페이지의 성능을 측정하고, 사용자가 사이트와 상호작용할 때의 경험을 개선하는 데 중점을 둡니다. 구글은 사용자 경험을 중시하기 때문에, LCP와 같은 코어 웹 바이탈 지표들이 검색 결과 순위에 영향을 줄 수 있다고 밝힌 바 있습니다.

| 코어 웹 바이탈 지표 | 설명 | 이상적인 값 | metrics |
|-------------------|------|-----------|-----------|
| 가장 큰 콘텐츠의 그리기 (LCP) | 페이지 로드 시 가장 큰 콘텐츠가 화면에 표시되는 데 걸리는 시간을 측정합니다. | 2.5초 이내 | <img src="https://web.dev/static/articles/vitals/image/largest-contentful-paint-ea2e6ec5569b6.svg" alt="LCP" width="300" /> |
| 첫 입력 지연 (FID) | 사용자가 페이지와 상호작용한 후 브라우저가 반응하기 시작하는 시간을 측정합니다. | 100밀리초 이하 | <img src="https://web.dev/static/articles/vitals/image/first-input-delay-thresho-4329fd6d1129a.svg" alt="LCP" width="300" /> |
| 누적 레이아웃 이동 (CLS) | 페이지 로드 중 레이아웃의 예기치 않은 변화를 측정합니다. | 0.1 이하 | <img src="https://web.dev/static/articles/vitals/image/cumulative-layout-shift-t-5d49b9b883de4.svg" alt="LCP" width="300" /> |

> 이러한 메트릭 각각에 대해 대부분의 사용자에게 추천된 목표를 달성하고 있는지 확인하기 위해 좋은 임계값은 모바일 및 데스크탑 장치를 기준으로 페이지 로드의 75번째 백분위수입니다.

<br>

## 12.3 최대 콘텐츠풀 페인트(LCP)

LCP는 'Largest Contentful Paint'의 약자로, 사용자가 페이지에 처음 접근한 후 주요 콘텐츠가 로드되고 화면에 표시되기까지의 시간을 나타냅니다. 여기서 '주요 콘텐츠'란 큰 이미지, 비디오, 또는 텍스트 블록 같은 것을 의미합니다. 구글은 LCP를 2.5초 이내로 유지하는 것을 권장하고 있으며, 이는 사용자들이 페이지를 빠르게 로드하고 정보를 얻기를 원하기 때문입니다.

웹사이트 개발자나 소유자는 LCP를 개선하기 위해 이미지 최적화, 서버 응답 시간 단축, 클라이언트-사이드 렌더링 최적화, CSS 및 자바스크립트의 효율적인 로딩 등 다양한 방법을 모색할 수 있습니다.

LCP 리소스가 얼마나 빨리 로드될 수 있는지에 영향을 미치는 두 가지 요소:
1. 리소스가 발견된 시점.
2. 리소스에 할당된 우선 순위.

### `DocumentContentLoaded` 이벤트와 `IntersectionObserver` API 그리고 LCP

`DocumentContentLoaded` 이벤트와 `IntersectionObserver` API는 직접적으로 LCP를 측정하지는 않지만, 웹 페이지의 로딩 성능과 사용자 경험을 개선하는 데 중요한 역할을 하여 간접적으로 LCP에 영향을 미칩니다.

#### `DocumentContentLoaded` 이벤트
`DocumentContentLoaded` 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생하는 이벤트입니다. 이 이벤트는 스크립트, 스타일시트, 이미지, 프레임 등과 같은 외부 리소스의 로드 여부와는 무관하게 발생합니다. 이는 DOM이 준비되었음을 나타내며, 자바스크립트를 통해 DOM 조작을 시작할 수 있는 시점을 알려줍니다.

비록 `DocumentContentLoaded`가 LCP 직접적인 계산에 포함되지는 않지만, 페이지 로딩 프로세스에서 초기 DOM 구성이 완료되었음을 알려주므로, 이후에 발생하는 큰 콘텐츠 요소의 로드 시간에 영향을 줄 수 있습니다.

#### `IntersectionObserver`
`IntersectionObserver` API는 웹 개발자가 웹페이지의 특정 요소가 뷰포트에 들어오거나 나갈 때 비동기적으로 알림을 받을 수 있게 해주는 기능입니다. 이 API를 사용하면, 리소스를 게으른 로딩(lazy loading)하는 등의 최적화를 통해 성능을 향상시킬 수 있습니다.

LCP와의 관계에서 `IntersectionObserver`는 페이지의 가장 큰 콘텐츠 요소가 사용자의 뷰포트에 어떻게 진입하는지 감시하고, 불필요한 리소스 로드를 피함으로써 LCP를 개선할 수 있는 기회를 제공합니다. 예를 들어, 사용자가 스크롤하지 않은 페이지 하단에 있는 큰 이미지는 `IntersectionObserver`를 사용하여 사용자가 해당 이미지에 도달할 때까지 로드하지 않도록 설정할 수 있습니다. 이러한 게으른 로딩(Lazy Loading)은 초기 로드 시간을 단축시켜 LCP를 개선하는 데 도움이 됩니다.

### 개선 방안1: 코드 스플리팅
LCP(Largest Contentful Paint)를 개선하기 위해 React 애플리케이션에서 코드 스플리팅을 사용하는 것은 성능 최적화의 중요한 방법 중 하나입니다. 코드 스플리팅을 통해 불필요한 코드 로딩을 줄이고 사용자에게 필요한 코드만 우선적으로 로드하여 초기 로딩 시간을 단축시킬 수 있습니다.

1. **`React.lazy`와 `Suspense` 활용**: `React.lazy` 함수를 사용하면 동적으로 컴포넌트를 불러올 수 있으며, `Suspense` 컴포넌트를 사용하여 로딩 상태를 처리할 수 있습니다.

   ```jsx
   import React, { Suspense } from 'react';

   const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

   function MyComponent() {
     return (
       <Suspense fallback={<div>로딩 중...</div>}>
         <HeavyComponent />
       </Suspense>
     );
   }
   ```

2. **Route-based splitting**: 페이지 또는 라우트 기반으로 코드를 분할하는 것입니다. 이 방법은 사용자가 현재 필요로 하는 라우트의 코드만 로드하기 때문에 효과적입니다.

   ```jsx
   // React Router와 함께 사용
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
   import React, { Suspense, lazy } from 'react';

   const Home = lazy(() => import('./routes/Home'));
   const About = lazy(() => import('./routes/About'));

   const App = () => (
     <Router>
       <Suspense fallback={<div>로딩 중...</div>}>
         <Switch>
           <Route exact path="/" component={Home}/>
           <Route path="/about" component={About}/>
         </Switch>
       </Suspense>
     </Router>
   );
   ```

3. **Webpack의 Magic Comments**: `Webpack`을 사용하는 경우, `Magic Comments`를 활용하여 청크 이름을 지정하고, 프리로드 또는 프리패치 설정을 할 수 있습니다.

   ```jsx
   import(/* webpackChunkName: "my-chunk-name" */ './myComponent').then(({ MyComponent }) => {
       // 사용할 컴포넌트 로드 완료
   });
   ```

코드 스플리팅을 적절히 구현하면 LCP를 포함한 다양한 성능 지표가 개선될 수 있습니다. 하지만 모든 컴포넌트나 모듈을 분할하는 것이 항상 좋은 것은 아니므로, 실제 애플리케이션의 로딩 성능을 분석하고 가장 크기가 크고 중요도가 높은 부분부터 분할하는 것이 좋습니다.

### 개선 방안2: 이미지 최적화
LCP(Largest Contentful Paint)를 개선하기 위해 이미지 최적화도 중요합니다.
이미지 최적화의 방법으로 이미지 파일 크기를 압축하거나 `AVIF` 또는 `WebP`와 같은 포맷으로 변경하는 것은 이미지 파일 크기를 줄일 수 있지만, 이는 리소스 로드 시간을 줄일 뿐 LCP를 개선하지 않습니다.

```jsx
import React from 'react';

function ImageComponent() {
  return (
    <img
      src="example-small.jpg"
      // srcSet 과 sizes 속성을 사용하여 다양한 해상도를 가진 디바이스에 맞는 적절한 크기의 이미지를 제공합니다.
      srcSet="example-small.jpg 300w, example-medium.jpg 768w, example-large.jpg 1200w"
      sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, 25vw"
      alt="예제 이미지"
      // loading="lazy" 속성은 브라우저가 지원하는 경우 이미지의 로딩을 지연시키도록 합니다.
      loading="lazy"
      // 이미지의 실제 표시 크기에 맞게 이미지를 리사이즈하여 사용합니다. 너무 큰 이미지는 불필요하게 로딩 시간을 증가시킬 수 있습니다.
      width="200"
      height="200"
    />
  );
}
```

### 개선 방안3: 서버 사이드 렌더링(SSR) 또는 정적 사이트 생성(SSG)
`Next.js`를 사용하여 `SSR` 또는 `SSG`를 구현합니다. `Next.js`는 기본적으로 페이지를 사전에 렌더링합니다.

```jsx
// pages/index.js
function HomePage({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;
```

### 개선 방안4: 자바스크립트 및 CSS 최적화
`Webpack`, `vite`, `rollup`과 같은 모듈 번들러를 사용하여 트리 쉐이킹을 활용하고, 비동기 컴포넌트 로딩을 통해 자바스크립트와 `CSS`를 최적화합니다.

```jsx
// Webpack의 경우, production 모드에서 자동으로 트리 쉐이킹을 수행합니다.
// package.json
{
  "scripts": {
    "build": "webpack --mode production"
  }
}
```

### 개선 방안5: 캐싱 전략
서버나 CDN 설정을 통해 캐싱 전략을 구현합니다. 예를 들어, `Cache-Control` 헤더를 설정할 수 있습니다.

```bash
# Nginx 설정 예시
location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

> `Webpack`, `Next.js` 등의 도구에 대한 추가 설정과 최적화가 필요할 수 있으며, 성능 측정과 분석을 통해 지속적으로 개선해야 합니다.

<br>

## 12.4 최초 입력 지연(FID)
### 12.4.1 정의
### 12.4.2 의미
### 12.4.3 예제
### 12.4.4 기준 점수
### 12.4.5 개선 방안

<br>

## 12.5 누적 레이아웃 이동(CLS)
### 12.5.1 정의
### 12.5.2 의미
### 12.5.3 예제
### 12.5.4 기준 점수
### 12.5.5 개선 방안
### 12.5.6 핵심 웹 지표는 아니지만 성능 확인에 중요한 지표들

<br>

## 12.6 정리

<br>

## References
- [Optimizing performance](https://legacy.reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)
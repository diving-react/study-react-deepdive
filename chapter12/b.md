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
    - [개선 방안6: 중요 자산 미리 로드](#개선-방안6-중요-자산-미리-로드)
  - [12.4 최초 입력 지연(FID)](#124-최초-입력-지연fid)
    - [12.4.1 정의](#1241-정의)
    - [12.4.2 의미](#1242-의미)
    - [12.4.3 예제](#1243-예제)
    - [12.4.4 기준 점수](#1244-기준-점수)
    - [12.4.5 개선 방안](#1245-개선-방안)
      - [개선 방안1: 코드 분할](#개선-방안1-코드-분할)
      - [개선 방안2: 자바스크립트 최적화](#개선-방안2-자바스크립트-최적화)
      - [개선 방안3: 웹 워커 활용](#개선-방안3-웹-워커-활용)
      - [개선 방안4: 효율적인 이벤트 리스너 사용](#개선-방안4-효율적인-이벤트-리스너-사용)
      - [개선 방안5: 서드파티 스크립트 최적화](#개선-방안5-서드파티-스크립트-최적화)
      - [그 밖에 기타 개선 방안:](#그-밖에-기타-개선-방안)
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
LCP(Largest Contentful Paint)를 개선하기 위해 이미지 최적화도 중요합니다. 이미지 최적화의 방법으로 이미지 파일 크기를 압축하거나 `AVIF` 또는 `WebP`와 같은 포맷으로 변경하는 것은 이미지 파일 크기를 줄일 수 있지만, 이는 리소스 로드 시간을 줄일 뿐 LCP를 개선하지 않습니다.

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
  
### 개선 방안6: 중요 자산 미리 로드

LCP(Largest Contentful Paint)의 로딩 속도를 향상시키기 위해 중요 자산을 미리 로드(preload)하는 것은 웹 페이지의 성능 최적화에 있어 중요한 전략 중 하나라고 할 수 있습니다. 중요 자산을 미리 로드하는 것은 브라우저가 페이지를 렌더링할 때 필요한 핵심 파일을 우선적으로 다운로드하도록 지시합니다. 이러한 자산에는 CSS, JavaScript 파일, 폰트, 이미지 등이 포함될 수 있습니다.

1. **`Helmet` 라이브러리 사용하기**: `react-helmet`은 React 컴포넌트의 `<head>`를 수정할 수 있게 해주는 라이브러리입니다. 이를 사용하여 동적으로 `preload` 링크를 추가할 수 있습니다.

  ```jsx
  import { Helmet } from 'react-helmet';

  function MyComponent() {
    return (
      <>
        <Helmet>
          <link rel="preload" href="/path/to/asset.css" as="style" />
          <link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
        </Helmet>
        {/* 컴포넌트의 나머지 부분 */}
      </>
    );
  }
  ```

2. **서버 사이드 렌더링을 사용하는 경우**: 서버 사이드 렌더링(SSR)을 사용하는 경우, 초기 페이지 로드 시 서버에서 생성된 HTML이 브라우저로 전송됩니다. 이 때, 중요 자산을 미리 로드하도록 `<link rel="preload"> `태그를 HTML 문서의 `<head>` 부분에 추가할 수 있습니다. 이렇게 하면 브라우저가 문서를 받은 직후에 지정된 자산을 다운로드하기 시작할 수 있습니다.

    ```jsx
    import Document, { Html, Head, Main, NextScript } from 'next/document';

    class MyDocument extends Document {
      render() {
        return (
          <Html>
            <Head>
              {/* 다른 메타 태그나 링크 태그들 */}
              <link
                rel="preload"
                href="/path/to/your/asset.css"
                as="style"
              />
              <link
                rel="preload"
                href="/path/to/your/font.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
              {/* 기타 필요한 preload 링크들 */}
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
    }

    export default MyDocument;
    ```

    이 코드에서 `<Head>` 컴포넌트 안에 `preload` 링크들을 추가하여, 필요한 CSS 파일과 폰트 파일을 미리 로드하도록 지시하고 있습니다. `crossOrigin="anonymous"` 속성은 `CORS(Cross-Origin Resource Sharing)` 정책을 준수하는 자원에 대해 필요할 수 있습니다.

    SSR 환경에서는 이러한 설정이 매우 중요합니다. 왜냐하면 사용자가 처음 페이지를 방문했을 때 서버로부터 받는 초기 HTML에 이러한 자산들이 미리 선언되어 있어야, 클라이언트 측 JavaScript가 실행되기 전에 브라우저가 중요 자산을 다운로드하기 시작할 수 있기 때문입니다.

3. **`Custom Hook` 사용하기**: React에서는 `custom hook`을 만들어 로직을 재사용할 수 있습니다. 예를 들어, `usePreload` 훅을 만들어 특정 자산을 `preload` 할 수 있습니다.

    ```jsx
    import { useEffect } from 'react';

    function usePreload(href, as) {
      useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;ㅋ
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }, [href, as]);
    }

    // 컴포넌트 안에서 사용 예
    function MyComponent() {
      usePreload('/path/to/asset.css', 'style');
      // 컴포넌트의 나머지 부분
    }
    ```

<br>

## 12.4 최초 입력 지연(FID)

### 12.4.1 정의

최초 입력 지연(FID)은 사용자가 페이지와 상호작용(예: 클릭, 탭)을 시도한 후, 브라우저가 해당 상호작용에 대해 응답을 시작하기까지의 지연 시간을 측정하는 성능 지표입니다. 이는 사용자가 웹사이트의 대화형 요소를 처음으로 조작할 때 발생하는 지연을 측정하여, 실제 사용자 경험의 반응성을 평가합니다.

### 12.4.2 의미

FID는 사용자가 웹사이트와 상호작용하는 첫 순간의 반응 시간이 얼마나 빠른지를 나타내며, 이는 사용자가 웹사이트를 얼마나 '빠르고 반응적'으로 느끼는지에 직접적인 영향을 줍니다. 높은 FID 점수는 사용자가 웹사이트와의 상호작용에 만족하지 못한다는 신호일 수 있으며, 이는 전환율 감소와 같은 부정적인 결과를 초래할 수 있습니다.

### 12.4.3 예제

사용자가 뉴스 기사를 읽다가 '더 보기' 버튼을 클릭했을 때, 버튼 클릭 후 실제로 기사 내용이 확장되어 보이기까지 걸리는 시간이 FID로 측정됩니다. 만약 이 시간이 길다면 사용자는 페이지가 느리게 반응한다고 느낄 것입니다.

### 12.4.4 기준 점수

- 좋음: 100ms 이하
- 개선 필요: 100ms ~ 300ms
- 나쁨: 300ms 이상

웹사이트가 '좋음' 범주에 속하려면 최초 입력 지연이 100ms 이하가 되어야 합니다. 이는 사용자가 페이지와 상호작용할 때 거의 즉각적인 반응을 경험한다는 것을 의미합니다.

### 12.4.5 개선 방안

#### 개선 방안1: 코드 분할

LCP에서 본 것 처럼 `React.lazy`와 `Suspense`를 사용하여 필요한 컴포넌트만 로드하고, 나머지 부분은 필요할 때 가져오도록 합니다. 이렇게 하면 초기 로딩 시간이 줄어들고, 사용자 상호작용에 대한 응답성이 향상됩니다.

#### 개선 방안2: 자바스크립트 최적화

필요하지 않은 `JavaScript` 코드를 제거하거나 비동기적으로 로드하여 메인 스레드의 부하를 줄입니다.

2. **메모이제이션(Memoization)**: `React.memo`, `useMemo`, `useCallback`과 같은 훅을 사용하여 불필요한 렌더링을 방지합니다.

1. **이벤트 핸들러 최적화**: `debounce` 또는 `throttle`을 사용하여 이벤트 핸들러를 최적화할 수 있습니다. 예를 들어, `Lodash` 라이브러리에서 제공하는 `debounce` 함수를 사용하여 스크롤 이벤트를 최적화하는 방법은 다음과 같습니다:

  ```jsx
  import React, { useEffect } from 'react';
  import _ from 'lodash';

  function MyComponent() {
    const handleScroll = _.debounce(() => {
      // 스크롤 이벤트 핸들러 로직
      console.log('Scroll event handled with debounce!');
    }, 200); // 200ms 마다 이벤트 핸들러가 호출되도록 설정

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return <div>스크롤 이벤트 최적화 예제</div>;
  }

  export default MyComponent;
  ```

1. **메모이제이션(Memoization)**: 컴포넌트의 불필요한 렌더링을 방지하기 위해 `React.memo`, `useMemo`, `useCallback`를 사용할 수 있습니다.

```jsx
// 자식 컴포넌트가 `props`가 변경되지 않았다면 불필요하게 렌더링되지 않도록 `React.memo`를 사용하는 방법:
import React, { useMemo, useCallback } from 'react';

// React.memo로 감싼 자식 컴포넌트
// MemoizedChildComponent는 부모 컴포넌트에서 전달받는 props가 변경되지 않으면 재렌더링되지 않습니다.
const MemoizedChildComponent = React.memo(function ChildComponent({ onButtonClick }) {
  console.log('자식 컴포넌트 렌더링');
  return (
    <button onClick={onButtonClick}>클릭</button>
  );
});

function MyComponent() {
  const [count, setCount] = React.useState(0);

  // useCallback을 사용하여 함수가 재생성되는 것을 방지
  const handleButtonClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // useMemo를 사용하여 복잡한 계산 결과를 메모이제이션
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);

  return (
    <div>
      <p>계산된 값: {memoizedValue}</p>
      <MemoizedChildComponent onButtonClick={handleButtonClick} />
    </div>
  );
}

// 복잡한 계산을 수행하는 함수 (예제를 위한 것으로 실제 복잡한 로직을 포함해야 함)
function computeExpensiveValue(a) {
  console.log('복잡한 계산 수행');
  return a * 2; // 실제로는 더 복잡한 계산이 수행됩니다.
}

export default MyComponent;
```

#### 개선 방안3: 웹 워커 활용

웹 워커를 사용하면 복잡한 계산이나 데이터 처리를 백그라운드에서 수행할 수 있으므로, 메인 스레드가 사용자 인터페이스(UI)와 상호작용하는 데 더 많은 자원을 할당할 수 있습니다. 웹 워커를 사용하면 메인 스레드가 UI 업데이트와 이벤트 처리에 집중할 수 있으므로 First Input Delay(FID)를 줄이는 데 도움이 될 수 있습니다.

> 웹 워커는 메인 스레드와 별개로 작동하는 백그라운드 스레드입니다.


**[React.js에서 웹 워커를 사용하여 FID를 줄이는 방법]:**

1. 웹 워커 파일 생성: 복잡한 연산을 수행하는 자바스크립트 코드를 별도의 파일로 만듭니다. 이 파일은 웹 워커 스레드에서 실행됩니다.
2. 웹 워커 초기화: React 컴포넌트 내에서 `new Worker()`를 사용하여 웹 워커를 초기화합니다. 워커 파일의 경로를 인자로 전달해야 합니다.
3. 메시지 전송 및 수신: 메인 스레드와 웹 워커 사이에 `postMessage` 메소드를 사용하여 데이터를 주고받습니다. `onmessage` 이벤트 핸들러를 통해 웹 워커로부터 결과를 수신할 수 있습니다.
4. 웹 워커 종료: 작업이 완료되면 `terminate()` 메소드를 호출하여 웹 워커를 종료합니다.

```javascript
// 웹 워커 파일 (worker.js)
self.addEventListener('message', (e) => {
  const result = performHeavyComputation(e.data);
  postMessage(result);
});

function performHeavyComputation(data) {
  // 복잡한 계산 수행
}
```

```javascript
import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const worker = new Worker('worker.js');

    worker.postMessage(data); // 복잡한 계산을 위해 데이터 전송

    worker.onmessage = (e) => {
      const result = e.data;
      // 결과 처리
    };

    return () => {
      worker.terminate(); // 컴포넌트 언마운트 시 워커 종료
    };
  }, []);

  return (
    // UI 컴포넌트 렌더링
  );
};

export default MyComponent;
```

그러나 모든 브라우저가 웹 워커를 지원하는 것은 아니며, 특히 모바일 환경에서는 지원 여부를 확인해야 합니다.
또 웹 워커와 관련된 성능 개선은 애플리케이션의 복잡성과 사용자의 기대치에 따라 다르게 적용될 수 있으므로, 실제 개발 환경에서 적절한 테스트와 평가가 중요합니다.

#### 개선 방안4: 효율적인 이벤트 리스너 사용

`passive event listeners`를 사용하여 터치 및 스크롤 이벤트 처리 성능을 개선합니다.

> `passive event listeners`:
> "Passive event listeners"는 웹 페이지의 스크롤 성능을 향상시키기 위해 W3C에서 제안된 새로운 기능입니다. 이 기능은 특히 모바일 브라우저에서 터치 및 스크롤 이벤트 처리를 최적화하는 데 도움이 됩니다. Passive event listeners는 이벤트 리스너가 `preventDefault`를 호출하지 않음을 브라우저에 알려줌으로써, 브라우저가 이벤트를 더 빨리 처리할 수 있도록 합니다.

```jsx
import React, { useEffect } from 'react';

function TouchScrollComponent() {
  useEffect(() => {
    // 터치 이벤트 리스너를 추가합니다.
    const handleTouchMove = (event) => {
      // 여기서는 preventDefault를 호출하지 않습니다.
      console.log('Touch move event detected!');
    };

    // passive 옵션을 true로 설정하여 passive listener로 등록합니다.
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div>
      {/* 컴포넌트의 내용 */}
      <p>터치 및 스크롤 이벤트 처리 성능을 개선합니다.</p>
    </div>
  );
}

export default TouchScrollComponent;
```

> 위의 코드에서 `useEffect` 훅은 컴포넌트가 마운트될 때 `touchmove` 이벤트 리스너를 추가하고, 컴포넌트가 언마운트될 때 해당 리스너를 제거합니다. 이벤트 리스너에 `{ passive: true }` 옵션을 주어서 해당 이벤트가 `preventDefault`를 호출하지 않음을 명시하고 있습니다. 이렇게 하면 브라우저가 스크롤 성능을 최적화할 수 있으며, 사용자 인터페이스의 반응성이 향상됩니다.

#### 개선 방안5: 서드파티 스크립트 최적화

필수적이지 않은 서드파티 스크립트의 로딩을 지연시키거나 비동기로 로드합니다.

1. `useEffect` 훅을 사용하여 컴포넌트가 마운트된 후 스크립트를 동적으로 삽입:

    ```jsx
    import React, { useEffect } from 'react';

    function ThirdPartyScripts() {
      useEffect(() => {
        // 서드파티 스크립트의 URL
        const scriptUrl = 'https://example.com/third-party-script.js';

        // 스크립트 엘리먼트 생성
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true; // 스크립트를 비동기로 로드

        // 스크립트 엘리먼트를 문서에 삽입
        document.body.appendChild(script);

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
          document.body.removeChild(script);
        };
      }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

      return (
        <div>
          {/* 여기에 다른 컴포넌트 내용을 넣을 수 있습니다. */}
        </div>
      );
    }

    export default ThirdPartyScripts;
    ```

    > 위 코드는 컴포넌트가 마운트될 때 서드파티 스크립트를 비동기로 로드하고, 컴포넌트가 언마운트될 때 해당 스크립트를 제거합니다. 이렇게 함으로써 페이지 로드 시간에 영향을 미치지 않으면서 필요한 기능을 제공할 수 있습니다.

2. `defer` 속성을 사용:
   문서 파싱 후 스크립트가 실행되도록 지연 로딩할 수도 있습니다. 이 경우, `script.defer = true;`를 설정하면 됩니다.


#### 그 밖에 기타 개선 방안:
  1. **상태 관리 최적화**: 상태 관리 라이브러리(예: Redux, MobX)를 사용할 때, 컴포넌트가 필요로 하는 최소한의 상태만 구독하게 하여 불필요한 업데이트를 방지합니다.
  2. **서버 사이드 렌더링(SSR) 또는 정적 사이트 생성(SSG)**: 초기 페이지 로드 시 서버에서 HTML을 미리 생성하여 전송함으로써 `FID`를 개선할 수 있습니다.
  3. **프로파일링 및 성능 모니터링**: `React DevTools`의 `Profiler`나 `Chrome DevTools` 같은 도구를 사용하여 성능 병목 현상을 찾고 개선합니다.

<br>

## 12.5 누적 레이아웃 이동(CLS)

### 12.5.1 정의
누적 레이아웃 이동(CLS)은 사용자와의 상호 작용 없이 발생하는 시각적 안정성 문제를 측정하는 지표입니다. 페이지 로딩 중 또는 이후에 요소가 예상치 못하게 위치를 변경할 때 발생하는 레이아웃 이동의 정도를 수치로 나타냅니다. CLS 점수는 이러한 이동들의 영향을 합산하여 계산됩니다.

### 12.5.2 의미
CLS는 사용자가 웹사이트를 사용할 때 발생하는 불편함과 혼란을 최소화하기 위해 중요한 지표입니다. 높은 CLS 점수는 페이지 내 요소들이 안정적으로 고정되어 있지 않고 사용자가 읽거나 상호 작용하려 할 때 예기치 않게 움직이는 경우를 나타내며, 이는 사용자 경험을 저해할 수 있습니다.

### 12.5.3 예제
사용자가 기사를 읽는 동안 페이지 상단에 광고가 로드되어 본문 내용이 갑자기 아래로 밀리는 경우, 이러한 레이아웃의 이동이 CLS 점수에 영향을 줍니다. 사용자가 링크를 클릭하려 할 때 위치가 변경되어 다른 링크를 클릭하게 만드는 것도 높은 CLS를 초래합니다.

### 12.5.4 기준 점수
CLS 점수는 0에서 1 사이의 값으로 표현되며, 0에 가까울수록 좋은 성능을 의미합니다. 일반적으로 0.1 이하면 좋은 사용자 경험을, 0.1에서 0.25 사이는 개선이 필요한 수준, 0.25 이상은 나쁜 사용자 경험으로 간주됩니다.

### 12.5.5 개선 방안
CLS를 개선하기 위한 방법으로는 이미지와 광고와 같은 미디어 요소에 고정된 크기를 지정하는 것, 동적 콘텐츠가 로드되기 전에 충분한 공간을 예약하는 것, 웹 폰트 로딩이나 기타 동적 요소로 인한 레이아웃 변화를 피하는 것 등이 있습니다.

### 12.5.6 핵심 웹 지표는 아니지만 성능 확인에 중요한 지표들
CLS는 핵심 웹 바이탈스의 일부분으로, 웹사이트의 사용자 경험을 평가하는 데 중요한 역할을 합니다. 그 외에도 성능 확인에 중요한 지표들로는 웹사이트의 로딩 속도를 나타내는 최대 콘텐츠 페인트(LCP), 서버 응답 시간, 인터랙티브성을 나타내는 시간대비 첫 번째 바이트(TTFB) 등이 있으며, 이러한 지표들도 사용자 경험과 SEO에 영향을 미치므로 주의 깊게 모니터링하고 최적화해야 합니다.

<br>

## 12.6 정리

<br>

## References
- [Optimizing performance](https://legacy.reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)
# 13장: 웹페이지의 성능을 측정하는 다양한 방법

<br>

- [13장: 웹페이지의 성능을 측정하는 다양한 방법](#13장-웹페이지의-성능을-측정하는-다양한-방법)
  - [13.1 애플리케이션에서 확인하기](#131-애플리케이션에서-확인하기)
    - [13.1.1 `create-react-app`](#1311-create-react-app)
      - [`Create React App`에서의 웹 바이탈즈(Web Vitals)](#create-react-app에서의-웹-바이탈즈web-vitals)
      - [`reportWebVitals`](#reportwebvitals)
      - [CRA에서 `reportWebVitals` 함수를 사용하는 예1:웹 성능 지표를 서버로 전송하는 방법](#cra에서-reportwebvitals-함수를-사용하는-예1웹-성능-지표를-서버로-전송하는-방법)
      - [CRA에서 `reportWebVitals` 함수를 사용하는 예2: Google Analytics(GA)를 사용하여 웹 성능 지표를 기록](#cra에서-reportwebvitals-함수를-사용하는-예2-google-analyticsga를-사용하여-웹-성능-지표를-기록)
      - [참고](#참고)
    - [13.1.2 `create-next-app`](#1312-create-next-app)
      - [`NextWebVitalMetrics`](#nextwebvitalmetrics)
      - [사용자 정의 메트릭스](#사용자-정의-메트릭스)
      - [`useReportWebVitals`](#usereportwebvitals)
      - [참고](#참고-1)
  - [13.2 구글 라이트하우스](#132-구글-라이트하우스)
    - [성능 점수 변동 이유](#성능-점수-변동-이유)
    - [Lighthouse의 세 가지 모드: 탐색, 기간 모드(시간 범위), 스냅샷](#lighthouse의-세-가지-모드-탐색-기간-모드시간-범위-스냅샷)
      - [13.2.1 구글 라이트하우스-탐색 모드](#1321-구글-라이트하우스-탐색-모드)
      - [13.2.2 구글 라이트하우스-기간 모드](#1322-구글-라이트하우스-기간-모드)
      - [13.2.3 구글 라이트하우스-스냅샷](#1323-구글-라이트하우스-스냅샷)
    - [Lighthouse의 카테고리](#lighthouse의-카테고리)
      - [1. 성능 (Performance)](#1-성능-performance)
      - [2. 접근성 (Accessibility)](#2-접근성-accessibility)
      - [3. 모범 사례 (Best Practices)](#3-모범-사례-best-practices)
      - [4. SEO (Search Engine Optimization)](#4-seo-search-engine-optimization)
      - [5. PWA (Progressive Web App)](#5-pwa-progressive-web-app)
    - [Lighthouse의 트리맵(Treemap)](#lighthouse의-트리맵treemap)
      - [트리맵의 사용](#트리맵의-사용)
      - [트리맵의 이점](#트리맵의-이점)
    - [Lighthouse의 트레이스(Trace)](#lighthouse의-트레이스trace)
      - [트레이스가 포함하는 정보](#트레이스가-포함하는-정보)
    - [참고](#참고-2)
  - [13.3 WebPageTest](#133-webpagetest)
    - [13.3.1 Performance Summary](#1331-performance-summary)
    - [13.3.2 Opportunities \& Experiments](#1332-opportunities--experiments)
    - [13.3.3 Filmstrip](#1333-filmstrip)
    - [13.3.4 Details](#1334-details)
    - [13.3.5 Vitals](#1335-vitals)
    - [13.3.6 Optimizations](#1336-optimizations)
    - [13.3.7 Content](#1337-content)
    - [13.3.8 Domains](#1338-domains)
    - [13.3.9 Console Log](#1339-console-log)
    - [13.3.10 Detected Technologies](#13310-detected-technologies)
    - [13.3.11 Main-thread Processing](#13311-main-thread-processing)
    - [13.3.12 Lighthouse Report](#13312-lighthouse-report)
    - [13.3.13 기타](#13313-기타)
  - [13.4 크롬 개발자 도구](#134-크롬-개발자-도구)
    - [13.4.1 성능 통계](#1341-성능-통계)
    - [13.4.2 성능](#1342-성능)
  - [13.5 정리](#135-정리)

<br>

## 13.1 애플리케이션에서 확인하기

### 13.1.1 `create-react-app`

#### `Create React App`에서의 웹 바이탈즈(Web Vitals)

CRA 프로젝트에서 `Web Vitals`을 사용하면 사용자 경험을 모니터링하고 개선할 수 있는 좋은 기회가 됩니다. `Create React App`에서는 `web-vitals` 라이브러리를 사용하여 웹 페이지의 성능 메트릭을 측정합니다. 이 라이브러리는 크롬 브라우저에서 측정되는 방식과 일치하게 웹 바이탈즈 메트릭을 측정하고, 구글의 다른 도구들에 보고될 수 있도록 해줍니다.

```js
// reportWebVitals.ts
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

**측정 성능 지표:**
- `getCLS`: Cumulative Layout Shift, 레이아웃 변화로 인한 누적된 변동을 측정합니다.
- `getFID`: First Input Delay, 사용자의 첫 입력에 대한 반응 시간을 측정합니다.
- `getFCP`: First Contentful Paint, 첫 번째 콘텐츠가 화면에 그려지는 데 걸린 시간을 측정합니다.
- `getLCP`: Largest Contentful Paint, 가장 큰 콘텐츠가 화면에 그려지는 데 걸린 시간을 측정합니다.
- `getTTFB`: Time to First Byte, 첫 번째 바이트가 브라우저에 도달하는 데 걸린 시간을 측정합니다.


#### `reportWebVitals`

`reportWebVitals`는 Create React App(CRA) 프로젝트에서 웹 성능 지표를 측정하고 기록하기 위해 사용되는 함수입니다. 이 함수는 Google의 Web Vitals이라는 이니셔티브의 일부로, 웹사이트의 사용자 경험을 개선하기 위한 핵심 지표(Core Web Vitals)를 측정하는 데 도움을 줍니다.

#### CRA에서 `reportWebVitals` 함수를 사용하는 예1:웹 성능 지표를 서버로 전송하는 방법

먼저, 웹 성능 지표를 서버로 전송할 수 있는 `reportWebVitals` 함수를 정의합니다. 이 함수는 각 성능 지표(metric)를 서버로 전송하는 역할을 합니다.

```js
// reportWebVitals.js
export function reportWebVitals(metric) {
  const url = 'https://your-server.com/path-to-your-web-vitals-endpoint'; // 서버의 엔드포인트 URL

  // JSON 형식으로 변환할 metric 객체
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value.toString(),
    id: metric.id,
    label: metric.label,
  });

  // POST 요청을 위한 옵션 설정
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body,
  };

  // fetch API를 이용한 서버로의 요청
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        // 요청 실패 시 콘솔에 에러 로깅
        console.error('웹 성능 지표 보고 실패:', response);
      }
    })
    .catch((error) => {
      // 네트워크 오류 등의 이유로 요청이 실패한 경우
      console.error('웹 성능 지표 보고 실패:', error);
    });
}

// reportWebVitals 함수 내보내기
export function reportWebVitals(metric) {
  // 웹 성능 지표가 로드될 때마다 sendToServer 함수 호출
  if (metric.label === 'web-vital') {
    sendToServer(metric);
  }
}

```

다음으로, `reportWebVitals` 함수를 사용하기 위해 React 애플리케이션의 진입점인 `index.js` 파일을 수정합니다.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { reportWebVitals } from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 웹 성능 지표를 서버로 보내도록 설정
reportWebVitals(reportWebVitals);
```

위 코드를 통해 애플리케이션이 로드될 때 `reportWebVitals` 함수가 실행되고, 웹 성능 지표가 자동으로 서버로 전송됩니다.


#### CRA에서 `reportWebVitals` 함수를 사용하는 예2: Google Analytics(GA)를 사용하여 웹 성능 지표를 기록

Google Analytics(GA)를 사용하여 웹 성능 지표를 기록하려면 `reportWebVitals` 함수를 수정하여 GA 이벤트로 지표를 전송하는 코드를 추가해야 합니다. 아래는 Google Analytics와 연동하여 Core Web Vitals을 보내는 예시입니다.

먼저, Google Analytics가 설치되어 있고 올바르게 설정되어 있는지 확인하세요. 그런 다음 아래와 같이 `reportWebVitals` 함수를 수정합니다.

```js
// reportWebVitals.js
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_action: metric.name,
      event_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // CLS는 1,000을 곱하여 밀리세컨드 단위로 변환
      event_label: metric.id, // 고유 ID
      non_interaction: true, // 이 이벤트가 바운스율에 영향을 미치지 않도록 설정
    });
  }
}
```

그리고 `index.js` 파일에서 이 함수를 사용하도록 설정합니다.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { reportWebVitals } from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(reportWebVitals);
```

이렇게 하면 웹 성능 지표가 Google Analytics로 전송되어 GA 대시보드에서 해당 이벤트를 확인할 수 있습니다. GA에서 이벤트를 확인하는 방법은 GA 버전에 따라 다를 수 있으니, 사용 중인 버전의 문서를 참조하세요.

참고로, 이 코드는 Google Analytics의 `gtag.js `버전을 사용하는 경우에 해당합니다. 다른 버전을 사용하는 경우에는 해당 버전에 맞게 코드를 조정해야 합니다.


#### 참고

- [web vitals](https://github.com/GoogleChrome/web-vitals)


### 13.1.2 `create-next-app`

Next.js에는 성능 지표를 측정하고 보고하는 기능이 내장되어 있습니다. `useReportWebVitals` 훅을 사용하여 직접 보고를 관리할 수도 있고, Vercel은 자동으로 지표를 수집하고 시각화해주는 관리형 [서비스](https://vercel.com/analytics)도 제공합니다. 이를 통해 웹 애플리케이션의 성능을 모니터링하고 최적화할 수 있습니다.

#### `NextWebVitalMetrics`

```ts
// pages/_app.tsx
import { AppProps } from 'next/app';
import { NextWebVitalsMetric } from 'next/app';

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // 메트릭 객체의 내용을 분석하고 처리합니다.
  const { id, name, label, value } = metric;
  console.log(`Metric ${name}: ${value}`, metric);

  // 선택적: 분석 서비스로 메트릭 전송
  // 예를 들어, Google Analytics로 메트릭을 보낼 수 있습니다.
  // gtag('event', name, {
  //   event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metrics',
  //   value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS는 1,000으로 곱해야 합니다.
  //   event_label: id,
  //   non_interaction: true, // 이 이벤트가 사용자 상호작용을 유발하지 않았음을 나타냅니다.
  // });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

`NextWebVitalsMetric` 타입은 캡처된 성능 메트릭스의 데이터 구조를 정의합니다.

- `id`: 메트릭의 고유 식별자
- `name`: 메트릭의 이름 (FCP, LCP, CLS, FID, TTFB 등)
- `label`: 메트릭의 유형 (web-vital 또는 custom)
- `value`: 메트릭의 측정값 (대부분 밀리초 단위)
- `startTime`: 측정이 시작된 시간

#### 사용자 정의 메트릭스

기본 메트릭스 외에도, 페이지가 하이드레이션과 렌더링을 완료하는 데 걸리는 시간을 측정하는 몇 가지 추가적인 사용자 정의 메트릭스가 있습니다. 이러한 메트릭스는 Next.js 애플리케이션의 성능을 더 세밀하게 분석하는 데 도움이 됩니다.

- `Next.js-hydration`: 페이지가 하이드레이션을 시작하고 완료하는 데 걸리는 시간의 길이(밀리초 단위).
- `Next.js-route-change-to-render`: 경로 변경 후 페이지가 렌더링을 시작하는 데 걸리는 시간의 길이(밀리초 단위).
- `Next.js-render`: 경로 변경 후 페이지가 렌더링을 완료하는 데 걸리는 시간의 길이(밀리초 단위).

```tsx
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'Next.js-hydration':
      // 하이드레이션 결과 처리
      console.log(`Hydration time: ${metric.value}ms`);
      break;
    case 'Next.js-route-change-to-render':
      // 라우트 변경 후 렌더 결과 처리
      console.log(`Time to start render after route change: ${metric.value}ms`);
      break;
    case 'Next.js-render':
      // 렌더 결과 처리
      console.log(`Render time after route change: ${metric.value}ms`);
      break;
    default:
      // 다른 메트릭스 처리
      console.log(`Metric ${metric.name}: ${metric.value}`);
      break;
  }
}
```

> `reportWebVitals` 함수는 Next.js 애플리케이션의 성능 메트릭을 측정하고 처리하는 데 사용됩니다. 이 함수는 `NextWebVitalsMetric` 타입의 인수를 받아서, 각 메트릭의 이름, 레이블, 값 등을 분석하고 처리합니다. 이 함수를 사용하여 성능 메트릭을 분석하고, 분석 결과를 분석 서비스로 전송할 수도 있습니다.


#### `useReportWebVitals`

`useReportWebVitals`는 성능 메트릭스 데이터를 인자로 받는 콜백 함수를 매개변수로 사용합니다. 이 콜백 함수 내에서 개발자는 캡처된 성능 메트릭스를 처리하고, 필요한 경우 분석 서비스로 전송하는 로직을 구현할 수 있습니다.

```tsx
// pages/_app.js
import { useReportWebVitals } from 'next/web-vitals';

function MyApp({ Component, pageProps }) {
  useReportWebVitals(metric => {
    // 여기에서 메트릭 처리 로직을 구현합니다.
    console.log(metric);
  });

  return <Component {...pageProps} />;
}
```

**매개변수**
- `metric`: 캡처된 성능 메트릭스 정보를 담고 있는 객체입니다. metric 객체는 다음과 같은 주요 속성을 포함합니다`:
- `id`: 메트릭의 고유 식별자입니다.
- `name`: 메트릭의 이름을 나타냅니다. 예를 들어, FCP, LCP, CLS, FID 등입니다.
- `label`: 메트릭이 'web-vital'인지 아니면 'custom'인지를 나타냅니다.
- `value`: 메트릭의 측정값입니다. 대부분 밀리초 단위로 제공됩니다.


#### 참고

- [Next.js, Optimizing/Analytics](https://nextjs.org/docs/pages/building-your-application/optimizing/analytics)
- [Next.js, `useReportWebVitals`](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals)
- [Next.js, webVitalsAttribution](https://nextjs.org/docs/pages/api-reference/next-config-js/webVitalsAttribution)
- [MDN, Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

<br>

## 13.2 구글 라이트하우스

Lighthouse는 웹 페이지의 품질을 평가하는 오픈 소스 자동화 도구입니다. 사용자 경험의 다양한 측면을 측정하며, 이를 위해 여러 성능 지표를 사용하여 점수를 매깁니다. Lighthouse의 성능 점수는 0에서 100까지의 척도로 나타내며, 이는 웹 사이트의 속도와 최적화 정도를 반영합니다. 역사적으로 Lighthouse는 페이지의 cold load를 분석해왔습니다. 그러나 2022년 (Lighthouse 버전 10)부터 "user flows"를 통해 전체 페이지 생명주기를 분석하고 보고할 수 있게 되었습니다.

> 콜드 로드(cold load): 사용자가 페이지에 처음 방문할 때의 경험으로 사용자가 웹 페이지에 처음 방문했을 때 웹 브라우저가 아직 해당 사이트에 대한 어떠한 데이터도 캐시에 저장하지 않은 상태에서 페이지를 로딩하는 과정을 말합니다. 이는 사용자가 새로운 세션을 시작할 때, 또는 캐시를 비운 후에 페이지에 접근할 때 발생합니다.

### 성능 점수 변동 이유

라이트하우스의 전체 성능 점수와 메트릭 값의 변동성은 대부분 라이트하우스 자체의 문제가 아니라, 기본 조건의 변화 때문에 발생합니다.

**[성능 점수가 변동하는 일반적인 문제요인]**
- **A/B 테스트 또는 광고 변경**: 웹사이트에서 실행하는 A/B 테스트나 다르게 제공되는 광고 내용은 페이지 로드 시간에 영향을 줄 수 있습니다.
- **인터넷 트래픽 라우팅 변경**: 인터넷 트래픽의 경로 변경은 웹사이트의 로딩 속도에 영향을 미칠 수 있습니다.
- **다양한 장치에서의 테스트**: 고성능 데스크톱과 저성능 노트북 등 다른 성능의 장치에서 테스트할 때 결과에 차이가 날 수 있습니다.
- **브라우저 확장 프로그램의 영향**: 자바스크립트를 주입하거나 네트워크 요청을 추가/수정하는 브라우저 확장 프로그램은 성능 측정에 영향을 줄 수 있습니다.
- **바이러스 백신 소프트웨어**: 바이러스 백신 소프트웨어는 시스템 자원을 사용하며, 이는 웹사이트의 성능 측정에 영향을 줄 수 있습니다.
- **라이트하우스 문서: 변동성(Variability)**: 라이트하우스는 '변동성'에 대한 문서에서 이러한 요인들이 성능 점수에 어떻게 영향을 미치는지 보다 심층적으로 설명하고 있습니다.
- **사이트 성능의 이해: 점수 분포**: 라이트하우스가 단일 전체 성능 점수를 제공할 수 있지만, 사이트 성능을 단일 숫자로 보기보다는 점수 분포로 이해하는 것이 좀 더 유용할 수 있습니다.

### Lighthouse의 세 가지 모드: 탐색, 기간 모드(시간 범위), 스냅샷

Lighthouse는 이제 세 가지 모드인 '탐색(Navigation)', '기간 모드(시간범위; Timespan)', '스냅샷(Snapshot)' 모드에서 실행될 수 있습니다. 각각의 모드는 독특한 사용 사례와 장단점을 가지고 있으며, 이 세 가지 핵심 보고서 유형을 결합하여 사용자 플로우를 만들 수 있습니다.

#### 13.2.1 구글 라이트하우스-탐색 모드

이 모드는 단일 페이지 로드를 분석합니다.

![구글 라이트하우스-탐색 모드](https://user-images.githubusercontent.com/39191/168929174-11311144-ce9b-4124-9a52-0423a073b9fe.png)

| 사용 사례 | 제한 사항  |
| --- | --- |
| ✅ Lighthouse 성능 점수 및 모든 성능 지표를 얻습니다. | 🤔 폼 제출이나 싱글 페이지 앱(SPA) 전환을 분석할 수 없습니다. |
| ✅ 프로그레시브 웹 앱(PWA) 기능을 평가합니다. | 🤔 페이지 로드 즉시 사용할 수 없는 콘텐츠를 분석할 수 없습니다. |
| ✅ 페이지 로드 직후 접근성을 분석합니다. | |

- **[참고: 2024.3.5 토스 블로그 탐색 모드 조회 결과](./public/result_navigation_lighthouse.png)**

#### 13.2.2 구글 라이트하우스-기간 모드

이 모드는 일반적으로 사용자 상호 작용을 포함하는 임의의 시간을 분석합니다.

![구글 라이트하우스-기간 모드](https://user-images.githubusercontent.com/39191/168929168-ac45d198-f609-4acb-86a7-51775578c8e0.png)


| 사용 사례 | 제한 사항 |
| --- | --- |
| ✅  상호 작용을 포함한 시간 범위에 걸친 레이아웃 이동 및 자바스크립트 실행 시간을 측정합니다. | 🤔 전체 성능 점수를 제공하지 않습니다. |
| ✅  장기간 지속되는 페이지와 SPA의 경험을 개선하기 위한 성능 기회를 발견합니다. | 🤔 순간 기반 성능 지표(예: 가장 큰 콘텐츠의 페인트)를 분석할 수 없습니다. |
|  | 🤔 페이지 상태 문제(예: 접근성 카테고리 없음)를 분석할 수 없습니다. |

- **[참고: 2024.3.5 토스 블로그 기간 모드 조회 결과](./public/result_timespan_lighthouse.png)**

#### 13.2.3 구글 라이트하우스-스냅샷

이 모드는 특정 상태의 페이지를 분석합니다.

![구글 라이트하우스-스냅샷](https://user-images.githubusercontent.com/39191/168929172-92a70108-a053-4dda-b719-2900b9d3d956.png)

| 사용 사례 | 제한 사항 |
| -- | -- |
| ✅  현재 상태의 페이지를 분석합니다. | 🤔 전체 성능 점수나 지표를 제공하지 않습니다. |
| ✅  SPA나 복잡한 폼 내부의 접근성 문제를 찾습니다. | 🤔 현재 DOM 외부의 문제(예: 네트워크, 메인 스레드, 성능 분석 없음)를 분석할 수 없습니다. |
| ✅  상호 작용 뒤에 숨겨진 메뉴와 UI 요소의 모범 사례를 평가합니다. | |

- **[참고: 2024.3.5 토스 블로그 스냅샷 조회 결과](./public/result_snapshot_ligthhouse.png)**

### Lighthouse의 카테고리

#### 1. 성능 (Performance)

웹사이트의 로딩 속도와 상호작용성을 측정하여 사용자 경험의 효율성을 평가합니다.

- **초기 로딩 성능**: 웹사이트가 사용자에게 첫 콘텐츠를 얼마나 빠르게 보여주는지를 나타내는 지표들(First Contentful Paint, Largest Contentful Paint 등)을 검사합니다.
- **상호작용성**: 사용자 입력에 대한 웹사이트의 반응 속도를 측정하며, 이는 빠른 상호작용을 위한 필수 요소입니다.
- **자원 최적화**: 이미지, 스크립트, CSS 파일 등의 자원이 효율적으로 로드되고 최적화되어 있는지를 분석합니다.

#### 2. 접근성 (Accessibility)

장애가 있는 사용자들도 웹사이트를 원활하게 사용할 수 있도록 설계되었는지 평가합니다.

- **컬러 대비**: 시각 장애가 있는 사용자도 텍스트와 배경 간 충분한 대비를 인지할 수 있도록 색상 대비 비율이 적절한지 검사합니다.
- **키보드 탐색 가능성**: 웹사이트가 키보드만으로도 완전히 탐색 가능한지, 즉 마우스 없이도 모든 기능을 사용할 수 있는지 확인합니다.
- **ARIA 속성과 롤**: 스크린 리더와 같은 보조 기술을 사용하는 사람들이 웹사이트를 이해하고 사용할 수 있도록 ARIA 속성과 롤(Role)이 적절하게 사용되었는지 검토합니다.

#### 3. 모범 사례 (Best Practices)

현대적인 웹 개발에 권장되는 모범 사례들이 웹사이트에 잘 적용되었는지를 점검합니다.

- **안전한 연결**: HTTPS와 같은 안전한 연결을 통해 사용자 데이터의 보안을 유지하는지 확인합니다.
- **코드의 현대성**: 사용되지 않는 API나 비표준 기능들을 피하고, 현대적인 웹 API의 사용 여부를 검토합니다.
- **성능 최적화**: 이미지 및 텍스트 압축, 캐싱 전략 등 웹사이트 성능을 최적화하기 위한 기술적인 모범 사례가 적용되었는지 확인합니다.

#### 4. SEO (Search Engine Optimization)

웹사이트가 검색 엔진에서 더 잘 발견될 수 있도록 하는 요소들을 진단합니다.

- **메타 태그**: 페이지의 메타 데이터가 적절하게 설정되어 검색 엔진에 의해 잘 이해될 수 있도록 합니다.
- **모바일 친화성**: 모바일 기기에서도 웹사이트가 잘 작동하는지, 반응형 디자인이 적절히 구현되었는지 확인합니다.
- **링크와 네비게이션**: 웹사이트 내부의 링크 구조가 명확하고, 사용자 및 검색 엔진 모두에게 명확한 네비게이션을 제공하는지 평가합니다.

#### 5. PWA (Progressive Web App)

웹사이트가 프로그레시브 웹 앱(PWA)의 기준에 부합하는지를 평가하여, 앱처럼 부드럽고 일관된 사용자 경험을 제공하는지 확인합니다.

- **반응형 디자인**: 모든 디바이스에서 일관된 사용자 경험을 제공하는지 검사합니다.
- **오프라인 작동**: 네트워크 연결이 없을 때도 웹사이트의 주요 기능이 작동하는지 확인합니다.
- **앱과 같은 인터랙션**: 사용자가 웹사이트를 홈 스크린에 추가할 수 있고, 푸시 알림과 같은 앱 기능을 지원하는지 검토합니다

### Lighthouse의 트리맵(Treemap)

트리맵은 리소스의 크기와 복잡성을 시각적으로 나타내는 방법으로, Lighthouse 성능 평가 리포트에서 웹 페이지의 각 요소가 차지하는 공간과 중요도를 직관적으로 보여줍니다. 이는 웹 개발자들이 페이지 최적화에 중요한 부분을 쉽게 식별할 수 있도록 도와줍니다.

#### 트리맵의 사용

트리맵을 사용하면 웹 페이지의 다양한 리소스(예: 이미지, 자바스크립트, CSS 등)가 차지하는 바이트 수를 사각형의 크기로 표현합니다. 각 사각형은 특정 리소스 유형을 나타내며, 그 크기는 파일의 크기에 비례합니다.

#### 트리맵의 이점

- **성능 문제 식별**: 큰 사각형은 많은 공간을 차지하는 리소스를 의미하며, 이는 성능에 영향을 미칠 수 있습니다.
- **최적화 우선순위 결정**: 리소스의 크기와 유형에 따라 최적화해야 할 항목을 결정할 수 있습니다.
- **시각적 분석**: 색상과 크기를 통한 시각적 정보 제공으로 빠른 분석이 가능합니다.

- **[참고: 2024.3.5 토스 블로그 트리맵 조회 결과](./public/result_treemap_lighthouse.png)**

### Lighthouse의 트레이스(Trace)

라이트하우스에서 '트레이스'는 웹 페이지의 로딩 및 사용자 상호작용 과정에서 발생하는 브라우저의 활동을 상세하게 기록한 데이터를 의미합니다. 이 데이터는 웹 사이트의 성능 분석과 문제 해결에 필수적인 정보를 제공합니다.

#### 트레이스가 포함하는 정보

- 페이지 렌더링에 걸린 시간
- 자바스크립트와 같은 스크립트의 실행 시간
- 네트워크 요청과 응답 시간
- 라이트하우스에서 제공하는 성능 지표

### 참고

- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Lighthouse user flows](https://web.dev/articles/lighthouse-user-flows)
- [Lighthouse의 User Flow](https://ui.toast.com/posts/ko_20211202)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc)

<br>

## 13.3 WebPageTest

### 13.3.1 Performance Summary

### 13.3.2 Opportunities & Experiments

### 13.3.3 Filmstrip

### 13.3.4 Details

### 13.3.5 Vitals

### 13.3.6 Optimizations

### 13.3.7 Content

### 13.3.8 Domains

### 13.3.9 Console Log

### 13.3.10 Detected Technologies

### 13.3.11 Main-thread Processing

### 13.3.12 Lighthouse Report

### 13.3.13 기타

<br>

## 13.4 크롬 개발자 도구

### 13.4.1 성능 통계

### 13.4.2 성능

<br>

## 13.5 정리

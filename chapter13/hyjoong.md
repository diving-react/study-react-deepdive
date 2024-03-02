# 13장: 웹페이지의 성능을 측정하는 다양한 방법

<br>

- [13장: 웹페이지의 성능을 측정하는 다양한 방법](#13장-웹페이지의-성능을-측정하는-다양한-방법)
  - [13.1 애플리케이션에서 확인하기](#131-애플리케이션에서-확인하기)
    - [13.1.1 create-react-app](#1311-create-react-app)
    - [13.1.2 create-next-app](#1312-create-next-app)
  - [13.2 구글 라이트하우스](#132-구글-라이트하우스)
    - [13.2.1 구글 라이트하우스-탐색 모드](#1321-구글-라이트하우스-탐색-모드)
    - [13.2.2 구글 라이트하우스-기간 모드](#1322-구글-라이트하우스-기간-모드)
    - [13.2.3 구글 라이트하우스-스냅샷](#1323-구글-라이트하우스-스냅샷)
  - [13.3 WebPageTest](#133-WebPageTest)
    - [13.3.1 Performance Summary](#1331-Performance-Summary)
    - [13.3.2 Opportunities & Experiments](#1332-Opportunities-&-Experiments)
    - [13.3.3 Filmstrip](#1333-Filmstrip)
    - [13.3.4 Details](#1334-Details)
    - [13.3.5 Web Vitals](#1335-Web-Vitals)
    - [13.3.6 Optimizations](#1336-Optimizations)
    - [13.3.7 Content](#1337-Content)
    - [13.3.8 Domains](#1338-Domains)
    - [13.3.9 Console Log](#1339-Console-Log)
    - [13.3.10 Detected Technologies](#13310-Detected-Technologies)
    - [13.3.11 Main-thread Processing](#13311-Main-thread-Processing)
    - [13.3.12 Lighthouse Report](#13312-Lighthouse-Report)
    - [13.3.13 기타](#13313-기타)
  - [13.4 크롬 개발자 도구](#134-크롬-개발자-도구)
    - [13.4.1 성능 통계](#1341-성능-통계)
    - [13.4.2 성능](#1342-성능)
  - [13.5 정리](#135-정리)

<br>

## 13.1 애플리케이션에서 확인하기

### 13.1.1 create-react-app

reportWebVitals 함수는 웹에서 성능을 측정하기 위한 함수다. CLS, FID, FCP, LCP, TTFB를 측정하는 용도로 사용된다.

### 13.1.2 create-next-app

기본적으로 Next.js는 성능 측정을 할 수 있는 메서드인 NextWebVitalsMetric을 제공한다. \_app.tsx 파일에 다음과 같이 코드를 추가해서 사용해보자.

```javascript
import type { AppProps, NextWebVitalsMetric } from "next/app";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/3249a4c4-979b-4588-807f-542a6717ca8b)

- Next.js-hydration: 페이지가 서버 사이드에서 렌더링되어 하이드레이션하는 데 걸린 시간
- Next.js-route-change-to-render: 페이지가 경로를 변경한 후 페이지를 렌더링을 시작하는 데 걸리는 시간
- Next.js-render: 경로 변경이 완료된 후 페이지를 렌더링하는 데 걸린 시간

값의 시간 단위는 `밀리초(ms)`이다.

<br>

## 13.2 구글 라이트하우스

구글 라이트하우스로 코드 수정이나 배포, 수집 없이도 지표를 수집할 수 있다.
웹 페이지 성능 측정 도구로, 오픈소스로 운영되며 PWA, SEO등 웹 페이지를 둘러싼 다양한 요소들을 측정하고 점검할 수 있다.
<img width="600" alt="image" src="https://github.com/diving-react/study-react-deepdive/assets/70426440/2e5baa5d-0264-41bf-abe5-4c75a7a39c55">

### 13.2.1 구글 라이트하우스-탐색 모드

**성능**

핵심 웹 지표인 FCL, LCP, CLS, TTI, Soeed Index, Total Blocking Time 의 값을 확인할 수 있다.

> Speed Index: 페이지가 로드되는 동안 콘텐츠가 얼마나 빨리 시각적으로 표시되는지를 계산한다.</br> Total Blocking Time: 메인 스레드에서 특정 시간 이상 실행되는 작업, 즉 긴 작업이 수행될 때마다 메인 스레드가 차단된 것으로 간주한다.

**접근성**

장애인 및 고령자 등 신체적으로 불편한 사람들이 일반적인 사용자와 동등하게 웹페이지를 이용할 수 있도록 보장하는 것이다.

예시로, 시각으로 웹페이지를 보기 어려운 경우를 가정하자, 이 경우 스크린 리더의 툴을 활용하면 웹페이지의 내용을 직접 듣는것이 가능하다.

그러나 그림이나 사진의 경우는 스크린 리더가 읽을 수는 없으므로 대체 문자가 필요하다. 오디오나 비디오는 청각이 제한적인 경우를 위해 자막이 필요하며, 마우스를 활용할 수 없는 상황에 대비하기 위해서는 **키보드만으로 모든 콘텐츠에 접근할 수 있어야 한다.** 이러한 다양한 사용자를 배려하기 위해`HTML`과 `CSS` 등에 적잘한 대안을 삽입하는 것을 접근성이라 한다.

**권장사항**

웹 사이트를 개발할 때 고려해야 할 요소들을 얼마나 지키고 있는지 확인할 수 있다.

- CSP가 XSS 공격에 효과적인지 확인
- HTTPS 사용
- 사용자가 비밀번호 입력란에 붙여넣을 수 있도록 허용
- 이미지의 올바른 가로세로 비율로 표시
- ETC ..

### 검색 엔진 최적화

문서를 크롤링하기 쉽게 만들었는지 확인하는 것부터, robots.tsx가 유효한지, 이미지와 링크에 설명 문자가 존재하는지, `<meta>`나 `<title>`등으로 페이지의 정보를 빠르게 확인할 수 있는지 등을 확인한다.

검색엔진 최적화가돼 있을수록 검색 엔진의 검색결과 우선순위에 높게 나타나며,사용자가 유입될 가능성이 높아지므로 검색엔진 최적화를 위한 다양한 요소들을 확인하고 점검할 필요가 있다.

### 13.2.2 구글 라이트하우스-기간 모드

`기간 모드 시작`을 누른 뒤 성능 측정을 원하는 작업을 수행한 다음, 기간 모드를 종료하면 그 사이에 일어난 작업들에 대한 지표를 다음과 같이 확인할 수 있다.

<img width="600" alt="image" src="https://github.com/diving-react/study-react-deepdive/assets/70426440/674a7335-691e-4d1f-9501-04caad2023aa">

**흔적**

![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/be86b81a-81d6-4166-946d-caa05ea0a6f3)

**트리맵**

페이지를 불러올 때 함께 로딩한 모든 리소스를 함께 모아서 볼 수 있는 곳이다. 웹페이지의 전체 JS리소스 중 어떤 파일이 전체 데이터 로딩 중 어느 정도를 차지했는지를 비율로 확인할 수 있으며, 실제 불러온 데이터의 크기를 확인할 수도 있다.

![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/c3d827ff-3361-4152-add4-070b1f0bf859)

로딩한 리소스에서 사용하지 않은 바이트의 크기도 확인이 가능해서, 실제로 불러왔지만 사용되지 않은 리소스를 비율로 확인할 수도 있다.
이 경우는 특정 시나리오에서만 실행되는 리소스도 있기 때문에 꼭 사용하지 않았다고 해서 불필요한 것이라고 단정 지을 수 없다.

### 13.2.3 구글 라이트하우스-스냅샷

탐색 모드와 매우 유사하지만 현재 페이지 상태를 기준으로 분석한다.

<br>

## 13.3 WebPageTest

웹사이트 성능을 분석하는 도구다.

### 13.3.1 Performance Summary

테스트가 완료되면 전체적인 결과를 요약해서 볼 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/855bfa6b-c545-44a0-8b24-1776252e9cd6)

성능 테스트는 총 3번 이뤄지기 떄문에 3개의 서로 다른 결과를 확인할 수 있다.

### 13.3.2 Opportunities & Experiments

### 13.3.3 Filmstrip

렌더링을 가로막는 리소스나 예상보다 일찍 실행되는 스크립트 등을 확인할 수 있다
![스크린샷 2024-03-03 오전 1 45 40](https://github.com/diving-react/study-react-deepdive/assets/70426440/b8cd0dc6-e1c0-48fc-9122-c1722dab0286)

왼쪽에 주황색X 표시가 있는것은 렌더링을 블로킹하는 리소스라는 뜻이다

### 13.3.4 Details

Filmstrip에서 보여준 내용을 자세하게 보여주는 영역이다
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/aa2672f4-fa43-4f2e-a28c-79b22966fa87)

### 13.3.5 Web Vitals

LCP, CLS, TBT에 대한 자세한 내용을 확인할 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/a5b09b4a-ab02-47aa-a24b-32b43124acb4)

### 13.3.6 Optimizations

리소스들이 얼마나 최적화돼 있는지를 나타낸다.

### 13.3.7 Content

웹사이트에서 제공하는 콘텐츠, 애셋을 종류별로 묶어 통계를 보여준다. 에셋 종류별 크기와 로딩 과정을 확인할 수 있으며, 시간의 흐름에 따라 렌더링을 거치면서 어떻게 에셋을 불러오는지도 확인할 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/a25d053f-4e6a-47bf-9950-6497f909409b)

### 13.3.8 Domains

Content메뉴에서 보여준 에셋들이 어느 도메인에서 왔는지를 도메인별로 묶어서 확인할 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/9b679928-3c50-4470-9c2c-c03604846f30)

### 13.3.9 Console Log

웹 페이지에 접속했을 때 `console.log`로 무엇이 기록됐는지를 확인할 수 있다.

### 13.3.10 Detected Technologies

웹 사이트를 개발하는 데 사용된 기술을 확인할 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/1606136b-c443-4a4f-8644-64d4020faf5e)

### 13.3.11 Main-thread Processing

메인 스레드가 어떤 작업을 처리했는지 확인할 수 있다.
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/e8d6a52b-b7ac-4800-b690-4193f47c69b9)

### 13.3.12 Lighthouse Report

구글 라이트하우스 리포트를 확인할 수 있다.

### 13.3.13 기타

<br>

## 13.4 크롬 개발자 도구

크롬 개발자 도구를 활용하기 위해서는 크롬 확장 프로그램으로 인해 이슈를 파악하는 데 방해가 될 수 있으니 시크릿 창으로 웹사이트를 여는 것이 좋다.

### 13.4.1 성능 통계

개발자 도구 Performance Insight는 웹사이트의 성능을 자세하게 확인할 수 있다.
`Page Load`를 선택해 웹사이트 로딩 시작부터 끝까지를 확인하거나, `Start Recording`을 눌러서 원하는 액션을 수행하면서 웹사이트 성능을 측정할 수 있다.

![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/31ba7854-1451-45aa-a195-dedb44670d01)

**Insights**
성능을 측정하는 기간 동안 발생한 이벤트 중 눈여겨봐야 할 내용을 시간의 흐름에 따라 모아서 보여준다.

### 13.4.2 성능

![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/89b16c79-d4af-4b58-b479-20fc48bcca92)

<br>

**네트워크**
![image](https://github.com/diving-react/study-react-deepdive/assets/70426440/9d17958f-1644-43a5-ab4e-a89ecaa75b3f)

성능 측정 기간 동안에 발생한 모든 네트워크 요청을 확인할 수 있다.

- 파란색: HTML
- 보라색: CSS
- 노란색: Javascript
- 초록색: 이미지
- 회색: 기타
  - 폰트
  - JSON 등

**소요 시간과 기본**
성능 탭의 핵심이자 꽃이라 부를 수 있는 부분이다.
시간의 흐름에 따라 메인 스레드의 작업은 어떻게 이뤄졌는지, 또 자바스크립트 힙 영역은 어떻게 변화하는지 등을 확인할 수 있다.

  <br>

## 13.5 정리

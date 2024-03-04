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
  - [13.3 WebPageTest](#133-webpagetest)
    - [13.3.1 Performance Summary](#1331-performance-summary)
    - [13.3.2 Opportunities & Experiments](#1332-Opportunities-&-Experiments)
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

### 13.1.1 create-react-app

- reportWebVitals() 사용

### 13.1.2 create-next-app

- NextWebVitalsMetric의 reportWebVitals() 사용
- hydration, rendering, routing 등에 소요된 시간 측정 가능

<br>

## 13.2 구글 라이트하우스

- 별도의 코드 수정이나 배포 수집 없이도 성능 지표를 수집할 수있는 도구

### 13.2.1 구글 라이트하우스-탐색 모드

- 페이지 접속 후 페이지 로딩이 끝날 때까지 성능을 측정하는 모드

### 13.2.2 구글 라이트하우스-기간 모드

- 실제 웹 페이지를 탐색하면서 성능 지표를 측정하는 모드

### 13.2.3 구글 라이트하우스-스냅샷

- 현재 페이지에서의 성능 지표

<br>

## 13.3 WebPageTest

- 웹 사이트의 성능을 측정할 수 있는 도구

### 13.3.1 Performance Summary

- 성능 요약

### 13.3.2 Opportunities & Experiments

- 상세 설명

### 13.3.3 Filmstrip

- 시간의 흐름에 따라 웹 사이트가 어떻게 그려졌는지를 보여주는 도구

#### CSS stripe

여러 이미지를 하나의 이미지 파일로 결합하여 웹 페이지 HTTP 요청 수를 줄이는 기술

```css
.icon {
  background-image: url('sprite.png');
  background-repeat: no-repeat;
  display: inline-block;
}

.icon-home {
  width: 16px;
  height: 16px;
  background-position: -16px 0; /* 첫 번째 아이콘의 위치 조정 */
}

.icon-email {
  width: 16px;
  height: 16px;
  background-position: -32px 0; /* 두 번째 아이콘의 위치 조정 */
}
```

### 13.3.4 Details

### 13.3.5 Vitals

- LCP, CLS, TBT에 대한 자세한 내용

### 13.3.6 Optimizations

- 리소스들이 얼마나 최적화 되어있는지 확인 가능

### 13.3.7 Content

- 웹 사이트에서 제공하는 콘텐츠 애셋 등을 확인 가능

### 13.3.8 Domains

- 어느 도메인에서 받아온 데이터인지 확인 가능

### 13.3.9 Console Log

- console.log()로 기록되 내용 확인

### 13.3.10 Detected Technologies

- 사용된 기술들에 대한 정보
- Wapplyzer

### 13.3.11 Main-thread Processing

- 메인 스레드의 작업 내용 확인

### 13.3.12 Lighthouse Report

### 13.3.13 기타

<br>

## 13.4 크롬 개발자 도구

### 13.4.1 성능 통계

- 동작을 녹화해서 성능 통계 제작
- Throttling으로 속도를 고의로 지연시켜 일반적인 모바일 사용자의 상대적으로 열악한 환경을 재현한다.

### 13.4.2 성능

<br>

## 13.5 정리

# 12장 웹 핵심 지표

## 핵심 웹 지표란?

핵심 웹 지표란 구글에서 만든 지표로, 웹사이트에서 뛰어난 사용자 경험을 제공하는 데 필수적인 지표를 일컫는 용어다. 구글에서 핵심 웹 지표로 꼽는 지표는 다음과 같다.

- 최대 컨텐츠풀 페인트(LCP: Lagest Contentful Paint)
- 최소 입력 지연(FID: First Input Delay)
- 누적 레이아웃 이동(CLS: Cumulative Layout Shift)

이러한 지표가 의미하는 바는 무엇이고, 또 이 지표들이 웹사이트 성능에 어떠한 영향을 미치는지 각각 살펴보자

## 최대 콘텐츠풀 페인트(LCP)

### 정의

**페이지가 처음으로 로드를 시작한 시점부터 뷰포트 내부에서 가장 큰 이미지 또는 텍스트를 렌더링하는 데 걸리는시간**을 의미한다.

뷰포트는 현재 노출되는 화면이며, 사용자에게 노출되는 영역은 기기에 의존하므로 뷰포트 크기는 기기마다 다르다. 이러한 뷰포트 내부에서 `큰 이미지와 텍스트` 는 다음과 같이 정의돼 있다.

- <img>
- <svg> 내부의 <img>
- poster 속성을 사용하는 <video>
- `url()` 을 통해 불러온 배경 이미지가 있는 요소
- 텍스트와 같이 인라인 텍스트 요소를 포함하고 있는 블록 레벨 요소(<div>, <p> 등)

각 엘리면트가 등장한 시점부터 테스트 또는 이미지가 완전히 로딩되는 시점을 기준으로 측정한다. 즉 LCP란 사용자의 기기가 노출하는 뷰포트 내부에서 가장 큰 영역을 차지하는 요소가 렌더링되는데 얼마나 걸리는지를 측정하는 지표인 것이다. 실제 크기가 크다고 하더라도 뷰포트 영역 밖에 넘치는 요소가 있다면 해당 영역의 크기는 고려되지 않는다.

### 의미

만약 어떤 개발자가 `웹 페이지가 로딩이 완료되어 사용자에게 노출되기까지 걸리는 시간` 을 물어보면 무엇을 기준으로 측정할까?

사용자가 어느정도 로딩이 완료된 페이지라고 인식하는 시점은 언제일까? 사용자가 로딩을 체감하기 위해 반드시 모든 요소가 로딩될 필요는 없다. 사용자에게 노출되는 부분만 로딩돼 있다면 사용자는 페이지 로딩이 완료됐다고 느낄 것이다. 즉 뷰포트 영역에 보이는 부분을 기준으로 한다면 사용자가 느끼는 로딩시간과 유사하게 측정할 수 있을 것이다.

사용자에게 페이지의 정보를 화면에 전달하는 속도를 객관적으로 판단하기 위한 지표로 만들어진 것이 LCP, 최대 컨텐츠풀 페인트다.

좋은 점수는 최대 컨텐츠 페인트 측성시 2.5초 내에 응답이 왔을 때 받을 수 있다. 4초이내로 온다면 보통, 그 이상이 걸리면 나쁨으로 판단한다.

### 개선 방안

- 텍스트 활용
    - LCP 지표에서 좋은 점수를 얻는 가장 확실한 방법은 뷰포트 최대 영역을 이미지가 아닌 문자열을 넣는 것이다. 이미지를 아무리 최적화 하더라도 텍스트의 노출 속도보다 빨라질 수는 없다.
- 이미지
    - 하지만 웹 페이지에서 처음부터 사용자에게 인상을 남기기 위해서는 이미지가 적합한 경우가 많을 것이다. 이미지를 웹 페이지에 띄우기 위해서 다양한 방법이 활용될 수 있다.
        - <img> - 이미지 태그는 브라우저에 의해 먼저 발견되어 빠르게 요청이 일어난다. HTML 파싱이 미처 완료되지 않더라도 프리로드 스캐너가 병렬적으로 리소스를 다운로드 하므로 LCP 요소를 불러오기에 적절한 방법이다.
        - <svg> 내부 <image> - 이 경우엔 모든 리소스가 다운로드 된 이후 이미지를 불러온다. 즉 svg 내부 이미지는 프리로드 스캐너에 의해 발견되지 않아 병렬적인 리소스 다운로드가 일어나지 않는다.
        - background-image - 이 속성을 비롯해서 CSS에 있는 리소스는 항상 느리다. 이러한 리소스는 브라우저가 해당 리소스를 필요로 하는 DOM을 그릴 준비가 될 때까지 리소스 요청을 뒤로 미루기 때문이다.
    - 웹으로 서비스할 이미지는 가능한 무소신실 형식으로 압축해 최소한의 용량으로 서비스하는 것이 좋다.
    - laoding=lazy 주의: 해당 속성은 리소스를 중요하지 않음으로 표시하고 필요할 때만 로드하는 전략이다. 최대 컨텐츠풀 페인트에 해당하는 리소스에 해당 속성을 부여해서는 안된다.
    - 애니메이션: 당연하게도 이미지가 그냥 뜨는 것보다 애니메이션으로 띄우는 것이 더 오래 걸린다.
    - 서버 빌드: 서버에서 빌드해온 HTML을 프리로드 스캐너가 바로 읽어서 최대 콘텐츠풀 페인트로 빠르게 가져가도록 설계하자.
    - 최대 컨텐츠풀 페인트 리소스는 직접 호스팅: 가능하다면 최대 컨텐츠풀 리소스는 같은 도메인에서 직접 호스팅하는 것이 좋다. 이미 연결이 맺어지는 출처와 다르게 새로운 출처에 이미지가 위치한 경우에는 네트워크 커넥션부터 다시 수행해야 하기 때문이다.
    
    ## 최초 입력 지연(FID)
    
    ### 정의
    
    순간적으로 몰린 엄청난 트래픽 때문에 웹사이트가 클릭이나 타이핑도 되지 않아 아무런 작업을 하지 못할 경우가 생긴다. 이런 상황에서 아무리 웹 페이지 로딩이 빨리되어도 사용자가 상호작용을 할 수 없다면 사용자는 웹 사이트가 느리다고 생각할 것이다. 이렇듯 로딩 속도만큼 중요한 것이 웹사이트의 반응 속도다. 이런 속도를 측정하는 지표가 최초 입력 지연이다.
    
    > 사용자가 페이지와 처음 상호 작용할 때부터 해당 상호 작용에 대한 응답으로 브라우저가 실제로 이벤트 핸들러 처리를 시작하기까지의 시간
    > 
    
    모든 입력에 대해 측정하는 것은 아니며, 최초의 사용자 입력 하나에 대해서만 그 응답 지연이 얼마나 걸리는지 판단한다.
    
    ### 의미
    
    이런일이 발생하는 이유는 이벤트 핸들러를 실행시켜야 하지만 메인스레드가 바쁘기 때문에 콜 스택에 비어져있지 않기 때문이다. 즉, 이벤트가 발생하는 시점에 최대한 메인 스레드가 다른 작업을 처리할 수 있도록 여유를 만들어 둬야 사용자에게 빠른 반응성을 보장할 수 있다.
    
    그렇다면 사용자 최초 입력에 해당하는 내용에는 어떤 것이 있을까? 타이핑, 터치, 클릭, 줌, 스크롤 등 사용자가 웹사이트에서 할 수 있는 입력은 다양하다. 최초 입력 지연에 대한 정의를 살펴보면 클릭, 터치, 타이핑 등 사용자의 개별 입력 작업에 초점을 맞추고 측정한다.
    
    다시 말해 최초 입력 지연은 화면이 최초에 페인팅 된 뒤, 사용자가 웹 페이지에서 클릭 등 상호작용을 수행했을 때 메인 스레드가 이 이벤트에 대한 반응을 할 수 있을 때까지 걸리는 시간을 의미한다.
    
    ### 기준 점수
    
    최초 입력 지연의 좋은 점수를 얻기 위해서는 100ms 이내로 응답이 와야하며, 300ms 이내인 경우 보통, 그 이상은 나쁨으로 처리된다. 최초 입력 지연 지표를 향상시킬 수 있는 방법에 대해서 알아보자
    
    - 실행에 오래 걸리는 긴 작업을 분리
    - 꼭 웹 페이에서 해야 하는 작업인가?
    - 긴 작업을 여러 개로 분리하기(50ms 이상일 경우 분리하자.)
    - 자바스크립트 코드 최소화
        - 현대의 번들링 도구는 필요한 코드만 모아서 최종 프로덕션 자바스크립트 코드를 생성한다. 번들러가 필요없는 코드를 걸러준다 하더라도 필요 없는 코드가 존재할 수 있다. 개발자 도구에서 커버리지를 통해 측정할 수 있다.
        - 기록 버튼을 클릭하고 웹 페이지를 새로고침하면 커버리지가 기록되며 사용되지 않는 코드가 얼마나 있는지 확인할 수 있다.
    - 타사 자바스크립트 코드 실행 지연
        - 타사 자바스크립트는 대부분 웹페이지 로드에 중요한 자원이 아니므로 <script>의 async와 defer를 이용해 불러오기를 하는 것이 좋다.
    
    ## 누적 레이아웃 이동(CLS)
    
    ### 정의
    
    페이지의 생명주기 동안 발생하는 모든 예기치 않은 이동에 대한 지표를 계산하는 것이 누적 레이아웃 이동이다. 이 지표가 낮을수록, 즉 사용자가 겪는 예상치 모한 레이아웃 이동이 적을 수록 좋은 웹 사이트다.
    
    ### 의미
    
    누적 레아웃 이동은 사용자의 가시적인 콘텐츠에 영향을 미쳐야 하기 때문에 뷰포트 내부의 요소에 대해서만 측정하며, 뷰포트 밖의 요소에 대해서는 측정하지 않는다. 또한 단순히 요소가 추가된다고 해서 무조건 누적 레이아웃 이동으로 간주되는 것은 아니다. 요소의 시작 위치에 영향을 미치지 않았다면 레이아웃 이동으로 간주되지 않는다. 사용자 액션에 대한 레이아웃 이동 역시 포함하지 않고, 사용자가 아무런 동작을 하지 않았음에도 불구하고 레이아웃 이동이 발생하는 경우에는 점수에 포함된다.
    
    ### 개선 방안
    
    - 삽입이 예상되는 요소를 위한 추가적인 공간 확보
        - 뒤늦게 레이아웃이 변경되는 것을 미연에 방지하기 위해서는 useEffect의 내부에서 요소에 영향을 미치는 작업, 특히 뷰포트 내부에서 노출될 확률이 높은 작업을 최소화하는 것이 좋다.
        - 스켈레톤 UI 처럼 미리 무언가 동적으로 뜰 것으로 예상되는 공간을 미리 확보해 두는 것도 좋은 방법이다. 그러나 이 방법역시 해당 영역이 뜨지 않는 케이스가 있다면 누적 레이아웃 이동을 피하기 어렵다.
        - 가장 좋은 방법은 서버 사이드 렌더링이다. 그러나 광고와 같은 타사 스크립트에 의존해 처리하는 경우 서버 사이드 렌더링이 불가능 할 수도 있으므로 이러한 경우에는 앞서 언급한 방법들을 사용해야 한다.
        - 동적인 컨텐츠는 가능한 최초 뷰포트에 영향을 미치지 않는 곳으로 미뤄두되, 불가피하면 회피하는 방식으로 최대한 레이아웃 이동을 피해야 한다.
    - 폰트 로딩 최적화
        - 폰트 또한 레이아웃 이동을 일으키는 원인 중 하나다. HTML 문서에 지정한 폰트가 보이지 않고 대체 기본 폰트로 보이고 있다가 뒤늑제 폰트가 적용될 수 있다. 또한 기본 폰트마저 없어 텍스트가 없는 채로 있다가 뒤늦게 폰트가 로딩되면서 페이지에 렌더링 될 수도 있다.
        - 폰트는 각각 고유의 너비와 높이를 가지고 있다. 따라서 누적 레이아웃을 발생시키지 않고 기본 폰트외 폰트를 적용하려면 다음과 같은 점을 유념해야 한다.
            - <link>의 preload 사용: link 요소의 `rel-preload` 는 페이지에서 즉시 필요로 하는 리소스를 명시하는 기능이다. 스타일이나 폰트를 지정하면 페이지의 렌더링을 가로막거나 레이아웃을 방해할 가능성이 줄어든다.
            - font-family 활용 - 폰트를 불러올 수 있는 방법은 크게 다섯 가지로 나뉜다.
                - auto: 기본값
                - block: 폰트가 로딩되기 전까지 렌더링을 중단한다.
                - swap: 우선 폴백 폰트로 글자를 렌더링하고, 웹 폰트의 로딩이 완료되면 웹 폰트를 적용한다.
                - fallback: 이 옵션을 사용하면 100ms간 텍스트가 보이지 않고, 그 이후에 폴백 폰트로 렌더링한다. 3초 안에 폰트가 로딩되면 해당 폰트를 적용하고 그렇지 않다면 폴백 폰트를 적용한다.
                - optional: 100ms간 텍스트가 보이지 않고, 폴백 폰트로 렌더링한다.
        - 최대한 중요한 폰트의 다운로드를 우선순위에 너고, 이 우선순위를 활용했음에도 빠르게 로딩하는데 실패했다면 다음을 기약하고 기본 폰트를 노출하는 것이 좋다.
    - 적절한 이미지 크기 설정
        - width, height 지정: 크기를 100%, auto와 같이 비율로 지정한다면 브라우저가 이미지를 로딩하기 전에 적절한 가로세로 비율을 계산해 이미지가 표시되는 만큼 면적을 할당해 둔다. 그러나 이러한 기능을 지원하지 않는 오래된 브라우저나 CSS 로딩 실패의 경우를 고려한다면 실제 원하는 이미지 크기에 맞는 비율을 설정하는 것이 좋다.
        - 만약 사용자 뷰포트 너비에 맞춰 다른 이미지를 제공하는 경우, 즉 반응형 이미지를 사용하고 싶다면 scrset 속성을 사용할 수 있다. 비율은 같고 크기가 다른 여러 개의 이미지를 미리 준비해 둔 다음 브라우저가 상황에 맞게 이미지르 사용할 수 있도록 준비하면 된다.
        
        ### 성능 확인에 중요한 지표들
        
        - 최초 바이트까지의 시간(Time To First Byte, TTFB)
            - 브라우저가 첫 번째 바이트를 수신하는데 걸리는 시간을 의미한다. 즉 페이지를 요청 했을 때, 요청이 완전히 완료되는 데 걸리는 시간을 측정하는 것이 아니라 최초 응답이 오는 바이트까지가 얼마나 걸리는지를 측정하는 지표다.
            - 특히 서버 사이드 렌더링을 하고 있는 애플리케이션에서 주의 깊게 봐야 할 지표다. 최초 페이지를 만들기 위해 서버에서 어느 정도 작업을 수행하기 때문이다. 첫 번째 HTML을 만들기 위해 작업이 느릴 수록 최초 바이트까지의 시간이 길어지게 된다.
        - 최초 콘텐츠풀 페인트(First Contentful Paint, FCP)
            - 페이지가 로드되기 시작한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링 될때까지의 시간이다.
            - TTFB를 개선해 뭐라도 다운로드가 시작해 렌더링을 할 수 있도록 해야한다.
            - 렌더링을 막는 리소스 최소화: JS나 CSS 같은 렌더링을 가로막는 리소스를 최소화하고, 렌더링을 방해하는 리소스를 비동기적으로 로드하도록 해야한다.
            - 최대한 사용자에게 빠르게 무언가를 보여주는 영역에 대한 최적화를 진행한다.
            - 페이지 리다이렉트를 최소화해 사용자에게 컨텐츠를 빠르게 보여줘야한다.
            - DOM 크기 최소화: DOM이 크다면 렌더링 시간이 많이 소요된다. 1500개 미만, 32 단계의 깊이 정도, 부모 노드는 자식 노드를 60개 정도만 가지고 있어야한다. 이 이상으로 복잡해진다면 브라우저가 이를 파악해 렌더링하는데 시간이 많이 걸린다.
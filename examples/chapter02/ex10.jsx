/**
 * @description 유효한 형태의 JSX
 */

const Component = <App />;
const Component2 = <App></App>;

// 옵션을 {} 와 전개 연산자로 사용할 수 있습니다.
const Component3 = <App {...props} />;
const Component4 = <App prop="value" {...props} />;

// 속성만 있는 경우에는 닫는 태그를 생략할 수 있습니다.
const Component5 = <App prop="value" />;

// 속성과 속성을 넣을 수 있습니다.
const Component6 = <App required={true} />;

const Component7 = (
  <App>
    <Child text="text" />
  </App>
);

const Component8 = (
  <App>
    <Child optionalChild={<div>내용</div>} />
  </App>
);

const Component9 = (
  <App>
    <Child>
      <div>내용</div>
    </Child>
  </App>
);

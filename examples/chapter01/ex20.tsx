/**
 * @description React.memo의 깊은 비교
 */
import React, { memo, useState } from 'react';

type SimpleProps = {
  counter: number;
};

// 얕은 비교를 수행하는 컴포넌트
const ComponentProps = memo(function ComponentProps(props: SimpleProps) {
  console.log('ComponentProps 렌더링');
  return <div>{props.counter}</div>;
});

type DeeperProps = {
  counter: {
    value: number;
  };
};

// 깊은 비교를 수행하는 컴포넌트
const ComponentDeeperProps = memo(
  function ComponentDeeperProps(props: DeeperProps) {
    console.log('ComponentDeeperProps 렌더링');
    return <div>{props.counter.value}</div>;
  },
  (prevProps, nextProps) => {
    // props.counter 객체 내부의 value 값을 비교합니다.
    return prevProps.counter.value === nextProps.counter.value;
  }
);

export default function App() {
  const [counter, setCounter] = useState(0);

  // counter 상태를 업데이트하는 함수입니다.
  const incrementCounter = () => setCounter((prev) => prev + 1);

  return (
    <>
      <ComponentProps counter={counter} />
      <ComponentDeeperProps counter={{ value: counter }} />
      <button onClick={incrementCounter}>카운터 증가</button>
      <p>카운터 값: {counter}</p>
    </>
  );
}

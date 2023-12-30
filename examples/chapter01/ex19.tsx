/**
 * @fileoverview 객체의 얕은 비교 이유
 * @description 리액트에서 사용하는 JSX props는 객체이며, props만 변경되었는지를 판단하기 위해 객체의 얕은 비교를 수행한다.
 */
type Props = {
  prop: string;
};

function ComponentProps(props: Props) {
  return <div>{props.prop}</div>;
}

function App() {
  return <ComponentProps prop="value" />;
}

/**
 * @description JSXElement
 */

function Child({ attribute }) {
  return <div>{attribute}</div>;
}

export default function Parent() {
  return <Child attribute={<div>내용</div>} />;
}

/**
 * @description JSXMemberExpression
 */

function ValidComponent() {
  return <foo.bar />;
}

function ValidComponent2() {
  return <foo.bar.baz />;
}

function InvalidComponent() {
  return <foo:bar.baz />;
}

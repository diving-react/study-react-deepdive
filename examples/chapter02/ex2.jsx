/**
 * @description JSXIdentifier
 */

function ValidComponnet1() {
  return <$></$>;
}

function ValidComponnet2() {
  return <_></_>;
}

// Error: Invalid component element.
function InvalidComponnet() {
  return <1></1>;
}
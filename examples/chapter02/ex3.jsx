/**
 * @description JSXNamespacedName
 */

function ValidComponnet() {
  return <a:b></a:b>;
}

// Error: Invalid component element.
function InvalidComponnet() {
  return <a:b:c></a:b:c>;
}
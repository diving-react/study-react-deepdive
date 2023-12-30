/**
 * @fileoverview 리액트에서의 동등 비교: objectIs
 * @requires react
 * @description 리액트에서 값을 비교하는 함수인 objectIs
 */

// flow로 구현돼 있어 any가 추가됨
// flow에서 any는 타입스크립트와 동일하게 어떠한 타입이든 허용한다는 의미
import React, { useState } from "react";
import { render } from "react-dom";

// 런타임에 objectIs를 사용할 수 없다면 다음과 같이 구현
function isEqual(a: any, b: any) {
  return (
    (a === b && (a !== 0 || 1 / a === 1 / b)) || // -0 인 경우를 처리
    (a !== a && b !== b) // NaN인 경우를 처리
  );
}
// 런타임에 objectIs를 사용할 수 있다면 그것을 사용
const objectIs: (a: any, b: any) => boolean =
  typeof Object.is === "function" ? Object.is : isEqual;

export default objectIs;

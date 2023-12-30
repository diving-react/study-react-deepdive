/**
 * @fileoverview 리액트에서의 동등 비교: shallowEqual
 */
import React, { useState } from "react";
import { render } from "react-dom";

import objectIs from "./ex17";

// 객체에 특정 프로퍼티가 있는지 확인하는 메서드 Object.prototype.hasOwnProperty
import hasOwnProperty from "hasProperty';

/**
 * 주어진 두 객체의 프로퍼티를 비교하여 동일한지 여부를 반환
 * @param {object} objA 비교할 객체
 * @param {object} objB 비교할 객체
 * @returns {boolean} 두 객체의 프로퍼티가 동일한지 여부
 */
function shallowEqual(objA: object, objB: object) {
    // 두 객체의 참조값이 동일하면 두 객체는 동일하다고 판단
    if (objectIs(objA, objB)) {
        return true;
    }

    if (
        typeof objA !== "object" ||
        objA === null ||
        typeof objB !== "object" ||
        objB === null
        ) {
            return false;
        }

    // 두 객체의 프로퍼티 개수를 비교
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    // 프로퍼티 개수가 다르면 두 객체는 동일하지 않다고 판단
    if (keysA.length !== keysB.length) {
        return false;
    }

    // 두 객체의 프로퍼티 키를 순회하며 값이 다른 프로퍼티가 있는지 확인
    for (let i = 0; i < keysA.length; i++) {
        // objA의 i번째 프로퍼티 키
        const key = keysA[i];
        // 두 객체의 i번째 프로퍼티 키가 다르면 두 객체는 동일하지 않다고 판단
        if (!hasOwnProperty.call(objB, key) || !objectIs(objA[key], objB[key])) {
            return false;
        }
    }

    return true;
}

export default shallowEqual;
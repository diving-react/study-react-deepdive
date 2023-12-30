/**
 * @fileoverview 원시타입 null
 * @description 원시타입 null은 값이 없음을 나타낸다.
 */
type of null === 'object'; // true
// 이유: typeof null은 object이다. 이는 자바스크립트의 오래된 버그이다.

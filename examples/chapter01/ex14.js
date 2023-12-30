/**
 * @desciption 두개의 변수는 변수명 및 각 변수명의 주소가 다르지만 value가 가리키는 주소는 같다.
 */
var value = {
  value: 10,
};

var copy = value;

console.log(value); // { value: 10 }
console.log(copy); // { value: 10 }

console.log(value === copy); // true
console.log(value.value === copy.value); // true

---
title: 'JavaScript: 함수의 종류와 특징'
category: javascript
date: 2022-03-16
tags:
  - IIFE
  - 콜백함수
  - 메서드
  - 화살표함수
---

# 즉시 실행 함수

함수 정의와 동시에 즉시 호출되는 함수를 **즉시 실행 함수(IIFE, Immediately Invoked Function Expression)**라고 한다. 즉시 실행 함수는 한 번만 호출되며 다시 호출할 수 없다.

즉시 실행 함수는 익명 함수를 사용하는 것이 일반적이다.

```js
// 익명 즉시 실행 함수
(function name() {
  const a = 3;
  const b = 3;
  return a * b;
})();
```

즉시 실행 함수는 그룹 연산자로 감싸야 한다. 그렇지 않으면 에러가 발생한다.

```js
function(){ // SyntaxError: Function statements require a function name
    // ...
}();
```

위 코드는 함수 선언문은 함수 이름을 생략할 수 없으므로 함수 정의가 맞지 않아 에러가 발생한다. 그렇다면 기명 함수를 정의해서 그룹 연산자 없이 호출해보자.

```js
function foo() {
    // ...
}(); // SyntaxError: Unexpected token ')'
```

위 코드에서도 에러가 발생한다. 이는 자바스크립트 엔진이 암묵적으로 수행하는 세미콜론 자동 삽입 기능 때문이다. 따라서 위 코드는 다음과 같이 실행된다.

```js
function foo() {}(); // => function foo() {};();
```

따라서 함수 선언문 뒤의 `()`는 그룹 연산자로 해석되고 그룹 연산자에 피연산자가 없기 때문에 에러가 발생하는 것이다. 그룹 연산자의 피연산자는 값으로 평가되므로 기명 또는 무명 함수를 그룹 연산자로 감싸면 함수 리터럴로 평가되어 함수 객체가 된다.

즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있고 인수를 전달할 수도 있다.

```js
// 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있다.
var res = (function () {
  var a = 3;
  var b = 5;
  return a * b;
})();

console.log(res); // 15

// 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function (a, b) {
  return a * b;
})(3, 5);

console.log(res); // 15
```

**즉시 실행 함수 안에 있는 변수는 즉시 실행 함수의 지역 변수가 된다.** 이러한 특성을 이용해 전역 변수의 사용을 제한할 수 있다.

```js
(function () {
  var foo = 10; // 측시 실행 함수의 지역 변수
})();

console.log(foo); // ReferenceError: foo is not defined
```

# 콜백 함수

함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 **콜백 함수(callback function)**이라 한다. 그리고 콜백 함수를 전달받은 함수를 **고차 함수(HOF; Higher-Of-Function)**라고 한다. 매개변수를 통해 함수를 전달받거나 반환 값으로 함수를 반환하는 함수를 함수형 프로그래밍 패러다임에서 고차 함수라 한다.

콜백 함수는 고차 함수에 의해 호출되며 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다. 콜백 함수를 익명 함수로 정의하여 고차 함수에 전달하는 것이 일반적이다.

```js
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i);
  }
}

repeat(5, function (i) {
  if (i % 2) console.log(i);
}); // 1 3
```

만약 콜백 함수를 다른 곳에서도 호출할 필요가 있거나, 콜백 함수를 전달받는 함수가 자주 호출된다면 외부에 콜백 함수를 정의하고 함수 참조를 고차 함수에 전달할 수 있다.

```js
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i);
  }
}

const logOdds = function (i) {
  if (i % 2) console.log(i);
};

repeat(5, logOdds); // 1 3
```

콜백 함수는 이벤트 처리나 비동기 처리에서 사용되며 배열 고차 함수에서도 사용된다.

```js
// 이벤트 처리
const button = document.querySelector('myButton');
button.addEventListener('click', function () {
  console.log('button clicked!');
});

// 비동기 처리
setTimeout(function () {
  console.log('1초 경과');
}, 1000);

// 배열의 고차 함수
const res = [1, 2, 3].map(function (item) {
  return item * 2;
});
console.log(res); // [2, 4, 6]
```

# 메서드

ES6 이전에는 메서드는 객체에 바인딩된 함수를 일컫는 의미로 사용되었다. ES6 부터는 메서드에 대한 정의가 명확하게 규정되었는데 ES6 사양에서 메서드는 **메서드 축약 표현**으로 정의된 함수만을 의미한다.

```js
const man = {
  name: 'Roh',

  // displayName1는 메서드다.
  displayName1() {
    return this.name;
  },

  // displayName2는 메서드가 아닌 일반 함수다.
  displayName2: function () {
    return this.name;
  },
};
```

ES6 메서드는 인스턴스를 생성할 수 없는 `non-constructor`다. 따라서 ES6 메서드는 생성자 함수로서 호출할 수 없다. ES6 메서드는 인스턴스를 생성할 수 없으므로 `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```js
new man.displayName1(); // -> TypeError: man.displayName1 is not a constructor
new man.displayName2(); // -> displayName2 {}

man.displayName1.hasOwnProperty('prototype'); // -> false
man.displayName2.hasOwnProperty('prototype'); // -> true
```

_ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 `[[HomeObject]]`를 갖는다._ 따라서 ES6 메서드는 `super` 키워드를 사용할 수 있다.

```js
const parent = {
  name: 'Roh',
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const child = {
  __proto__: parent,

  // askAge의 [[HomeObject]] child의 prototype을 가리키고
  // super는 askAge의 [[HomeObject]]의 프로토타입인 parent.prototype을 가리킨다.
  askAge() {
    return `${super.sayHi()}. how old are you?`;
  },
};

console.log(child.askAge()); // Hi! Roh. how old are you?
```

# 화살표 함수

<blockquote variant="info">

화살표 함수에 관한 내용은 [JavaScript: 화살표 함수(Arrow Function)](https://chamdom.blog/arrow-function) 에서 자세히 다루고 있다.

</blockquote>

# 정리

ES6 이전까지 함수는 별다른 구분 없이 다양한 목적으로 사용되었다. 일반 함수로서 호출할 수도 있고, `new` 연산자와 함께 호출하여 생성자 함수로서 호출할 수도 있으며, 객체에 바인딩되어 메서드로서 호춛될 수도 있었다. 즉, ES6 이전의 모든 함수는 `callable`이면서 `constructor`다.

> 호출할 수 있는 함수 객체를 `callable`이라 하고, 인스턴스를 생성할 수 있는 함수를 `constructor`, 인스턴스를 생성할 수 없는 함수는 `non-constructor`라 한다.

ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 구분했다. (이외에도 제너레이터 함수와 async 함수도 존재한다.)

| ES6 함수의 구분             | constructor | prototype | super | arguments |
| --------------------------- | ----------- | --------- | ----- | --------- |
| 일반 함수(Normal)           | O           | O         | X     | O         |
| 메서드(Method)              | X           | X         | O     | O         |
| 화살표 함수(Arrow Function) | X           | X         | X     | X         |

일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며 ES6 이전의 함수와 차이가 없다. ES6의 메서드와 화살표 함수는 ES6 이전의 함수는 명확한 차이가 있는데 일반 함수는 `constructor`이지만 ES6의 메서드와 화살표 함수는 `non-constructor`다.

<br />

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive

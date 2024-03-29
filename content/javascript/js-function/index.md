---
title: 'JavaScript: 함수 선언 방법과 함수 호이스팅'
category: javascript
date: 2022-03-15
tags:
  - 함수선언문
  - 함수표현식
  - 함수호이스팅
---

# 함수란?

함수는 자바스크립트에서 중요한 핵심 개념이다. 스코프, 실행 컨텍스트, 클로저, 생성자 함수, 메서드, this, 프로토타입 등 모두 함수와 깊은 관련이 있다.

프로그래밍 언어의 **함수(function)**는 일련의 과정을 문(statement)으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것을 말한다.

자바스크립트의 함수는 객체 타입의 값이다. 따라서 함수를 함수 리터럴로 생성할 수 있다. 함수 리터럴은 function 키워드, 함수 이름, 매개 변수 목록, 함수 몸체로 구성된다.

```js
// 함수 리터럴
const func = function (a, b) {
  return a + b;
};
```

# 함수 정의

함수 정의란 함수를 호출하기 이전에 인수를 전달받을 매개변수와 실행할 문들, 그리고 반환할 값을 지정하는 것을 말한다. 정의된 함수는 자바스크립트 엔진에 의해 평가되어 함수 객체가 된다. 이제 자바스크립트의 함수 정의하는 방법에 대해 살펴보자.

## 함수 선언문

함수 선언문(function declaration)을 사용해 함수를 정의하는 방식은 다음과 같다.

```js
// 함수 선언문
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

함수 선언문은 함수 리터럴과 형태가 같다. 차이점이 있다면 함수 리터럴은 함수의 이름을 생략할 수 있지만, **함수 선언문은 함수 이름을 생략할 수 없다**는 것이다.

```js
// 함수 선언문은 함수 이름을 생략할 수 없다.
function (a, b) {
  return a + b;
}
// SyntaxError: Function statements require a function name
```

### 코드의 문맥에 따른 함수 리터럴 해석

```js
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만, 함수 선언문이 변수에 할당되는 것처럼 보인다.
const add = function add(a, b) {
  return a + b;
};

console.log(add(2, 5)); // 7
```

**함수 선언문은 표현식이 아닌 문이다.** 표현식이 아닌 문은 변수에 할당할 수 없으므로 함수 선언문으로 선언한 함수는 변수에 할당할 수 없다. 하지만 위 코드를 보면 함수 선언문이 변수에 할당되는 것처럼 보인다. 이렇게 동작하는 이유는 자바스크립트 엔진이 코드의 문맥에 따라 다음과 같은 경우로 해석하게 된다.

1. 표현식이 아닌 문인 **함수 선언문**으로 해석하는 경우
2. 표현식인 문인 **함수 리터럴**로 해석하는 경우

함수 선언문은 함수 이름을 생략할 수 없다는 점을 제외하면 함수 리터럴과 형태가 같다. 이는 함수 이름이 있는 기명 함수 리터럴은 함수 선언문 또는 함수 리터럴 표현식으로 해석될 수 있다는 것이다. 따라서 기명 함수 리터럴은 중의적인 코드다.

자바스크립트 엔진은 함수 이름이 있는 _함수 리터럴을 단독으로 사용(함수 리터럴을 피연산자로 사용하지 않는 경우)하면 함수 선언문으로 해석하고, 함수 리터럴이 값으로 평가되어야 하는 문맥에서는 함수 리터럴 표현식으로 해석한다._ 함수 선언문과 함수 리터럴 표현식은 함수 객체를 생성한다는 점에서 같지만, **함수 선언문은 호출할 수 있고 함수 리터럴 표현식은 호출할 수 없다는 차이점이 있다.**

```js
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
function foo() {
  console.log('foo');
}
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 리터럴 표현식으로 해석된다.
(function bar() {
  console.log('bar');
});
bar(); // ReferenceError: bar is not defined
```

함수 이름은 함수 몸체 내부에서만 참조할 수 있는 식별자다. 이는 함수 몸체 외부에서는 함수 이름으로 함수를 참조할 수 없는 것이다. 즉, 함수를 가리키는 식별자가 없다는 것을 의미한다. 따라서 위 코드의 bar 함수를 호출할 수 없는 것이다.

마찬가지로 foo 함수도 호출할 수 없어야 하지만 호출할 수 있다. 결론부터 말하자면 **자바스크립트 엔진이 암묵적으로 식별자를 생성했기 때문**에 가능한 것이다. 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 같은 이름의 식별자를 암묵적으로 생성하고, 식별자에 함수 객체를 할당한다. 이를 참고해서 함수 선언문의 의사코드를 작성하면 다음과 같다.

```js
// 함수 선언문의 의사 코드
const add = function add(a, b) {
  return a + b;
};

console.log(add(2, 3)); // 5
```

_함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출한다._ 즉, 함수 선언문으로 생성한 함수를 호출하는 것은 함수 이름 `add`가 아니라 자바스크립트 엔진에 의해 암묵적으로 생성된 식별자 `add`다. 함수 이름과 식별자 이름이 같아서 함수 이름으로 호출된 것 같지만 사실은 식별자로 호출된 것이다.

위 의사 코드가 다음으로 알아볼 함수 표현식이다. 결론적으로 자바스크립트 엔진은 함수 선언문을 함수 표현식으로 변환해 함수 객체를 생성한다고 생각할 수 있다. 하지만 정확히 동일하게 동작하는 것은 아니다.

## 함수 표현식

**자바스크립트 함수는 일급 객체이다.** 이는 함수를 값처럼 사용할 수 있다는 것을 의미한다. 함수는 일급 객체이므로 함수 리터럴로 생성한 함수 객체를 변수에 할당할 수 있다. 이러한 함수 정의 방식을 **함수 표현식(function expression)**이라 한다.

```js
// 함수 표현식
const add = function (a, b) {
  return a + b;
};

console.log(add(2, 3)); // 5
```

함수 리터럴은 함수 이름을 생략할 수 있다고 했다. 함수 표현식의 함수 리터럴은 함수 이름을 생략하는 것이 일반적이다.

# 함수 선언문과 함수 표현식의 차이점

자바스크립트 엔진은 함수 선언문의 함수 이름으로 식별자를 암묵적으로 생성하고 함수 객체를 할당하므로 함수 표현식과 유사하게 동작하는 것처럼 보인다. 하지만 이 둘은 정확히 같게 동작하지 않는다. 함수 선언문은 "표현식이 아닌 문"이고 함수 표현식은 "표현식인 문"이다. 이 둘의 차이점에 대해 알아보자.

```js
// 함수 참조
console.dir(add_def); // f add_def()
console.dir(add_expr); // undefined

// 함수 호출
console.log(add_def(2, 3)); // 5
console.log(add_expr(2, 5)); // TypeError: add_expr is not a function

// 함수 선언문
function add_def(a, b) {
  return a + b;
}

// 함수 표현식
var add_expr = function (a, b) {
  return a + b;
};
```

위 코드를 보면 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있지만 함수 표현식으로 정의한 함수는 그렇지 않다. 이는 **함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르기 때문**이다.

함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성되고 자바스크립트 엔진에 의해 함수 이름과 같은 이름의 식별자를 암묵적으로 생성하고 생성된 함수 객체를 할당한다. 즉, 런타임에는 이미 함수 객체가 생성되어 식별자 할당까지 완료된 상태이다. 따라서 함수 선언문 이전에 함수를 참조하거나 호출할 수 있는 것이다. 이처럼 함수 선언문이 코드의 선두로 끌어올려진 것처럼 동작하는 것을 **함수 호이스팅(function hoisting)**이라 한다.

_함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는 것이 아니라 변수 호이스팅이 발생한다._ 변수 할당문의 값은 런타임에 평가되므로 함수 표현식의 함수 리터럴도 런타임 이전이 아닌 런타임에 평가되어 함수 객체가 된다. 따라서 함수 표현식 이전에 함수를 참조하면 `undefined`로 평가된다. 함수 표현식으로 정의한 함수는 반드시 함수 표현식 이후에 참조, 호출해야 한다.

### 함수 호이스팅과 변수 호이스팅의 차이점

`var` 키워드를 사용한 변수 선언문과 함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행되어 식별자를 생성한다는 점은 같다. 하지만, `var` 키워드로 선언된 변수는 `undefined`로 초기화되고, 함수 선언문을 통해 선언된 식별자는 함수 객체로 초기화된다. 따라서 **var 키워드로 선언한 변수를 선언문 이전에 참조하면 undefined로 평가되지만, 함수 선언문으로 정의한 함수를 선언문 이전에 호출하면 함수 호이스팅에 의해 호출할 수 있다.**

> 함수 호이스팅은 함수를 호출하기 전에 반드시 함수를 선언해야 한다는 규칙을 무시한다. 이 같은 문제 때문에 ⟪JavaScript : The Good Parts⟫의 저자이자 JSON을 창안한 더글러스 크락포드(Douglas Crockford)는 함수 선언문 대신 함수 표현식을 사용할 것을 권장한다.

<br />

---

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive

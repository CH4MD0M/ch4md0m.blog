---
title: 'JavaScript: 화살표 함수(Arrow Function)'
category: javascript
date: 2022-05-19
tags:
  - 화살표함수
  - 콜백함수
---

# 화살표 함수

**화살표 함수(arrow function)**는 `function` 키워드 대신 화살표 `=>`를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.

화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다. 화살표 함수는 함수 선언문으로 정의할 없고 함수 표현식으로 정의해야 한다. 호출 방식은 기존 한수와 동일하다.

<br/>

함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 `{}`를 생략할 수 있다. 이때 함수 **몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.** 만약 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생하므로 중괄호를 생략할 수 없다.

```js
const pow = x => x ** 2;
pow(2); // 4

// 위 함수는 아래와 동일하다.
const pow = x => {
  return x ** 2;
};
```

화살표 함수는 객체 리터럴을 반환하는 경우 소괄호 `()`로 감싸주어야 한다. 객체 리터럴을 소괄호 `()`로 감싸지 않으면 객체 리터럴의 중괄호`{}`를 함수의 몸체를 감싸는 중괄호`{}`로 잘못 해석한다.

```js
const info = (id, name) => ({ id, name });
info(1, 'Roh'); // {id: 1, name: "Roh"}
```

함수 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 `{}`를 생략할 수 없다.

```js
const add = (a, b) => {
  const result = a + b;
  return result;
};
```

## 화살표 함수와 일반 함수의 차이

#### 1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.

화살표 함수는 인스턴스를 생성할 수 없으므로 `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```js
const Foo = () => {};

new Foo(); // TypeError: Foo is not a constructor
Foo.hasOwnProperty('prototype'); // -> false
```

#### 2. 중복된 매개변수 이름을 사용할 수 없다.

일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생되지 않는다. (단, strict mode에서 중복된 매개변수 이름을 선언하면 에러가 발생한다.) 화살표 함수는 중복된 매개변수 이름을 선언하면 에러가 발생한다.

```js
// strict mode에서는 일반 함수도 중복된 매개변수 이름을 사용할 수 없다.
'use strict';
function normal(a, a) {
  return a + a;
}
// SyntaxError:  Duplicate parameter name not allowed in this context
```

```js
// 화살표 함수는 중복된 매개변수 이름을 선언하면 에러가 발생한다.
const arrow = (a, a) => a + a;
// SyntaxError:  Duplicate parameter name not allowed in this context
```

#### 3. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

화살표 함수 내부에서 `this`, `arguments`, `super`, `new.target`을 참조하면 스코프 체인을 통해 **가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수**의 `this`, `arguments`, `super`, `new.target`을 참조한다.

# 화살표 함수의 this

화살표 함수와 일반 함수가 구별되는 가장 큰 특징이 `this`다.

화살표 함수의 `this`는 일반 함수의 `this`와 다르게 동작한다. 이는 _콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다._

## 콜백 함수의 this 불일치 문제

다음 코드를 살펴보자.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // ①
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // TypeError: Cannot read property 'prefix' of undefined
    });
  }
}
const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```

위 코드의 기대하는 결과는 `["-webkit-transition", "-webkit-user-select"]`이지만, 결과는 `TypeError`가 발생한다. 그 이유에 대해 알아보자.

①에서 this는 메서드의 호출 객체인 prefixer를 가리킨다. 콜백 함수 내부인 ②에서 `this`는 `undefined`를 가리킨다. 이는 `Array.prototype.map` 메서드가 콜백 함수를 일반 함수로 호출했기 때문이다.

> 클래스 내부의 모든 코드에는 암묵적으로 `strict mode`가 적용된다. `strict mode`에서 일반 함수로 호출된 모든 함수 내부의 `this`에는 전역 객체가 아니라 `undefinde`가 바인딩된다.

위 코드처럼 발생하는 문제가 **콜백 함수의 this 불일치 문제**다. 외부 함수(①)와 콜백 함수(②)의 this가 서로 다른 값을 가리키고 있기 때문에 TypeError가 발생한 것이다.

## 콜백 함수의 this 불일치 문제 해결(ES6 이전)

#### that 변수로 this 회피

```js
...

add (arr) {
  const that = this;
  return arr.map(function (item) {
    return that.prefix + " " + item;
  });
};

...
```

#### Function.prototype.bind 메서드 사용

```js
...

add (arr) {
  return arr
    .map(function (item) {
      return that.prefix + " " + item;
    })
    .bind(this);
}

...
```

## 화살표 함수를 이용한 this 문제 해결

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(item => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ["-webkit-transition", "-webkit-user-select"]
```

_화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다._ 이를 **lexical this**라 한다. 이는 렉시컬 스코프처럼 화살표 함수의 `this`가 정의된 위치에 의해 결정된다는 것을 의미한다.

<br/>

만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 `this` 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this`를 참조한다.

# 화살표 함수의 super

화살표 함수는 `super` 바인딩을 갖지 않기 때문에 `this`와 마찬가지로 상위 스코프의 `super`를 참조한다.

```js
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Child extends Parent {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
  askAge = () => `${super.sayHi()}. how old are you?`;
}

const child = new Child('Roh');
console.log(child.askAge()); // Hi! Roh. how old are you?
```

`super` 키워드는 내부 슬롯 `[[HomeObject]]`를 갖는 **ES6 메서드** 내에서만 사용할 수 있다. 화살표 함수는 ES6 메서드는 아니지만 함수 자체의 `super` 바인딩을 갖지 않으므로 `super`를 참조해도 에러가 발생하지 않고 상위 스코프인 `constructor`의 `super` 바인딩을 참조한다.

# 화살표 함수의 arguments

화살표 함수는 `arguments` 바인딩을 갖지 않기 때문에 `this`와 마찬가지로 상위 스코프의 `arguments`를 참조한다.

```js
(function () {
  // 화살표 함수의 arguments 상위 스코프인 즉시 실행 함수의 arguments 객체를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
})(1, 2);

// 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

화살표 함수는 상위 스코프의 `arguments` 객체를 참조할 수는 있지만 화살표 함수 자신의 인수 목록을 확인할 수 없다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 **Rest parameter**를 사용해야 한다.

<br />

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive

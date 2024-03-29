---
title: 'JavaScript: 이터러블(iterable)과 이터레이터'
category: javascript
date: 2022-06-04
tags:
  - 이터러블
  - 이터레이터
---

# 이터레이션 프로토콜

ES6에서 도입된 **이터레이션 프로토콜(iteration protocol)**은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.

ES6 이전의 순회 가능한 데이터 컬렉션(배열, 문자열, 유사 배열 객체, DOM 컬렉션)은 통일된 규약 없이 다양한 방법으로 순회할 수 있었다. <br />
ES6에서 도입된 이터레이션 프로토콜(iteration protocol)은 데이터 컬렉션을 순회하기 위한 프로토콜(미리 약속된 규칙)이다. 이터레이션 프로토콜을 준수한 객체는 `for…of` 문, `스프레드 문법`, `배열 디스트럭처링 할당`의 대상으로 사용할 수 있다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

# 이터러블

> **✍🏻 이터러블 프로토콜(iterable protocol)**
>
> Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 한다.

이터러블 프로토콜을 준수한 객체를 **이터러블(iterable)**이라 한다. 즉, 이터러블은 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

```js
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]); // -> true
isIterable(''); // -> true
isIterable(new Map()); // -> true
isIterable(new Set()); // -> true
isIterable({}); // -> false
```

이터러블은 `for…of` 문으로 순회할 수 있고, `스프레드 문법`의 대상으로 사용할 수 있다.

```js
const array = [1, 2, 3];

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]
```

`Symbol.iterator` 메서드를 직접 구현하지 않거나 상속받지 않은 **일반 객체**는 이터러블 프로토콜을 준수한 이터러블이 아니다. 따라서, `for…of` 문으로 순회할 수 없고, `스프레드 문법`의 대상으로 사용할 수 없다.

```js
const obj = { a: 1, b: 2 };

// 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문으로 순회할 수 없다.
// TypeError: obj is not iterable
for (const item of obj) {
  console.log(item);
}
```

# 이터레이터

> **✍🏻 이터레이터 프로토콜(iterator protocol)**
>
> 이터레이터는 next 메서드를 소유하며 next메서드를 호출하면 이터러블을 순회하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이러한 규약을 이터레이터 프로토콜이라 한다.

이터레이터 프로토콜을 준수한 객체를 **이터레이터(iterator)**라 한다. 이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.

```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true
```

이터레이터는 `next` 메서드를 소유하며 `next` 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 한다. 이터레이터의 `next` 메서드가 반환하는 **이터레이터 리절트 객체**의 `value` 프로퍼티는 현재 순회 중인 이터러블의 값을 나타내며 `done` 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.

```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
// 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

# for…of 문

`for…in` 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 **true**인 프로퍼티를 순회하며 열거한다. 이때 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

`for…of` 문은 내부적으로 이터레이터의 `next` 메서드를 호출하여 이터러블을 순회하며 `next` 메서드가 반환한 이터레이터 리절트 객체의 `value` 프로퍼티 값을 `for…of` 문의 변수에 할당한다.

이터레이터 리절트 객체의 `done` 프로퍼티 값이 **false**이면 순회를 계속하고, **true**이면 이터러블의 순회를 중단한다.

```js
for (const item of [1, 2, 3]) {
  console.log(item); // 1 2 3
}
```

# 이터러블과 유사 배열 객체

유사 배열 객체는 이터러블이 아닌 일반 객체다. 따라서 유사 배열 객체에는 `Symbol.iterator` 메서드가 없기 때문에 `for…of` 문으로 순회할 수 없다.

```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

// TypeError: arrayLike is not iterable
for (const item of arrayLike) {
  console.log(item);
}
```

단, `arguments`, `NodeList`, `HTMLCollection`은 유사 배열 객체이면서 이터러블이다. 정확히는 ES6에서 이터러블이 도입되면서 유사 배열 객체인 `arguments`, `NodeList`, `HTMLCollection` 객체에 `Symbol.iterator` 메서드를 구현하여 이터러블이 되었다. 배열도 마찬가지로 ES6에서 이터러블이 도입되면서 `Symbol.iterator` 메서드를 구현하여 이터러블이 되었다.

모든 유사 배열 객체가 이터러블인 것은 아니기 때문에 유사 배열 객체를 이터러블처럼 사용하기 위해서는 ES6에서 도입된 `Array.from` 메서드를 사용하여 배열로 변환할 수 있다. `Array.from` 메서드는 유사 배열 객체 또는 이터러블을 인수로 전달받아 배열로 변환하여 반환한다.

```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = Array.from(arrayLike);

// Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다.
for (const item of arr) {
  console.log(item); // 1 2 3
}
```

<br />

---

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive

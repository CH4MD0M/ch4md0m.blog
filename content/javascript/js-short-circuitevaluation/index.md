---
title: 'JavaScript: 단축 평가'
category: javascript
date: 2022-03-07
tags:
  - 단축평가
  - 옵셔널체이닝
  - null병합연산자
---

# 단축 평가

## 논리 연산자를 사용한 단축 평가

논리합(`||`) 또는 논리곱(`&&`) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 논리합(`||`) 또는 논리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

### 논립곱 연산자

논리곱 연산자는 두 개의 피연산자가 모두 `true`로 평가될 때 `true`를 반환한다. 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.

```js
'Apple' && 'Banana'; // -> "Banana"
```

- 첫 번째 피연산자 **"Apple"**은 Truthy 값이므로 true로 평가된다.
- 논리곱 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환한다고 했다. 즉, 두 번째 피연산자가 위 논리곱 연산자 표현식의 평가 결과를 결정한다.
- 논리 연산의 결과를 결정하는 두 번째 피연산자, 즉 **"Banana"**를 그대로 반환한다.

### 논리합 연산자

논리합 연산자는 두 개의 피연산자 중 하나만 `true`로 평가되어도 `true`를 반환한다. 논리합 연산자도 좌항에서 우항으로 평가가 진행된다.

```js
'Apple' || 'Banana'; // -> "Apple"
```

- 첫 번째 피연산자 **"Apple"**은 Truthy 값이므로 true로 평가된다.
- 두 번째 피연산자까지 평가해 보지 않아도 위 표현식을 평가할 수 있다.
- 논리 연산의 결과를 결정한 첫 번째 피연산자, 즉 **"Apple"**을 그대로 반환한다.

논리곱 연산자와 논리합 연산지는 이처럼 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 **단축 평가(short-circuitevaluation)**라 한다. _단축 평가는 표현식을 평가하는 도중에 평가
결과가 확정되면 나머지 평가 과정을 생략하는 것을 말한다._

단축 평가는 다음 규칙을 따른다.

|  단축 평가 표현식   | 평가 결과 |
| :-----------------: | :-------: |
| true \|\| anything  |   true    |
| false \|\| anything | anything  |
|  true && anything   | anything  |
|  false && anything  |   false   |

# 옵셔널 체이닝 연산자

ES11(ECMAScript 2020)에서 도입된 **옵셔널 체이닝(optional chaning) 연산자** `?.`는 좌항의 피연산자가 `null` 또는 `undefined`일 때 `undefined`를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```js
var foo = null;
var value = foo?.value;

console.log(value); // undefined
```

# null 병합 연산자

ES11(ECMAScript 2020)에서 도입된 **null 병합(nullish coalescing) 연산자** `??`는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

- null 병합 연산자는 변수에 기본값을 설정할 때 유용하다.

```js
var foo = null ?? 'default value';
console.log(foo); // "default value"
```

<br />

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive

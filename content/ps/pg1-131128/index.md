---
title: '[프로그래머스] 숫자짝꿍 (JavaScript)'
category: ps
date: 2022-11-14
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 숫자짝꿍](https://school.programmers.co.kr/learn/courses/30/lessons/131128)

### 문제 설명

두 정수 `X`, `Y`의 임의의 자리에서 공통으로 나타나는 정수 k(0 ≤ k ≤ 9)들을 이용하여 만들 수 있는 가장 큰 정수를 두 수의 짝꿍이라 합니다(단, 공통으로 나타나는 정수 중 서로 짝지을 수 있는 숫자만 사용합니다). X, Y의 짝꿍이 존재하지 않으면, 짝꿍은 -1입니다. X, Y의 짝꿍이 0으로만 구성되어 있다면, 짝꿍은 0입니다.

예를 들어, `X` = 3403이고 `Y` = 13203이라면, `X`와 `Y`의 짝꿍은 `X`와 `Y`에서 공통으로 나타나는 3, 0, 3으로 만들 수 있는 가장 큰 정수인 330입니다. 다른 예시로 X = 5525이고 Y = 1255이면 X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 2, 5, 5로 만들 수 있는 가장 큰 정수인 552입니다(`X`에는 5가 3개, `Y`에는 5가 2개 나타나므로 남는 5 한 개는 짝 지을 수 없습니다.)
두 정수 `X`, `Y`가 주어졌을 때, `X`, `Y`의 짝꿍을 return하는 solution 함수를 완성해주세요.

### 제한사항

- 3 ≤ `X`, `Y`의 길이(자릿수) ≤ 3,000,000입니다.
- `X`, `Y`는 0으로 시작하지 않습니다.
- `X`, `Y`의 짝꿍은 상당히 큰 정수일 수 있으므로, 문자열로 반환합니다.

### 입출력 예

| X       | Y        | result |
| ------- | -------- | ------ |
| "100"   | "2345"   | "-1"   |
| "100"   | "203045" | "0"    |
| "100"   | "123450" | "10"   |
| "12321" | "42531"  | "321"  |
| "5525"  | "1255"   | "552"  |

# 코드

```js
function solution(X, Y) {
  const hashX = new Map();
  const hashY = new Map();

  for (const digit of X) {
    hashX.set(digit, (hashX.get(digit) || 0) + 1);
  }
  for (const digit of Y) {
    hashY.set(digit, (hashY.get(digit) || 0) + 1);
  }

  let answer = '';
  for (let i = 9; i >= 0; i--) {
    const char = String(i);
    const count = Math.min(hashX.get(char), hashY.get(char));
    answer += char.repeat(count);
  }

  return answer ? (Number(answer) ? answer : '0') : '-1';
}
```

## 문제 풀이

자바스크립트의 `Map` 객체를 이용해 구현했다.

먼저 X, Y 각각에 대해 Map 객체를 선언하고 Map 객체를 업데이트 한다.

```js
const hashX = new Map();
const hashY = new Map();

for (const digit of X) {
  hashX.set(digit, (hashX.get(digit) || 0) + 1);
}
for (const digit of Y) {
  hashY.set(digit, (hashY.get(digit) || 0) + 1);
}
```

그리고 **가장 큰 수를 만들기 위해서** 9부터 공통되는 수를 찾는다. 이때 공통되는 수를 찾는 것이기 때문에 `Math.min()`메서드를 사용한다.

```js
let answer = '';
for (let i = 9; i >= 0; i--) {
  const char = String(i);
  const count = Math.min(hashX.get(char), hashY.get(char));
  answer += char.repeat(count);
}
```

문제 출력 조건에 맞게 0으로만 이루어져 있으면 0을, 짝이 존재하지 않는 다면 -1을, 짝이 존재한다면 결과값을 return 한다. `00`과 같은 문자열을 `0`으로 처리해야 하기 때문에 중간에 answer를 Number로 검사한다.

```js
return answer ? (Number(answer) ? answer : '0') : '-1';
```

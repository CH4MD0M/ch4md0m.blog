---
title: '[프로그래머스] 크기가 작은 부분문자열 (JavaScript)'
category: ps
date: 2023-01-04
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 크기가 작은 부분문자열](https://school.programmers.co.kr/learn/courses/30/lessons/147355)

### 문제 설명

숫자로 이루어진 문자열 `t`와 `p`가 주어질 때, `t`에서 `p`와 길이가 같은 부분문자열 중에서, 이 부분문자열이 나타내는 수가 `p`가 나타내는 수보다 작거나 같은 것이 나오는 횟수를 return하는 함수 solution을 완성하세요.

예를 들어, `t`="3141592"이고 `p`="271" 인 경우, `t`의 길이가 3인 부분 문자열은 314, 141, 415, 159, 592입니다. 이 문자열이 나타내는 수 중 271보다 작거나 같은 수는 141, 159 2개 입니다.

### 제한사항

- 1 ≤ `p`의 길이 ≤ 18
- `p`의 길이 ≤ `t`의 길이 ≤ 10,000
- `t`와 `p`는 숫자로만 이루어진 문자열이며, 0으로 시작하지 않습니다.

### 입출력 예

| t              | p     | result |
| -------------- | ----- | ------ |
| "3141592"      | "271" | 2      |
| "500220839878" | "7"   | 8      |
| "10203"        | "15"  | 3      |

# 코드

```js
function solution(t, p) {
  const strings = [];
  for (let i = 0; i <= t.length - p.length; i++) {
    strings.push(t.substr(i, p.length));
  }

  return strings.filter(v => +v < +p).length;
}
```

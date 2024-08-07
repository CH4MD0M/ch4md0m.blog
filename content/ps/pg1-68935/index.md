---
title: '[프로그래머스] 3진법 뒤집기 (JavaScript)'
category: ps
date: 2022-06-22
tags:
  - 프로그래머스
  - 월간 코드 챌린지 시즌1
  - lv1
---

# 문제

[월간 코드 챌린지 시즌1 - 3진법 뒤집기](https://school.programmers.co.kr/learn/courses/30/lessons/68935)

### 문제 설명

자연수 n이 매개변수로 주어집니다. n을 3진법 상에서 앞뒤로 뒤집은 후, 이를 다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- n은 1 이상 100,000,000 이하인 자연수입니다.

### 입출력 예

| n   | result |
| --- | ------ |
| 45  | 7      |
| 125 | 229    |

# 코드

```js
function solution(n) {
  return parseInt([...n.toString(3)].reverse().join(''), 3);
}
```

# 문제 풀이

3진법으로 변환하기 위해 `Object.prototype.toString()`메서드를 사용하여 변환하고, 이를 뒤집은 뒤에 `parseInt()` 메서드를 사용하여 다시 10진수로 변환하였다.

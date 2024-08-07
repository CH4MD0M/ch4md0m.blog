---
title: '[프로그래머스] 숫자 변환하기 (JavaScript)'
category: ps
date: 2023-02-28
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 숫자 변환하기](https://school.programmers.co.kr/learn/courses/30/lessons/154538)

### 문제 설명

자연수 `x`를 `y`로 변환하려고 합니다. 사용할 수 있는 연산은 다음과 같습니다.

`x`에 `n`을 더합니다
`x`에 2를 곱합니다.
`x`에 3을 곱합니다.
자연수 `x`, `y`, `n`이 매개변수로 주어질 때, `x`를 `y`로 변환하기 위해 필요한 최소 연산 횟수를 return하도록 solution 함수를 완성해주세요. 이때 `x`를 `y`로 만들 수 없다면 -1을 return 해주세요.

### 제한사항

- 1 ≤ `x` ≤ `y` ≤ 1,000,000
- 1 ≤ `n` < `y`

### 입출력 예

| x   | y   | n   | result |
| --- | --- | --- | ------ |
| 10  | 40  | 5   | 2      |
| 10  | 40  | 30  | 1      |
| 2   | 5   | 4   | -1     |

# 코드

```js
function solution(x, y, n) {
  if (x >= y) return 0;

  const dp = Array(y + 1).fill(Infinity);
  dp[x] = 0;

  for (let i = x + 1; i <= y; i++) {
    if (x <= i - n) dp[i] = Math.min(dp[i], dp[i - n] + 1);
    if (i % 2 === 0 && x <= i / 2) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0 && x <= i / 3) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }

  return dp[y] === Infinity ? -1 : dp[y];
}
```

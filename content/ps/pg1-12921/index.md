---
title: '[프로그래머스] 소수 찾기 (JavaScript)'
category: ps
date: 2022-07-05
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 소수 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/12921)

### 문제 설명

1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.

소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다. <br />
(1은 소수가 아닙니다.)

### 제한사항

- n은 2이상 1000000이하의 자연수입니다.

### 입출력 예

| n   | result |
| --- | ------ |
| 10  | 4      |
| 5   | 3      |

# 코드

```js
function solution(n) {
  const answer = Array.from({ length: n + 1 }, () => true).fill(false, 0, 2);

  for (let i = 2; i * i <= n; i++) {
    if (answer[i]) {
      for (let j = i * i; j <= n; j += i) {
        answer[j] = false;
      }
    }
  }
  return answer.filter(val => val).length;
}
```

# 문제 풀이

**에라토스테네스의 체**를 사용해서 소수 판별을 하였다.

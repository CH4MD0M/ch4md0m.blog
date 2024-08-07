---
title: '[프로그래머스] 시소 짝꿍 (JavaScript)'
category: ps
date: 2023-02-19
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 시소 짝꿍](https://school.programmers.co.kr/learn/courses/30/lessons/152996)

### 문제 설명

어느 공원 놀이터에는 시소가 하나 설치되어 있습니다. 이 시소는 중심으로부터 2(m), 3(m), 4(m) 거리의 지점에 좌석이 하나씩 있습니다.
이 시소를 두 명이 마주 보고 탄다고 할 때, 시소가 평형인 상태에서 각각에 의해 시소에 걸리는 토크의 크기가 서로 상쇄되어 완전한 균형을 이룰 수 있다면 그 두 사람을 시소 짝꿍이라고 합니다. 즉, 탑승한 사람의 무게와 시소 축과 좌석 간의 거리의 곱이 양쪽 다 같다면 시소 짝꿍이라고 할 수 있습니다.
사람들의 몸무게 목록 `weights`이 주어질 때, 시소 짝꿍이 몇 쌍 존재하는지 구하여 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 2 ≤ weights의 길이 ≤ 100,000
- 100 ≤ weights[i] ≤ 1,000
  - 몸무게 단위는 N(뉴턴)으로 주어집니다.
  - 몸무게는 모두 정수입니다.

### 입출력 예

| weights               | result |
| --------------------- | ------ |
| [100,180,360,100,270] | 4      |

# 코드

```js
function solution(weights) {
  let answer = 0;
  const map = new Map();
  const ratio = [1, 3 / 2, 2, 4 / 3];

  weights.sort((a, b) => b - a);

  for (const w of weights) {
    for (const r of ratio) {
      if (map.has(w * r)) answer += map.get(w * r);
    }
    map.set(w, (map.get(w) || 0) + 1);
  }
  return answer;
}
```

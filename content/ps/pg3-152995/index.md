---
title: '[프로그래머스] 인사고과 (JavaScript)'
category: ps
date: 2023-02-27
tags:
  - 프로그래머스
  - lv3
---

# 문제

[연습문제 - 인사고과](https://school.programmers.co.kr/learn/courses/30/lessons/152995)

### 문제 설명

완호네 회사는 연말마다 1년 간의 인사고과에 따라 인센티브를 지급합니다. 각 사원마다 근무 태도 점수와 동료 평가 점수가 기록되어 있는데 만약 어떤 사원이 다른 임의의 사원보다 두 점수가 모두 낮은 경우가 한 번이라도 있다면 그 사원은 인센티브를 받지 못합니다. 그렇지 않은 사원들에 대해서는 두 점수의 합이 높은 순으로 석차를 내어 석차에 따라 인센티브가 차등 지급됩니다. 이때, 두 점수의 합이 동일한 사원들은 동석차이며, 동석차의 수만큼 다음 석차는 건너 뜁니다. 예를 들어 점수의 합이 가장 큰 사원이 2명이라면 1등이 2명이고 2등 없이 다음 석차는 3등부터입니다.

각 사원의 근무 태도 점수와 동료 평가 점수 목록 `scores`이 주어졌을 때, 완호의 석차를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 1 ≤ `scores`의 길이 ≤ 100,000
- `scores`의 각 행은 한 사원의 근무 태도 점수와 동료 평가 점수를 나타내며 [a, b] 형태입니다.
  - `scores`[0]은 완호의 점수입니다.
  - 0 ≤ a, b ≤ 100,000
- 완호가 인센티브를 받지 못하는 경우 -1을 return 합니다.

### 입출력 예

| scores                          | result |
| ------------------------------- | ------ |
| [[2,2],[1,4],[3,2],[3,2],[2,1]] | 4      |

# 코드

```js
function solution(scores) {
  let answer = 1;
  const target = scores[0];

  scores.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    return a[1] - b[1];
  });

  let before = 0;
  for (const s of scores) {
    if (target[0] < s[0] && target[1] < s[1]) return -1;

    if (before <= s[1]) {
      if (target[0] + target[1] < s[0] + s[1]) answer++;
      before = s[1];
    }
  }
  return answer;
}
```

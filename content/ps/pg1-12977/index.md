---
title: '[프로그래머스] 소수 만들기 (JavaScript)'
category: ps
date: 2022-04-07
tags:
  - 프로그래머스
  - Summer/Winter Coding(~2018)
  - lv1
---

# 문제

[Summer/Winter Coding(~2018) - 소수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12977)

### 문제 설명

주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
- nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.

### 입출력 예

|    nums     | result |
| :---------: | :----: |
|  [1,2,3,4]  |   1    |
| [1,2,7,6,4] |   4    |

# 코드

```js
function solution(nums) {
  let answer = 0;
  const arr = Array.from({ length: 3000 }, () => true).fill(false, 0, 2);

  for (let i = 2; i * i <= 3000; i++) {
    if (arr[i]) {
      for (let j = i * i; j <= 3000; j += i) {
        arr[j] = false;
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (arr[nums[i] + nums[j] + nums[k]]) answer++;
      }
    }
  }

  return answer;
}
```

# 문제 풀이

주어진 숫자 중에서 3개의 수를 골라 더했을 때 소수가 되는 경우를 구하는 문제이다. 이는 **조합(combionation)**으로 구현한다.

소수 판별을 위해 에라토스테네스의 체를 사용해서 `arr`을 초기화한다. 이때 `nums`의 원소는 최대 1000이기 때문에 `arr`의 크기는 3000으로 초기화하였다.

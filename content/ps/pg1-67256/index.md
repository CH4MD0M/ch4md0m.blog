---
title: '[프로그래머스] 키패드 누르기 (JavaScript)'
category: ps
date: 2022-07-04
tags:
  - 프로그래머스
  - lv1
---

# 문제

[2020 카카오 인턴십 - 키패드 누르기](https://school.programmers.co.kr/learn/courses/30/lessons/67256)

### 문제 설명

스마트폰 전화 키패드의 각 칸에 다음과 같이 숫자들이 적혀 있습니다.

![kakao_phone1](./image/kakao_phone1.png)

이 전화 키패드에서 왼손과 오른손의 엄지손가락만을 이용해서 숫자만을 입력하려고 합니다. <br/>
맨 처음 왼손 엄지손가락은 `*` 키패드에 오른손 엄지손가락은 `#` 키패드 위치에서 시작하며, 엄지손가락을 사용하는 규칙은 다음과 같습니다.

1. 엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.
2. 왼쪽 열의 3개의 숫자 `1`, `4`, `7`을 입력할 때는 왼손 엄지손가락을 사용합니다.
3. 오른쪽 열의 3개의 숫자 `3`, `6`, `9`를 입력할 때는 오른손 엄지손가락을 사용합니다.
4. 가운데 열의 4개의 숫자 `2`, `5`, `8`, `0`을 입력할 때는 두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락을 사용합니다. <br/>
   4-1. 만약 두 엄지손가락의 거리가 같다면, 오른손잡이는 오른손 엄지손가락, 왼손잡이는 왼손 엄지손가락을 사용합니다.

순서대로 누를 번호가 담긴 배열 numbers, 왼손잡이인지 오른손잡이인 지를 나타내는 문자열 hand가 매개변수로 주어질 때, 각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- numbers 배열의 크기는 1 이상 1,000 이하입니다.
- numbers 배열 원소의 값은 0 이상 9 이하인 정수입니다.
- hand는 `"left"` 또는 `"right"` 입니다.
  - `"left"`는 왼손잡이, `"right"`는 오른손잡이를 의미합니다.
- 왼손 엄지손가락을 사용한 경우는 `L`, 오른손 엄지손가락을 사용한 경우는 `R`을 순서대로 이어붙여 문자열 형태로 return 해주세요.

### 입출력 예

| numbers                           | hand    | result        |
| --------------------------------- | ------- | ------------- |
| [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5] | "right" | "LRLLLRLLRRL" |
| [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2] | "left"  | "LRLLRRLLLRR" |
| [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]    | "right" | "LLRLLRLLRL"  |

# 코드

```js
function solution(numbers, hand) {
  let answer = '';
  const keypad = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    '*': [3, 0],
    0: [3, 1],
    '#': [3, 2],
  };

  let left_Hand = '*';
  let right_Hand = '#';

  for (let num of numbers) {
    let cur = keypad[num];
    let left_Position = keypad[left_Hand];
    let right_Position = keypad[right_Hand];

    if ([1, 4, 7].includes(num)) {
      answer += 'L';
      left_Hand = num;
    } else if ([3, 6, 9].includes(num)) {
      answer += 'R';
      right_Hand = num;
    } else {
      left_Dist =
        Math.abs(cur[0] - left_Position[0]) +
        Math.abs(cur[1] - left_Position[1]);
      right_Dist =
        Math.abs(cur[0] - right_Position[0]) +
        Math.abs(cur[1] - right_Position[1]);

      if (left_Dist < right_Dist) {
        left_Hand = num;
        answer += 'L';
      } else if (left_Dist > right_Dist) {
        right_Hand = num;
        answer += 'R';
      } else {
        if (hand == 'right') {
          right_Hand = num;
          answer += 'R';
        } else {
          left_Hand = num;
          answer += 'L';
        }
      }
    }
  }
  return answer;
}
```

# 문제 풀이

단순 구현 문제이다. 짧은 거리를 판별하기 위해서 2차원 좌표에서의 거리 구하는 방법을 적용하였다.

### 새로 알게된 점

파이썬의 `in` 메서드를 자바스크립트로는 `includes` 또는 `indexOf` 메서드로 사용하면 된다.

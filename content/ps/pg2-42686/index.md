---
title: '[프로그래머스] 기능개발 (JavaScript)'
category: ps
date: 2022-06-22
tags:
  - 프로그래머스
  - lv2
  - 스택
  - 큐
---

# 문제

[스택/큐 - 기능개발](https://school.programmers.co.kr/learn/courses/30/lessons/42586)

### 문제 설명

프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

### 제한 사항

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

### 입출력 예

| progresses               | speeds             | return    |
| ------------------------ | ------------------ | --------- |
| [93, 30, 55]             | [1, 30, 5]         | [2, 1]    |
| [95, 90, 99, 99, 80, 99] | [1, 1, 1, 1, 1, 1] | [1, 3, 2] |

# 코드

```js
function solution(progresses, speeds) {
  const answer = [];
  const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
  let prev = 0;

  for (let i = 0; i < days.length; i++) {
    if (days[prev] < days[i]) {
      answer.push(i - prev);
      prev = i;
    }
  }
  answer.push(days.length - prev);

  return answer;
}
```

# 문제 풀이

먼저 작업을 마치는데 소요되는 일수를 저장하는 `days` 변수를 생성한다. 각 작업이 마치는데 소요되는 일수는 `100 - progresses / speeds`로 계산할 수 있다. 이때 소수점이 생기면 하루가 더 걸리기 때문에 소수점 자리는 올림(`Math.ceil`) 한다.

```js
const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));
console.log(days); // [ 7, 3, 9 ] or [ 5, 10, 1, 1, 20, 1 ]
```

문제 풀이에서 핵심은 뒤에 있는 기능이 먼저 완료되더라도 앞에 기능과 함께 배포된다는 것이다. 즉, days를 순회할 때 현재 요소의 값이 이전 요소의 값보다 크다면 같이 배포될 수 없는 것을 의미한다. 따라서 두 개의 요소를 비교하기 위해 `prev` 변수를 선언한다.

```js
let prev = 0;
for (let i = 0; i < days.length; i++) {
  // ...
}
```

그리고 현재 요소의 값이 이전 요소의 값보다 클 때 현재 요소는 같이 배포될 수 없으므로 이전 요소까지의 작업 개수(`현재 요소 index - 이전 요소 index`)를 `answer`에 push 한다.

```js
let prev = 0;
for (let i = 0; i < days.length; i++) {
  if (days[prev] < days[i]) {
    answer.push(i - prev);
    prev = i;
  }
}
```

for문 순회가 끝났을 때 if문에서 pass된 값들을 `answer`에 push한다.

```js
answer.push(days.length - prev);
```

위 과정을 따라 값의 변화를 보면 다음과 같다.

| prev | i   | day[prev] | day[i] | 설명                                                                                               |
| ---- | --- | --------- | ------ | -------------------------------------------------------------------------------------------------- |
| 0    | 0   | 7         | 7      | `day[prev]`와 `day[i]`의 값이 같아서 if 조건에 맞지 않으므로 PASS.                                 |
| 0    | 1   | 7         | 3      | `day[prev]`가 `day[i]` 보다 커서 if 조건에 맞지 않으므로 PASS.                                     |
| 0    | 2   | 7         | 9      | `day[prev]`보다 `day[i]`가 크기 때문에 if 조건에 맞으므로 `i - prev`의 결과인 `2`를 answer에 push. |
| 2    | -   | -         | -      | for 순회를 빠져나오게 되고 `days.length - prev` 결과인 `1`을 answer에 push.                        |

---
title: '[프로그래머스] 가장 가까운 같은 글자 (JavaScript)'
category: ps
date: 2023-01-04
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 가장 가까운 같은 글자](https://school.programmers.co.kr/learn/courses/30/lessons/142086)

### 문제 설명

문자열 `s`가 주어졌을 때, `s`의 각 위치마다 자신보다 앞에 나왔으면서, 자신과 가장 가까운 곳에 있는 같은 글자가 어디 있는지 알고 싶습니다.
예를 들어, `s`="banana"라고 할 때, 각 글자들을 왼쪽부터 오른쪽으로 읽어 나가면서 다음과 같이 진행할 수 있습니다.

- b는 처음 나왔기 때문에 자신의 앞에 같은 글자가 없습니다. 이는 -1로 표현합니다.
- a는 처음 나왔기 때문에 자신의 앞에 같은 글자가 없습니다. s이는 -1로 표현합니다.
- n은 처음 나왔기 때문에 자신의 앞에 같은 글자가 없습니다. 이는 -1로 표현합니다.
- a는 자신보다 두 칸 앞에 a가 있습니다. 이는 2로 표현합니다.
- n도 자신보다 두 칸 앞에 n이 있습니다. 이는 2로 표현합니다.
- a는 자신보다 두 칸, 네 칸 앞에 a가 있습니다. 이 중 가까운 것은 두 칸 앞이고, 이는 2로 표현합니다.

따라서 최종 결과물은 [-1, -1, -1, 2, 2, 2]가 됩니다.

문자열 `s`이 주어질 때, 위와 같이 정의된 연산을 수행하는 함수 solution을 완성해주세요.

### 제한사항

- 1 ≤ `s`의 길이 ≤ 10,000
  - `s`은 영어 소문자로만 이루어져 있습니다.

### 입출력 예

| s        | result                  |
| -------- | ----------------------- |
| "banana" | [-1, -1, -1, 2, 2, 2]   |
| "foobar" | [-1, -1, 1, -1, -1, -1] |

# 코드

```js
function solution(s) {
  const answer = [];
  const map = new Map();

  [...s].map((v, i) => {
    if (!map.has(v)) answer.push(-1);
    else answer.push(i - map.get(v));
    map.set(v, i);
  });

  return answer;
}
```

# 문제 풀이

자바스크립트의 `Map` 객체를 사용해서 풀었다.

먼저 map에 현재 글자가 없다면(처음 나온 글자라면) `answer`에 -1을 push한다. <br/>
반대로 map에 현재 글자가 있다면(이전에 나온적이 있는 글자라면) map에서 index를 불러오고 현재 글자의 index와의 차를 `answer`에 push한다.

```js
// v는 s의 글자, i는 글자의 index다.

[...s].map((v, i) => {
  if (!map.has(v)) answer.push(-1);
  else answer.push(i - map.get(v));
});
```

자신과 가장 가까운 곳에 있는 같은 글자를 찾아야 하므로 반복마다 map을 갱신해주어야 한다.

```js
[...s].map((v, i) => {
  if (!map.has(v)) answer.push(-1);
  else answer.push(i - map.get(v));
  map.set(v, i);
});
```

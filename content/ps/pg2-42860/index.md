---
title: '[프로그래머스] 조이스틱 (JavaScript)'
category: ps
date: 2022-09-12
tags:
  - 프로그래머스
  - lv2
  - 탐욕법
  - Greedy
---

# 문제

[탐욕법(Greedy) - 조이스틱](https://school.programmers.co.kr/learn/courses/30/lessons/42860)

### 문제 설명

조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다. <br/>
ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

조이스틱을 각 방향으로 움직이면 아래와 같습니다.

> ▲ - 다음 알파벳 <br/>
> ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로) <br/>
> ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서) <br/>
> ▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)

예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

> - 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
> - 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
> - 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.
>   따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.

만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

### 제한 사항

- name은 알파벳 대문자로만 이루어져 있습니다.
- name의 길이는 1 이상 20 이하입니다.

### 입출력 예

| name     | return |
| -------- | ------ |
| "JEROEN" | 56     |
| "JAN"    | 23     |

# 코드

```js
function solution(name) {
  let answer = 0;
  let min_move = name.length - 1;

  [...name].map((n, i) => {
    answer += Math.min(n.charCodeAt() - 65, 91 - n.charCodeAt());
    let idx = i + 1;

    // 연속되는 A의 개수 count
    while (idx < name.length && name[idx] === 'A') {
      idx++;
    }

    min_move = Math.min(
      min_move,
      i * 2 + name.length - idx,
      i + 2 * (name.length - idx),
    );
  });

  return answer + min_move;
}
```

# 문제 풀이

문자 A가 연속적으로 나오는 부분을 처리하는 것이 관건인 문제였다. <br/>
먼저 상하로 움직이는 부분을 정리한다. `charCodeAt()` 을 사용해서 더 작은 값을 더해주는 방식으로 해결했다.

`while` 문을 사용하여 연속되는 A의 개수를 구한다. 그리고 최소 이동 수를 구하는데,

- 순서대로 가는 것(`name.length`)
- 뒤로 돌아 가는 것(`i * 2 + name.length - idx`)
- 뒷 부분을 먼저 입력하는 것(`i + 2 * (name.length - idx)`)

위의 3가지 경우 중에서 가장 짧은 것을 `min_move` 변수에 저장한다.

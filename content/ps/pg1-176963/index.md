---
title: '[프로그래머스] 추억 점수 (JavaScript)'
category: ps
date: 2023-04-06
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 추억 점수](https://school.programmers.co.kr/learn/courses/30/lessons/176963)

### 문제 설명

사진들을 보며 추억에 젖어 있던 루는 사진별로 추억 점수를 매길려고 합니다. 사진 속에 나오는 인물의 그리움 점수를 모두 합산한 값이 해당 사진의 추억 점수가 됩니다. 예를 들어 사진 속 인물의 이름이 ["may", "kein", "kain"]이고 각 인물의 그리움 점수가 [5점, 10점, 1점]일 때 해당 사진의 추억 점수는 16(5 + 10 + 1)점이 됩니다. 다른 사진 속 인물의 이름이 ["kali", "mari", "don", "tony"]이고 ["kali", "mari", "don"]의 그리움 점수가 각각 [11점, 1점, 55점]]이고, "tony"는 그리움 점수가 없을 때, 이 사진의 추억 점수는 3명의 그리움 점수를 합한 67(11 + 1 + 55)점입니다.

그리워하는 사람의 이름을 담은 문자열 배열 name, 각 사람별 그리움 점수를 담은 정수 배열 yearning, 각 사진에 찍힌 인물의 이름을 담은 이차원 문자열 배열 photo가 매개변수로 주어질 때, 사진들의 추억 점수를 photo에 주어진 순서대로 배열에 담아 return하는 solution 함수를 완성해주세요.

### 제한사항

- 3 ≤ name의 길이 = yearning의 길이≤ 100
  - 3 ≤ name의 원소의 길이 ≤ 7
  - name의 원소들은 알파벳 소문자로만 이루어져 있습니다.
  - name에는 중복된 값이 들어가지 않습니다.
  - 1 ≤ yearning[i] ≤ 100
  - yearning[i]는 i번째 사람의 그리움 점수입니다.
- 3 ≤ photo의 길이 ≤ 100
  - 1 ≤ photo[i]의 길이 ≤ 100
  - 3 ≤ photo[i]의 원소(문자열)의 길이 ≤ 7
  - photo[i]의 원소들은 알파벳 소문자로만 이루어져 있습니다.
  - photo[i]의 원소들은 중복된 값이 들어가지 않습니다.

### 입출력 예

| name                            | yearning      | photo                                                                                             | result      |
| ------------------------------- | ------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| ["may", "kein", "kain", "radi"] | [5, 10, 1, 3] | [["may", "kein", "kain", "radi"],["may", "kein", "brin", "deny"], ["kon", "kain", "may", "coni"]] | [19, 15, 6] |
| ["kali", "mari", "don"]         | [11, 1, 55]   | [["kali", "mari", "don"], ["pony", "tom", "teddy"], ["con", "mona", "don"]]                       | [67, 0, 55] |
| ["may", "kein", "kain", "radi"] | [5, 10, 1, 3] | [["may"],["kein", "deny", "may"], ["kon", "coni"]]                                                | [5, 15, 0]  |

# 코드

```js
function solution(name, yearning, photos) {
  const answer = [];

  for (const photo of photos) {
    let count = 0;
    for (const man of photo) {
      if (name.includes(man)) count += yearning[name.indexOf(man)];
    }
    answer.push(count);
  }

  return answer;
}
```

# 문제 풀이 방법

함수 내부에서는 먼저 빈 배열(`answer`)을 생성한 후, `for...of` 문을 사용하여 `photos` 배열에 대해 반복문을 실행한다.

```js
const answer = [];

for (const photo of photos) {
  // ...
}
```

각 사진(photo)에 등장하는 인물(man)에 대해 반복문을 실행하면서, 현재 인물(man)이 주어진 이름(name)에 포함되어 있는지 검사한다. 사진 속엔 그리워하는 인물이 없을 수 있기 때문이다. <br/>
만약 현재 인물(man)이 주어진 이름(name)에 포함되어 있다면, 해당 인물의 그리움 점수(`yearning`) 값을 `name`에서의 인덱스 값으로 가져와 `count`에 더해준다.

```js
for (const photo of photos) {
  let count = 0;
  for (const man of photo) {
    if (name.includes(man)) count += yearning[name.indexOf(man)];
  }
  answer.push(count);
}
```

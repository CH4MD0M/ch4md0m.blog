---
title: '[프로그래머스] 햄버거 만들기 (JavaScript)'
category: ps
date: 2022-11-14
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 햄버거 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/133502)

### 문제 설명

햄버거 가게에서 일을 하는 상수는 햄버거를 포장하는 일을 합니다. 함께 일을 하는 다른 직원들이 햄버거에 들어갈 재료를 조리해 주면 조리된 순서대로 상수의 앞에 아래서부터 위로 쌓이게 되고, 상수는 순서에 맞게 쌓여서 완성된 햄버거를 따로 옮겨 포장을 하게 됩니다. 상수가 일하는 가게는 정해진 순서(아래서부터, 빵 – 야채 – 고기 - 빵)로 쌓인 햄버거만 포장을 합니다. 상수는 손이 굉장히 빠르기 때문에 상수가 포장하는 동안 속 재료가 추가적으로 들어오는 일은 없으며, 재료의 높이는 무시하여 재료가 높이 쌓여서 일이 힘들어지는 경우는 없습니다.

예를 들어, 상수의 앞에 쌓이는 재료의 순서가 [야채, 빵, 빵, 야채, 고기, 빵, 야채, 고기, 빵]일 때, 상수는 여섯 번째 재료가 쌓였을 때, 세 번째 재료부터 여섯 번째 재료를 이용하여 햄버거를 포장하고, 아홉 번째 재료가 쌓였을 때, 두 번째 재료와 일곱 번째 재료부터 아홉 번째 재료를 이용하여 햄버거를 포장합니다. 즉, 2개의 햄버거를 포장하게 됩니다.

상수에게 전해지는 재료의 정보를 나타내는 정수 배열 `ingredient`가 주어졌을 때, 상수가 포장하는 햄버거의 개수를 return 하도록 solution 함수를 완성하시오.

### 제한사항

- 1 ≤ `ingredient`의 길이 ≤ 1,000,000
- `ingredient`의 원소는 1, 2, 3 중 하나의 값이며, 순서대로 빵, 야채, 고기를 의미합니다.

### 입출력 예

| ingredient                  | result |
| --------------------------- | ------ |
| [2, 1, 1, 2, 3, 1, 2, 3, 1] | 2      |
| [1, 3, 2, 1, 2, 1, 3, 1, 2] | 0      |

# 틀렸던 코드 (시간 초과)

```js
function solution(ingredient) {
  let answer = 0;
  const stack = [];

  for (let i of ingredient) {
    stack.push(i);

    if (stack.slice(-4).toString() == [1, 2, 3, 1]) {
      stack.splice(-4);
      answer++;
    }
  }
  return answer;
}
```

자동 형변환 되는 것을 이용하여 한쪽만 `toString()`을 사용해서 처리했는데 통과는 했지만, <br/>
연산 시간이 많이 걸리고 (최대 907.75ms) 다시 채점할 때 시간초과가 뜨는 경우가 있었다.

아래코드와 같이 `join()`을 사용했을 때는 최대 201.68ms가 나왔다.

# 코드

```js
function solution(ingredient) {
  let answer = 0;
  const stack = [];

  for (let i of ingredient) {
    stack.push(i);

    if (stack.slice(-4).join('') == '1231') {
      stack.splice(-4);
      answer++;
    }
  }
  return answer;
}
```

# 문제 풀이

`stack`을 이용하여 구현하였다.<br/>
ingredient의 요소들을 하나씩 stack에 push하면서 stack에 있는 값이 '1231'과 일치하면 answer을 증가시키고 stack에서 데이터를 지운다.

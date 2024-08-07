---
title: '[프로그래머스] 숫자 문자열과 영단어 (JavaScript)'
category: ps
date: 2022-04-15
tags:
  - 프로그래머스
  - 2021 카카오 채용연계형 인턴십
  - lv1
---

# 문제

[2021 카카오 채용연계형 인턴십 - 숫자 문자열과 영단어](https://school.programmers.co.kr/learn/courses/30/lessons/81301)

### 문제 설명

네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

- 1478 → "one4seveneight"
- 234567 → "23four5six7"
- 10203 → "1zerotwozero3"

이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 `s`가 매개변수로 주어집니다. `s`가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

참고로 각 숫자에 대응되는 영단어는 다음 표와 같습니다.

| 숫자 | 영단어 |
| ---- | ------ |
| 0    | zero   |
| 1    | one    |
| 2    | two    |
| 3    | three  |
| 4    | four   |
| 5    | five   |
| 6    | six    |
| 7    | seven  |
| 8    | eight  |
| 9    | nine   |

### 제한사항

- 1 ≤ `s`의 길이 ≤ 50
- `s`가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
- return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 `s`로 주어집니다.

### 입출력 예

| s                  | result |
| ------------------ | ------ |
| "one4seveneight"   | 1478   |
| "23four5six7"      | 234567 |
| "2three45sixseven" | 234567 |
| "123"              | 123    |

### 제한시간 안내

정확성 테스트 : 10초

# 코드

```js
const table = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function solution(s) {
  for (let [key, value] of Object.entries(table)) {
    const regex = new RegExp(key, 'g');
    s = s.replace(regex, value);
  }
  return Number(s);
}
```

# 다른 사람 코드

```js
function solution(s) {
  const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  let answer = s;

  for (let i = 0; i < numbers.length; i++) {
    let arr = answer.split(numbers[i]);
    answer = arr.join(i);
  }
  return +answer;
}
```

# 새로 알게된 것

변수에 저장된 값을 기준으로 문자열을 처리해야 할 때, 정규 표현식 생성자를 이용해서 처리하면 된다는 것을 알게 되었다.

`RegExp` 객체는 리터럴 표기법과 생성자로써 생성할 수 있다.

- **리터럴 표기법**의 매개변수는 두 빗금으로 감싸야 하며 따옴표를 사용하지 않는다.
- **생성자 함수**의 매개변수는 빗금으로 감싸지 않으나 따옴표를 사용한다.

```js
/ab+c/i;
new RegExp(/ab+c/, 'i'); // 리터럴
new RegExp('ab+c', 'i'); // 생성자
```

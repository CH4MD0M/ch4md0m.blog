---
title: '[프로그래머스] 혼자서 하는 틱택토 (JavaScript)'
category: ps
date: 2023-02-24
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 혼자서 하는 틱택토](https://school.programmers.co.kr/learn/courses/30/lessons/160585)

### 문제 설명

틱택토는 두 사람이 하는 게임으로 처음에 3x3의 빈칸으로 이루어진 게임판에 선공이 "O", 후공이 "X"를 번갈아가면서 빈칸에 표시하는 게임입니다. 가로, 세로, 대각선으로 3개가 같은 표시가 만들어지면 같은 표시를 만든 사람이 승리하고 게임이 종료되며 9칸이 모두 차서 더 이상 표시를 할 수 없는 경우에는 무승부로 게임이 종료됩니다.

할 일이 없어 한가한 머쓱이는 두 사람이 하는 게임인 틱택토를 다음과 같이 혼자서 하려고 합니다.

혼자서 선공과 후공을 둘 다 맡는다.
틱택토 게임을 시작한 후 "O"와 "X"를 혼자서 번갈아 가면서 표시를 하면서 진행한다.
틱택토는 단순한 규칙으로 게임이 금방 끝나기에 머쓱이는 한 게임이 종료되면 다시 3x3 빈칸을 그린 뒤 다시 게임을 반복했습니다. 그렇게 틱택토 수 십 판을 했더니 머쓱이는 게임 도중에 다음과 같이 규칙을 어기는 실수를 했을 수도 있습니다.

"O"를 표시할 차례인데 "X"를 표시하거나 반대로 "X"를 표시할 차례인데 "O"를 표시한다.
선공이나 후공이 승리해서 게임이 종료되었음에도 그 게임을 진행한다.
게임 도중 게임판을 본 어느 순간 머쓱이는 본인이 실수를 했는지 의문이 생겼습니다. 혼자서 틱택토를 했기에 게임하는 과정을 지켜본 사람이 없어 이를 알 수는 없습니다. 그러나 게임판만 봤을 때 실제로 틱택토 규칙을 지켜서 진행했을 때 나올 수 있는 상황인지는 판단할 수 있을 것 같고 문제가 없다면 게임을 이어서 하려고 합니다.

머쓱이가 혼자서 게임을 진행하다 의문이 생긴 틱택토 게임판의 정보를 담고 있는 문자열 배열 `board`가 매개변수로 주어질 때, 이 게임판이 규칙을 지켜서 틱택토를 진행했을 때 나올 수 있는 게임 상황이면 1을 아니라면 0을 return 하는 solution 함수를 작성해 주세요.

### 제한사항

- board의 길이 = board[i]의 길이 = 3
  - board의 원소는 모두 "O", "X", "."으로만 이루어져 있습니다.
- board[i][j]는 i + 1행 j + 1열에 해당하는 칸의 상태를 나타냅니다.
  - "."은 빈칸을, "O"와 "X"는 해당 문자로 칸이 표시되어 있다는 의미입니다.

### 입출력 예

| board                 | result |
| --------------------- | ------ |
| ["O.X", ".O.", "..X"] | 1      |
| ["OOO", "...", "XXX"] | 0      |
| ["...", ".X.", "..."] | 0      |
| ["...", "...", "..."] | 1      |

# 코드

```js
function checkTicTacToe(board, sign) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] == sign && board[b] == sign && board[c] == sign) return true;
  }
  return false;
}

function solution(board) {
  board = board.map(val => val.split('')).flat();
  let [O, X] = [0, 0];

  for (const sign of board) {
    if (sign === 'O') O++;
    else if (sign === 'X') X++;
  }

  if (O < X || 1 < O - X) return 0;

  let oWins = checkTicTacToe(board, 'O');
  let xWins = checkTicTacToe(board, 'X');

  if (oWins && xWins) return 0;
  if (oWins && O - X !== 1) return 0;
  if (xWins && O !== X) return 0;

  return 1;
}
```

# 문제 풀이

이 문제는 board를 탐색해서 직선으로 이어지는지(승리하는 상황이 나오는지) 체크하는 과정이 필요하다. 이중 for 문을 사용하거나 판별과정 코드를 줄이기 위해서 직선으로 이어질 수 있는 경우의 수를 `lines` 변수에 담았다.

```js
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

`lines`로 쉽게 비교하기 위해서 board도 약간 수정해줘야 한다. 입력되는 board의 값은 `["O.X", ".O.", "..X"]` 이런 형태이지만, `['O', '.', 'X', '.', 'O', '.', '.', '.', 'X']`와 같은 1차원 배열로 풀어줘야 한다. 따라서 다음과 같은 과정을 거친다.

```js
board = board.map(val => val.split('')).flat();
```

나올 수 없는 상황에 대한 경우의 수를 정리해보면 다음과 같다.

> 1.  O와 X의 개수가 올바르지 않은 경우.
> 2.  O와 X 둘 다 승리하는 경우.
> 3.  O가 승리했는데 X가 수를 더 놓는 경우.
> 4.  X가 승리했는데 O와 X의 수가 같지 않은 경우.

위 과정을 확인하기 위해서는 O와 X의 개수를 알아야 한다. 따라서 board를 순회하면서 O, X의 개수를 저장한다.

```js
let [O, X] = [0, 0];

for (const sign of board) {
  if (sign === 'O') O++;
  else if (sign === 'X') X++;
}
```

위에서 언급한 4가지 경우를 체크하여 값을 return한다.

```js
// CASE1. O와 X의 개수가 올바르지 않은 경우.
// - O가 X보다 작은 경우.
// - O와 X의 차이가 2이상 나는 경우
if (O < X || 1 < O - X) return 0;

let oWins = checkTicTacToe(board, 'O');
let xWins = checkTicTacToe(board, 'X');

// CASE2. O와 X 둘 다 승리하는 경우.
if (oWins && xWins) return 0;
// CASE3. O가 승리했는데 X가 수를 더 놓는 경우.
if (oWins && O - X !== 1) return 0;
// CASE4. X가 승리했는데 O와 X의 수가 같지 않은 경우.
if (xWins && O !== X) return 0;

return 1;
```

---
title: '[BOJ] 14503번: 로봇 청소기 (JavaScript)'
category: ps
date: 2024-08-01 15:00:00
tags:
  - 백준
  - gold5
  - 구현
  - 시뮬레이션
  - 배열순환
---

# 문제

[14503번: 로봇 청소기](https://www.acmicpc.net/problem/14503)

### 문제 설명

로봇 청소기와 방의 상태가 주어졌을 때, 청소하는 영역의 개수를 구하는 프로그램을 작성하시오.

로봇 청소기가 있는 방은 $N \times M$ 크기의 직사각형으로 나타낼 수 있으며, $1 \times 1$ 크기의 정사각형 칸으로 나누어져 있다. 각각의 칸은 벽 또는 빈 칸이다. 청소기는 바라보는 방향이 있으며, 이 방향은 동, 서, 남, 북 중 하나이다. 방의 각 칸은 좌표 $(r, c)$로 나타낼 수 있고, 가장 북쪽 줄의 가장 서쪽 칸의 좌표가 $(0, 0)$, 가장 남쪽 줄의 가장 동쪽 칸의 좌표가 $(N-1, M-1)$이다. 즉, 좌표 $(r, c)$는 북쪽에서 $(r+1)$번째에 있는 줄의 서쪽에서 $(c+1)$번째 칸을 가리킨다. 처음에 빈 칸은 전부 청소되지 않은 상태이다.

<br/>

로봇 청소기는 다음과 같이 작동한다.

1. 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
2. 현재 칸의 주변 $4$칸 중 청소되지 않은 빈 칸이 없는 경우,
   1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
   2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
3. 현재 칸의 주변 $4$칸 중 청소되지 않은 빈 칸이 있는 경우,
   1. 반시계 방향으로 $90^\circ$ 회전한다.
   2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
   3. 1번으로 돌아간다.

### 입력

첫째 줄에 방의 크기 $N$과 $M$이 입력된다. $(3 \le N, M \le 50)$  둘째 줄에 처음에 로봇 청소기가 있는 칸의 좌표 $(r, c)$와 처음에 로봇 청소기가 바라보는 방향 $d$가 입력된다. $d$가 $0$인 경우 북쪽, $1$인 경우 동쪽, $2$인 경우 남쪽, $3$인 경우 서쪽을 바라보고 있는 것이다.

<br/>

셋째 줄부터 $N$개의 줄에 각 장소의 상태를 나타내는 $N \times M$개의 값이 한 줄에 $M$개씩 입력된다. $i$번째 줄의 $j$번째 값은 칸 $(i, j)$의 상태를 나타내며, 이 값이 $0$인 경우 $(i, j)$가 청소되지 않은 빈 칸이고, $1$인 경우 $(i, j)$에 벽이 있는 것이다. 방의 가장 북쪽, 가장 남쪽, 가장 서쪽, 가장 동쪽 줄 중 하나 이상에 위치한 모든 칸에는 벽이 있다. 로봇 청소기가 있는 칸은 항상 빈 칸이다.

### 출력

로봇 청소기가 작동을 시작한 후 작동을 멈출 때까지 청소하는 칸의 개수를 출력한다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력 1

```text
3 3
1 1 0
1 1 1
1 0 1
1 1 1
```

</div>
<div>

#### 예제 출력 1

```text
1
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 2

```text
11 10
7 4 0
1 1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 1 1 1 1 0 1
1 0 0 1 1 0 0 0 0 1
1 0 1 1 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1
```

</div>
<div>

#### 예제 출력 2

```text
57
```

</div>
</div>

# 코드

```js
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let [x, y, d] = input.shift().split(' ').map(Number);

const graph = input.map(line => line.split(' ').map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let answer = 0;
let directionCount = 0;

while (true) {
  if (!visited[x][y]) {
    visited[x][y] = true;
    graph[x][y] = -1;
    answer++;
  }

  if (directionCount === 4) {
    const backX = x + dx[(d + 2) % 4];
    const backY = y + dy[(d + 2) % 4];
    if (graph[backX][backY] === 1) break;
    else {
      x = backX;
      y = backY;
      directionCount = 0;
    }
  }

  const leftX = x + dx[(d + 3) % 4];
  const leftY = y + dy[(d + 3) % 4];
  if (graph[leftX][leftY] === 0) {
    x = leftX;
    y = leftY;
    directionCount = 0;
  } else {
    directionCount++;
  }
  d = (d + 3) % 4;
}

console.log(answer);
```

# 순환배열

순환 배열은 배열의 끝과 시작이 연결된 구조로, 마지막 요소 다음에는 첫 번째 요소가 오며, 첫 번째 요소 이전에는 마지막 요소가 위치한다. 이는 배열을 원형으로 생각하면 이해하기 쉽다.

#### 다음 요소

`(index + 1) % len`

- `index + 1`은 다음 인덱스를 나타낸다.
- `%len`은 배열의 끝에 도달하면 처음으로 돌아가게 한다.
- ex) 배열 길이가 5일 때, 인덱스 4의 다음 요소는 `(4 + 1) % 5 = 0`이다.

#### 이전 요소

`(index - 1 + len) % len`

- `index - 1`은 이전 인덱스를 나타낸다.
- `+len`은 음수 결과를 방지한다(JavaScript에서 `음수 % 양수`의 결과가 음수일 수 있음).
- `%len`은 배열의 시작 이전으로 갔을 때 끝으로 돌아가게 한다.

## 예제 코드

```js
function getAdjacentElements(arr, index) {
  const len = arr.length;
  const prevIndex = (index - 1 + len) % len;
  const nextIndex = (index + 1) % len;
  return [arr[prevIndex], arr[nextIndex]];
}

const myArray = [1, 2, 3, 4, 5];
console.log(getAdjacentElements(myArray, 0)); // [5, 2]
console.log(getAdjacentElements(myArray, 2)); // [2, 4]
console.log(getAdjacentElements(myArray, 4)); // [4, 1]
```

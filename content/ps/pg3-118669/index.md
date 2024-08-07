---
title: '[프로그래머스] 등산코스 정하기 (JavaScript)'
category: ps
date: 2023-03-18
tags:
  - 프로그래머스
  - 2022 KAKAO TECH INTERNSHIP
  - lv3
  - 다익스트라
---

# 문제

[2022 KAKAO TECH INTERNSHIP - 등산코스 정하기](https://school.programmers.co.kr/learn/courses/30/lessons/118669)

### 문제 설명

XX산은 `n`개의 지점으로 이루어져 있습니다. 각 지점은 1부터 `n`까지 번호가 붙어있으며, 출입구, 쉼터, 혹은 산봉우리입니다. 각 지점은 양방향 통행이 가능한 등산로로 연결되어 있으며, 서로 다른 지점을 이동할 때 이 등산로를 이용해야 합니다. 이때, 등산로별로 이동하는데 일정 시간이 소요됩니다.

등산코스는 방문할 지점 번호들을 순서대로 나열하여 표현할 수 있습니다.
예를 들어 `1-2-3-2-1` 으로 표현하는 등산코스는 1번지점에서 출발하여 2번, 3번, 2번, 1번 지점을 순서대로 방문한다는 뜻입니다.
등산코스를 따라 이동하는 중 쉼터 혹은 산봉우리를 방문할 때마다 휴식을 취할 수 있으며, 휴식 없이 이동해야 하는 시간 중 가장 긴 시간을 해당 등산코스의 `intensity`라고 부르기로 합니다.

당신은 XX산의 출입구 중 한 곳에서 출발하여 산봉우리 중 한 곳만 방문한 뒤 다시 원래의 출입구로 돌아오는 등산코스를 정하려고 합니다. 다시 말해, 등산코스에서 출입구는 처음과 끝에 한 번씩, 산봉우리는 한 번만 포함되어야 합니다.
당신은 이러한 규칙을 지키면서 `intensity`가 최소가 되도록 등산코스를 정하려고 합니다.

XX산의 지점 수 `n`, 각 등산로의 정보를 담은 2차원 정수 배열 `paths`, 출입구들의 번호가 담긴 정수 배열 `gates`, 산봉우리들의 번호가 담긴 정수 배열 `summits`가 매개변수로 주어집니다. 이때, `intensity`가 최소가 되는 등산코스에 포함된 산봉우리 번호와 `intensity`의 최솟값을 차례대로 정수 배열에 담아 return 하도록 solution 함수를 완성해주세요. `intensity`가 최소가 되는 등산코스가 여러 개라면 그중 산봉우리의 번호가 가장 낮은 등산코스를 선택합니다.

### 제한사항

- 2 ≤ n ≤ 50,000
- n - 1 ≤ paths의 길이 ≤ 200,000
- paths의 원소는 [i, j, w] 형태입니다.
  - i번 지점과 j번 지점을 연결하는 등산로가 있다는 뜻입니다.
  - w는 두 지점 사이를 이동하는 데 걸리는 시간입니다.
  - 1 ≤ i < j ≤ n
  - 1 ≤ w ≤ 10,000,000
  - 서로 다른 두 지점을 직접 연결하는 등산로는 최대 1개입니다.
- 1 ≤ gates의 길이 ≤ n
  - 1 ≤ gates의 원소 ≤ n
  - gates의 원소는 해당 지점이 출입구임을 나타냅니다.
- 1 ≤ summits의 길이 ≤ n
  - 1 ≤ summits의 원소 ≤ n
  - summits의 원소는 해당 지점이 산봉우리임을 나타냅니다.
- 출입구이면서 동시에 산봉우리인 지점은 없습니다.
- gates와 summits에 등장하지 않은 지점은 모두 쉼터입니다.
- 임의의 두 지점 사이에 이동 가능한 경로가 항상 존재합니다.
- return 하는 배열은 [산봉우리의 번호, intensity의 최솟값] 순서여야 합니다.

### 입출력 예

| n   | paths                                                                                    | gates  | summits   | result |
| --- | ---------------------------------------------------------------------------------------- | ------ | --------- | ------ |
| 6   | [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]] | [1, 3] | [5]       | [5, 3] |
| 7   | [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]]                       | [1]    | [2, 3, 4] | [3, 4] |
| 7   | [[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]]            | [3, 7] | [1, 5]    | [5, 1] |
| 5   | [[1, 3, 10], [1, 4, 20], [2, 3, 4], [2, 4, 6], [3, 5, 20], [4, 5, 6]]                    | [1, 2] | [5]       | [5, 6] |

# 코드

```js
function solution(n, paths, gates, summits) {
  const isSummit = new Set(summits);

  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, c] of paths) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const queue = new MinHeap();
  const intensity = Array(n + 1).fill(Infinity);

  for (const gate of gates) {
    queue.add([gate, 0]);
    intensity[gate] = 0;
  }

  while (queue.size()) {
    const [curNode, curWeight] = queue.poll();

    if (isSummit.has(curNode) || intensity[curNode] < curWeight) continue;

    for (const [nextNode, nextWeight] of graph[curNode]) {
      const newWeight = Math.max(curWeight, nextWeight);
      if (newWeight < intensity[nextNode]) {
        intensity[nextNode] = newWeight;
        queue.add([nextNode, newWeight]);
      }
    }
  }

  let answer = [0, Infinity];
  summits.sort((a, b) => a - b);
  for (const summit of summits) {
    if (intensity[summit] < answer[1]) answer = [summit, intensity[summit]];
  }

  return answer;
}
```

# 문제 풀이

이 문제는 여러 개의 등산로 중에서 intensity가 최소가 되는 등산로를 구하는 문제이다. 여기서 intensity는 가장 시간이 오래 걸리는 등산로의 시간을 의미하며, 이 값을 최소로 만드는 등산로를 구하는 문제이다.

이 문제는 **다익스트라 알고리즘**을 약간 변형하여 해결할 수 있다. 일반적인 다익스트라 알고리즘은 가중치의 합이 최소가 되는 경로를 구하는 방식이지만, 이 문제에서는 가중치의 합이 아닌 **가중치의 최대값을 최소로 만드는 경로**를 구해야한다.

출입구를 A, 산봉우리를 B라고 가정하자. 경로에 포함된 등산로들의 w값 중 최댓값이 등산코스의 intensity가 된다. 또한, intensity가 최소가 되도록 A에서 B로 가는 길을 찾았다면 B에서 A로 돌아올 때도 똑같은 길을 그대로 돌아오면 intensity가 최소가 된다. 따라서, **출입구에서 산봉우리로 가는 편도 경로만 구하면 된다.**

그리고 출입구가 여러 개일 수 있는데, 각 출입구별로 intensity가 최소가 되는 경로를 구할 필요가 없다. 어디서 출발하든지 하나의 최솟값만 구하면 되기 때문이다. 따라서, **출입구들을 모두 큐에 넣고 다익스트라 알고리즘을 한 번만 수행하면 된다.**

<br />

이 과정을 요약하면 다음과 같다.

1. **편도 경로:** 산봉우리에서 출발점으로 돌아오는 경로는 고려하지 않고, 등산로의 시작점에서 산봉우리까지의 편도 경로를 고려한다.

2. **경로의 가중치 계산:** 각 지점을 연결하는 등산로의 가중치는 해당 등산로를 이동하는 데 필요한 시간이다. `intensity`는 이동해야 하는 시간 중 가장 긴 시간을 나타내기 위해 **최댓값으로 계산한다.**

3. **intensity의 최솟값 갱신:** 각 지점까지 도달하는 경로 중 `intensity`가 가장 낮은 값을 찾아 그 값을 갱신한다.

<br />

이제 각 과정을 코드를 통해 살펴보자.

먼저 산봉우리를 `Set`으로 저장한다. 이는 산봉우리인지 아닌지를 O(1)에 확인하기 위함이다.

```js
const isSummit = new Set(summits);
```

그래프를 초기화 하고 우선순위 큐(`MinHeap`)와 `intensity`를 저장할 배열을 초기화 한다.

> 필자는 `MinHeap`을 직접 구현해서 풀었는데, 구현 코드는 [[자료구조] JavaScript로 힙(Heap) 구현하기](https://chamdom.blog/heap-using-js/)에서 확인할 수 있다.

```js
const graph = Array.from({ length: n + 1 }, () => []);
for (const [a, b, c] of paths) {
  // 양방향 그래프이므로 두 방향으로 간선 추가
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

const queue = new MinHeap();
const intensity = Array(n + 1).fill(Infinity);
```

시작 정점(출입구)을 큐에 추가한다. 필자가 구현한 `MinHeap`은 배열로 삽입하고 첫 번째 요소가 노드, 두 번째 요소가 가중치이다. 따라서 시작 정점의 `weight`는 0으로 초기화한다.

```js
for (const gate of gates) {
  queue.add([gate, 0]);
  intensity[gate] = 0;
}
```

다익스트라 알고리즘을 수행한다. 설명은 주석으로 대체하겠다.

```js
while (queue.size()) {
  // 현재 처리할 노드(curNode)와 해당 노드에 도달하기까지의 현재까지의 최대 등산로 가중치(curWeight)를 가져온다.
  const [curNode, curWeight] = queue.poll();

  // 현재 노드가 산봉우리이거나, 이미 intensity에 기록된 값(intensity[curNode])이
  // 현재 노드로 오는 경로의 가중치(curWeight)보다 작다면(즉, 더 좋은 경로가 이미 발견되었다면),
  // 현재 노드에서 더 이상 탐색을 진행하지 않는다.
  if (isSummit.has(curNode) || intensity[curNode] < curWeight) continue;

  // 현재 노드(curNode)와 직접 연결된 다음 노드(nextNode)들의 리스트를 순회한다.
  for (const [nextNode, nextWeight] of graph[curNode]) {
    // 현재 노드(curNode)에서 다음 노드(nextNode)로 가는 등산로의 가중치(nextWeight)와
    // 현재까지의 최대 등산로 가중치(curWeight) 중 더 큰 값을 새로운 가중치(newWeight)로 정한다.
    // 이는 산봉우리에 도달하기까지의 가장 강도 높은 구간, 즉 intensity다.
    const newWeight = Math.max(curWeight, nextWeight);

    // 새로운 가중치(newWeight)가 기존에 기록된 가중치(intensity[nextNode])보다 작다면,
    // 새로운 가중치(newWeight)로 기존에 기록된 가중치(intensity[nextNode])를 갱신하고,
    // 다음 노드(nextNode)와 새로운 가중치(newWeight)를 큐에 추가한다.
    if (newWeight < intensity[nextNode]) {
      intensity[nextNode] = newWeight;
      queue.add([nextNode, newWeight]);
    }
  }
}
```

산봉우리가 정렬되어 있지 않을 수 있는 경우를 고려해야 한다. 따라서 `summits` 배열을 오름차순으로 정렬한다. 그리고 `summits`를 순회하면서 intensity가 가장 작은 것을 return 한다.

```js
let answer = [0, Infinity];
summits.sort((a, b) => a - b);
for (const summit of summits) {
  if (intensity[summit] < answer[1]) answer = [summit, intensity[summit]];
}

return answer;
```

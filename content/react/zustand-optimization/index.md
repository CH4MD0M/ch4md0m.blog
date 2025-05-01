---
title: 'zustand 불필요한 리렌더링 최적화'
category: react
date: 2025-01-14
tags:
  - zustand
  - shallowEqual
  - 성능 최적화
---

# zustand 리렌더링 문제점

```ts
import { create } from 'zustand';

interface BearState {
  bears: number;
  cats: number;
}

interface BearActions {
  increaseBears: () => void;
  increaseCats: () => void;
}

type BearStore = BearState & BearActions;

const initialState: BearState = {
  bears: 0,
  cats: 0,
};

export const useBearStore = create<BearStore>(set => ({
  ...initialState,
  increaseBears: () => set(state => ({ bears: state.bears + 1 })),
  increaseCats: () => set(state => ({ cats: state.cats + 1 })),
}));
```

zustand로 상태를 관리할 때 흔히 마주치는 문제가 있다. 위 코드처럼 BearStore를 생성하여 컴포넌트에서 사용할 경우, 특정 상태만 사용하더라도 스토어 내 다른 상태가 변경되면 불필요한 리렌더링이 발생한다.

```ts
const { bears, increaseBears } = useBearStore();
```

예를 들어, 컴포넌트에서 useBearStore를 통해 `bears` 상태만 사용하고 있더라도, increaseCats 함수로 `cats` 상태가 업데이트되면 해당 컴포넌트도 리렌더링된다. 이는 useBearStore 훅이 스토어 전체를 구독하기 때문이다.

# 최적화 방법

이 문제를 해결하기 위해 zustand의 선택자(selector) 패턴과 shallow 비교 함수를 활용한 **유틸리티 함수**를 만들었다.

```ts
import type { StoreApi } from 'zustand';
import { shallow } from 'zustand/shallow';
import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional';

export type StoreWithShallow<T> = <K extends keyof T>(
  keys: K[],
  withEqualityFn?: boolean,
) => Pick<T, K>;

export const useStoreWithShallow = <T, K extends keyof T>(
  storeWithEqualityFn: UseBoundStoreWithEqualityFn<StoreApi<T>>,
  keys: K[],
  withEqualityFn = true,
): Pick<T, K> =>
  storeWithEqualityFn<T>(
    state => {
      const resultState = keys.reduce(
        (prev, key) => ({
          ...prev,
          [key]: state[key],
        }),
        {} as T,
      );

      return resultState;
    },
    withEqualityFn ? shallow : undefined,
  );
```

이 유틸리티 함수는 컴포넌트에서 실제로 사용하는 상태만 구독할 수 있게 해준다. `keys` 배열을 통해 필요한 상태 키만 지정하고, shallow 비교 함수를 사용하여 해당 상태들의 변경 여부만 감지한다.

```ts
export type StoreWithShallow<T> = <K extends keyof T>(
  keys: K[],
  withEqualityFn?: boolean,
) => Pick<T, K>;
```

키 배열을 받아 해당 키에 해당하는 상태와 액션만 포함하는 객체를 반환하는 함수 타입을 정의했다.

- `T`: 전체 스토어의 타입
- `K`: 구독하고자 하는 스토어 키의 타입

# 최적화 적용 예시

위 유틸 함수를 적용한 store 코드는 다음과 같다.

```ts
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

// 유틸 함수 import
import { StoreWithShallow, useStoreWithShallow } from './util';

interface BearState {
  bears: number;
  cats: number;
}

interface BearActions {
  increaseBears: () => void;
  increaseCats: () => void;
}

type BearStore = BearState & BearActions;

const initialState: BearState = {
  bears: 0,
  cats: 0,
};

const bearStore = createWithEqualityFn(
  immer<BearStore>(set => ({
    ...initialState,
    increaseBears: () => set(state => ({ bears: state.bears + 1 })),
    increaseCats: () => set(state => ({ cats: state.cats + 1 })),
  })),
);

export const useBearStore: StoreWithShallow<BearStore> = keys =>
  useStoreWithShallow(bearStore, keys);
```

이제 상태 변수를 사용하는 컴포넌트에서는 아래와 같이 사용하면 된다.

```ts
const { bears, increaseBears } = useBearStore(['bears', 'increaseBears']);
```

이 유틸 함수를 적용하게되면 cats가 업데이트 되더라도 bears를 사용하는 컴포넌트는 업데이트되지 않는다.

# 참고

- [Optimizing Zustand: How to Prevent Unnecessary Re-renders in Your React App](https://dev.to/eraywebdev/optimizing-zustand-how-to-prevent-unnecessary-re-renders-in-your-react-app-59do)

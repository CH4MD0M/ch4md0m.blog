---
title: 'TypeScript: 함수 타입'
category: typescript
date: 2023-02-28
tags:
  - void
  - never
---

# 함수 매개변수

변수와 마찬가지로 타입 애너테이션으로 함수 매개변수의 타입을 선언할 수 있다.

```ts
function sing(song: string) {
  console.log(`Singing: ${song}!`);
}
```

### 필수 매개변수

자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있다. 하지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다.

```ts
function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

singTwo('Ball and Chain');
// Error: Expected 2 arguments, but got 1.

singTwo('I will Survive', 'Higher Love'); // Ok

singTwo('Go Your Own Way', 'The Chain', 'Dreams');
// Error: Expected 2 arguments, but got 3.
```

함수에 **필수 매개변수(required parameter)**를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화할 수 있다.

### 선택적 매개변수

선택적 객체 타입 속성과 유사하게 타입 애너테이션의 `:` 앞에 `?` 를 추가해 매개변수가 선택적이라고 표시한다.

함수 호출에 선택적 매개변수를 제공할 필요는 없다. 선택적 매개변수에는 항상 `| undefined`가 유니언 타입으로 추가되어 있다.

```ts
function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong('Greensleeves'); // Ok
announceSong('Greensleeves', undefined); // Ok
announceSong('Greensleeves', 'Sia'); // Ok
```

함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다. 필수 매개변수 전에 선택적 매개변수를 위치시키면 다음과 같이 구문 오류가 발생한다.

```ts
function announceSinger(singer?: string, song: string) {}
// Error: A required parameter cannot follow an optional parameter.
```

### 기본 매개변수

기본 매개변수에 대한 타입 추론은 초기 변숫값과 마찬가지로 작동한다. 매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기반으로 매개변수 타입을 유추한다.

```ts
function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong('Photograph'); // Ok
rateSong('Set Fire to the Rain', 5); // Ok
rateSong('Set Fire to the Rain', undefined); // Ok

rateSong('At Last!', '100');
// Error: Argument of type 'string' is not assignable to
// parameter of type 'number'.
```

rateSong 함수에서 rating은 `number` 타입으로 유추되지만, 함수를 호출하는 코드에서는 선택적 `number | undefined`가 된다.

### 나머지 매개변수

타입스크립트는 **나머지 매개변수(rest parameter)**의 타입을 일반 매개변수와 유사하게 선언할 수 있다. 단, 인수 배열을 나타내기 위해 끝에 `[]` 구문이 추가된다.

```ts
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs('Alicia Keys'); // Ok
singAllTheSongs('Lady Gaga', 'Bad Romance', 'Just Dance', 'Poker face'); // Ok

singAllTheSongs('Ella Fitzgerald', 2000);
// Error: Argument of type 'number' is not assignable to
// parameter of type 'string'.
```

# 반환타입

함수에 다른 값을 가진 여러 개의 반환문이 있다면, 타입스크립트는 반환 타입을 가능한 모든 반환 타입의 조함으로 유추한다.

```ts
function getSongAt(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}
// function getSongAt(songs: string[], index: number): string | undefined
```

### 명시적 반환 타입

대부분의 경우 타입스크립트는 함수가 반환하는 타입을 자동으로 확인하여 설정해 준다. 따라서 특병한 경우가 아니라면 함수가 반환하는 타입을 지정해주지 않아도 된다.

함수 선언 반환 타입 애너테이션은 매개변수 목록이 끝나는 `)` 다음에 배친된다.

```ts
function foo(a: number, b: number): number {
  return a + b;
}
```

화살표 함수의 경우 `=>` 앞에 배치된다.

```ts
const foo = (a: number, b: number): number => a + b;
```

함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하는 경우 타입스크립트는 할당 가능성 오류를 표시한다.

```ts
const foo = (num1: number, num2: number): string => {
  return num1 + num2;
  // Error: Type 'number' is not assignable to type 'string'.
};
```

# 함수 타입

자바스크립트는 함수를 값으로 전달할 수 있다. 즉 함수를 가지기 위한 매개변수 또는 변수는 타입을 선언하는 방법이 필요하다. **함수 타입(function type)** 구문은 화살표 함수와 유사하다. **함수 타입은 콜백 매개변수를 설명하는 데 자주 사용된다.**

다음 `foo` 변수의 타입은 string[] 매개변수와 count 선택적 매개변수를 가지며 `number` 타입을 반환하는 함수임을 나타낸다.

```ts
let foo: (val: string[], count?: number) => number;
```

### 매개변수 타입 추론

타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있다.

아래 코드에서 singer 변수는 string 타입의 매개변수를 갖는 함수로 알려져 있으므로 나중에 singer가 할당되는 함수 내의 song 매개변수는 string으로 예측된다.

```ts
let singer: (song: string) => string;

singer = function (song) {
  return `SingingL ${song.toUpperCase()}!`; // Ok
};
```

함수를 매개변수로 갖는 함수에 인수로 전달된 매개변수 타입도 잘 유추할 수 있다.

```ts
const numbers = [1, 2, 3, 4];

// num: number
// idx: number
numbers.forEach((num, idx) => {
  console.log(`${num} is at index ${idx}`);
});
```

### 함수 타입 별칭

함수 타입에서도 타입 별칭을 사용할 수 있다.

```ts
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = input => input.length;

stringToNumber = input => input.toUpperCase();
// Error: Type 'string' is not assignable to type 'number'.
```

함수 매개변수도 함수 타입을 참조하는 별칭을 입력할 수 있다.

```ts
type NumberToString = (input: number) => string;

function useNumberToString(numberToString: NumberToString) {
  console.log(`The string is ${numberToString(1234)}`);
}

useNumberToString(input => `${input}!`);
useNumberToString(input => input * 2);
// Error: Type 'number' is not assignable to type 'string'.
```

# 그 외 반환 타입

### void 반환 타입

return문이 없거나 값을 반환하지 않는 return문을 가진 함수는 어떤 값도 반환하지 않는다. **타입스크립트는 void 키워드를 사용해 반환 값이 없는 함수의 반환 타입을 확인할 수 있다.**

아래 코드에서 logMessage 함수는 `void`를 반환하도록 선언되었으므로 값 반환을 허용하지 않는다. 즉, **함수 타입을 선언할 때 void를 사용하면 함수에서 반환되는 모든 값은 무시된다.**

```ts
function logMessage(message: string): void {
  if (message) return;

  console.log(message);
  return true;
  // Error: Type 'boolean' is not assignable to type 'void'.
}
```

자바스크립트 함수는 실제 값이 반환되지 않으면 기본적으로 모두 undefined를 반환한다. `undefined`와 `void`는 다르다. **undefined**는 반환되는 리터럴 값이지만, **void**는 함수의 반환 타입이 무시된다는 것을 의미한다.

### never 반환 타입

타입스크립트에서 `never`는 절대 발생하지 않을 값의 타입을 나타낸다. `never`는 함수의 반환 타입으로 사용될 수 있으며, 예외를 던지는 등의 비정상적인 상황에서 사용된다.

`never`는 예외를 던지는 함수, 무한 루프를 가지는 함수, 또는 타입스크립트가 이해할 수 없는 타입 가드를 가지는 함수와 같은 상황에서 반환 타입으로 사용된다.

```ts
function throwError(num: number): never {
  throw new Error(`Invalid number: ${num}`);
}
```

`never`는 `void`와 다르다. **void**는 아무것도 반환하지 않는 함수를 위한 것이고, **never**는 절대 반환하지 않는 함수를 위한 것이다.

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트

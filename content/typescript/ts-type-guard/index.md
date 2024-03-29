---
title: 'TypeScript: 타입 제한자'
category: typescript
date: 2023-03-10
tags:
  - unknown
  - 타입어서션
  - const어서션
---

# top 타입

**top타입**은 시스템에서 가능한 모든 값을 나타내는 타입이다. 모든 다른 타입은 `top`타입에 할당할 수 있다.

### any 다시 보기

`any` 타입은 모든 타입의 위치에 제공될 수 있다는 점에서 top 타입처럼 작동할 수 있다. 다만 any는 타입스크립트가 해당 값에 대한 할당 가능성 또는 멤버에 대해 타입 검사를 수행하지 않도록 명시적으로 지시한다는 문제점을 갖는다. any 사용은 타입 검사기를 빠르게 건너뛰려고 할 때 유용하지만, 해당 값에 대한 타입스크립트의 유용성이 줄어든다.

아래 코드는 any 타입을 사용했기 때문에 오류를 발생시키지 않는다.

```ts
function greet(name: any) {
  console.log(`Hello, my name is ${name.toUpperCase()}!`);
}

greet({ name: 'Kim' });
```

### unknown

어떤 값이든 될 수 있음을 나타내려면 any보다 unknown 타입이 훨씬 안전하다. unknown 타입은 모든 객체를 unknown 타입의 위치로 전달할 수 있다는 점에서 any 타입과 비슷하다. unknown 타입과 any 타입의 주요 차이점은 **타입스크립트가 unknown 타입의 값을 훨씬 더 제한적으로 취급한다는 것이다.**

- 타입스크립트는 unknown 타입 값의 속성에 직접 접근할 수 없다.
- unknown 타입은 top 타입이 아닌 타입에는 할당할 수 없다.

다음 코드처럼 unknown 타입 값의 속성에 접근을 시도하면 오류가 발생한다.

```ts
function greet(name: unknown) {
  console.log(`Hello, my name is ${name.toUpperCase()}!`);
  // Error: 'name' is of type 'unknown'.
}
```

타입스크립트가 unknown 타입인 name에 접근할 수 있는 방법은 `instanceof`나 `typeof` 또는 `타입 어서션`을 사용하는 것처럼 값의 타입이 제한된 경우이다.

```ts
function greet(name: unknown) {
  if (typeof name === 'string') {
    console.log(`Hello, my name is ${name.toUpperCase()}!`);
  } else {
    console.log("I'm Nobody");
  }
}

greet('Kim');
greet({});
```

# 타입 서술어

`instanceof`나 `typeof`로 타입을 좁히는 로직을 함수로 감싸면 타입을 좁힐 수 없게된다.

```ts
function isNumberOrString(value: unknown) {
  return ['number', 'string'].includes(typeof value);
}

function logValue(value: number | string | null | undefined) {
  if (isNumberOrString(value)) value.toString();
  // Error: 'value' is possibly 'null' or 'undefined'.
  else console.log('value does not exist', value);
}
```

위 코드에서 isNumberOrString 함수는 value 값을 받고 그 값이 number 또는 string인지 나타내는 boolean 값을 나타낸다. 타입을 좁히려는 의도와는 다르게 **타입스크립트는 isNumberOrString 함수가 boolean 값을 반환한다는 사실만 알 수 있고, 인수의 타입을 좁히기 위함이라는 건 알 수 없다.**

타입스크립트에는 인수가 특정 타입인지 여부를 나타내기 위해 boolean 값을 반환하는 함수를 위한 특별한 구문이 있다. 이를 **타입 서술어(type predicate)** 또는 **사용자 정의 타입 가드(user-defined type guard)**라고 한다. **타입 서술어는 일반적으로 매개변수로 전달된 인수가 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내는 데 사용한다.**

타입 서술어의 반환 타입은 다음과 같이 선언한다.

```ts
function typePredicate(input: WideType): input is NarrowType;
```

위 코드에서 선언했던 isNumberOrString를 타입 서술어를 사용해 수정해 보자.

```ts
function isNumberOrString(value: unknown): value is number | string {
  return ['number', 'string'].includes(typeof value);
}

function logValue(value: number | string | null | undefined) {
  // value: string | number
  if (isNumberOrString(value)) value.toString();
  // value: null | undefined
  else console.log('value does not exist', value);
}
```

**타입 서술어는 단순히 boolean 값을 반환하는 것이 아니라 인수가 더 구체적인 타입임을 나타내는 것이라고 생각할 수 있다.**

# 타입 연산자

키워드나 기존 타입의 이름만 사용해 모든 타입을 나타낼 수는 없다. 때로는 기존 타입의 속성 일부를 변환해서 두 타입을 결합하는 새로운 타입을 생성해야 한다.

### keyof

`keyof`는 타입스크립트에서 제공하는 타입 연산자 중 하나로, **객체의 속성 이름을 문자열 리터럴 타입으로 추출하는 연산자이다.**

```ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type PersonKeys = keyof Person;
type PersonPartial = Partial<Person>;
type PersonRecord = Record<PersonKeys, string>;
```

위 코드에서 `PersonKeys` 타입은 `"name" | "age" | "location"` 타입을 나타내며, `PersonPartial`
타입은 `Person` 인터페이스의 모든 속성을 선택적으로(optional) 만들어진 타입을 나타낸다. `PersonRecord`
타입은 `PersonKeys` 타입을 키로 하고, `string` 타입을 값으로 갖는 객체를 나타낸다.

아래 코드에서 keyof Info는 `"name" | "age" | "location"`과 같지만 작성하는 것이 훨씬 빠르고 Info 인터페이스가 변경되더라도 수동으로 업데이트할 필요가 없다.

```ts
interface Info {
  name: string;
  age: number;
  location: string;
}

function getInfo(info: Info, key: keyof Info) {
  return info[key];
}

const info: Info = {
  name: 'Kim',
  age: 20,
  location: 'seoul',
};

getInfo(info, 'name'); // Ok

getInfo(info, 'not valid');
// Argument of type '"not valid"' is not
// assignable to parameter of type 'keyof Info'.
```

keyof 연산자는 객체의 속성 이름을 추출하는 데 유용하지만, 제네릭 타입에 사용될 때는 주의해야 한다. 객체가 비어있는 경우, keyof 연산자가 추출하는 속성 이름은 never 타입이 된다. 따라서 비어있는 객체에 대해 keyof를 사용하는 경우 컴파일러가 경고 메시지를 출력할 수 있으며, 이 경우 `keyof` 대신 `PropertyKey`
타입을 사용하는 것이 좋다.

### typeof

`typeof`는 타입스크립트에서 제공하는 또 다른 타입 연산자 중 하나로, **변수나 값의 타입을 추론하여 문자열 리터럴 타입으로 반환하는 연산자이다.**

```ts
const obj = {
  name: 'Kim',
  age: 20,
  location: 'seoul',
};

type Info = typeof obj;
/* 
type Info = {
    name: string;
    age: number;
    location: string;
}
*/

const obj2: Info = {
  name: 'Roh',
  age: 30,
  location: 'incheon',
};
```

### keyof typeof

`keyof typeof` 연산자는 **객체의 속성 이름을 추출하여 문자열 리터럴 타입으로 반환하는 연산자이다.** 이 연산자는 `typeof` 연산자를 통해 객체의 타입을 추론하고, `keyof` 연산자를 통해 해당 객체의 속성 이름을 추출한다.

```ts
const person = {
  name: 'Roh',
  age: 30,
  location: 'Incheon',
};

function printPersonProperty(key: keyof typeof person) {
  console.log(person[key]);
}

printPersonProperty('name'); // Ok

printPersonProperty('gender');
// Error: Argument of type '"gender"' is not assignable
// to parameter of type '"name" | "age" | "location"'.
```

`keyof`와 `typeof`를 결합해서 시용하면 명시적 인터페이스 타입이 없는 객체에 허용된 키를 나타내는 타입에 대한 코드를 작성하고 업데이트하는 수고를 줄일 수 있다.

# 타입 어서션

타입스크립트는 코드가 정확히 알려진 타입을 가질 때 가장 잘 동작한다. 경우에 따라서 코드가 어떻게 작동하는지 타입 시스템에 100% 정확하게 알리는 것이 불가능할 때도 있다.

타입스크립트는 값의 타입에 대한 타입 시스템의 이해를 재정의하기 위한 구문으로 **타입 어서션(type assertion, 타입 캐스트라고도 부름)**을 제공한다. 다른 타입을 의미하는 값의 타입 다음에 `as` 키워드를 배치한다.

```ts
const rawData = '["javascript", "typescript"]';

// 타입 any
JSON.parse(rawData);

// 타입: string[]
JSON.parse(rawData) as string[];

// 타입: [string, string]
JSON.parse(rawData) as [string, string];

// 타입: ['javascript', 'typescript']
JSON.parse(rawData) as ['javascript', 'typescript'];
```

타입 어서션은 타입스크립트 타입 시스템에만 존재하며 자바스크립트로 컴파일될 때 다른 타입 시스템 구문과 함께 제거된다.

> ✍🏻 이전 라이브러리나 코드로 작업하는 경우 `item as type`대신 `<type>item` 같은 캐스팅 구문을 볼 수 있다. 이 구문은 JSX 구문과 호환되지 않고 .ts 파일에서 동작하지 않기 때문에 권장하지 않는다.

타입스크립트 모범 사례는 가능한 타입 어서션을 사용하지 않는 것이다. 어서션을 사용해 타입스크립트의 타입 이해를 방해할 필요가 없는 것이 가장 좋다. 그러나 타입 어서션이 유용하고 심지어 필요한 경우가 종종있다.

### non-null 어서션

**non-null 어서션**은 타입스크립트에서 변수나 속성 끝에 `!`를 붙여서 사용하는 연산자이다. 이 연산자를 사용하면 해당 변수나 속성이 `null` 또는 `undefined`가 아니라고 컴파일러에게 알려줄 수 있다.

```ts
let maybeDate = Math.random() > 0.5 ? undefined : new Date();

// 타입이 Date라고 간주됨
maybeDate as Date;

// 타입이 Date라고 간주됨
maybeDate!;
```

non-null 어서션 값이 존재하지 않으면 `undefined`를 반환하는 Map객체의 `get()`메서드를 사용할 때 유용하다.

```ts
const map = new Map([
  ['one', 1],
  ['two', 2],
]);

const maybeValue = map.get('one');
console.log(maybeValue.toString());
// 'maybeValue' is possibly 'undefined'.

const numValue = map.get('one')!;
console.log(numValue.toString()); // Ok
```

### 타입 어서션 주의 사항

`any` 타입과 마찬가지로 타입 어서션은 타입스크립트의 타입 시스템에 필요한 하나의 도피 수단이다. `any` 타입을 사용할 때처럼 **꼭 필요한 경우가 아니하면 가능한 사용하지 말하야 한다.** 따라서, 타입 어서션은 사용하는 것이 안전하다고 확신할 때만 사용해야 한다.

### **어서션 vs. 선언**

변수에 타입 애너테이션과 초기값이 모두 있을 때, 타입 검사기는 변수의 타입 애너테이션에 대한 변수의 초기값에 대해 할당 가능성 검사를 수행한다. 하지만 **타입 어서션은 타입스크립트에 타입 검사 중 일부를 건너뛰도록 명시적으로 지시한다.**

```ts
interface User {
  name: string;
  age: number;
}

const declaredUser: User = {
  // Error: Property 'age' is missing in type
  // '{ name: string; }' but required in type 'User'.
  name: 'Kim',
};

const assertedUser = {
  name: 'Roh',
} as User; // 허용되지만 런타임 시 오류 발생.
```

위 코드에서 `assertedUser` 객체는 타입 어서션 때문에 변수 선언에 대해 오류를 잡을 수 없다. 따라서 타입 애너테이션을 사용하거나 타입스크립트가 초기값에서 변수의 타입을 유추하도록 하는 것이 바람직하다.

### **어서션 할당 가능성**

타입 어서션은 일부 값의 타입이 약간 잘못된 상황에서 필요한 작은 도피 수단일 뿐이다. **완전히 서로 관련이 없는 두 타입 사이에 타입 어서션이 있는 경우에는 타입스크립트가 타입 오류를 감지하고 알려준다.**

```ts
const value = 'String' as number;
// Error: Conversion of type 'string' to type 'number' may be a mistake
// because neither type sufficiently overlaps with the other.
// If this was intentional, convert the expression to 'unknown' first.
```

하나의 타입에서 값을 완전히 관련 없는 타입으로 전환해야 하는 경우 **이중 타입 어서션(double type assertion)**을 사용한다. 먼저 값을 `any`나 `unkown` 같은 **top 타입**으로 전환한 다음 관련 없는 타입으로 전환한다.

```ts
const value = 'String' as unknown as number; // 허용되지만 이렇게 사용하면 안 됨
```

`as unknown as…` 이중 타입 어서션은 위험하고 거의 항상 코드의 타입이 잘못되었다는 징후를 나타낸다. 이중 타입 어서션의 문제점은 다음과 같다.

- **가독성 문제:** 이중 타입 어서션을 사용하면 코드가 복잡해지고 가독성이 떨어진다.
- **타입 안정성 문제:** 이중 타입 어서션을 사용하면 타입스크립트가 변수나 값의 타입을 추론하지 못할 수 있다. 이는 코드에서 에러가 발생할 가능성을 높인다.
- **디버깅 문제:** 이중 타입 어서션을 사용하면 에러가 발생했을 때 어디에서 발생했는지 추적하기 힘들어 디버깅이 어려워진다.

# const 어서션

**const 어서션**은 배열, 원시 타입, 값, 별칭 등 모든 값을 상수로 취급해야 함을 나타내는 데 사용한다. 특히 `as const`는 수신하는 모든 타입에 다음 세 가지 규칙을 적용한다.

- 배열은 가변 배열이 아니라 읽기 전용 튜플로 취급된다.
- 리터럴은 일반적인 원시 타입과 동등하지 않고 리터럴로 취급된다.
- 객체의 속성은 읽기 전용으로 간주된다.

```ts
const arr = [0, ''];
// arr: (string | number)[]

const arrAsConst = [0, ''] as const;
// arrAsConst: readonly [0, ""]
```

### 리터럴에서 원시 타입으로

타입 시스템이 리터럴 값을 일반적인 원시 타입으로 확장하기보다 특정 리터럴로 이해하는 것이 유용할 수 있다.

아래 코드에서 getNameConst의 반환 타입은 `string` 대신 `Roh`라는 더 구체적인 값이다.

```ts
// const getName: () => string
const getName = () => 'Roh';

// const getNameConst: () => "Roh"
const getNameConst = () => 'Roh' as const;
```

객체의 특정 필드를 리터럴 값으로 설정하는 것은 매우 유용하다. 인기 있는 라이브러리 중에는 값을 구분하는 필드가 특정한 리터럴 값이 되도록 요구하는 경우가 많다. 이렇게 함으로써 코드의 타입을 보다 구체적으로 추론할 수 있다.

```ts
interface Joke {
  quote: string;
  style: 'story' | 'one-liner';
}

function tellJoke(joke: Joke) {
  if (joke.style === 'one-liner') {
    console.log(joke.quote);
  } else {
    console.log(joke.quote.split('\n'));
  }
}

const narrowJoke = {
  quote: 'If you stay alice for no other reason do it for spite.',
  style: 'one-liner' as const,
};

tellJoke(narrowJoke); // Ok
```

### 읽기 전용 객체

값 리터럴에 `as const`를 적용하면 유추된 타입이 더 구체적으로 전환된다. 이때 모든 멤버 속성은 `readonly`로 설정되며, 리터럴 값은 원시 타입 대신 고유한 리터럴 타입으로 취급된다. 배열 또한 읽기 전용 튜플로 변환된다. 따라서 값 리터럴에 const 어서션을 적용하면 해당 값 리터럴이 변경되지 않으며, 모든 멤버에 같은 const 어서션 로직이 재귀적으로 적용된다는 것이다.

아래 코드에서 **preferencesMutable** 값은 `as const` 없이 선언되었으므로 이름은 원시 타입인 `string`이 되고 수정이 허용된다. 반면 **preferencesReadonly**는 `as const`로 선언되 었으므로 해당 멤버 값은 리터럴이고 수정이 허용되지 않는다.

```ts
function describePreference(preference: 'maybe' | 'no' | 'yes') {
  switch (preference) {
    case 'maybe':
      return 'I suppose... ';
    case 'no':
      return 'No thanks.';
    case 'yes':
      return 'Yes please!';
  }
}

const preferencesMutable = {
  movie: 'maybe',
  standup: 'yes',
};
/* 타입
const preferencesMutable: {
    movie: string;
    standup: string;
}
 */

describePreference(preferencesMutable.movie);
// Error: Argument of type 'string' is not assignable
// to parameter of type '"maybe" | "no" | "yes"'.

preferencesMutable.movie = 'no'; // Ok

const preferencesReadonly = {
  movie: 'maybe',
  standup: 'yes',
} as const;
/* 타입
const preferencesReadonly: {
    readonly movie: "maybe";
    readonly standup: "yes";
}
 */

describePreference(preferencesReadonly.movie); // Ok
preferencesReadonly.movie = 'no';
// Error: Cannot assign to 'movie' because it is a read-only property.
```

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트

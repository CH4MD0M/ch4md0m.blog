---
title: 'TypeScript: 유니언과 리터럴'
category: typescript
date: 2023-02-22
tags:
  - 유니언타입
  - 리터럴타입
---

타입스크립트가 값을 바탕으로 타입을 추론하는 두 가지 핵심 개념은 다음과 같다.

- **유니언(union)**: 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
- **내로잉(narrowing)**: 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

# 유니언 타입

**유니언 타입(Union Type)**이란 자바스크립트의 OR 연산자(`||`)와 같이 **A이거나 B이다. 라는 의미의 타입이다.** 유니언 타입은 값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것을 알고 있는 경우에 코드를 처리하는 개념이다.

```ts
// let age = string | undefined
let age = Math.random() > 0.5 ? undefined : '21';
```

값이 유니언 타입일 때 타입스크립트는 **유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.**

```ts
// let age = string | undefined
let age = Math.random() > 0.5 ? 21 : '21';

age.toString(); // OK

age.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
// Property 'toUpperCase' does not exist on type 'number'.

age.toFixed();
// Error: Property 'toFixed' does not exist on type 'string | number'.
// Property 'toFixed' does not exist on type 'string'.
```

모든 유니언 타입에 존재하지 않는 속성에 대한 접근을 제한하는 것은 안전 조치에 해당한다. 객체가 어떤 속성을 포함한 타입으로 확실하게 알려지지 않은 경우, 타입스크립트는 해당 속성을 사용하려고 시도하는 것이 안전하지 않다고 여긴다.

### 유니언 속성

값이 유니언 타입일 때 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.

```ts
let physicist = Math.random() > 0.5 ? 'Marie Curie' : 10;

physicist.toString(); // Ok

physicist.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.

physicist.toFixed();
// Property 'toFixed' does not exist on type 'string | number'.
//   Property 'toFixed' does not exist on type 'string'.
```

위 코드에서 physicist는 `number | string` 타입으로 toUpperCase()나 toFixed()는 사용할 수 없다.

유니언 타입으로 정의된 여러 타입 중 하나의 타입으로 된 값의 속성을 사용하려면 코드에서 값이 더 구체적인 타입 중 하나라는 것을 타입스크립트에 알려야 한다. 이를 **내로잉(narrowing)**이라고 한다.

# 내로잉

내로잉은 값이 정의, 선언 또는 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것이다. 타입을 좁히는 데 사용할 수 있는 논리적 검사를 **타입 가드(type guard)**라고 한다.

### 값 할당을 통한 내로잉

변수에 값을 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.

다음 코드의 variables 변수는 초기에 `number | string`으로 선언했지만, `‘string’` 값이 할당된 이후 타입스크립트는 variables 변수가 string 타입이라는 것을 알게 된다.

```ts
let variables: number | string;

variables = 'string';

variables.toUpperCase(); // Ok: string

variables.toFixed();

// Error: Property 'toFixed' does not exist on type 'string'.
```

변수에 유니언 타입 애너테이션이 명시되고 초깃값이 주어질 때 값 할당 내로잉이 작동한다. 타입스크립트는 변수가 나중에 유니언 타입으로 선언된 타입 중 하나의 값을 받을 수 있지만, 처음에는 초기에 할당된 값의 타입으로 시작한다는 것을 이해한다.

다음 코드에서 inventor는 number | string 타입으로 선언되었지만, 초깃값으로 문자열이 할당되었기 때문에 inventor는 string 타입으로 좁혀진다.

```ts
let inventor: number | string = 'Hedy Lamarr';

inventor.toUpperCase(); // Ok

inventor.toFixed();
// Error: Property 'toFixed' does not exist on type 'string'.
```

### 조건 검사를 통한 내로잉

일반적으로 타입스크립트에서는 if 문을 사용해 변수의 값을 좁히는 방법을 사용한다. 타입스크립트는 변수가 알려진 값과 같은 타입인지 확인한다.

```ts
let researcher = Math.random() > 0.5 ? 'Rosalind Franklin' : 10;

if (researcher === 'Rosalind Franklin') researcher.toUpperCase();

researcher.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
```

### typeof 검사를 통한 내로잉

타입스크립트는 직접 값을 확인해 타입을 좁히기도 하지만, **typeof 연산자**를 사용할 수도 있다.

```ts
let researcher = Math.random() > 0.5 ? 'Rosalind Franklin' : 10;

typeof researcher === 'string'
  ? researcher.toUpperCase() // Ok
  : researcher.toFixed(); // Ok
```

# 리터럴 타입

리터럴 타입은 좀 더 구체적인 버전의 원시 타입이다.

```ts
const fruits = 'apple';
```

fruits는 string 타입이다. 하지만 fruits는 단지 string 타입이 아닌 ‘apple’이라는 특별한 값이다. 따라서 fruits의 타입은 기술적으로 더 구체적인 ‘apple’이다.

이것이 리터럴의 개념이다. 원시 타입 값 중 어떤 것이 아닌 `특정 원시값`으로 알려진 타입이 **리터럴 타입**이다.

만약 변수를 const로 선언하고 직접 리터럴 값을 할당하면 타입스크립트는 해당 변수를 할당된 리터럴 값으로 유추한다. 하지만 let으로 변수를 선언하면 원시 타입으로 평가한다.

```ts
const vehicle = 'bus';
// const vehicle: "bus"

let animal = 'tiger';
// let animal: string
```

리터럴 타입은 원시 타입과 섞어서 사용할 수 있다.

```ts
let lifespan: number | 'ongoing' | 'uncertain';
lifespan = 89; // Ok
lifespan = 'ongoing'; // Ok

lifespan = true;
// Error: Type 'true' is not assignable
// to type 'number | "ongoing" | "uncertain"'.
```

### 리터럴 할당 가능성

서로 다른 원시 타입이 할당되지 못하는 것과 마찬가지로 0과 1은 같은 원시 타입이지만 다른 리터럴 타입이기 때문에 서로 할당할 수 없다.

다음 코드에서 변수 specificallyAda는 리터럴 타입 `Ada`로 선언했으므로 Bryon이나 string 타입 값은 할당할 수 없다. 즉, 원시 타입은 리터럴 타입에 할당할 수 없다.

```ts
let specificallyAda: 'Ada';

specificallyAda = 'Ada'; // Ok

specificallyAda = 'Bryon';
// Error: Type '"Bryon"' is not assignable to type '"Ada"'.

let someString = '';

specificallyAda = someString;
// Error: Type 'string' is not assignable to type '"Ada"'.
```

아래 코드에서 타입 `:)`의 값 `:)`는 앞서 string 타입으로 간주한 someString 변수에 할당할 수 있다.

```ts
let someString: string = '';

someString = ':)'; // Ok
```

리터럴 타입은 그 값이 해당하는 원시 타입에 할당할 수 있다. 모든 특정 리터럴 문자열은 여전히 string 타입이기 때문이다. 정리하자면 원시 타입은 리터럴 타입에 할당할 수 없지만, 리터럴 타입은 원시 타입에 할당될 수 있다.

# 엄격한 null 검사

strictNullChecks는 TypeScript의 컴파일러 옵션으로 개발자가 엄격한 널 검사를 수행하여 더 신뢰할 수 있고 안전한 코드를 작성할 수 있도록 도와준다.

이 옵션이 활성화되면 컴파일러는 변수가 초기화되기 전에 사용되지 않고 함수가 항상 값을 반환하거나 void를 반환한다고 명시적으로 선언하기 위해 추가 검사를 수행한다.

strictNullChecks 옵션이 활성화되면, 변수와 매개변수는 자동으로 nullable로 간주하지 않는다. 이때 변수와 매개변수는 유니언 타입 `| null` 또는 `| undefined`를 사용해서 명시적으로 nullable로 선언해야 한다. 이렇게 하면 null 또는 undefined로 인해 발생하는 예기치 않은 런타임 오류를 방지할 수 있다.

아래 코드에서 foo는 초기화되지 않으므로 값이 undefined다. foo의 길이 속성에 액세스하려고 시도하면 undefined에 길이 속성이 없으므로 런타임 오류가 발생한다.

```ts
let foo: string;
console.log(foo.length);
```

하지만, strictNullChecks를 활성화하면 foo가 undefined이거나 null일 수 있음을 선언해야 한다.

```ts
let foo: string | undefined | null;
console.log(foo.length);
// Error: 'foo' is possibly 'null' or 'undefined'.
```

# 타입 별칭

```ts
type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
```

타입스크립트에는 재사용하는 타입에 더 쉬운 이름을 할당하는 **타입 별칭(type alias)**이 있다. 편의상 타입 별칭은 파스칼 케이스로 이름을 지정한다.

### 타입 별칭은 자바스크립트가 아니다

타입 별칭은 타입 애너테이션처럼 자바스크립트로 컴파일되지 않는다. 오직 타입스크립트 타입 시스템에만 존재한다.

위 코드를 자바스크립트로 컴파일한 결과는 다음과 같다.

```ts
let rawDataFirst;
let rawDataSecond;
let rawDataThird;
```

타입 별칭은 타입 시스템에만 존재하므로 런타임 코드에서 참조할 수 없다. 타입스크립트는 만약 런타임에 존재하지 않는 항목에 접근하려고 하면 타입 오류로 알려준다.

```ts
type SomeType = string | undefined;

console.log(SomeType);
// Error: 'SomeType' only refers to a type, but is being used as a value here.
```

### 타입 별칭 결합

타입 별칭은 다른 별칭을 참조할 수 있다.

```ts
type Id = number | string;

// IdMaybe의 타입은 다음과 같다: number | string | undefined | null
type IdMaybe = Id | undefined | null;
```

사용 순서대로 타입 별칭을 선언할 필요는 없다. 타입 별칭을 먼저 선언하고 참조할 타입을 나중에 선언해도 된다.

```ts
type IdMaybe = Id | undefined | null; // Ok

type Id = number | string;
```

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트

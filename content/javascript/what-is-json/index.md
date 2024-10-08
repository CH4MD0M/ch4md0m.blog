---
title: 'JSON(JavaScript Object Notation)이란?'
category: javascript
date: 2022-07-16
tags:
  - 비동기
  - JSON
---

**JSON(JavaScript Object Nation)**은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다. JSON은 통신 방법, 프로그래밍 문법이 아닌 단순히 **데이터를 표시하는 표현 방법**이다.

# JSON 표기 방식

JSON은 자바스크립트의 객체 리터럴과 유사하게 **키와 값**으로 구성된 순수한 텍스트다. JSON 형식에서는 `null`, `number`, `string`, `array`, `object`, `boolean`을 사용할 수 있다.

JSON의 **Key**는 반드시 `큰따옴표`로 묶어야 한다. 값은 객체 리터럴과 같은 표기법을 사용할 수 있지만, 문자열은 반드시 `큰따옴표`로 묶어야 한다.

```json
{
  "name": "Roh",
  "age": 20,
  "address": "incheon",
  "hobby": ["cycling", "basketball"]
}
```

# JSON 사용 방법

## JSON.stringfy

`JSON.stringify` 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 **직렬화(serializing)**라 한다.

```js
JSON.stringfy(value[, replacer[, space]])
```

| 매개변수             | 설명                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`              | JSON 문자열로 변환할 값.                                                                                                                          |
| `replacer`(optional) | JSON 문자열에 포함시킬 객체의 속성들을 선택하기 위한 함수 또는 배열. 파라미터 값이 비어있거나 null로 지정되면 모든 속성이 JSON 문자열에 포함되다. |
| `space`(optional)    | JSON 문자열 형식의 가독성을 높이기 위해 공백을 조정하는 값.                                                                                       |

<br />

#### stringfy 예제

```js
const obj = {
  name: 'Roh',
  age: 20,
  address: 'incheon',
  hobby: ['cycling', 'basketball'],
};

const json = JSON.stringify(obj);

console.log(typeof json); // string
console.log(json); // {"name":"Roh","age":20,"address":"incheon","hobby":["cycling","basketball"]}
```

#### replacer, space 사용 예제

```js
const obj = {
  name: 'Roh',
  age: 20,
  address: 'incheon',
  hobby: ['cycling', 'basketball'],
};

function filter(key, value) {
  return typeof value === 'number' ? undefined : value;
}

// JSON.stringify 메서드에 두 번째 인수로 replacer 함수를 전달한다.
const strFilteredObject = JSON.stringify(obj, filter, 2);
console.log(strFilteredObject);
/*
{
  "name": "Roh",
  "address": "incheon",
  "hobby": [
    "cycling",
    "basketball"
  ]
}
*/
```

## JSON.parse

`JSON.parse` 메서드는 JSON 포맷의 문자열을 객체로 변환한다. 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열을 객체로서 사용하려면 이 문자열을 객체화해야 하는데 이를 **역직렬화(deserializing)**라고 한다.

```js
const obj = {
  name: 'Roh',
  age: 20,
  address: 'incheon',
  hobby: ['cycling', 'basketball'],
};

// 객체를 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(obj);
// JSON 포맷의 문자열을 객체로 변환한다.
const parsed = JSON.parse(json);

console.log(parsed);
// {name: 'Roh', age: 20, address: 'incheon', hobby: Array(2)}
```

<br />

# 참고

- https://poiemaweb.com/jquery-ajax-json
- https://usefultoknow.tistory.com/15
- 모던 자바스크립트 Deep Dive

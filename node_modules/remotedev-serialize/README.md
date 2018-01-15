Serialize ImmutableJS data
==============================

### Installation

```
npm install --save remotedev-serialize
```

### Usage with ImmutableJS data structures

Just pass the Immutable library to our class:

```js
import Immutable from 'immutable';
import Serialize from 'remotedev-serialize';
const { stringify, parse } =  Serialize(Immutable);

const data = Immutable.Repeat('hi', 100);
const serialized = stringify(data);
const parsed = parse(data);
console.log(Immutable.is(parsed, data));
```

See [the tests](https://github.com/zalmoxisus/remotedev-serialize/blob/master/test/immutable.spec.js) for more examples of usage.

### Usage with ImmutableJS Record classes

To parse a Record class back, you need to specify a reference to it:

```js
import Immutable from 'immutable';
import Serialize from 'remotedev-serialize';

const ABRecord = Immutable.Record({ a:1, b:2 });
const myRecord = new ABRecord({ b:3 });

const { stringify, parse } =  Serialize(Immutable, [ABRecord]);

const serialized = stringify(myRecord);
const parsed = parse(myRecord);
console.log(Immutable.is(parsed, myRecord));
```

### Supported

#### ImutableJS

- [x] Record
- [x] Range
- [x] Repeat
- [x] Map
- [x] OrderedMap
- [x] List
- [x] Set
- [x] OrderedSet
- [x] Seq
- [x] Stack


#### ES6

- [x] Symbol
- [ ] Map
- [ ] Set
- [ ] Typed Array

### License

MIT

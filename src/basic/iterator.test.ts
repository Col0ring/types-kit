import {
  IterableValue,
  ArrayEntry,
  SetEntry,
  MapEntry,
  ObjectEntry,
  Entry,
  Entries,
} from './iterator'
import { Expect, Group, Test } from '../test-utils'
function* IterableValueFoo() {
  yield 1
  yield 2
}
async function* IterableValueBar() {
  yield 3
  yield 4
}

type TestIterableValue = Expect<
  IterableValue<ReturnType<typeof IterableValueFoo>>,
  1 | 2
>
type TestIterableValue2 = Expect<
  IterableValue<ReturnType<typeof IterableValueBar>>,
  3 | 4
>

type TestIterableValueGroup = Group<[TestIterableValue, TestIterableValue2]>

type TestArrayEntry = Expect<ArrayEntry<[1, 2]>, [number, 1 | 2]>
type TestSetEntry = Expect<SetEntry<Set<number>>, [number, number]>
type TestMapEntry = Expect<
  MapEntry<Map<'a' | 'b', number>>,
  ['a' | 'b', number]
>
type TestObjectEntry = Expect<
  ObjectEntry<{
    a: 1
    b: 2
  }>,
  ['a' | 'b', 1 | 2]
>
type TestEntry = Expect<Entry<[1, 2]>, [0 | 1, 1 | 2]>
type TestEntries = Expect<Entries<[1, 2]>, [0 | 1, 1 | 2][]>

export type Result = Test<
  [
    TestIterableValueGroup,
    TestArrayEntry,
    TestSetEntry,
    TestMapEntry,
    TestObjectEntry,
    TestEntry,
    TestEntries
  ]
>

import { ArrayEntry, IterableValue, ObjectEntry } from './iterator'
import { Expect, Group, Test } from '../test-util'
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

export type Result = Test<[TestIterableValueGroup]>

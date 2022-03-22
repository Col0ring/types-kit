import {
  Tuple,
  IsTuple,
  IsEmptyTypeArray,
  IsReadonlyArray,
  ArrayItem,
  FlattedArrayItem
} from './array'
import { Expect, Group, Test } from '../test-utils'

type TestTuple = Expect<
  Tuple<1, number>,
  | [1, ...number[]]
  | [...number[], 1]
  | readonly [1, ...number[]]
  | readonly [...number[], 1]
>

type TestIsTuple = Expect<IsTuple<[1, 2]>, true>
type TestIsTuple2 = Expect<IsTuple<number[]>, false>
type TestIsTupleGroup = Group<[TestIsTuple, TestIsTuple2]>

type TestIsEmptyTypeArray = Expect<IsEmptyTypeArray<[]>, true>
type TestIsReadonlyArray = Expect<IsReadonlyArray<readonly []>, true>
type TestArrayItem = Expect<ArrayItem<number[]>, number>
type TestFlattedArrayItem = Expect<FlattedArrayItem<number[][][]>, number>

export type Result = Test<
  [
    TestTuple,
    TestIsTupleGroup,
    TestIsEmptyTypeArray,
    TestIsReadonlyArray,
    TestArrayItem,
    TestFlattedArrayItem
  ]
>

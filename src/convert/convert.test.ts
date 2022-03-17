import { StringToNumber } from './string-to-number'
import { TupleToObject } from './tuple-to-object'
import { TupleToUnion } from './tuple-to-union'
import { UnionToIntersection } from './union-to-intersection'
import { UnionToTuple } from './union-to-tuple'
import { OtherToString } from './other-to-string'
import { Test, Expect, Group, ExpectMatch } from '../test-util'

type TestStringToNumber = Expect<StringToNumber<'1'>, 1>

type TestTupleToObject = Expect<
  TupleToObject<['a', 'b', 1]>,
  { a: 'a'; b: 'b'; 1: 1 }
>
type TestTupleToObject2 = Expect<
  TupleToObject<['a', 'b', 1], 'Uppercase'>,
  { A: 'a'; B: 'b'; 1: 1 }
>

type TestTupleToObjectGroup = Group<[TestTupleToObject, TestTupleToObject2]>

type TestTupleToUnion = Expect<
  TupleToUnion<[number, string, boolean]>,
  number | string | boolean
>

type TestUnionToIntersection = Expect<
  UnionToIntersection<{ a: number } | { b: number }>,
  {
    a: number
  } & {
    b: number
  }
>

type TestUnionToTuple = ExpectMatch<
  UnionToTuple<'1' | '2'>,
  ['1', '2'] | ['2', '1']
>

type TestOtherToString = ExpectMatch<OtherToString<1>, '1'>
export type Result = Test<
  [
    TestStringToNumber,
    TestTupleToObjectGroup,
    TestTupleToUnion,
    TestUnionToIntersection,
    TestUnionToTuple,
    TestOtherToString
  ]
>

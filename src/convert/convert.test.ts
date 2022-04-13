import { StringToNumber } from './string-to-number'
import { TupleToObject } from './tuple-to-object'
import { TupleToUnion } from './tuple-to-union'
import { UnionToIntersection } from './union-to-intersection'
import { UnionToTuple } from './union-to-tuple'
import { OtherToString } from './other-to-string'
import { UrlQueryToObject, UrlParamsToUnion } from './url-to-other'
import { LiteralToPrimitive } from './literal-to-primitive'
import { Test, Expect, Group, ExpectMatch } from '../test-utils'

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

type TestOtherToString = Expect<OtherToString<1>, '1'>

type TestUrlQueryToObject = Expect<
  UrlQueryToObject<'/foo/bar?a=1&b=2&a=3&c'>,
  {
    a: ['1', '3']
    b: '2'
    c: undefined
  }
>

type TestUrlParamsToUnion = Expect<
  UrlParamsToUnion<'/foo/bar/:a/:b/baz?a=1&b=2&a=3&c'>,
  'a' | 'b'
>

type TestLiteralToPrimitive = Expect<LiteralToPrimitive<'a'>, string>

export type Result = Test<
  [
    TestStringToNumber,
    TestTupleToObjectGroup,
    TestTupleToUnion,
    TestUnionToIntersection,
    TestUnionToTuple,
    TestOtherToString,
    TestUrlQueryToObject,
    TestUrlParamsToUnion,
    TestLiteralToPrimitive
  ]
>

import { Expect, Group, Test } from '../test-utils'
import { ConditionalKeys, DeepKeys, Keys, TupleKeys } from './key'

type TestTupleKeys = Expect<TupleKeys<[1, 2, 3]>, 0 | 1 | 2 | '0' | '1' | '2'>

type TestKeys = Expect<
  Keys<{
    readonly a?: number
    b: number
    readonly c: number
  }>,
  'a' | 'b' | 'c'
>

type TestKeys2 = Expect<Keys<[1, 2, 3]>, 0 | 1 | 2 | '0' | '1' | '2'>

type TestKeysGroup = Group<[TestKeys, TestKeys2]>

type TestDeepKeys = Expect<
  DeepKeys<{
    a?: {
      readonly b?: number
      c: {
        d?: number
      }
    }
    e: number
  }>,
  'a' | 'a.b' | 'a.c' | 'a.c.d' | 'e'
>

type TestDeepKeys2 = Expect<
  DeepKeys<
    [
      0,
      {
        readonly a: number
        b?: {
          c: number
        }
      }
    ]
  >,
  0 | 1 | '0' | '1' | '1.a' | '1.b' | '1.b.c'
>

type TestDeepKeysGroup = Group<[TestDeepKeys, TestDeepKeys2]>

type TestConditionKeys = Expect<
  ConditionalKeys<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean
  >,
  'a' | 'c'
>

type TestConditionKeys2 = Expect<
  ConditionalKeys<[string, number, boolean], string | boolean>,
  0 | 2 | '0' | '2'
>

// set exact true
type TestConditionKeys3 = Expect<
  ConditionalKeys<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean,
    true
  >,
  'c'
>

type TestConditionKeysGroup = Group<
  [TestConditionKeys, TestConditionKeys2, TestConditionKeys3]
>

export type Result = Test<
  [TestTupleKeys, TestKeysGroup, TestDeepKeysGroup, TestConditionKeysGroup]
>

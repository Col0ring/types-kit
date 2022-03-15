import {
  TupleKeys,
  DeepKeys,
  Keys,
  Values,
  DeepValues,
  Get,
  DeepGet,
  DeepGetPath
} from './value'
import { Expect, Group, Test } from '../test-util'

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

type TestValues = Expect<
  Values<{
    a?: number
    b: string
    c: boolean
  }>,
  number | string | boolean | undefined
>

type TestDeepValues = Expect<
  DeepValues<{
    a?: {
      d: () => void
    }
    b: string
    c: boolean
  }>,
  { d: () => void } | (() => void) | string | boolean | undefined
>

type TestGet = Expect<
  Get<
    {
      a?: {
        d: () => void
      }
      b: string
      c: boolean
    },
    'a' | 'b'
  >,
  | {
      d: () => void
    }
  | undefined
  | string
>

type TestDeppGet = Expect<
  DeepGet<
    {
      a?: {
        d: () => void
      }
      b: string
      c: boolean
    },
    'a.d' | 'b'
  >,
  (() => void) | string | undefined
>

type TestDeepGetPath = Expect<
  DeepGetPath<
    {
      a?:
        | {
            c?:
              | {
                  d: number
                  g: number
                  h: number
                }
              | number
            e: number
          }
        | number
      b: {
        readonly c: number
      }
    },
    'a.c.d' | 'a.c.g' | 'b'
  >,
  {
    a?:
      | {
          c?:
            | {
                d: number
                g: number
              }
            | number
        }
      | number
    b: {
      readonly c: number
    }
  }
>

export type Result = Test<
  [
    TestTupleKeys,
    TestKeysGroup,
    TestDeepKeysGroup,
    TestValues,
    TestDeepValues,
    TestGet,
    TestDeppGet,
    TestDeepGetPath
  ]
>

import { Expect, Group, Test } from '../test-utils'

import {
  Mutable,
  MutableDeep,
  MutableKeys,
  SetMutable,
  SetMutableDeepPick,
} from './mutable'

type TestMutable = Expect<
  Mutable<{
    readonly a: 1
    readonly b: 2
    readonly c: 3
  }>,
  {
    a: 1
    b: 2
    c: 3
  }
>

type TestMutablePick = Expect<
  SetMutable<
    {
      readonly a: number
      readonly b: number
      readonly c: number
    },
    'a' | 'b'
  >,
  {
    a: number
    b: number
    readonly c: number
  }
>

type TestMutableKeys = Expect<
  MutableKeys<{
    readonly a?: number
    b: number
    readonly c: number
  }>,
  'b'
>

type TestMutableDeep = Expect<
  MutableDeep<{
    readonly a: {
      readonly d: number
    }
    readonly b: number
    readonly c: number
  }>,
  {
    a: {
      d: number
    }
    b: number
    c: number
  }
>

type TestMutableDeepPick = Expect<
  SetMutableDeepPick<
    {
      readonly a: {
        b?: number
        readonly c: {
          d: number
        }
      }
      readonly e: number
    },
    'a' | 'a.c'
  >,
  {
    a: {
      b?: number | undefined
      c: {
        d: number
      }
    }
    readonly e: number
  }
>

type TestMutableDeepPick2 = Expect<
  SetMutableDeepPick<
    [{ readonly a: 1; readonly b: 2 }, { readonly a: 1; readonly b: 2 }],
    '0.a' | '1.b'
  >,
  [{ a: 1; readonly b: 2 }, { readonly a: 1; b: 2 }]
>

type TestMutableDeepGroup = Group<[TestMutableDeepPick, TestMutableDeepPick2]>

export type Result = Test<
  [
    TestMutable,
    TestMutablePick,
    TestMutableKeys,
    TestMutableDeep,
    TestMutableDeepGroup,
  ]
>

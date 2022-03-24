import {
  ReadonlyDeep,
  ReadonlyKeys,
  SetReadonly,
  SetReadonlyDeep,
} from './readonly'
import { Expect, Group, Test } from '../test-utils'

type TestReadonlyDeep = Expect<
  ReadonlyDeep<{
    a: {
      d: number
    }
    b: number
    c: number
  }>,
  {
    readonly a: {
      readonly d: number
    }
    readonly b: number
    readonly c: number
  }
>

type TestReadonlyKeys = Expect<
  ReadonlyKeys<{
    readonly a?: number
    b: number
    readonly c: number
  }>,
  'a' | 'c'
>

type TestReadonlyPick = Expect<
  SetReadonly<
    {
      a?: number
      b: number
      c: number
    },
    'a' | 'c'
  >,
  {
    readonly a?: number
    b: number
    readonly c: number
  }
>

type TestSetReadonlyDeepPick = Expect<
  SetReadonlyDeep<
    {
      a: {
        b?: number
        readonly c: {
          d: number
        }
      }
      e: number
    },
    'e' | 'a' | 'a.c.d'
  >,
  {
    readonly a: {
      b?: number | undefined
      readonly c: {
        readonly d: number
      }
    }
    readonly e: number
  }
>

type TestSetReadonlyDeep2 = Expect<
  SetReadonlyDeep<[{ a: 1; b: 2 }, { a: 1; b: 2 }], '0.a' | '1.b'>,
  [{ readonly a: 1; b: 2 }, { a: 1; readonly b: 2 }]
>

type TestSetReadonlyDeepGroup = Group<
  [TestSetReadonlyDeepPick, TestSetReadonlyDeep2]
>

export type Result = Test<
  [
    TestReadonlyKeys,
    TestReadonlyPick,
    TestReadonlyDeep,
    TestSetReadonlyDeepGroup
  ]
>

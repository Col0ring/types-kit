import {
  ReadonlyDeep,
  ReadonlyKeys,
  SetReadonly,
  setReadonlyDeep
} from './readonly'
import { Expect, Group, Test } from '../test-util'

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

type TestReadonlyDeepPick = Expect<
  setReadonlyDeep<
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

type TestReadonlyDeepPick2 = Expect<
  setReadonlyDeep<[{ a: 1; b: 2 }, { a: 1; b: 2 }], '0.a' | '1.b'>,
  [{ readonly a: 1; b: 2 }, { a: 1; readonly b: 2 }]
>

type TestReadonlyDeepPickGroup = Group<
  [TestReadonlyDeepPick, TestReadonlyDeepPick2]
>

export type Result = Test<
  [
    TestReadonlyKeys,
    TestReadonlyPick,
    TestReadonlyDeep,
    TestReadonlyDeepPickGroup
  ]
>

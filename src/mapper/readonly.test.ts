import {
  ReadonlyDeep,
  ReadonlyKeys,
  ReadonlyPick,
  ReadonlyDeepPick
} from './readonly'
import { Expect, Test } from '../test-util'

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
  ReadonlyPick<
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
  ReadonlyDeepPick<
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

export type Result = Test<
  [TestReadonlyKeys, TestReadonlyPick, TestReadonlyDeep, TestReadonlyDeepPick]
>

import {
  SetOptional,
  OptionalKeys,
  PartialDeep,
  SetOptionalDeep,
} from './optional'
import { Expect, Group, Test } from '../test-utils'

export type TestSetOptional = Expect<
  SetOptional<
    {
      a: number
      b: number
      c: number
    },
    'a' | 'b'
  >,
  {
    a?: number
    b?: number
    c: number
  }
>

export type TestOptionalKeys = Expect<
  OptionalKeys<{
    a?: number
    readonly b: number
    c?: number
  }>,
  'a' | 'c'
>

export type TestPartialDeep = Expect<
  PartialDeep<{
    a: {
      d: number
    }
    b: number
    c: number
  }>,
  {
    a?: {
      d?: number
    }
    b?: number
    c?: number
  }
>

type TestSetOptionalDeep = Expect<
  SetOptionalDeep<
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
    a?: {
      b?: number | undefined
      readonly c: {
        d?: number
      }
    }
    e?: number
  }
>

type TestSetOptionalDeep2 = Expect<
  SetOptionalDeep<[{ a: 1; b: 2 }, { a: 1; b: 2 }], '0.a' | '1.b'>,
  [{ a?: 1; b: 2 }, { a: 1; b?: 2 }]
>

type TestSetOptionalDeepPickGroup = Group<
  [TestSetOptionalDeep, TestSetOptionalDeep2]
>

export type Result = Test<
  [
    TestSetOptional,
    TestOptionalKeys,
    TestPartialDeep,
    TestSetOptionalDeepPickGroup
  ]
>

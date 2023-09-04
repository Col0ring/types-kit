import { Expect, Group, Test } from '../test-utils'

import {
  RequiredDeep,
  RequiredKeys,
  SetRequired,
  SetRequiredDeep,
} from './required'

export type TestSetRequired = Expect<
  SetRequired<
    {
      a?: number
      b?: number
      c?: number
    },
    'a' | 'b'
  >,
  {
    a: number
    b: number
    c?: number
  }
>

export type TestRequiredKeys = Expect<
  RequiredKeys<{
    a: number
    readonly b: number
    c?: number
  }>,
  'a' | 'b'
>

export type TestRequiredDeep = Expect<
  RequiredDeep<{
    a?: {
      d?: number
    }
    b?: number
    c?: number
  }>,
  {
    a: {
      d: number
    }
    b: number
    c: number
  }
>

type TestSetRequiredDeep = Expect<
  SetRequiredDeep<
    {
      a?: {
        b?: number
        readonly c?: {
          d?: number
        }
      }
      e?: number
    },
    'e' | 'a' | 'a.b' | 'a.c.d'
  >,
  {
    a: {
      b: number
      readonly c?: {
        d: number
      }
    }
    e: number
  }
>

type TestSetRequiredDeep2 = Expect<
  SetRequiredDeep<[{ a?: 1; b?: 2 }, { a?: 1; b?: 2 }], '0.a' | '1.b'>,
  [{ a: 1; b?: 2 }, { a?: 1; b: 2 }]
>

type TestSetRequiredDeppGroup = Group<
  [TestSetRequiredDeep, TestSetRequiredDeep2]
>

export type Result = Test<
  [
    TestSetRequired,
    TestRequiredKeys,
    TestRequiredDeep,
    TestSetRequiredDeppGroup,
  ]
>

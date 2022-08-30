import { Expect, Group, Test } from '../test-utils'
import {
  ConditionalOmit,
  DeepOmit,
  RemoveIndexSignature,
  StrictOmit,
} from './omit'

type TestStrictOmit = Expect<
  StrictOmit<{ a: 1; b: 2; c: 3 }, 'a'>,
  { b: 2; c: 3 }
>

type TestStrictOmit2 = Expect<
  StrictOmit<[1, 2, 3], '1'>,
  {
    0: 1
    2: 3
  }
>

type TestStrictOmitGroup = Group<[TestStrictOmit, TestStrictOmit2]>

type TestDeepOmit = Expect<
  DeepOmit<
    {
      a?: {
        readonly b: number
        c?: number
      }
      e: number
    },
    'a.b' | 'e'
  >,
  {
    a?: {
      c?: number
    }
  }
>

type TestDeepOmit2 = Expect<
  DeepOmit<
    [
      {
        a?: {
          readonly b: number
          c?: number
        }
        e: number
      },
      number
    ],
    '0.a.b'
  >,
  [
    {
      a?: {
        c?: number
      }
      e: number
    },
    number
  ]
>

type TestDeepOmit3 = Expect<
  DeepOmit<
    [
      {
        a?: {
          readonly b: number
          c?: number
        }
        e: number
      },
      number
    ],
    '0.a.b' | 1
  >,
  {
    0: {
      a?: {
        c?: number
      }
      e: number
    }
  }
>

type TestDeepOmitGroup = Group<[TestDeepOmit, TestDeepOmit2, TestDeepOmit3]>

type TestConditionalOmit = Expect<
  ConditionalOmit<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean
  >,
  {
    b: string
  }
>

type TestConditionalOmit2 = Expect<
  ConditionalOmit<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean,
    true
  >,
  {
    a?: number
    b: string
  }
>

type TestConditionalOmitGroup = Group<
  [TestConditionalOmit, TestConditionalOmit2]
>

type TestRemoveIndexSignature = Expect<
  RemoveIndexSignature<{
    a?: number
    readonly b: number
    c: number
    [x: number]: number
    [x: string]: number | undefined
    [x: symbol]: number
  }>,
  {
    a?: number
    readonly b: number
    c: number
  }
>

export type Result = Test<
  [
    TestStrictOmitGroup,
    TestDeepOmitGroup,
    TestConditionalOmitGroup,
    TestRemoveIndexSignature
  ]
>

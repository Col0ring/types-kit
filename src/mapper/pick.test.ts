import {
  Simplify,
  ConditionalPick,
  DeepPick,
  PickAtLeastOne,
  PickExactlyOne,
  PickAllOrNone,
  ReplacePick,
  DeepReplacePick,
  DiffPick
} from './pick'
import { Expect, Group, Test } from '../test-utils'

type TestSimplify = Expect<Simplify<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>

type TestDeepPick = Expect<
  DeepPick<
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

type TestDeepPick2 = Expect<
  DeepPick<[{ a: number; b: number }, { a: number; b: number }], `0.a` | `1.b`>,
  {
    0: {
      a: number
    }
    1: {
      b: number
    }
  }
>

type TestDeepPickGroup = Group<[TestDeepPick, TestDeepPick2]>

type TestConditionalPick = Expect<
  ConditionalPick<
    {
      // a will match number | undefined
      a?: number
      b: string
      c: boolean
    },
    number | boolean
  >,
  {
    a?: number
    c: boolean
  }
>

type TestConditionalPick2 = Expect<
  ConditionalPick<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean,
    true
  >,
  {
    c: boolean
  }
>

type TestConditionalPickGroup = Group<
  [TestConditionalPick, TestConditionalPick2]
>

type TestPickAtLeastOne = Expect<
  PickAtLeastOne<
    {
      readonly a?: number
      b?: number
      c: number
    },
    'a' | 'b'
  >,
  {
    c: number
  } & (
    | ({
        readonly a: number
      } & {
        b?: number
      })
    | ({
        readonly a?: number
      } & {
        b: number
      })
  )
>

type TestPickExactlyOne = Expect<
  PickExactlyOne<
    {
      readonly a?: number
      b?: number
      c: number
    },
    'a' | 'b'
  >,
  {
    c: number
  } & (
    | ({
        readonly a: number
      } & {
        b?: never
      })
    | ({
        readonly a?: never
      } & {
        b: number
      })
  )
>

type TestPickAllOrNone = Expect<
  PickAllOrNone<
    {
      readonly a?: number
      b?: number
      c: number
    },
    'a' | 'b'
  >,
  {
    c: number
  } & (
    | {
        readonly a: number
        b: number
      }
    | {
        readonly a?: never
        b?: never
      }
  )
>

type TestReplacePick = Expect<
  ReplacePick<
    {
      readonly a?: {
        d?: boolean
      }
      b?: number
      c: number
    },
    ['a', 'c'],
    [string, string]
  >,
  {
    readonly a?: string
    b?: number
    c: string
  }
>

type TestDeepReplacePick = Expect<
  DeepReplacePick<
    {
      readonly a?: {
        d?: boolean
      }
      b?: number
      c: number
    },
    ['a.d'],
    [string]
  >,
  {
    readonly a?: {
      d?: string
    }
    b?: number
    c: number
  }
>

type TestDeepReplacePick2 = Expect<
  DeepReplacePick<
    [
      1,
      {
        readonly a?: number
      }
    ],
    [0, '1.a'],
    [2, string]
  >,
  [
    2,
    {
      readonly a?: string
    }
  ]
>

type TestDeepReplacePickGroup = Group<
  [TestDeepReplacePick, TestDeepReplacePick2]
>

type TestDiffPick = Expect<
  DiffPick<
    {
      a?: number
      readonly b: number
      c: number
    },
    {
      a: number
    }
  >,
  {
    readonly b: number
    c: number
  }
>

export type Result = Test<
  [
    TestSimplify,
    TestDeepPickGroup,
    TestConditionalPickGroup,
    TestPickAtLeastOne,
    TestPickExactlyOne,
    TestPickAllOrNone,
    TestReplacePick,
    TestDeepReplacePickGroup,
    TestDiffPick
  ]
>

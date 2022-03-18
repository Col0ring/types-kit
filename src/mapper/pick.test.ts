import { ConditionalPick, DeepPick, RemoveIndexSignature } from './pick'
import { Expect, Group, Test } from '../test-utils'

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
  [TestDeepPickGroup, TestConditionalPickGroup, TestRemoveIndexSignature]
>

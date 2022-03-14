import {
  DeepKeys,
  Keys,
  Values,
  DeepValues,
  Get,
  DeepGet,
  DeepGetPath
} from './value'
import { Expect, Test } from '../test-util'

type TestKeys = Expect<
  Keys<{
    readonly a?: number
    b: number
    readonly c: number
  }>,
  'a' | 'b' | 'c'
>

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
    TestKeys,
    TestDeepKeys,
    TestValues,
    TestDeepValues,
    TestGet,
    TestDeppGet,
    TestDeepGetPath
  ]
>

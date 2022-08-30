import { Expect, Test } from '../test-utils'
import { DeepGet, DeepValueOf, Get, ValueOf } from './value'

type TestValues = Expect<
  ValueOf<{
    a?: number
    b: string
    c: boolean
  }>,
  number | string | boolean | undefined
>

type TestDeepValues = Expect<
  DeepValueOf<{
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

export type Result = Test<[TestValues, TestDeepValues, TestGet, TestDeppGet]>

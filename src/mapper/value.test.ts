import { Expect, Test } from '../test-utils'

import {
  DeepGet,
  DeepTupleGet,
  DeepValueOf,
  Get,
  TupleGet,
  ValueOf,
} from './value'

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

type TestDeepGet = Expect<
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

type TestTupleGet = Expect<
  TupleGet<
    {
      a?: number
      b: string
      c: boolean
    },
    ['a', 'c']
  >,
  [number | undefined, boolean]
>

type TestDeepTupleGet = Expect<
  DeepTupleGet<
    {
      a?: {
        d: () => void
      }
      b: string
      c: boolean
    },
    ['a', 'a.d', 'c']
  >,
  [{ d: () => void } | undefined, (() => void) | undefined, boolean]
>

export type Result = Test<
  [
    TestValues,
    TestDeepValues,
    TestGet,
    TestDeepGet,
    TestTupleGet,
    TestDeepTupleGet,
  ]
>

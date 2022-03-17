import { SetOptional, OptionalKeys, PartialDeep } from './optional'
import { Expect, Test } from '../test-util'

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

export type Result = Test<[TestSetOptional, TestOptionalKeys, TestPartialDeep]>

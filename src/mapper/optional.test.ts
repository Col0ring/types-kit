import { OptionalKeys } from './optional'
import { Expect, Test } from '../test-util'

export type TestOptionalKeys = Expect<
  OptionalKeys<{
    a?: number
    readonly b: number
    c?: number
  }>,
  'a' | 'c'
>

export type Result = Test<[TestOptionalKeys]>

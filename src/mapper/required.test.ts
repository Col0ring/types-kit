import { RequiredKeys } from './required'
import { Expect, Test } from '../test-util'

export type TestRequiredKeys = Expect<
  RequiredKeys<{
    a?: number
    readonly b: number
    c?: number
  }>,
  'b'
>

export type Result = Test<[TestRequiredKeys]>

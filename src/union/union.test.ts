import { LastInUnion } from './last-in-union'
import { StrictExclude } from './strict-exclude'
import { Expect, Test } from '../test-util'

// The editor can pass validation, but tsc will throw error
type TestLastInUnion = LastInUnion<'3' | '1' | '2'> extends infer V
  ? [V] extends ['3']
    ? true
    : [V] extends ['1']
    ? true
    : [V] extends ['2']
    ? true
    : false
  : never

type TestStrictExclude = Expect<StrictExclude<'1' | '2' | '3', '3'>, '1' | '2'>

export type Result = Test<[TestLastInUnion, TestStrictExclude]>

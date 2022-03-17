import { LastInUnion } from './last-in-union'
import { StrictExclude } from './strict-exclude'
import { LiteralUnion } from './literal-union'
import { Expect, FailTest, SuccessTest, Test } from '../test-util'

type LiteralStringType = LiteralUnion<'a' | 'b', string>
type TestLiteralUnion = Expect<LiteralStringType, 'a' | 'b' | (string & {})>

export const testLiteralUnion: LiteralStringType = 'a'
export const testLiteralUnion1: LiteralStringType = 'b'
export const testLiteralUnion2: LiteralStringType = 'foo'

// The editor can pass validation, but tsc will throw error
type TestLastInUnion = LastInUnion<'3' | '1' | '2'> extends infer V
  ? [V] extends ['3']
    ? SuccessTest
    : [V] extends ['1']
    ? SuccessTest
    : [V] extends ['2']
    ? SuccessTest
    : FailTest
  : FailTest

type TestStrictExclude = Expect<StrictExclude<'1' | '2' | '3', '3'>, '1' | '2'>

export type Result = Test<
  [TestLiteralUnion, TestLastInUnion, TestStrictExclude]
>

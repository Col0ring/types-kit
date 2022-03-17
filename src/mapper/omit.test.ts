import { StrictOmit, ConditionalOmit } from './omit'
import { Expect, Group, Test } from '../test-utils'

type TestStrictOmit = Expect<
  StrictOmit<{ a: 1; b: 2; c: 3 }, 'a'>,
  { b: 2; c: 3 }
>

type TestStrictOmit2 = Expect<
  StrictOmit<[1, 2, 3], '1'>,
  {
    0: 1
    2: 3
  }
>

type TestStrictOmitGroup = Group<[TestStrictOmit, TestStrictOmit2]>

type TestConditionalOmit = Expect<
  ConditionalOmit<
    {
      a?: number
      b: string
      c: boolean
    },
    number | boolean
  >,
  {
    b: string
  }
>

export type Result = Test<[TestStrictOmitGroup, TestConditionalOmit]>

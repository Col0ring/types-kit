import { If, IfExtends, IfElseIf } from './if'
import { Switch } from './switch'
import { And } from './and'
import { Or } from './or'
import { Not } from './not'
import { IsEquals, IsExtends } from './operator'
import { Expect, Group, Test } from '../test-utils'

type TestIf = Expect<If<false, 1, 2>, 2>

type TestIfExtends = Expect<IfExtends<[true, boolean], 1, 2>, 1>

type TestIfElseIf = Expect<
  IfElseIf<[[0, 1], [null, 2], [undefined, 3], ['', 4], [1, 6], 7]>,
  6
>

type TestIfElseIf2 = Expect<
  IfElseIf<[[0, 1], [null, 2], [undefined, 3], ['', 4], [never, 6], 7]>,
  7
>

type TestIfElseIfGroup = Group<[TestIfElseIf, TestIfElseIf2]>

type TestSwitch = Expect<
  Switch<1, [[0, string], [1, boolean], [2, number], null]>,
  boolean
>

type TestSwitch2 = Expect<
  Switch<undefined, [[0, string], [1, boolean], [2, number], null]>,
  null
>

type TestSwitchGroup = Group<[TestSwitch, TestSwitch2]>
type TestAnd = Expect<And<[1, 2, false]>, false>
type TestOr = Expect<Or<[1, 0, false]>, true>
type TestNot = Expect<Not<false>, true>
type TestIsEquals = Expect<IsEquals<{ a: 1 }, { a: 1 } | { b: 2 }>, false>
type TestIsExtends = Expect<IsExtends<{ a: 1 }, { a: 1 } | { b: 2 }>, true>

export type Result = Test<
  [
    TestIf,
    TestIfExtends,
    TestIfElseIfGroup,
    TestSwitchGroup,
    TestAnd,
    TestOr,
    TestNot,
    TestIsEquals,
    TestIsExtends
  ]
>

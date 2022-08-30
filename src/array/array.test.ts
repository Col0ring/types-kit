import { Expect, Group, Test } from '../test-utils'
import { Fill } from './fill'
import { Filter } from './filter'
import { Flat } from './flat'
import { Includes } from './includes'
import { Reverse } from './reverse'
import { Slice } from './slice'

type TestFill = Expect<Fill<3, number>, [number, number, number]>
type TestFilter = Expect<Filter<[1, 1, string], number>, [1, 1]>
type TestFilter2 = Expect<Filter<[1, 1, string], number, false>, [string]>
type TestFilter3 = Expect<
  Filter<readonly [1, 1, string, number], number, false, 'equal'>,
  readonly [1, 1, string]
>

type TestFilterGroup = Group<[TestFilter, TestFilter2, TestFilter3]>

type TestFlat = Expect<
  Flat<readonly [1, [[2, [3, [4]]]]]>,
  readonly [1, 2, 3, 4]
>

type TestIncludes = Expect<Includes<[1, string, boolean], number>, true>
type TestIncludes2 = Expect<
  Includes<[1, string, boolean], number, 'equal'>,
  false
>
type TestIncludesGroup = Group<[TestIncludes, TestIncludes2]>

type TestReverse = Expect<Reverse<[1, 2, 3]>, [3, 2, 1]>

type TestSlice = Expect<Slice<[0, 1, 2, 3], 0, 2>, [0, 1]>
type TestSlice2 = Expect<Slice<[0, 1, 2, 3], 2, -1>, [2]>
type TestSliceGroup = Group<[TestSlice, TestSlice2]>

export type Result = Test<
  [
    TestFill,
    TestFilterGroup,
    TestFlat,
    TestIncludesGroup,
    TestReverse,
    TestSliceGroup
  ]
>

import { Expect, Group, Test } from '../test-utils'

import {
  IsAny,
  IsFalsy,
  IsNever,
  IsObject,
  IsPrimitive,
  IsTruthy,
  IsUnknown,
} from './value'

type TestIsPrimitive = Expect<IsPrimitive<1>, true>
type TestIsPrimitive2 = Expect<IsPrimitive<{}>, false>
type TestIsPrimitiveGroup = Group<[TestIsPrimitive, TestIsPrimitive2]>

type TestIsAny = Expect<IsAny<any>, true>
type TestIsAny2 = Expect<IsAny<never>, false>
type TestIsAnyGroup = Group<[TestIsAny, TestIsAny2]>

type TestIsUnknown = Expect<IsUnknown<unknown>, true>
type TestIsUnknown2 = Expect<IsUnknown<any>, false>
type TestIsUnknownGroup = Group<[TestIsUnknown, TestIsUnknown2]>

type TestIsNever = Expect<IsNever<never>, true>
type TestIsNever2 = Expect<IsNever<true>, false>
type TestIsNeverGroup = Group<[TestIsNever, TestIsNever2]>

type TestIsFalsy = Expect<IsFalsy<0>, true>
type TestIsFalsy2 = Expect<IsFalsy<1>, false>
type TestIsFalsyGroup = Group<[TestIsFalsy, TestIsFalsy2]>

type TestIsObject = Expect<IsObject<{}>, true>
type TestIsObject2 = Expect<IsObject<never>, false>
type TestIsObjectGroup = Group<[TestIsObject, TestIsObject2]>

type TestIsTruthy = Expect<IsTruthy<1>, true>
type TestIsTruthy2 = Expect<IsTruthy<0>, false>
type TestIsTruthyGroup = Group<[TestIsTruthy, TestIsTruthy2]>

export type Result = Test<
  [
    TestIsPrimitiveGroup,
    TestIsAnyGroup,
    TestIsUnknownGroup,
    TestIsNeverGroup,
    TestIsFalsyGroup,
    TestIsObjectGroup,
    TestIsTruthyGroup,
  ]
>

import { Mutable, MutablePick, MutableDeep } from './mutable'
import { Expect, Test } from '../test-util'

type TestMutable = Expect<
  Mutable<{
    readonly a: 1
    readonly b: 2
    readonly c: 3
  }>,
  {
    a: 1
    b: 2
    c: 3
  }
>

type TestMutablePick = Expect<
  MutablePick<
    {
      readonly a: number
      readonly b: number
      readonly c: number
    },
    'a' | 'b'
  >,
  {
    a: number
    b: number
    readonly c: number
  }
>

type TestMutableDeep = Expect<
  MutableDeep<{
    readonly a: {
      readonly d: number
    }
    readonly b: number
    readonly c: number
  }>,
  {
    a: {
      d: number
    }
    b: number
    c: number
  }
>

export type Result = Test<[TestMutable, TestMutablePick, TestMutableDeep]>

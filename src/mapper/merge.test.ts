import { Expect, Test } from '../test-utils'
import { MergeTuple, Merge, MergeExclusive } from './merge'

type TestMergeTuple = Expect<
  MergeTuple<[1, 2, 3], readonly [4, 5]>,
  readonly [4, 5, 3]
>

type TestMerge = Expect<
  Merge<
    {
      a: 1
      b: 2
    },
    {
      b?: 3
    }
  >,
  {
    a: 1
    b?: 3
  }
>

type TestMergeExclusive = Expect<
  MergeExclusive<
    {
      a: number
      b: boolean
    },
    {
      c: string
    }
  >,
  // no simplify
  | ({
      a?: never
      b?: never
    } & {
      c: string
    })
  | ({
      a: number
      b: boolean
    } & {
      c?: never
    })
>

export type Result = Test<[TestMergeTuple, TestMerge, TestMergeExclusive]>

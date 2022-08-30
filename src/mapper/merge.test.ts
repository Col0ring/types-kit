import { Expect, Group, Test } from '../test-utils'
import {
  DeepMerge,
  DeepMergeTuple,
  Merge,
  MergeExclusive,
  MergeTuple,
} from './merge'

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

type TestDeepMergeTuple = Expect<
  DeepMergeTuple<
    [
      {
        a: {
          readonly b: {
            c: 2
            d: 1
          }
        }
      },
      2
    ],
    [
      {
        a?: {
          readonly b: {
            d: 4
          }
          e: 3
        }
      },
      1,
      3
    ]
  >,
  [
    {
      a?: {
        readonly b: {
          c: 2
          d: 4
        }
        e: 3
      }
    },
    1,
    3
  ]
>

type TestDeepMerge = Expect<
  DeepMerge<
    {
      a: {
        readonly b: {
          c: 2
          d: 1
        }
      }
    },
    {
      a?:
        | {
            b: {
              readonly d: 3
            }
          }
        | number
    }
  >,
  {
    a?:
      | {
          b: {
            c: 2
            readonly d: 3
          }
        }
      | number
  }
>

type TestDeepMerge2 = Expect<
  DeepMerge<[{ a: 1 }, 2, 3], [{ b: 2 }, 5]>,
  [{ a: 1; b: 2 }, 5, 3]
>

type TestDeppMergeGroup = Group<[TestDeepMerge, TestDeepMerge2]>

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

export type Result = Test<
  [
    TestMergeTuple,
    TestMerge,
    TestMergeExclusive,
    TestDeepMergeTuple,
    TestDeppMergeGroup
  ]
>

import { StrictOmit } from './strict-omit'
import { Simplify } from './simplify'
import { Keys } from './value'
import { If, Or } from '../control-flow'
import { IsReadonlyArray } from '../basic'

/**
 * @description Merge two types into a new type. Keys of the second type will override keys of the first type.
 * @example
 * ```ts
    interface Foo {
        a: number;
        b: string;
    };
    interface Bar {
        b: number;
    };
    // Expect: { a: number, b: number }
    type newProps = Merge<Foo, Bar>
    ```
 */
export type Merge<A, B> = A extends readonly any[]
  ? B extends readonly any[]
    ? MergeArray<A, B>
    : Simplify<
        StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
          [P in keyof B as P extends Keys<B> ? P : never]: B[P]
        }
      >
  : Simplify<
      StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
        [P in keyof B as P extends Keys<B> ? P : never]: B[P]
      }
    >

/**
 * @description Merge two arrays, values of the second array will override values of the array type.
 * @example
 * ```ts
    type Foo = [1, 2, 3]
    type Bar = [4, 5]
    // Expect: [4, 5, 3]
    type MergedArr = MergeArray<Foo, Bar>
    ```
 */
export type MergeArray<A extends readonly any[], B extends readonly any[]> = If<
  IsReadonlyArray<B>,
  readonly [...B, ...Slice<A, B['length']>],
  [...B, ...Slice<A, B['length']>]
>

type Slice<
  Arr extends readonly any[],
  Start extends number = 0,
  End extends number = Arr['length']
> = Iterate<Start, End, [], Arr, [], false>

// Head is the already-processed items
// Tail is the yet-to-be-processed items
// Result is the result so-far
// InRange is whether we are currently past the start of the range
type Iterate<
  Start extends number,
  End extends number,
  Head extends readonly any[],
  Tail extends readonly any[],
  Result extends readonly any[],
  InRange extends boolean
> = Tail extends [infer X, ...infer XS]
  ? If<
      // if end is out of range
      IndexMatches<Head, Tail, End>,
      Result,
      If<
        // if start is out of range
        Or<[InRange, IndexMatches<Head, Tail, Start>]>,
        Iterate<Start, End, [...Head, X], XS, [...Result, X], true>,
        Iterate<Start, End, [...Head, X], XS, Result, false>
      >
    >
  : Result

// if Index is out of range
type IndexMatches<
  Head extends readonly any[],
  Tail extends readonly any[],
  Index extends number
> = Head['length'] extends Index
  ? true
  : `-${Tail['length']}` extends `${Index}`
  ? true
  : false

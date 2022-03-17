import { StrictOmit } from './omit'
import { Simplify } from './simplify'
import { Keys } from './key'
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
export type Merge<A, B> = A extends readonly unknown[]
  ? B extends readonly unknown[]
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
export type MergeArray<
  A extends readonly unknown[],
  B extends readonly unknown[]
> = If<
  IsReadonlyArray<B>,
  readonly [...B, ...Slice<A, B['length']>],
  [...B, ...Slice<A, B['length']>]
>

type Slice<
  Arr extends readonly unknown[],
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
  Head extends readonly unknown[],
  Tail extends readonly unknown[],
  Result extends readonly unknown[],
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
  Head extends readonly unknown[],
  Tail extends readonly unknown[],
  Index extends number
> = Head['length'] extends Index
  ? true
  : `-${Tail['length']}` extends `${Index}`
  ? true
  : false

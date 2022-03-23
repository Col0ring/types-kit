import { StrictOmit } from './omit'
import { Simplify } from './pick'
import { Keys } from './key'
import { And, If } from '../control-flow'
import { IsObject, IsReadonlyArray } from '../basic'
import { Slice } from '../array'

/**
 * Merge two tuples, values of the second array will override values of the array type.
 * @example
 * ```ts
    type Foo = [1, 2, 3]
    type Bar = [4, 5]
    // Expect: [4, 5, 3]
    type MergedTuple = MergeTuple<Foo, Bar>
    ```
 */
export type MergeTuple<
  A extends readonly unknown[],
  B extends readonly unknown[]
> = If<
  IsReadonlyArray<B>,
  readonly [...B, ...Slice<A, B['length']>],
  [...B, ...Slice<A, B['length']>]
>
/**
 * Merge two types into a new type. Keys of the second type will override keys of the first type.
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
    type NewProps = Merge<Foo, Bar>
    ```
 */
export type Merge<A, B> = A extends readonly unknown[]
  ? B extends readonly unknown[]
    ? MergeTuple<A, B>
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

type InternalDeepMergeTupleValue<
  A extends readonly unknown[],
  B extends readonly unknown[],
  Result extends readonly unknown[] = []
> = B extends [B[0], ...infer RestB]
  ? A extends [A[0], ...infer RestA]
    ? B[0] extends infer V
      ? V extends V
        ? InternalDeepMergeTupleValue<
            RestA,
            RestB,
            [
              ...Result,
              If<And<[IsObject<V>, IsObject<A[0]>]>, DeepMerge<A[0], V>, V>
            ]
          >
        : never
      : never
    : [...Result, ...B]
  : Result

/**
 * Merge two tuples, values of the second array will assign values of the array type.
 * @example
 * ```ts
    type Foo = [{ a: 1 }, 2, 3]
    type Bar = [{ b: 2 }, 5]
    // Expect: [{ a: 1, b: 2 }, 5, 3]
    type MergedTuple = DeepMergeTuple<Foo, Bar>
    ```
 */
export type DeepMergeTuple<
  A extends readonly unknown[],
  B extends readonly unknown[]
> = If<
  IsReadonlyArray<B>,
  readonly [...InternalDeepMergeTupleValue<A, B>, ...Slice<A, B['length']>],
  [...InternalDeepMergeTupleValue<A, B>, ...Slice<A, B['length']>]
>

/**
 * Merge two types into a new type. Keys of the second type will assign keys of the first type.
 * @example
 * ```ts
    interface Foo {
        a: {
          c: number
          d: boolean
        };
        b: string;
    };
    interface Bar {
        a: {
          d: string
        };
    };
    // Expect: { a: { c: number, d: string }, b: string }
    type NewProps = DeepMerge<Foo, Bar>
    ```
 */
export type DeepMerge<A, B> = A extends readonly unknown[]
  ? B extends readonly unknown[]
    ? DeepMergeTuple<A, B>
    : Simplify<
        StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
          [P in keyof B as P extends Keys<B> ? P : never]: P extends Keys<A>
            ? B[P] extends infer V
              ? V extends V
                ? If<And<[IsObject<V>, IsObject<A[P]>]>, DeepMerge<A[P], V>, V>
                : never
              : never
            : B[P]
        }
      >
  : Simplify<
      StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
        [P in keyof B as P extends Keys<B> ? P : never]: P extends Keys<A>
          ? B[P] extends infer V
            ? V extends V
              ? If<And<[IsObject<V>, IsObject<A[P]>]>, DeepMerge<A[P], V>, V>
              : never
            : never
          : B[P]
      }
    >

type Without<T, U> = {
  [K in Exclude<Keys<T>, Keys<U>>]?: never
}

/**
 * Create a type that has mutually exclusive keys.
 * @example
 * ```ts
    interface Props {
      a: number
    }
    interface Props2 {
      b: string
    }
    let foo: MergeExclusive<Props, Props2>;
    foo = { a: 1 } // Works
    foo = { b: 'foo' } // Works
    foo = { a: 1, b: 'foo'} // Error
 * ```
 */
export type MergeExclusive<T, U> = IsObject<T | U> extends true
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

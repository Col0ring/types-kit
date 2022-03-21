import { StrictOmit } from './omit'
import { Simplify } from './pick'
import { Keys } from './key'
import { If } from '../control-flow'
import { IsObject, IsReadonlyArray } from '../basic'
import { Slice } from '../array'

/**
 * @description Merge two arrays, values of the second array will override values of the array type.
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

type Without<T, U> = {
  [K in Exclude<Keys<T>, Keys<U>>]?: never
}

/**
 * @description Create a type that has mutually exclusive keys.
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

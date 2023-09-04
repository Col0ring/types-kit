import { IsObject } from '../basic'

import { DeepKeys, Keys } from './key'

/**
 *
 * Get values of T.
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: string
 *    c: boolean
 *  }
 *
 *  // Expect: number | string | boolean | undefined
 *  type PropValues = ValueOf<Props>
 * ```
 */
export type ValueOf<T> = T[Keys<T>]

/**
 *
 * Get deep values of T.
 * @example
 * ```ts
 *  interface Props {
      a?: {
        d: () => void
      }
      b: string
      c: boolean
    }
 *
 *  // Expect: { d: () => void } | (() => void) | string | boolean | undefined
 *  type PropValues = DeepValueOf<Props>
 * ```
 */
export type DeepValueOf<T> = {
  [K in Keys<T>]: T[K] extends infer V
    ? V extends V
      ? IsObject<V> extends true
        ? T[K] | DeepValueOf<T[K]>
        : T[K]
      : never
    : never
}[Keys<T>]

/**
 *
 * Get the specified value from T.
 * @example
 * ```ts
 *  interface Props {
      a?: number
      b: string
      c: boolean
    }
 *
 *  // Expect: number | string | undefined
 *  type PropValues = Get<Props, 'a' | 'b'>
 * ```
 */
export type Get<T, K extends Keys<T>> = T[K]

type InternalTupleGet<
  T,
  K extends readonly unknown[],
  R extends readonly unknown[] = [],
> = K extends readonly [infer Item, ...infer Rest]
  ? InternalTupleGet<
      T,
      Rest,
      [...R, Item extends Keys<T> ? Get<T, Item> : unknown]
    >
  : R
/**
 *
 * Get the specified value by tuple from T.
 * @example
 * ```ts
 *  interface Props {
 *    a: {
 *      d: () => void
 *    }
 *    b: string
 *    c: boolean
 * }
 *
 *  // Expect: [{ d: () => void }, string]
 *  type PropValues = TupleGet<Props, ['a', 'b']>
 * ```
 */
export type TupleGet<T, K extends readonly Keys<T>[]> = InternalTupleGet<T, K>
/**
 *
 * Get the deep specified value from T.
 * @example
 * ```ts
 *  interface Props {
 *    a: {
 *      d: () => void
 *    }
 *    b: string
 *    c: boolean
 * }
 *
 *  // Expect: (()=> void) | number | string
 *  type PropValues = DeepGet<Props, 'a.d' | 'b'>
 * ```
 */
export type DeepGet<
  T,
  K extends DeepKeys<T>,
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends Keys<T>
    ? T[Head] extends infer V
      ? V extends V
        ? IsObject<V> extends true
          ? Tail extends DeepKeys<V>
            ? DeepGet<V, Tail>
            : never
          : // if the value of the parent property is not an object, like a?.b, then the value of b will be undefined
            undefined
        : never
      : never
    : never
  : K extends keyof T
  ? T[K]
  : never

type InternalDeepTupleGet<
  T,
  K extends readonly unknown[],
  R extends readonly unknown[] = [],
> = K extends readonly [infer Item, ...infer Rest]
  ? InternalDeepTupleGet<
      T,
      Rest,
      [...R, Item extends DeepKeys<T> ? DeepGet<T, Item> : unknown]
    >
  : R
/**
 *
 * Get the deep specified value by tuple from T.
 * @example
 * ```ts
 *  interface Props {
 *    a: {
 *      d: () => void
 *    }
 *    b: string
 *    c: boolean
 * }
 *
 *  // Expect: [()=> void, string]
 *  type PropValues = DeepTupleGet<Props, ['a.d', 'b']>
 * ```
 */
export type DeepTupleGet<
  T,
  K extends readonly DeepKeys<T>[],
> = InternalDeepTupleGet<T, K>

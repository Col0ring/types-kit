import { IsObject } from '../basic'

/**
 * @description Get keys of tuple T
 * @example
 * ```ts
 * // Expect: 0 | 1 | '0' | '1'
 * type Keys = TupleKeys<[3, 4]>
 * ```
 */
export type TupleKeys<T extends readonly unknown[]> = T extends readonly [
  any,
  ...infer Tail
]
  ? TupleKeys<Tail> | Tail['length'] | `${Tail['length']}`
  : never

/**
 *
 * @description Get keys of T
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: number
 *    c: number
 *  }
 *
 *  // Expect: 'a' | 'b' | 'c'
 *  type PropKeys = Keys<Props>
 * ```
 */
export type Keys<T> = T extends readonly unknown[]
  ? // unknown[] extends readonly unknown[], but readonly unknown[] not extends unknown[]
    TupleKeys<T> extends infer K
    ? K extends keyof T
      ? K
      : never
    : never
  : keyof T

type PathKey = string | number

type InternalDeepKeys<T, P extends string = ''> = keyof {
  [K in Keys<T> as K extends PathKey
    ? P extends ''
      ? T[K] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? // we will get values like 0 and '0', but only need to recurse once
              K | (K extends number ? never : InternalDeepKeys<V, `${K}`>)
            : K
          : never
        : never
      : T[K] extends infer V
      ? V extends V
        ? IsObject<V> extends true
          ?
              | `${P}.${K}`
              | (K extends number ? never : InternalDeepKeys<V, `${P}.${K}`>)
          : `${P}.${K}`
        : never
      : never
    : never]: never
}

/**
 *
 * @description Get deep keys of T
 * @example
 * ```ts
 *  interface Props {
      a?: {
        readonly b?: number
        c: {
          d?: number
        }
      }
      e: number
    }
 *
 *  // Expect: 'a' | 'a.b' | 'a.c' | 'a.c.d' | 'e'
 *  type PropKeys = DeepKeys<Props>
 * ```
 */
export type DeepKeys<T> = InternalDeepKeys<T>

/**
 * @description Get keys by Condition (value)
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: string
 *    c: boolean
 *  }
 *
 *  // Expect: 'b' | 'c'
 *  type PropKeys = ConditionalKeys<Props, string | boolean>
 *  // Set exact true, expect: 'c'
 *  type PropKeys2 = ConditionalKeys<Props, string | boolean, true>
 * ```
 */
export type ConditionalKeys<T, Condition, Exact extends boolean = false> = {
  [K in Keys<T>]: Exact extends true
    ? T[K] extends Condition
      ? K
      : never
    : T[K] extends infer V
    ? V extends Condition
      ? K
      : never
    : never
}[Keys<T>]

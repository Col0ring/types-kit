import { IsNever, IsObject } from '../basic'
import { OtherToString } from '../convert'
import { StrictExclude } from '../union'
import { ConditionalKeys, DeepKeys, Keys } from './key'

/**
 *
 * Strict version of Omit.
 * @example
 * ```ts
 * interface Props = { a: 1, b: 2, c: 3 }
 * // Expect: { b: 2, c: 3  }
 * type PropValue = StrictOmit<Props, 'a'>
 * ```
 */
export type StrictOmit<T, K extends Keys<T>> = {
  [P in keyof T as P extends StrictExclude<
    Keys<T>,
    OtherToString<K> extends infer V
      ? [V] extends [Keys<T>]
        ? V
        : never
      : never
  >
    ? P
    : never]: T[P]
}

/**
 *
 * Remove the deep value path from T.
 * @example
 * ```ts
 *  interface Props {
      a?: {
        c: boolean
        d: () => void
        e: number
      }
      b: string
    }
 *
 *  // Expect: { a?: { e: number }, b: string }
 *  type PropValues = DeepOmit<Props, 'a.c' | 'a.d'>
 * ```
 */
export type DeepOmit<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? {
      [P in keyof T]: [Exclude<K, Keys<T>>] extends [
        `${infer Head}.${infer Tail}`
      ]
        ? P extends Head
          ? T[P] extends infer V
            ? V extends V
              ? IsObject<V> extends true
                ? DeepOmit<
                    V,
                    Extract<
                      Tail extends Tail
                        ? `${P}.${Tail}` extends K
                          ? Tail
                          : never
                        : never,
                      DeepKeys<V>
                    >
                  >
                : V
              : never
            : never
          : T[P]
        : never
    }
  : {
      [P in keyof T as P extends OtherToString<K>
        ? never
        : P extends Keys<T>
        ? P
        : never]: [Exclude<K, Keys<T>>] extends [`${infer Head}.${infer Tail}`]
        ? P extends Head
          ? T[P] extends infer V
            ? V extends V
              ? IsObject<V> extends true
                ? DeepOmit<
                    V,
                    Extract<
                      Tail extends Tail
                        ? `${P}.${Tail}` extends K
                          ? Tail
                          : never
                        : never,
                      DeepKeys<V>
                    >
                  >
                : V
              : never
            : never
          : T[P]
        : never
    }

/**
 * Omit by Condition (value).
 * @example
 * ```ts
 *  interface Props {
      a?: number
      b: string
      c: boolean
    }
 *
 *  // Expect: { b: string }
 *  type NewProps = ConditionalPick<Props, number | boolean>
*   // Set exact true, expect: { a?: number, b: string }
 *  type NewProps2 = ConditionalPick<Props, number | boolean, true>
 * ```
 */
export type ConditionalOmit<
  T,
  Condition,
  Exact extends boolean = false
> = StrictOmit<T, ConditionalKeys<T, Condition, Exact>>

/**
 * Create a type that only has explicitly defined properties, absent of any index signatures.
 * @example
 * ```ts
 *  interface Props {
      a?: number
      readonly b: number
      c: number
      [x: number]: number
      [x: string]: number | undefined
      [x: symbol]: number
    }
    // Expect: { a?: number, readonly b: number, c: number }
    type NewProps = RemoveIndexSignature<Props>
 * ```
 */
export type RemoveIndexSignature<T> = {
  [K in keyof T as K extends Keys<T>
    ? {} extends Record<K, never>
      ? never
      : K
    : never]: T[K]
}

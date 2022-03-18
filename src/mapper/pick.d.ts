import { IsObject } from '../basic'
import { OtherToString } from '../convert'
import { ConditionalKeys, DeepKeys, Keys } from './key'

/**
 *
 * @description Get the deep value path from T
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
 *  // Expect: { a?: { c: boolean; d: () => void } }
 *  type PropValues = DeepPick<Props, 'a.c' | 'a.d'>
 * ```
 */
export type DeepPick<T, K extends DeepKeys<T>> = {
  [P in keyof T as P extends OtherToString<K>
    ? P
    : K extends `${infer Head}.${string}`
    ? P extends Head
      ? P
      : never
    : never]: P extends OtherToString<K> // merge
    ? T[P]
    : [Exclude<K, Keys<T>>] extends [`${infer Head}.${infer Tail}`]
    ? P extends Head
      ? T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? DeepPick<
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
      : never
    : never
}

/* 
      // the second way, but the editor prompt is worse
      type DeepPick<T, K extends DeepKeys<T>> = UnionToIntersection<
        K extends `${infer Head}.${infer Tail}`
          ? Head extends keyof T
            ? {
                [P in keyof T as P extends Head ? P : never]: T[P] extends infer V
                  ?  V extends V ? IsObject<V> extends true
                    ? DeepPick<V, Extract<Tail, DeepKeys<V>>>
                    : V
                  : never
                :never
              }
            : never
          : {
              [P in keyof T as P extends K ? P : never]: T[P]
            }
      >
*/

/**
 * @description Pick by Condition (value)
 * @example
 * ```ts
 *  interface Props {
      a?: number
      b: string
      c: boolean
    }
 *
 *  // Expect: { a?: number, c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 *  // Set exact true, expect: { c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 * ```
 */
export type ConditionalPick<T, Condition, Exact extends boolean = false> = Pick<
  T,
  ConditionalKeys<T, Condition, Exact>
>

/**
 * @description Create a type that only has explicitly defined properties, absent of any index signatures.
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

// export type RemoveIndexSignature<T> = {
//   [K in keyof T as K extends Keys<T>
//     ? string extends K
//       ? never
//       : number extends K
//       ? never
//       : symbol extends K
//       ? never
//       : K
//     : never]: T[K]
// }

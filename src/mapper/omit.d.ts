import { OtherToString } from '../convert'
import { StrictExclude } from '../union'
import { ConditionalKeys, Keys } from './key'

/**
 *
 * @description Strict version of Omit
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
 * @description Omit by Condition (value)
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
 *  type NewProps = ConditionalPick<Props, number | boolean, true>
 * ```
 */
export type ConditionalOmit<
  T,
  Condition,
  Exact extends boolean = false
> = StrictOmit<T, ConditionalKeys<T, Condition, Exact>>

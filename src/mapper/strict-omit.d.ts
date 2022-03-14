import { StrictExclude } from '../union'
import { Keys } from './value'

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
  [P in keyof T as P extends StrictExclude<Keys<T>, K> ? P : never]: T[P]
}

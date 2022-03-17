import { Keys } from './key'
import { OptionalKeys } from './optional'

/**
 * @description Get required property keys of T
 * @example
 * ```ts
 * interface Props {
    a?: number
    readonly b: number
    c?: number
  }

  // Expect: 'b'
  type PropKeys = OptionalKeys<Props>
 * ```
 */
export type RequiredKeys<T> = Exclude<Keys<T>, OptionalKeys<T>>

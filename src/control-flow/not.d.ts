import { IsFalsy } from '../basic'
import { If } from './if'

/**
 * @description Not operator for types.
 * @example
 * ```ts
 *  // Expect: false
 *  type Foo = Not<true>
 *  // Expect: true
 *  type Bar = Not<false>
 * ```
 */
export type Not<T> = If<IsFalsy<T>, true, false>

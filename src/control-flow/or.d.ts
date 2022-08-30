import { ArrayItem, IsTruthy, IsTuple } from '../basic'
import { If } from './if'

/**
 * Or operator for types.
 * @example
 * ```ts
 *  // Expect: true
 *  type Foo = Or<[1, 2, false]>
 *  // Expect: false
 *  type Bar = Or<[null, undefined, 0]>
 * ```
 */
// notice: distributed condition type
export type Or<A extends readonly unknown[]> = If<
  IsTuple<A>,
  A extends readonly [infer Current, ...infer Rest]
    ? If<Current, true, Or<Rest>>
    : A extends [...infer Rest, infer Current]
    ? If<Current, true, Or<Rest>>
    : never,
  IsTruthy<ArrayItem<A>>
>

import { ArrayItem, IsEmptyTypeArray, IsTruthy, IsTuple } from '../basic'

import { If } from './if'
import { Or } from './or'

/**
 * And operator for types.
 * @example
 * ```ts
 *  // Expect: false
 *  type Foo = And<[1, 2, false]>
 *  // Expect: true
 *  type Bar = And<[true, 1, 'str']>
 * ```
 */
// notice: distributed condition type
export type And<A extends readonly unknown[]> = If<
  IsTuple<A>,
  A extends readonly [infer Current, ...infer Rest]
    ? If<
        Current,
        If<
          IsTuple<Rest>,
          And<Rest>,
          Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
        >,
        false
      >
    : A extends readonly [...infer Rest, infer Current]
    ? If<
        Current,
        If<
          IsTuple<Rest>,
          And<Rest>,
          Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
        >,
        false
      >
    : never,
  IsTruthy<ArrayItem<A>>
>

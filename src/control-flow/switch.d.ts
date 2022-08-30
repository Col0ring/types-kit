import { IsEmptyTypeArray, IsTuple } from '../basic'
import { EqualTag, ExtendsTag } from '../utils'
import { If, IfExtends } from './if'
import { IsEquals, IsExtends } from './operator'

/**
 * Switch for types.
 * @example
 * ```ts
 *  // Expect: boolean
 *  type Foo = Switch<1, [[0, string], [1, boolean], [2, number], null]>
 *  // Expect: null
 *  type Bar = Switch<undefined, [[0, string], [1, boolean], [2, number], null]>
 * ```
 */
// notice: distributed condition type
export type Switch<
  T,
  A extends readonly // if/else if/else
  [...Cases: [Case: unknown, Result: unknown][], DefaultResult: unknown],
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = A extends readonly [...infer CaseExpressions, infer DefaultResult]
  ? If<
      IsTuple<CaseExpressions>,
      CaseExpressions extends [
        [infer CurrentCase, infer CurrentResult],
        ...infer OtherCases
      ]
        ? IfExtends<
            [Type, EqualTag],
            If<
              IsEquals<T, CurrentCase>,
              CurrentResult,
              OtherCases extends [Case: unknown, Result: unknown][]
                ? Switch<T, [...OtherCases, DefaultResult]>
                : DefaultResult
            >,
            If<
              IsExtends<T, CurrentCase>,
              CurrentResult,
              OtherCases extends [Case: unknown, Result: unknown][]
                ? Switch<T, [...OtherCases, DefaultResult]>
                : DefaultResult
            >
          >
        : DefaultResult,
      // empty array or array
      CaseExpressions extends [infer Case, infer Result][]
        ? If<
            IsEmptyTypeArray<CaseExpressions>,
            DefaultResult,
            // will not filter empty arrays, it will return unknown
            IfExtends<
              [Type, EqualTag],
              If<IsEquals<T, Case>, Result, DefaultResult>,
              If<IsExtends<T, Case>, Result, DefaultResult>
            >
          >
        : DefaultResult
    >
  : never

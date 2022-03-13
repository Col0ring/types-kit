import {
  ArrayAndReadonlyArrayByPassArray,
  IsEmptyTypeArray,
  IsTuple
} from '../basic'
import { If, IfExtends } from './if'
import { IsExtends, IsEquals } from './operator'

export type EqualTag = 'equal'
export type ExtendsTag = 'extends'

// notice: distributed condition type
export type Switch<
  T,
  A extends ArrayAndReadonlyArrayByPassArray<
    // if/else if/else
    [...Cases: [Case: any, Result: any][], DefaultResult: any]
  >,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = A extends ArrayAndReadonlyArrayByPassArray<
  [...infer CaseExpressions, infer DefaultResult]
>
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
              OtherCases extends [Case: any, Result: any][]
                ? Switch<T, [...OtherCases, DefaultResult]>
                : DefaultResult
            >,
            If<
              IsExtends<T, CurrentCase>,
              CurrentResult,
              OtherCases extends [Case: any, Result: any][]
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

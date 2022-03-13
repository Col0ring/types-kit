import { ArrayAndReadonlyArrayByPassArray, IsTuple, IsTruthy } from '../basic'

export type IfExtends<Condition extends [any, any], Case1, Case2> = [
  Condition[0]
] extends [Condition[1]]
  ? Case1
  : Case2

export type If<Condition, Case1, Case2> = IfExtends<
  [IsTruthy<Condition>, true],
  Case1,
  Case2
>

// notice: distributed condition type
export type IfElseIf<
  A extends ArrayAndReadonlyArrayByPassArray<
    // if/else if/else
    [[Condition: any, Result: any], ...[Condition: any, Result: any][], any]
  >
> = A extends ArrayAndReadonlyArrayByPassArray<
  [infer IfExpression, ...infer ElseIfExpressions, infer ElseResult]
>
  ? IfExpression extends [infer IfCondition, infer IfResult]
    ? If<
        IfCondition,
        IfResult,
        If<
          IsTuple<ElseIfExpressions>,
          ElseIfExpressions extends [
            [infer ElseIfCondition, infer ElseIfResult],
            ...infer OtherElseIfExpressions
          ]
            ? OtherElseIfExpressions extends [Condition: any, Result: any][]
              ? IfElseIf<
                  [
                    [ElseIfCondition, ElseIfResult],
                    ...OtherElseIfExpressions,
                    ElseResult
                  ]
                >
              : If<ElseIfCondition, ElseIfResult, ElseResult>
            : ElseResult,
          // empty array or array
          ElseIfExpressions extends [
            infer ElseIfCondition,
            infer ElseIfResult
          ][]
            ? If<ElseIfCondition, ElseIfResult, ElseResult>
            : ElseResult
        >
      >
    : // feedback
      ElseResult
  : never

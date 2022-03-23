import { IsTuple, IsTruthy } from '../basic'

/**
 * If Condition[0] extends Condition[1], return Case1, else return Case2
 * @example
 * ```ts
 *  // Expect: 1
 *  type Foo = IfExtends<[true, boolean], 1, 2>
 * ```
 */
export type IfExtends<Condition extends [unknown, unknown], Case1, Case2> = [
  Condition[0]
] extends [Condition[1]]
  ? Case1
  : Case2

/**
 * If for types.
 * @example
 * ```ts
 *  // Expect: 1
 *  type Foo = If<true, 1, 2>
 * ```
 */
export type If<Condition, Case1, Case2> = IfExtends<
  [IsTruthy<Condition>, true],
  Case1,
  Case2
>

/**
 * If/Else if for types.
 * @example
 * ```ts
 *  // Expect: 6
 *  type Foo =  IfElseIf<[[0, 1], [null, 2], [1, 6], 7]>
 * ```
 */
// notice: distributed condition type
export type IfElseIf<
  A extends readonly // if/else if/else
  [
    [Condition: unknown, Result: unknown],
    ...[Condition: unknown, Result: unknown][],
    unknown
  ]
> = A extends readonly [
  infer IfExpression,
  ...infer ElseIfExpressions,
  infer ElseResult
]
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
            ? OtherElseIfExpressions extends [
                Condition: unknown,
                Result: unknown
              ][]
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

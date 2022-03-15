import { UnionToIntersection } from '../convert/union-to-intersection'

/**
 *
 * @description Get the last type in a union type (important!: the result is random when you are using tsc, the correct type can only be obtained through the editor environment)
 * @example
 * ```ts
 * // Expect: 2
 * type Foo = LastInUnion<1 | 2>
 * ````
 * if it is necessary to output one type from overload, TS selects the last signature ((x: 2) => 0) in the overload.
 */
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never

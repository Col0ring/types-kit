import { TupleKeys } from '../mapper'

import { UnionToTuple } from './union-to-tuple'

type GetSubTuple<
  L extends number,
  V,
  R extends readonly unknown[] = [],
> = R['length'] extends L ? [...R, V] : GetSubTuple<L, V, [...R, V]>

/**
 * Get all sub tuple array from the passing parameter.
 * @example
 * ```ts
 * // Expect: ['a' | 'b'] | ['a' | 'b', 'a' | 'b']
 * type Foo = UnionToSubTupleArray<'a' | 'b'>
 * ```
 */
export type UnionToSubTupleArray<T> = TupleKeys<UnionToTuple<T>> extends infer V
  ? V extends number
    ? GetSubTuple<V, T>
    : never
  : never

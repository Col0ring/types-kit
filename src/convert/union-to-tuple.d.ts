import { LastInUnion } from '../union'

/**
 *
 * Convert union type to a tuple.
 * @see https://github.com/type-challenges/type-challenges/issues/737
 * @example
 * ```ts
 * // Expect: ['3', '1', '2']
 * type Foo = UnionToTuple<'3' | '1' | '2'>
 * ```
 */
export type UnionToTuple<U> = [U] extends [never] // no type
  ? []
  : [...UnionToTuple<Exclude<U, LastInUnion<U>>>, LastInUnion<U>]

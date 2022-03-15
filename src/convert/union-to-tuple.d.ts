import { LastInUnion } from '../union'

/**
 * @see https://github.com/type-challenges/type-challenges/issues/737
 * @description Convert union type to a tuple
 * @example
 * ```ts
 * // Expect: ['3', '1', '2']
 * type Foo = UnionToTuple<'3' | '1' | '2'>
 * ```
 */
type UnionToTuple<U> = [U] extends [never] // no type
  ? []
  : [...UnionToTuple<Exclude<U, LastInUnion<U>>>, LastInUnion<U>]

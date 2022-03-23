import { StrictExclude } from './strict-exclude'

/**
 * Set difference of union and intersection of given union types A and B
 * @example
 * ```ts
 * // Expect: '2' | '3'
 * type Foo = Diff<'1' | '2', '1' | '3'>
 * ```
 */
export type Diff<A, B> = StrictExclude<A | B, A & B>

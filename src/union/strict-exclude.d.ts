/**
 *
 * Strict version of Exclude
 * @example
 * ```ts
 * type Foo = 'a' | 'b' | 'c'
 * // Expect: 'b' | 'c'
 * type Bar = StrictExclude<Foo, 'a'>
 * ```
 */
export type StrictExclude<T, U extends T> = Exclude<T, U>

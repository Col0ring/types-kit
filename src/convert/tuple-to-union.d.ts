/**
 * Convert a tuple to union type
 * @example
 * ```ts
 * // Expect: string | number
 * type Foo = TupleToUnion<[string, number]>
 * ```
 */
export type TupleToUnion<T> = T extends readonly unknown[] ? T[number] : never

/**
 * Stringify other types
 * @example
 * ```ts
 * // Expect: '1'
 * type Foo = OtherToString<1>
 * ```
 */
export type OtherToString<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  ? `${T}`
  : never

type InternalStringToNumber<
  S extends string,
  T extends readonly unknown[] = []
> = S extends `${number}`
  ? S extends `${T['length']}`
    ? T['length']
    : InternalStringToNumber<S, [...T, '']>
  : never

/**
 * Convert string (`${number}`) to number
 * @example
 * ```ts
 * // Expect: 1
 * type Foo = StringToNumber<'1'>
 * ```
 */
export type StringToNumber<S extends string> = InternalStringToNumber<S>

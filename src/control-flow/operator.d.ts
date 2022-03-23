/**
 * if A extends B (no distributed condition type), return true, else return false
 * @example
 * ```ts
 *  // Expect: true
 *  type Foo = IsExtends<1, number>
 * ```
 */
export type IsExtends<A, B> = [A] extends [B] ? true : false

/**
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 * if A equals B, return true, else return false
 * @example
 * ```ts
 *  // Expect: false
 *  type Foo = IsEquals<1, number>
 *  // Expect: true
 *  type Bar = IsEquals<1, 1>
 *  // notice: The intersection type could not be matched
 *  // IsEquals<{a: 1} & { b: 2 }, { a:1, b: 2 }> // false
 *  // IsEquals<Simplify<{a: 1} & { b: 2 }>, { a:1, b: 2 }> // true
 * ```
 */
export type IsEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

/**
 * Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.
 * @see https://github.com/Microsoft/TypeScript/issues/29729
 * @example
 * ```ts
 * type Foo = LiteralUnion<'dog' | 'cat', string>
 * const foo:Foo = '' // You will get auto-completion for `dog` and `cat` literals.
 * ```
 */
export type LiteralUnion<T extends U, U> = T | (U & {})

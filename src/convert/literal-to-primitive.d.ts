
/**
 *
 *
 * Given a literal type return the Primitive it belongs to, or never if it's not a primitive.
 * eg: Working with generic types that may be literal types.
 * @example
 * ```ts
 *
 * function foo<T>(v: T): T {
 *  return v
 * }
 * function bar<T>(v: T): LiteralToPrimitive<T> {
 *  return v
 * }
 *
 * foo(1) // 1
 * foo('foo') // 'foo'
 * bar(1) // number
 * bar('foo') // string
 * ```
 */
export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
	? bigint
	: T extends string
	? string
	: T extends boolean
	? boolean
	: T extends symbol
	? symbol
	: T extends null
	? null
	: T extends undefined
	? undefined
	: never;

/**
 * Convert union type to Intersection type
 * @example
 * ```ts
 * // Expect: { a: number } & { b: number }
 * type Props = UnionToIntersection<{ a: number } | { b: number }>
 * ```
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

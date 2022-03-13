/**
 *
 * @description Flatten the type output to improve type hints shown in editors
 * @example
 * ```ts
 * type Props = { a: 1, b: 2, c: 3 } & { d: 4 }
 * // Except: { a: 1, b: 2, c: 3, d: 4 }
 * type SimplifiedProps = Simplify<Props>
 * ```
 */
export type Simplify<T> = {
  [K in keyof T]: T[K]
}

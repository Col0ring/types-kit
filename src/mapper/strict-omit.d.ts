/**
 *
 * @description Strict version of Omit
 * @example
 * ```ts
 * interface Props = { a: 1, b: 2, c: 3 }
 * // Except: { b: 2, c: 3  }
 * type PropValue = StrictOmit<Props, 'a'>
 * ```
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

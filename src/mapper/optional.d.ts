import { Keys } from './key'

/**
 * @description Get optional property keys of T
 * @example
 * ```ts
 * interface Props {
    a?: number
    readonly b: number
    c?: number
  }

  // Expect: 
  type PropKeys = OptionalKeys<Props>
 * ```
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[Keys<T>]

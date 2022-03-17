import { IsObject } from '../basic'
import { OtherToString } from '../convert'

/**
 * TupleKeys<[3, 4]> = 0 | 1.
 */
export type TupleKeys<T extends readonly unknown[]> = T extends readonly [
  any,
  ...infer Tail
]
  ? TupleKeys<Tail> | Tail['length'] | `${Tail['length']}`
  : never

/**
 *
 * @description Get keys of T
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: number
 *    c: number
 *  }
 *
 *  // Expect: 'a' | 'b' | 'c'
 *  type PropKeys = Keys<Props>
 * ```
 */
export type Keys<T> = T extends readonly unknown[]
  ? // unknown[] extends readonly unknown[], but readonly unknown[] not extends unknown[]
    TupleKeys<T> extends infer K
    ? K extends keyof T
      ? K
      : never
    : never
  : keyof T

type PathKey = string | number

type InternalDeepKeys<T, P extends string = ''> = keyof {
  [K in Keys<T> as K extends PathKey
    ? P extends ''
      ? T[K] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? // we will get values like 0 and '0', but only need to recurse once
              K | (K extends number ? never : InternalDeepKeys<V, `${K}`>)
            : K
          : never
        : never
      : T[K] extends infer V
      ? V extends V
        ? IsObject<V> extends true
          ?
              | `${P}.${K}`
              | (K extends number ? never : InternalDeepKeys<V, `${P}.${K}`>)
          : `${P}.${K}`
        : never
      : never
    : never]: never
}

/**
 *
 * @description Get deep keys of T
 * @example
 * ```ts
 *  interface Props {
      a?: {
        readonly b?: number
        c: {
          d?: number
        }
      }
      e: number
    }
 *
 *  // Expect: 'a' | 'a.b' | 'a.c' | 'a.c.d' | 'e'
 *  type PropKeys = DeepKeys<Props>
 * ```
 */
export type DeepKeys<T> = InternalDeepKeys<T>

/**
 *
 * @description Get values of T
 * @example
 * ```ts
 *  interface Props {
 *    a?: number
 *    b: string
 *    c: boolean
 *  }
 *
 *  // Expect: number | string | boolean | undefined
 *  type PropValues = Values<Props>
 * ```
 */
export type Values<T> = T[Keys<T>]

/**
 *
 * @description Get deep values of T
 * @example
 * ```ts
 *  interface Props {
      a?: {
        d: () => void
      }
      b: string
      c: boolean
    }
 *
 *  // Expect: { d: () => void } | (() => void) | string | boolean | undefined
 *  type PropValues = DeepValues<Props>
 * ```
 */
export type DeepValues<T> = {
  [K in Keys<T>]: T[K] extends infer V
    ? V extends V
      ? IsObject<V> extends true
        ? T[K] | DeepValues<T[K]>
        : T[K]
      : never
    : never
}[Keys<T>]

/**
 *
 * @description Get the specified value from T
 * @example
 * ```ts
 *  interface Props {
      a?: number
      b: string
      c: boolean
    }
 *
 *  // Expect: number | string | undefined
 *  type PropValues = Get<Props, 'a' | 'b'>
 * ```
 */
export type Get<T, K extends Keys<T>> = T[K]

/**
 *
 * @description Get the deep specified value from T
 * @example
 * ```ts
 *  interface Props {
      a: {
        d: () => void
      }
      b: string
      c: boolean
    }
 *
 *  // Expect: (()=> void) | number | string
 *  type PropValues = Get<Props, 'a.d' | 'b'>
 * ```
 */
export type DeepGet<
  T,
  K extends DeepKeys<T>
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends Keys<T>
    ? T[Head] extends infer V
      ? V extends V
        ? IsObject<V> extends true
          ? Tail extends DeepKeys<V>
            ? DeepGet<V, Tail>
            : never
          : // if the value of the parent property is not an object, like a?.b, then the value of b will be undefined
            undefined
        : never
      : never
    : never
  : K extends keyof T
  ? T[K]
  : never

/**
 *
 * @description Get the deep value path from T
 * @example
 * ```ts
 *  interface Props {
      a?: {
        c: boolean
        d: () => void
        e: number
      }
      b: string
    }
 *
 *  // Expect: { a?: { c: boolean; d: () => void } }
 *  type PropValues = DeepGetPath<Props, 'a.c' | 'a.d'>
 * ```
 */
export type DeepGetPath<T, K extends DeepKeys<T>> = {
  [P in keyof T as P extends OtherToString<K>
    ? P
    : K extends `${infer Head}.${string}`
    ? P extends Head
      ? P
      : never
    : never]: P extends OtherToString<K> // merge
    ? T[P]
    : [Exclude<K, Keys<T>>] extends [`${infer Head}.${infer Tail}`]
    ? P extends Head
      ? T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? DeepGetPath<
                V,
                Extract<
                  Tail extends Tail
                    ? `${P}.${Tail}` extends K
                      ? Tail
                      : never
                    : never,
                  DeepKeys<V>
                >
              >
            : V
          : never
        : never
      : never
    : never
}

/* 
  // the second way, but the editor prompt is worse
  type DeepGetPath<T, K extends DeepKeys<T>> = UnionToIntersection<
    K extends `${infer Head}.${infer Tail}`
      ? Head extends keyof T
        ? {
            [P in keyof T as P extends Head ? P : never]: T[P] extends infer V
              ?  V extends V ? IsObject<V> extends true
                ? DeepGetPath<V, Extract<Tail, DeepKeys<V>>>
                : V
              : never
            :never
          }
        : never
      : {
          [P in keyof T as P extends K ? P : never]: T[P]
        }
  >
 */

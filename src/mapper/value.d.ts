/**
 * TupleKeys<[3, 4]> = 0 | 1.
 */
export type ArrayKeys<T extends readonly unknown[]> = T extends readonly [
  any,
  ...infer Tail
]
  ? ArrayKeys<Tail> | Tail['length'] | `${Tail['length']}`
  : number extends T['length']
  ? number
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
    ArrayKeys<T> extends infer K
    ? K extends keyof T
      ? K
      : never
    : never
  : keyof T

type PathKey = string | number

type InternalDeepKeys<T, P extends string = ''> = T extends readonly unknown[]
  ? keyof {
      [K in Keys<T> as K extends PathKey
        ? P extends ''
          ? T[K] extends infer V
            ? V extends object
              ? // we will get values like 0 and '0', but only need to recurse once
                K | (K extends number ? InternalDeepKeys<V, `${K}`> : never)
              : K
            : never
          : T[K] extends infer V
          ? V extends object
            ?
                | `${P}.${K}`
                | (K extends number ? InternalDeepKeys<V, `${P}.${K}`> : never)
            : `${P}.${K}`
          : never
        : never]: never
    }
  : keyof {
      [K in keyof T as K extends PathKey
        ? P extends ''
          ? T[K] extends infer V
            ? V extends object
              ? K | InternalDeepKeys<V, `${K}`>
              : K
            : never
          : T[K] extends infer V
          ? V extends object
            ? `${P}.${K}` | InternalDeepKeys<V, `${P}.${K}`>
            : `${P}.${K}`
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
    ? V extends object
      ? T[K] | DeepValues<T[K]>
      : T[K]
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
  ? Head extends `${Keys<T> extends infer P
      ? P extends PathKey
        ? P
        : never
      : never}`
    ? T extends readonly unknown[]
      ? T[Head extends `${number}` ? number : Head] extends infer V
        ? V extends object
          ? Tail extends DeepKeys<V>
            ? DeepGet<V, Tail>
            : never
          : // if the value of the parent property is not an object, like a?.b, then the value of b will be undefined
            undefined
        : never
      : T[Head] extends infer V
      ? V extends object
        ? Tail extends DeepKeys<V>
          ? DeepGet<V, Tail>
          : never
        : // if the value of the parent property is not an object, like a?.b, then the value of b will be undefined
          undefined
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
export type DeepGetPath<T, K extends DeepKeys<T>> = T extends readonly unknown[]
  ? {
      [P in K as P extends `${infer Head}.${any}`
        ? // `${number}.xxx`
          `${number}` extends Head
          ? number
          : Head
        : P]: [P] extends [Keys<T>]
        ? T[P]
        : [P] extends [`${infer Head}.${infer Tail}`]
        ? [Head] extends [`${Keys<T>}`]
          ? T[Head extends Keys<T>
              ? Head
              : Head extends `${number}`
              ? number
              : never] extends infer V
            ? V extends object
              ? DeepGetPath<V, Extract<Tail, DeepKeys<V>>>
              : V
            : never
          : Head
        : never
    }
  : {
      [P in keyof T as P extends K
        ? P
        : K extends `${infer Head}.${string}`
        ? P extends Head
          ? P
          : never
        : never]: P extends K
        ? T[P]
        : [Exclude<K, keyof T>] extends [`${infer Head}.${infer Tail}`]
        ? P extends Head
          ? T[P] extends infer V
            ? V extends object
              ? DeepGetPath<V, Extract<Tail, DeepKeys<V>>>
              : V
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
              ? V extends object
                ? DeepGetPath<V, Extract<Tail, DeepKeys<V>>>
                : V
              : never
          }
        : never
      : {
          [P in keyof T as P extends K ? P : never]: T[P]
        }
  >
 */

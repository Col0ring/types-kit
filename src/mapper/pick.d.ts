import { IsObject } from '../basic'
import { OtherToString } from '../convert'
import { StrictExclude } from '../union'
import { ConditionalKeys, DeepKeys, Keys } from './key'
import { StrictOmit } from './omit'

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
 *  type PropValues = DeepPick<Props, 'a.c' | 'a.d'>
 * ```
 */
export type DeepPick<T, K extends DeepKeys<T>> = {
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
            ? DeepPick<
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
      type DeepPick<T, K extends DeepKeys<T>> = UnionToIntersection<
        K extends `${infer Head}.${infer Tail}`
          ? Head extends keyof T
            ? {
                [P in keyof T as P extends Head ? P : never]: T[P] extends infer V
                  ?  V extends V ? IsObject<V> extends true
                    ? DeepPick<V, Extract<Tail, DeepKeys<V>>>
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

/**
 * @description Pick by Condition (value)
 * @example
 * ```ts
 *  interface Props {
      a?: number
      b: string
      c: boolean
    }
 *
 *  // Expect: { a?: number, c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 *  // Set exact true, expect: { c: boolean }
 *  type NewProps = ConditionalPick<Props, number | boolean>
 * ```
 */
export type ConditionalPick<T, Condition, Exact extends boolean = false> = Pick<
  T,
  ConditionalKeys<T, Condition, Exact>
>

/**
 * @description Create a type that only has explicitly defined properties, absent of any index signatures.
 * @example
 * ```ts
 *  interface Props {
      a?: number
      readonly b: number
      c: number
      [x: number]: number
      [x: string]: number | undefined
      [x: symbol]: number
    }
    // Expect: { a?: number, readonly b: number, c: number }
    type NewProps = RemoveIndexSignature<Props>
 * ```
 */
export type RemoveIndexSignature<T> = {
  [K in keyof T as K extends Keys<T>
    ? {} extends Record<K, never>
      ? never
      : K
    : never]: T[K]
}

// export type RemoveIndexSignature<T> = {
//   [K in keyof T as K extends Keys<T>
//     ? string extends K
//       ? never
//       : number extends K
//       ? never
//       : symbol extends K
//       ? never
//       : K
//     : never]: T[K]
// }

/**
 * @description Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
    interface Responder {
      text?: () => string;
      json?: () => string;
      secure?: boolean;
    };
    const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
      // set at least one property, 'text' or 'json', otherwise throw error
      json: () => '{"message": "ok"}',
      secure: true
    };
 * ```
 */
export type PickAtLeastOne<T, K extends Keys<T>> = StrictOmit<T, K> &
  {
    [P in K]: Required<Pick<T, P>> & Partial<Pick<T, StrictExclude<K, P>>>
  }[K]

/**
 * @description Create a type that requires at least one of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
    interface Responder {
      text?: () => string;
      json?: () => string;
      secure?: boolean;
    };
    const responder1: PickExactlyOne<Responder, 'text' | 'json'> = {
      json: () => '{"message": "ok"}',
      secure: true
    };
    const responder2: PickExactlyOne<Responder, 'text' | 'json'> = {
      text: () => '{"message": "ok"}',
      secure: true
    };
    const responder2: PickExactlyOne<Responder, 'text' | 'json'> = {
      text: () => '{"message": "ok"}', // throw error
      json: () => '{"message": "ok"}',
      secure: true
    };
 * ```
 */
export type PickExactlyOne<T, K extends Keys<T>> = StrictOmit<T, K> &
  {
    [P in K]: Required<Pick<T, P>> &
      Partial<{
        [Q in keyof T as Q extends Exclude<K, P> ? Q : never]: never
      }>
  }[K]

/**
 * @description Create a type that requires all of the given keys or none of the given keys. The remaining keys are kept as is.
 * @example
 * ```ts
    interface Responder {
      text?: () => string;
      json?: () => string;
      secure?: boolean;
    };

    const responder1: RequireAllOrNone<Responder, 'text' | 'json'> = {
      secure: true
    };
    const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
      text: () => '{"message": "hi"}',
      json: () => '{"message": "ok"}',
      secure: true
    };
    const responder2: RequireAllOrNone<Responder, 'text' | 'json'> = {
      json: () => '{"message": "ok"}', // throw error
      secure: true
    };
 * ```
 */
export type PickAllOrNone<T, K extends Keys<T>> = StrictOmit<T, K> &
  (
    | Required<Pick<T, K>>
    | Partial<{
        [P in keyof T as P extends K ? P : never]: never
      }>
  )

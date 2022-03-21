import { Fill } from '../array'
import { IsEmptyTypeArray, IsObject } from '../basic'
import { OtherToString } from '../convert'
import { StrictExclude } from '../union'
import { ConditionalKeys, DeepKeys, Keys } from './key'
import { StrictOmit } from './omit'

/**
 *
 * @description Flatten the type output to improve type hints shown in editors
 * @example
 * ```ts
 * type Props = { a: 1, b: 2, c: 3 } & { d: 4 }
 * // Expect: { a: 1, b: 2, c: 3, d: 4 }
 * type SimplifiedProps = Simplify<Props>
 * ```
 */
export type Simplify<T> = {
  [K in keyof T]: T[K]
}

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

type InternalReplacePickValue<
  Key,
  Current,
  KeysArr extends readonly unknown[],
  ValuesArr extends readonly unknown[]
> = Key extends OtherToString<KeysArr[0]>
  ? ValuesArr[0]
  : KeysArr extends [KeysArr[0], ...infer RestKeys]
  ? ValuesArr extends [ValuesArr[0], ...infer RestValues]
    ? InternalReplacePickValue<Key, Current, RestKeys, RestValues>
    : Current
  : Current

/**
 * @description Create a type that replace the values in the corresponding keys.
 * @example
 * ```ts
 * interface Props {
      readonly a?: {
        d?: boolean
      }
      b?: number
      c: number
   }
   
   // Expect: { readonly a?: number, b?: number, c: string }
   // ['a.d','c'] means the keys to replace, [string, string] means the values to map 
   type new Props = DeepReplacePick<Props, ['a','c'], [number, string]>
 * ```
 */
export type ReplacePick<
  T,
  KeysArr extends readonly Keys<T>[],
  ValuesArr extends Fill<KeysArr['length'], unknown>
> = {
  [P in keyof T]: InternalReplacePickValue<P, T[P], KeysArr, ValuesArr>
}

type InternalDeepReplacePickValue<
  Key,
  Current,
  KeysArr extends readonly unknown[],
  ValuesArr extends readonly unknown[]
> = Key extends OtherToString<KeysArr[0]>
  ? [true, ValuesArr[0]]
  : KeysArr extends [KeysArr[0], ...infer RestKeys]
  ? ValuesArr extends [ValuesArr[0], ...infer RestValues]
    ? InternalDeepReplacePickValue<Key, Current, RestKeys, RestValues>
    : [false, Current]
  : [false, Current]

type InternalDeepReplacePickKeys<
  Key,
  KeysArr extends readonly unknown[],
  ValuesArr extends readonly unknown[],
  ResultKeys extends readonly unknown[] = [],
  ResultValues extends readonly unknown[] = []
> = KeysArr extends [KeysArr[0], ...infer RestKeys]
  ? ValuesArr extends [ValuesArr[0], ...infer RestValues]
    ? KeysArr[0] extends `${infer Head}.${infer Tail}`
      ? Key extends Head
        ? InternalDeepReplacePickKeys<
            Key,
            RestKeys,
            RestValues,
            [...ResultKeys, Tail],
            [...ResultValues, ValuesArr[0]]
          >
        : InternalDeepReplacePickKeys<
            Key,
            RestKeys,
            RestValues,
            ResultKeys,
            ResultValues
          >
      : // no first level
        InternalDeepReplacePickKeys<
          Key,
          RestKeys,
          RestValues,
          ResultKeys,
          ResultValues
        >
    : [ResultKeys, ResultValues]
  : [ResultKeys, ResultValues]

type InternalDeepReplacePick<
  T,
  KeysArr extends readonly unknown[],
  ValuesArr extends readonly unknown[]
> = {
  [P in keyof T]: InternalDeepReplacePickValue<
    P,
    T[P],
    KeysArr,
    ValuesArr
  > extends [infer Res, infer V]
    ? Res extends true
      ? V
      : V extends object
      ? // get filter keys and values
        InternalDeepReplacePickKeys<P, KeysArr, ValuesArr> extends [
          infer ResultKeys,
          infer ResultValues
        ]
        ? ResultKeys extends readonly unknown[]
          ? ResultValues extends readonly unknown[]
            ? IsEmptyTypeArray<ResultKeys> extends true
              ? V
              : InternalDeepReplacePick<V, ResultKeys, ResultValues>
            : never
          : never
        : never
      : V
    : never
}

/**
 * @description Create a type that replace the values in the corresponding deep keys.
 * @example
 * ```ts
 * interface Props {
      readonly a?: {
        d?: boolean
      }
      b?: number
      c: number
   }
   
   // Expect: { readonly a?: { d?: string }, b?: number, c: string }
   // ['a.d','c'] means the keys to replace, [string, string] means the values to map 
   type new Props = DeepReplacePick<Props, ['a.d','c'], [string, string]>
 * ```
 */
export type DeepReplacePick<
  T,
  KeysArr extends readonly DeepKeys<T>[],
  ValuesArr extends Fill<KeysArr['length'], unknown>
> = InternalDeepReplacePick<T, KeysArr, ValuesArr>

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

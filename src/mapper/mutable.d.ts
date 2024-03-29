import { IsNever, IsObject } from '../basic'
import { And, If, IsExtends, Not } from '../control-flow'

import { DeepKeys, Keys } from './key'
import { StrictOmit } from './omit'
import { Simplify } from './pick'
import { ReadonlyKeys } from './readonly'

/**
 *
 * Make all properties in T mutable (remove readonly decorator) .
 * @example
 * ```ts
 *    interface Props {
 *      readonly a: number;
 *      readonly b: number;
 *      readonly c: number;
 *    };
 *    // Expect: { a: number; b: number; c: number; }
 *    type NewProps = Mutable<Props>;
 * ```
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 *
 * Make some properties in T mutable (remove readonly decorator).
 * @example
 * ```ts
 * interface Props {
     readonly a: number;
     readonly b: number;
     readonly c: number;
   };
   // Expect: {  a: number; b: number; readonly c: number; }
   type NewProps = SetMutable<Props, 'a' | 'b'>;
 * ```
 */
export type SetMutable<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Mutable<Pick<T, K>>
>

/**
  * Get mutable property keys of T.
  * @example
  * ```ts
  * interface Props {
     readonly a?: number
     b: number
     readonly c: number
   }
   // Expect: 'b'
   type Keys = ReadonlyKeys<Props>
  * ```
  */
export type MutableKeys<T> = Exclude<Keys<T>, ReadonlyKeys<T>>

/**
 *
 * Make all properties (includes deep properties) in T mutable (remove readonly decorator) .
 * @example
 * ```ts
 * interface Props {
     readonly a: {
       readonly d: number
     };
     readonly b: number;
     readonly c: number;
   };
  // Expect: { a: { d: number }; b: number; c: number; }
  type NewProps = MutableDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export type MutableDeep<T> = {
  -readonly [P in keyof T]: MutableDeep<T[P]>
}

/**
  *
  * Make some properties (includes deep properties) in T readonly (add readonly decorator)..
  * @example
  * ```ts
  * interface Props {
       readonly a: {
         b?: number
         readonly c: {
           d: number
         }
       }
       readonly e: number
     }
     // Expect: {
     //   a: {
     //     b?: number | undefined
     //      c: {
     //       d: number
     //     }
     //   }
     //   readonly e: number
     // }
     type NewProps = SetMutableDeepPick<Props, 'a' | 'a.c'>
  * ```
  */
export type SetMutableDeepPick<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for tuple when not match the first level properties
    {
      [P in keyof T]: T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? SetMutableDeepPick<
                V,
                // distributed condition type
                K extends `${infer Head}.${infer Tail}`
                  ? P extends Head
                    ? Extract<
                        Tail extends Tail
                          ? `${P}.${Tail}` extends K
                            ? Tail
                            : never
                          : never,
                        DeepKeys<V>
                      >
                    : never
                  : never
              >
            : V
          : never
        : never
    }
  : Simplify<
      {
        -readonly [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
          P,
          never
        >]: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetMutableDeepPick<
                  V,
                  // distributed condition type
                  K extends `${infer Head}.${infer Tail}`
                    ? P extends Head
                      ? Extract<
                          Tail extends Tail
                            ? `${P}.${Tail}` extends K
                              ? Tail
                              : never
                            : never,
                          DeepKeys<V>
                        >
                      : never
                    : never
                >
              : V
            : never
          : never
      } & {
        [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
          P,
          never
        >]: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetMutableDeepPick<
                  V,
                  // distributed condition type
                  K extends `${infer Head}.${infer Tail}`
                    ? P extends Head
                      ? Extract<
                          Tail extends Tail
                            ? `${P}.${Tail}` extends K
                              ? Tail
                              : never
                            : never,
                          DeepKeys<V>
                        >
                      : never
                    : never
                >
              : V
            : never
          : never
      }
    >

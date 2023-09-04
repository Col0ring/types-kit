import { IsNever, IsObject } from '../basic'
import { And, If, IsExtends, Not } from '../control-flow'

import { DeepKeys, Keys } from './key'
import { StrictOmit } from './omit'
import { OptionalKeys } from './optional'
import { Simplify } from './pick'

/**
  *
  * Make some properties in T required.
  * @example
  * ```ts
  * interface Props {
      a?: number;
      b?: number;
      c?: number;
    };
   // Expect: {  a: number;  b: number; c?: number; }
   type NewProps = SetRequired<Props, 'a' | 'b'>;
  * ```
  */
export type SetRequired<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Required<Pick<T, K>>
>

/**
 * Get required property keys of T.
 * @example
 * ```ts
 * interface Props {
    a?: number
    readonly b: number
    c?: number
  }

  // Expect: 'b'
  type PropKeys = OptionalKeys<Props>
 * ```
 */
export type RequiredKeys<T> = Exclude<Keys<T>, OptionalKeys<T>>

/**
  *
  * Make all properties (includes deep properties) in T required.
  * @example
  * ```ts
  * interface Props {
      a?: {
        d?: number
      };
      b?: number;
      c?: number;
    };
   // Expect: { a: { d: number }; b: number; c: number; }
   type NewProps = RequiredDeep<Props>;
  * ```
  */
// here we use keyof T, which can allow us return a array at the end
export type RequiredDeep<T> = {
  [P in keyof T]-?: RequiredDeep<T[P]>
}

/**
  * 
  * Make some properties (includes deep properties) in T required.
  * @example
  * ```ts
  * interface Props {
       a?: {
         b?: number | undefined
         readonly c?: {
           d?: number
         }
       }
       e?: number
     }
     // Expect: {
     //    a: {
     //     b: number | undefined
     //     readonly c?: {
     //        d: number
     //     }
     //   }
     //    e: number
     // }
     type NewProps = SetRequiredDeep<Props, 'e' | 'a' | 'a.b' | 'a.c.d'>
  * ```
  */
export type SetRequiredDeep<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for tuple when not match the first level properties
    {
      [P in keyof T]: T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? SetRequiredDeep<
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
        [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
          P,
          never
        >]-?: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetRequiredDeep<
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
              ? SetRequiredDeep<
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

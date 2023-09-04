import { IsNever, IsObject } from '../basic'
import { And, If, IsExtends, Not } from '../control-flow'

import { DeepKeys, Keys } from './key'
import { StrictOmit } from './omit'
import { Simplify } from './pick'

/**
  *
  * Make some properties in T optional.
  * @example
  * ```ts
  * interface Props {
      a: number;
      b: number;
      c: number;
    };
   // Expect: {  a?: number;  b?: number; c: number; }
   type NewProps = SetOptional<Props, 'a' | 'b'>;
  * ```
  */
export type SetOptional<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Partial<Pick<T, K>>
>

/**
 * Get optional property keys of T.
 * @example
 * ```ts
 * interface Props {
    a?: number
    readonly b: number
    c?: number
  }

  // Expect: 'a' | 'c'
  type PropKeys = OptionalKeys<Props>
 * ```
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[Keys<T>]

/**
  *
  * Make all properties (includes deep properties) in T optional.
  * @example
  * ```ts
  * interface Props {
      a: {
        d: number
      };
      b: number;
      c: number;
    };
   // Expect: { a?: { d?: number }; b?: number; c?: number; }
   type NewProps = PartialDeep<Props>;
  * ```
  */
// here we use keyof T, which can allow us return a array at the end
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>
}

/**
  * 
  * Make some properties (includes deep properties) in T optional.
  * @example
  * ```ts
  * interface Props {
       a: {
         b?: number
         readonly c: {
           d: number
         }
       }
       e: number
     }
     // Expect: {
     //    a?: {
     //     b?: number | undefined
     //     readonly c: {
     //        d?: number
     //     }
     //   }
     //    e?: number
     // }
     type NewProps = SetOptionalDeep<Props, 'e' | 'a' | 'a.c.d'>
  * ```
  */
export type SetOptionalDeep<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for tuple when not match the first level properties
    {
      [P in keyof T]: T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? SetOptionalDeep<
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
        >]?: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetOptionalDeep<
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
              ? SetOptionalDeep<
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

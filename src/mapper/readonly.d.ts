/**
 *  Readonly is build-in
 */

import { StrictOmit } from './omit'
import { Simplify } from './pick'
import { IsEquals, If, IsExtends, And, Not } from '../control-flow'
import { DeepKeys, Keys } from './key'
import { IsNever, IsObject } from '../basic'

/**
  *
  * Make some properties in T readonly (add readonly decorator)
  * @example
  * ```ts
  * interface Props {
      a: number;
      b: number;
      c: number;
    };
    // Expect: { readonly a: number; readonly b:   number; c: number; }
    type NewProps = SetReadonly<Props, 'a' | 'b'>;
  * ```
  */
export type SetReadonly<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Readonly<Pick<T, K>>
>

/**
  * Get readonly property keys of T
  * @example
  * ```ts
  * interface Props {
     readonly a?: number
     b: number
     readonly c: number
   }
   // Expect: 'a' | 'c'
   type Keys = ReadonlyKeys<Props>
  * ```
  */
// we need to traverse keyof T but not Keys<T>, otherwise the result of IsEquals will not be as expected
export type ReadonlyKeys<T> = {
  // remove undefined key
  [K in keyof T]-?: If<
    IsEquals<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }>,
    never,
    K
  >
}[Keys<T>]

/**
  *
  * Make all properties (includes deep properties) in T readonly (add readonly decorator)
  * @example
  * ```ts
  * interface Props {
      a: {
        d: number
      };
      b: number;
      c: number;
    };
   // Expect: { readonly a: { readonly d: number }; readonly b: number; readonly c: number; }
   type NewProps = ReadonlyDeep<Props>;
  * ```
  */
// here we use keyof T, which can allow us return a array at the end
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>
}

/**
  * 
  * Make some properties (includes deep properties) in T readonly (add readonly decorator)
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
     //   readonly a: {
     //     b?: number | undefined
     //     readonly c: {
     //       readonly d: number
     //     }
     //   }
     //   readonly e: number
     // }
     type NewProps = SetReadonlyDeep<Props, 'e' | 'a' | 'a.c.d'>
  * ```
  */
export type SetReadonlyDeep<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for tuple when not match the first level properties
    {
      [P in keyof T]: T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? SetReadonlyDeep<
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
        readonly [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
          P,
          never
        >]: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetReadonlyDeep<
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
              ? SetReadonlyDeep<
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

// the second way, deprecated
// export type SetReadonlyDeep<T, K extends DeepKeys<T>> = Merge<
//   StrictOmit<T, Extract<K, Keys<T>>>,
//   Merge<
//     // has 'a', but not has 'a.b'
//     Readonly<Pick<T, Extract<K, keyof T>>>,
//     [Exclude<K, keyof T>] extends [`${infer Head}.${infer Tail}`]
//       ? UnionToIntersection<
//           Head extends keyof T
//             ? Head extends OptionalKeys<T>
//               ? If<
//                   Or<[IsExtends<Head, ReadonlyKeys<T>>, IsExtends<Head, K>]>,
//                   {
//                     readonly [P in Head]?: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? SetReadonlyDeep<V, Tail>
//                           : never
//                         : V
//                       : never
//                   },
//                   {
//                     [P in Head]?: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? SetReadonlyDeep<V, Tail>
//                           : never
//                         : V
//                       : never
//                   }
//                 >
//               : If<
//                   Or<[IsExtends<Head, ReadonlyKeys<T>>, IsExtends<Head, K>]>,
//                   {
//                     readonly [P in Head]: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? SetReadonlyDeep<V, Tail>
//                           : never
//                         : V
//                       : never
//                   },
//                   {
//                     [P in Head]: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? SetReadonlyDeep<V, Tail>
//                           : never
//                         : V
//                       : never
//                   }
//                 >
//             : // Head extends keyof T failed, means the last prop
//               {}
//         >
//       : never
//   >
// >

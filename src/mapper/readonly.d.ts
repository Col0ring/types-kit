/**
 *  Readonly is build-in
 */

import { StrictOmit } from './strict-omit'
import { Simplify } from './simplify'
import { IsEquals, If, IsExtends, And, Not } from '../control-flow'
import { DeepKeys, Keys } from './value'
import { IsNever } from '../basic'

/**
 *
 * @description Make some properties in T readonly (add readonly decorator)
 * @example
 * ```ts
 * interface Props {
     a: number;
     b: number;
     c: number;
   };
  // Expect: { readonly a: number; readonly b: number; c: number; }
  type newProps = ReadonlyPick<Props, 'a' | 'b'>;
 * ```
 */
export type ReadonlyPick<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Readonly<Pick<T, K>>
>

/**
 * @description Get readonly property keys of T
 * @example
 * ```ts
 * interface Props {
    readonly a?: number
    b: number
    readonly c: number
  }
  // Expect
  type Keys = ReadonlyKeys<Props>
 * ```
 */
// we need to traverse keyof T but not Keys<T>, otherwise the result of IsEquals will not be as expected
export type ReadonlyKeys<T> = {
  [K in keyof T]-?: If<
    IsEquals<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }>,
    never,
    K
  >
}[Keys<T>]

/**
 *
 * @description Make all properties (includes deep properties) in T readonly (add readonly decorator)
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
  type newProps = ReadonlyDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>
}

/**
 * 
 * @description Make some properties (includes deep properties) in T readonly (add readonly decorator)
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
    type newProps = ReadonlyDeepPick<Props, 'e' | 'a' | 'a.c.d'>
 * ```
 */
export type ReadonlyDeepPick<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for array when not match the first level properties
    {
      [P in keyof T]: T[P] extends object
        ? ReadonlyDeepPick<
            T[P],
            // distributed condition type
            K extends `${string}.${infer Tail}`
              ? Extract<Tail, DeepKeys<T[P]>>
              : never
          >
        : T[P]
    }
  : Simplify<
      {
        readonly [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
          P,
          never
        >]: T[P] extends object
          ? ReadonlyDeepPick<
              T[P],
              // distributed condition type
              K extends `${string}.${infer Tail}`
                ? Extract<Tail, DeepKeys<T[P]>>
                : never
            >
          : T[P]
      } & {
        [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
          P,
          never
        >]: T[P] extends object
          ? ReadonlyDeepPick<
              T[P],
              // distributed condition type
              K extends `${string}.${infer Tail}`
                ? Extract<Tail, DeepKeys<T[P]>>
                : never
            >
          : T[P]
      }
    >

// the second way, deprecated
// export type ReadonlyDeepPick<T, K extends DeepKeys<T>> = Merge<
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
//                           ? ReadonlyDeepPick<V, Tail>
//                           : never
//                         : V
//                       : never
//                   },
//                   {
//                     [P in Head]?: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? ReadonlyDeepPick<V, Tail>
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
//                           ? ReadonlyDeepPick<V, Tail>
//                           : never
//                         : V
//                       : never
//                   },
//                   {
//                     [P in Head]: T[P] extends infer V
//                       ? V extends Record<PropertyKey, any>
//                         ? Tail extends GetKeysDeep<V>
//                           ? ReadonlyDeepPick<V, Tail>
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

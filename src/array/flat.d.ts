import {
  FlattedArrayItem,
  IsEmptyTypeArray,
  IsReadonlyArray,
  IsTuple,
} from '../basic'

/**
 * Create an array that includes the flatten array type.
 * @example
 * ```ts
 * // Expect: [1, 2, 3, 4]
 * type Foo = Flat<[1, [[2, [3, [4]]]]]>
 * ```
 */
// notice: distributed condition type
export type Flat<T extends readonly unknown[]> = T extends T
  ? true extends IsTuple<T>
    ? T extends readonly [infer A, ...infer B]
      ? A extends readonly unknown[]
        ? IsReadonlyArray<T> extends true
          ? readonly [...Flat<A>, ...Flat<B>]
          : [...Flat<A>, ...Flat<B>]
        : IsReadonlyArray<T> extends true
        ? readonly [A, ...Flat<B>]
        : [A, ...Flat<B>]
      : T extends readonly [...infer A, infer B]
      ? B extends readonly unknown[]
        ? IsReadonlyArray<T> extends true
          ? readonly [...Flat<A>, ...Flat<B>]
          : [...Flat<A>, ...Flat<B>]
        : IsReadonlyArray<T> extends true
        ? readonly [...Flat<A>, B]
        : [...Flat<A>, B]
      : never
    : // array or empty array
    true extends IsEmptyTypeArray<T>
    ? IsReadonlyArray<T> extends true
      ? readonly []
      : []
    : IsReadonlyArray<T> extends true
    ? readonly FlattedArrayItem<T>[]
    : FlattedArrayItem<T>[]
  : never

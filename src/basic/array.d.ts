import { IsExtends, Not } from '../control-flow'

/**
 * @description Create a tuple.
 * @example
 * ```ts
 * // Expect: [1, ...number[]] | [...number[], 1] | readonly [1, ...number[]] | readonly [...number[], 1]
 * type Foo = Tuple<1, number>
 * ```
 */
export type Tuple<T = unknown, R = T> =
  | [T, ...R[]]
  | [...R[], T]
  | readonly [T, ...R[]]
  | readonly [...R[], T]

/**
 * @description  If T is a tuple, return true, else return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = IsTuple<[1, 2, 3]>
 * ```
 */
// notice: distributed condition type
export type IsTuple<T extends readonly unknown[]> = T extends T
  ? IsExtends<T, Tuple>
  : never

/**
 * @description  Get the item type from an array
 * @example
 * ```ts
 * // Expect: number
 * type Foo = ArrayItem<number[]>
 * ```
 */
// notice: distributed condition type
export type ArrayItem<T extends readonly unknown[]> = T extends ReadonlyArray<
  infer Item
>
  ? Item
  : never

/**
 * @description  Get the flatted item type from an array
 * @example
 * ```ts
 * // Expect: number
 * type Foo = FlattedArrayItem<number[][][]>
 * ```
 */
// notice: distributed condition type
export type FlattedArrayItem<T extends readonly unknown[]> =
  T extends ReadonlyArray<infer Item>
    ? Item extends readonly unknown[]
      ? FlattedArrayItem<Item>
      : Item
    : never

/**
 * @description  If T is a empty array, return true, else return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = IsEmptyTypeArray<[]>
 * ```
 */
// notice: distributed condition type
export type IsEmptyTypeArray<T extends readonly unknown[]> = T extends T
  ? IsExtends<T['length'], 0>
  : never

/**
 * @description  If T is a readonly array, return true, else return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = IsReadonlyArray<readonly [1, 2, 3]>
 * ```
 */
// notice: distributed condition type
export type IsReadonlyArray<T extends readonly unknown[]> = T extends T
  ? Not<IsExtends<T, any[]>>
  : never

import { IsExtends, Not } from '../control-flow'

export type ArrayAndReadonlyArrayByPassArray<
  T extends unknown[] | readonly unknown[] = unknown[]
> = T | Readonly<T>

export type ArrayAndReadonlyArrayByPassItem<T = any> = T[] | readonly T[]

export type Tuple<T = any, R = T> =
  | [T, ...R[]]
  | [...R[], T]
  | readonly [T, ...R[]]
  | readonly [...R[], T]

// notice: distributed condition type
export type IsTuple<T extends readonly unknown[]> = T extends T
  ? IsExtends<T, Tuple>
  : never

// notice: distributed condition type
export type ArrayItem<T extends readonly unknown[]> = T extends ReadonlyArray<
  infer Item
>
  ? Item
  : never

// notice: distributed condition type
export type FlattedArrayItem<T extends readonly unknown[]> =
  T extends ReadonlyArray<infer Item>
    ? Item extends readonly unknown[]
      ? FlattedArrayItem<Item>
      : Item
    : never

// notice: distributed condition type
export type IsEmptyTypeArray<T extends readonly unknown[]> = T extends T
  ? IsExtends<T['length'], 0>
  : never

// notice: distributed condition type
export type IsReadonlyArray<T extends readonly unknown[]> = T extends T
  ? Not<IsExtends<T, any[]>>
  : never

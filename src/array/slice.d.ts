import { IsEmptyTypeArray, IsReadonlyArray, IsTuple } from '../basic'

type InternalNormalizeSliceIndex<
  A extends readonly unknown[],
  I extends number,
  R extends readonly unknown[] = []
> = I extends R['length']
  ? I
  : `-${R['length']}` extends `${I}`
  ? A['length']
  : A extends readonly [unknown, ...infer T]
  ? InternalNormalizeSliceIndex<T, I, [...R, unknown]>
  : // out of range
  `${I}` extends `-${number}`
  ? 0
  : R['length']

type InternalSlice<
  Arr extends readonly unknown[],
  Start extends number,
  End extends number,
  N extends readonly unknown[] = [],
  R extends readonly unknown[] = []
> = N['length'] extends End // End > Start => []
  ? R
  : Arr extends readonly [infer H, ...infer T]
  ? InternalSlice<
      T,
      Start,
      End,
      [...N, unknown],
      N['length'] extends Start
        ? [H]
        : IsEmptyTypeArray<R> extends true
        ? []
        : [...R, H]
    >
  : // empty
    R

/**
 * @description Create a subarray of Arr from index Start to End. Indexes with negative numbers will be counted from reversely.
 * @example
 * ```ts
 * // Expect: [0, 1]
 * type Foo = Slice<[0, 1, 2, 3], 0, 2>
 * // Expect: [2]
 * type Bar = Slice<[0, 1, 2, 3], 2, -1>
 * ```
 */
// TODO: tuple like [1, ...number[]],  [...number[], 1], [1, ... number[], 1]
export type Slice<
  Arr extends readonly unknown[],
  Start extends number = 0,
  End extends number = Arr['length']
> = Arr extends Arr
  ? true extends IsTuple<Arr>
    ? true extends IsReadonlyArray<Arr>
      ? Readonly<
          InternalSlice<
            Arr,
            InternalNormalizeSliceIndex<Arr, Start>,
            InternalNormalizeSliceIndex<Arr, End>
          >
        >
      : InternalSlice<
          Arr,
          InternalNormalizeSliceIndex<Arr, Start>,
          InternalNormalizeSliceIndex<Arr, End>
        >
    : Arr
  : never

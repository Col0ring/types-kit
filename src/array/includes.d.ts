import { ArrayItem, IsTuple } from '../basic'
import { IsEquals, IsExtends } from '../control-flow'
import { EqualTag, ExtendsTag } from '../utils'

/**
 * If V is a member of T, return true, else return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = Includes<[1, string, boolean], number>
 * // Expect: false
 * type Bar = Includes<[1, string, boolean], number, 'equal'>
 * ```
 */
// notice: distributed condition type
export type Includes<
  T extends readonly unknown[],
  V,
  Type extends EqualTag | ExtendsTag = ExtendsTag,
> = T extends T
  ? true extends IsTuple<T>
    ? T extends readonly [infer Current, ...infer Rest]
      ? [Type] extends [EqualTag]
        ? true extends IsEquals<Current, V>
          ? true
          : Includes<Rest, V, Type>
        : true extends IsExtends<Current, V>
        ? true
        : Includes<Rest, V, Type>
      : T extends readonly [...infer Rest, infer Current]
      ? [Type] extends [EqualTag]
        ? true extends IsEquals<Current, V>
          ? true
          : Includes<Rest, V, Type>
        : true extends IsExtends<Current, V>
        ? true
        : Includes<Rest, V, Type>
      : never
    : [Type] extends [EqualTag]
    ? IsEquals<ArrayItem<T>, V>
    : IsExtends<ArrayItem<T>, V>
  : never

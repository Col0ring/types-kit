import { IsEquals } from '../control-flow'
import { ArrayItem, IsTuple } from '../basic'
import { EqualTag, ExtendsTag } from '../utils'

// notice: distributed condition type
export type Includes<
  T extends readonly unknown[],
  V,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? true extends IsTuple<T>
    ? T extends [infer Current, ...infer Rest]
      ? [Type] extends [EqualTag]
        ? true extends IsEquals<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : [V] extends [Current]
        ? true
        : Includes<Rest, V, Type>
      : T extends [...infer Rest, infer Current]
      ? [Type] extends [EqualTag]
        ? true extends IsEquals<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : [V] extends [Current]
        ? true
        : Includes<Rest, V, Type>
      : never
    : IsEquals<ArrayItem<T>, V>
  : never

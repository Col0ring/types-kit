import { IsEquals, If, IfExtends, IsExtends } from '../control-flow'
import { EqualTag, ExtendsTag } from '../utils'
import { ArrayItem, IsTuple } from '../basic'

// notice: distributed condition type
export type Filter<
  T extends readonly unknown[],
  V,
  Extends extends boolean = true,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? If<
      IsTuple<T>,
      T extends readonly [infer Current, ...infer Rest]
        ? [
            ...IfExtends<
              [Type, EqualTag],
              IfExtends<[IsEquals<V, Current>, Extends], [Current], []>,
              IfExtends<[IsExtends<V, Current>, Extends], [Current], []>
            >,
            ...Filter<Rest, V, Extends, Type>
          ]
        : T extends readonly [...infer Rest, infer Current]
        ? [
            ...Filter<Rest, V, Extends, Type>,
            ...IfExtends<
              [Type, EqualTag],
              IfExtends<[IsEquals<V, Current>, Extends], [Current], []>,
              IfExtends<[IsExtends<V, Current>, Extends], [Current], []>
            >
          ]
        : never,
      IfExtends<[IsExtends<ArrayItem<T>, V>, Extends], T, []>
    >
  : never

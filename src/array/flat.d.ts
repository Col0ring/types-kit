import { FlattedArrayItem, IsEmptyTypeArray, IsTuple } from '../basic'

// notice: distributed condition type
export type Flat<T extends readonly unknown[]> = T extends T
  ? true extends IsTuple<T>
    ? T extends readonly [infer A, ...infer B]
      ? A extends readonly unknown[]
        ? [...Flat<A>, ...Flat<B>]
        : [A, ...Flat<B>]
      : T extends readonly [...infer A, infer B]
      ? B extends readonly unknown[]
        ? [...Flat<A>, ...Flat<B>]
        : [...Flat<A>, B]
      : never
    : // array or empty array
    true extends IsEmptyTypeArray<T>
    ? []
    : FlattedArrayItem<T>[]
  : never

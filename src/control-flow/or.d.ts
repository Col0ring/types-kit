import {
  ArrayAndReadonlyArrayByPassArray,
  ArrayItem,
  IsTuple,
  IsTruthy
} from '../basic'
import { If } from './if'

// notice: distributed condition type
export type Or<A extends ArrayAndReadonlyArrayByPassArray> = If<
  IsTuple<A>,
  A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
    ? If<Current, true, Or<Rest>>
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? If<Current, true, Or<Rest>>
    : never,
  IsTruthy<ArrayItem<A>>
>

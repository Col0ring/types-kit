import {
  ArrayAndReadonlyArrayByPassArray,
  ArrayItem,
  IsEmptyTypeArray,
  IsTruthy,
  IsTuple
} from '../basic'
import { If } from './if'
import { Or } from './or'

// notice: distributed condition type
export type And<A extends ArrayAndReadonlyArrayByPassArray> = If<
  IsTuple<A>,
  A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
    ? If<
        Current,
        If<
          IsTuple<Rest>,
          And<Rest>,
          Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
        >,
        false
      >
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? If<
        Current,
        If<
          IsTuple<Rest>,
          And<Rest>,
          Or<[IsEmptyTypeArray<Rest>, IsTruthy<ArrayItem<Rest>>]>
        >,
        false
      >
    : never,
  IsTruthy<ArrayItem<A>>
>

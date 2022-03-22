import { If } from '../control-flow'
import { IsTuple } from '../basic'

// notice: distributed condition type
export type Reverse<T extends readonly unknown[]> = T extends T
  ? If<
      IsTuple<T>,
      T extends [infer F, ...infer R]
        ? [...Reverse<R>, F]
        : T extends [...infer R, infer L]
        ? [L, ...Reverse<R>]
        : never,
      T
    >
  : never

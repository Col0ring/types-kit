import { IfExtends, IsExtends } from '../control-flow'

export type Falsy = 0 | false | '' | undefined | null | void | never | unknown
export type FalsyWithoutUnknown =
  | 0
  | false
  | ''
  | undefined
  | null
  | void
  | never

export type IsAny<T> = IsExtends<number, 0 & T>

export type IsUnknown<T> = IfExtends<
  [unknown, T],
  IfExtends<[IsAny<T>, true], false, true>,
  false
>

export type IsNever<T> = IsExtends<T, never>

export type IsFalsy<T> = IfExtends<
  [T, never],
  true,
  IfExtends<
    [T, FalsyWithoutUnknown],
    IfExtends<[IsAny<T>, true], false, true>,
    IsUnknown<T>
  >
>

export type IsTruthy<T> = IfExtends<[IsFalsy<T>, true], false, true>

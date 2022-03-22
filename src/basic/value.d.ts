import { IfExtends, IsExtends } from '../control-flow'
/**
 * @description Matches any primitive value.
 */
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

/**
 * @description Matches any falsy value.
 */
export type Falsy = 0 | false | '' | undefined | null | void | never | unknown
type FalsyWithoutUnknown = 0 | false | '' | undefined | null | void | never

/**
 * @description If T is a primitive value, return true, otherwise, return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = IsPrimitive<boolean>
 * ```
 */
export type IsPrimitive<T> = IfExtends<
  [T, never],
  false,
  IfExtends<[T, Primitive], IfExtends<[IsAny<T>, true], false, true>, false>
>

/**
 * @description  If T is any, return true, otherwise, return false.
 * @example
 * ```ts
 * // Expect: true
 * type Foo = IsAny<any>
 * ```
 */
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

export type IsObject<T> = IfExtends<
  [T, object],
  IfExtends<[IsAny<T>, true], false, true>,
  false
>

export type IsTruthy<T> = IfExtends<[IsFalsy<T>, true], false, true>

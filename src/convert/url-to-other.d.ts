import { IsEquals } from '../control-flow'
import { Keys } from '../mapper'

type InternalAddUrlQueryValueToResult<
  Result extends object,
  K extends string,
  V extends string | undefined,
> = {
  [P in Keys<Result> | K]: P extends K
    ? P extends Keys<Result>
      ? IsEquals<V, Result[P]> extends true
        ? Result[P]
        : // avoid api-extractor compiling failed
        Result[P] extends infer CurrentValue
        ? CurrentValue extends readonly unknown[]
          ? [...CurrentValue, V]
          : [CurrentValue, V]
        : never
      : V
    : P extends Keys<Result>
    ? Result[P]
    : never
}

type InternalUrlQueryToObject<
  T extends string,
  Result extends object = {},
> = T extends `${infer Current}&${infer Rest}`
  ? Current extends `${infer K}=${infer V}`
    ? InternalUrlQueryToObject<
        Rest,
        InternalAddUrlQueryValueToResult<Result, K, V>
      >
    : InternalUrlQueryToObject<
        Rest,
        InternalAddUrlQueryValueToResult<Result, Current, undefined>
      >
  : T extends `${infer K}=${infer V}`
  ? InternalAddUrlQueryValueToResult<Result, K, V>
  : T extends ''
  ? Result
  : InternalAddUrlQueryValueToResult<Result, T, undefined>

/**
 * Parser the querystring of a url into an object type
 * @example
 * ```ts
 * // Expect: { a: ['1', '3'], b: '2', c: undefined }
 * type Foo = UrlQueryToObject<'/foo/bar?a=1&b=2&a=3&c'>
 * ```
 */
export type UrlQueryToObject<T extends string> =
  T extends `${string}?${infer QueryString}`
    ? InternalUrlQueryToObject<QueryString>
    : InternalUrlQueryToObject<T>

type InternalUrlParamsToUnion<T extends string> =
  T extends `${infer Current}/${infer Rest}`
    ? InternalUrlParamsToUnion<Current> | InternalUrlParamsToUnion<Rest>
    : T extends `:${infer K}`
    ? K
    : never

/**
 * Parser the params of a url into a union type
 * @example
 * ```ts
 * // Expect: 'a' | 'b'
 * type Foo = UrlParamsToUnion<'/foo/bar/:a/:b/baz?a=1&b=2&a=3&c'>
 * ```
 */
export type UrlParamsToUnion<T extends string> =
  T extends `${infer Pathname}?${string}`
    ? InternalUrlParamsToUnion<Pathname>
    : InternalUrlParamsToUnion<T>

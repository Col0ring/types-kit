<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [InternalAddUrlQueryValueToResult](./types-kit.internaladdurlqueryvaluetoresult.md)

## InternalAddUrlQueryValueToResult type

<b>Signature:</b>

```typescript
type InternalAddUrlQueryValueToResult<
  Result extends object,
  K extends string,
  V extends string | undefined
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
```
<b>References:</b> [Keys](./types-kit.keys.md)<!-- -->, [IsEquals](./types-kit.isequals.md)

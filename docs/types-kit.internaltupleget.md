<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [InternalTupleGet](./types-kit.internaltupleget.md)

## InternalTupleGet type

<b>Signature:</b>

```typescript
type InternalTupleGet<
  T,
  K extends readonly unknown[],
  R extends readonly unknown[] = []
> = K extends readonly [infer Item, ...infer Rest]
  ? InternalTupleGet<
      T,
      Rest,
      [...R, Item extends Keys<T> ? Get<T, Item> : unknown]
    >
  : R
```
<b>References:</b> [InternalTupleGet](./types-kit.internaltupleget.md)<!-- -->, [Keys](./types-kit.keys.md)<!-- -->, [Get](./types-kit.get.md)

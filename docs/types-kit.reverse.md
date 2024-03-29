<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [Reverse](./types-kit.reverse.md)

## Reverse type

Reverses an array.

**Signature:**

```typescript
export type Reverse<T extends readonly unknown[]> = T extends T
  ? If<
      IsTuple<T>,
      T extends [infer F, ...infer R]
        ? IsReadonlyArray<T> extends true
          ? readonly [...Reverse<R>, F]
          : [...Reverse<R>, F]
        : T extends [...infer R, infer L]
        ? IsReadonlyArray<T> extends true
          ? readonly [L, ...Reverse<R>]
          : [L, ...Reverse<R>]
        : never,
      T
    >
  : never
```
**References:** [If](./types-kit.if.md)<!-- -->, [IsTuple](./types-kit.istuple.md)<!-- -->, [IsReadonlyArray](./types-kit.isreadonlyarray.md)<!-- -->, [Reverse](./types-kit.reverse.md)

## Example


```ts
// Expect: [3, 2, 1]
type Foo = Reverse<[1, 2, 3]>
```


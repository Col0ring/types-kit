<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [ArrayItem](./types-kit.arrayitem.md)

## ArrayItem type

<b>Signature:</b>

```typescript
export type ArrayItem<T extends readonly unknown[]> = T extends ReadonlyArray<
  infer Item
>
  ? Item
  : never
```
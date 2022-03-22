<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [IsPrimitive](./types-kit.isprimitive.md)

## IsPrimitive type

<b>Signature:</b>

```typescript
export type IsPrimitive<T> = IfExtends<
  [T, never],
  false,
  IfExtends<[T, Primitive], IfExtends<[IsAny<T>, true], false, true>, false>
>
```
<b>References:</b> [IfExtends](./types-kit.ifextends.md)<!-- -->, [Primitive](./types-kit.primitive.md)<!-- -->, [IsAny](./types-kit.isany.md)

## Example


```ts
// Expect: true
type Foo = IsPrimitive<boolean>
```

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [Get](./types-kit.get.md)

## Get type

<b>Signature:</b>

```typescript
export type Get<T, K extends Keys<T>> = T[K]
```
<b>References:</b> [Keys](./types-kit.keys.md)

## Example


```ts
 interface Props {
      a?: number
      b: string
      c: boolean
    }

 // Expect: number | string | undefined
 type PropValues = Get<Props, 'a' | 'b'>
```

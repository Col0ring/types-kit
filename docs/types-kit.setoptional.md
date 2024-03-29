<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [SetOptional](./types-kit.setoptional.md)

## SetOptional type

Make some properties in T optional.

**Signature:**

```typescript
export type SetOptional<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Partial<Pick<T, K>>
>
```
**References:** [Keys](./types-kit.keys.md)<!-- -->, [Simplify](./types-kit.simplify.md)<!-- -->, [StrictOmit](./types-kit.strictomit.md)

## Example


```ts
interface Props {
      a: number;
      b: number;
      c: number;
    };
   // Expect: {  a?: number;  b?: number; c: number; }
   type NewProps = SetOptional<Props, 'a' | 'b'>;
```


<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [WithConflictingIndexSignature](./types-kit.withconflictingindexsignature.md)

## WithConflictingIndexSignature type

Create a type that contains T, and uses the ConflictingIndexSignatureType type as the index signature.

**Signature:**

```typescript
export type WithConflictingIndexSignature<T, IndexSignatureType> =
  // all keys are optional
  | (Keys<T> extends OptionalKeys<T>
      ? {
          [P in LiteralUnion<Keys<T>, PropertyKey>]?: P extends Keys<T>
            ? T[P]
            : IndexSignatureType
        }
      : {
          [P in LiteralUnion<Keys<T>, PropertyKey>]: P extends Keys<T>
            ? T[P]
            : IndexSignatureType
        })
  | T
```
**References:** [Keys](./types-kit.keys.md)<!-- -->, [OptionalKeys](./types-kit.optionalkeys.md)<!-- -->, [LiteralUnion](./types-kit.literalunion.md)

## Example


```ts
 interface Props {
   a: number
   b: number
 }
  // ExpectMatch: { a:number, b:number, [key: PropertyKey]: string } (the above code will report an error if define it directly, type 'number' is not assignable to type 'string'.)
  type NewProps = WithConflictingIndexSignature<Props, string>
```


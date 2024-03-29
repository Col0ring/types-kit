<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [LastInUnion](./types-kit.lastinunion.md)

## LastInUnion type

Get the last type in a union type (important!: the result is random when you are using tsc, the correct type can only be obtained through the editor environment).

**Signature:**

```typescript
export type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never
```
**References:** [UnionToIntersection](./types-kit.uniontointersection.md)

## Example


```ts
// Expect: 2
type Foo = LastInUnion<1 | 2>
```
if it is necessary to output one type from overload, TS selects the last signature in the overload.


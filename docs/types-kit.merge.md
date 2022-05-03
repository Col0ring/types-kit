<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [Merge](./types-kit.merge.md)

## Merge type

Merge two types into a new type. Keys of the second type will override keys of the first type.

<b>Signature:</b>

```typescript
export type Merge<A, B> = A extends readonly unknown[]
  ? B extends readonly unknown[]
    ? MergeTuple<A, B>
    : Simplify<
        StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
          [P in keyof B as P extends Keys<B> ? P : never]: B[P]
        }
      >
  : Simplify<
      StrictOmit<A, Extract<Keys<A>, Keys<B>>> & {
        [P in keyof B as P extends Keys<B> ? P : never]: B[P]
      }
    >
```
<b>References:</b> [MergeTuple](./types-kit.mergetuple.md)<!-- -->, [Simplify](./types-kit.simplify.md)<!-- -->, [StrictOmit](./types-kit.strictomit.md)<!-- -->, [Keys](./types-kit.keys.md)

## Example


```ts
interface Foo {
    a: number;
    b: string;
};
interface Bar {
  b: number;
};
// Expect: { a: number, b: number }
type NewProps = Merge<Foo, Bar>
```

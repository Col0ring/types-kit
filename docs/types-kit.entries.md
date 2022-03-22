<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [Entries](./types-kit.entries.md)

## Entries type

<b>Signature:</b>

```typescript
export type Entries<T> = Entry<T> extends infer E
  ? IsNever<E> extends true
    ? never
    : E[]
  : never
```
<b>References:</b> [Entry](./types-kit.entry.md)<!-- -->, [IsNever](./types-kit.isnever.md)

## Example


```ts
type Foo = [1, 2]
type Bar = { a: 1, b: 2 }

// Expect: [0 | 1, 1 | 2]
type EntryType = Entries<Foo>
// Expect: ['a' | 'b', 1 | 2][]
type EntryType2 = Entries<Bar>
```

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [Iterate](./types-kit.iterate.md)

## Iterate type

<b>Signature:</b>

```typescript
type Iterate<
  Start extends number,
  End extends number,
  Head extends readonly unknown[],
  Tail extends readonly unknown[],
  Result extends readonly unknown[],
  InRange extends boolean
> = Tail extends [infer X, ...infer XS]
  ? If<
      // if end is out of range
      IndexMatches<Head, Tail, End>,
      Result,
      If<
        // if start is out of range
        Or<[InRange, IndexMatches<Head, Tail, Start>]>,
        Iterate<Start, End, [...Head, X], XS, [...Result, X], true>,
        Iterate<Start, End, [...Head, X], XS, Result, false>
      >
    >
  : Result
```
<b>References:</b> [If](./types-kit.if.md)<!-- -->, [IndexMatches](./types-kit.indexmatches.md)<!-- -->, [Or](./types-kit.or.md)<!-- -->, [Iterate](./types-kit.iterate.md)

import { If, Or } from '../control-flow'

type Slice<
  Arr extends readonly unknown[],
  Start extends number = 0,
  End extends number = Arr['length']
> = Iterate<Start, End, [], Arr, [], false>

// Head is the already-processed items
// Tail is the yet-to-be-processed items
// Result is the result so-far
// InRange is whether we are currently past the start of the range
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

// if Index is out of range
type IndexMatches<
  Head extends readonly unknown[],
  Tail extends readonly unknown[],
  Index extends number
> = Head['length'] extends Index
  ? true
  : `-${Tail['length']}` extends `${Index}`
  ? true
  : false

import { Switch } from '../control-flow'

/**
 * Convert a tuple to an object, it can pass in a tag to modify the key value.
 * @example
 * ```ts
 * // Expect: { a: 'a'; b: 'b' }
 * type Foo = TupleToObject<['a', 'b']>
 * // Expect: { A: 'a'; B: 'b' }
 * type Bar = TupleToObject<['a', 'b'], 'Uppercase'>
 * ```
 */
export type TupleToObject<
  T,
  N extends
    | 'Uppercase'
    | 'Lowercase'
    | 'Capitalize'
    | 'Uncapitalize'
    | 'default' = 'default'
> = T extends readonly any[]
  ? {
      [P in T[number] as Switch<
        N,
        [
          ['Uppercase', Uppercase<P>],
          ['Lowercase', Lowercase<P>],
          ['Capitalize', Capitalize<P>],
          ['Uncapitalize', Uncapitalize<P>],
          P
        ]
      >]: P
    }
  : never

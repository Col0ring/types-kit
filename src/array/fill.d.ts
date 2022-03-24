type InternalFill<
  L extends number,
  V,
  Res extends readonly unknown[] = []
> = Res['length'] extends L ? Res : InternalFill<L, V, [...Res, V]>

/**
 * Create a tuple filled with V, and the length of the tuple is L.
 * @example
 * ```ts
 * // Expect: [number, number, number]
 * type Foo = Fill<3, number>
 * ```
 */
// notice: distributed condition type
export type Fill<L extends number, V> = L extends L ? InternalFill<L, V> : never

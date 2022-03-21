type InternalFill<
  L extends number,
  V,
  Res extends readonly unknown[] = []
> = Res['length'] extends L ? Res : InternalFill<L, V, [...Res, V]>
export type Fill<L extends number, V> = L extends L ? InternalFill<L, V> : never

export type IsExtends<A, B> = [A] extends [B] ? true : false

export type IsEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

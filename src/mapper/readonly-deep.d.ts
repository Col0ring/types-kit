import { Simplify } from './simplify'
import { StrictOmit } from './strict-omit'
import { Merge } from './merge'
import { UnionToIntersection } from '../union'
import { If, IsExtends, Or } from '../control-flow'

type InternalGetKeysDeep<T, P extends string = ''> = {
  [K in keyof T]: K extends string
    ? P extends ''
      ? T[K] extends Record<PropertyKey, any>
        ? K | InternalGetKeysDeep<T[K], K>
        : K
      : T[K] extends Record<PropertyKey, any>
      ? `${P}.${K}` | InternalGetKeysDeep<T[K], `${P}.${K}`>
      : `${P}.${K}`
    : never
}[keyof T]

type GetKeysDeep<T> = InternalGetKeysDeep<T>

type Get<T, K extends keyof T> = T[K]
type GetDeep<
  T,
  K extends GetKeysDeep<T>
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? Tail extends GetKeysDeep<T[Head]>
      ? GetDeep<T[Head], Tail>
      : never
    : never
  : K extends keyof T
  ? T[K]
  : never

type GetDeepPath<T, K extends GetKeysDeep<T>> = {
  [P in K as P extends `${infer Head}.${string}` ? Head : P]: [P] extends [
    `${infer Head}.${infer Tail}`
  ]
    ? // always true
      Head extends keyof T
      ? GetDeepPath<T[Head], Extract<Tail, GetKeysDeep<T[Head]>>>
      : never
    : // 'a' | 'a.b' | 'a.c' will be in this case, but only 'a' can pass
    P extends keyof T
    ? T[P]
    : never
}

type C = {
  a: {
    b: 1
  }
}

type CC = {
  a: {
    c: 2
  }
}
type QQ = Simplify<C & CC>

export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>
}

export type ReadonlyDeepPick<T, K extends GetKeysDeep<T>> = Merge<
  StrictOmit<T, Extract<K, keyof T>>,
  Merge<
    // has 'a', but not has 'a.b'
    Readonly<Pick<T, Extract<K, keyof T>>>,
    [Exclude<K, keyof T>] extends [`${infer Head}.${infer Tail}`]
      ? UnionToIntersection<
          Head extends keyof T
            ? Head extends OptionalKeys<T>
              ? If<
                  Or<[IsExtends<Head, ReadonlyKeys<T>>, IsExtends<Head, K>]>,
                  {
                    readonly [P in Head]?: Tail extends GetKeysDeep<T[P]>
                      ? ReadonlyDeepPick<T[P], Tail>
                      : never
                  },
                  {
                    [P in Head]?: Tail extends GetKeysDeep<T[P]>
                      ? ReadonlyDeepPick<T[P], Tail>
                      : never
                  }
                >
              : If<
                  Or<[IsExtends<Head, ReadonlyKeys<T>>, IsExtends<Head, K>]>,
                  {
                    readonly [P in Head]: Tail extends GetKeysDeep<T[P]>
                      ? ReadonlyDeepPick<T[P], Tail>
                      : never
                  },
                  {
                    [P in Head]: Tail extends GetKeysDeep<T[P]>
                      ? ReadonlyDeepPick<T[P], Tail>
                      : never
                  }
                >
            : // Head extends keyof T failed, means the last prop
              {}
        >
      : never
  >
>

interface Props {
  a: number
  b: {
    readonly value: number
    d: number
    g: number
  }
  readonly c: {
    v: number
  }
}

/**
 * type newProps = {
    a: number;
    readonly b?: Simplify<StrictOmit<StrictOmit<{
        readonly value: number;
        d: number;
        g: number;
    }, "d">, never> & Simplify<StrictOmit<Readonly<Pick<{
        readonly value: number;
        d: number;
        g: number;
    }, "d">>, never>>>;
    readonly c: Simplify<...>;
}
 */
type newProps = ReadonlyDeepPick<Props, 'b.d'>

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B

export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T]

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

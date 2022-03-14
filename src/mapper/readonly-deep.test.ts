import { Simplify } from './simplify'
import { StrictOmit } from './strict-omit'
import { Merge } from './merge'
import { UnionToIntersection } from '../union'
import { If, IsExtends, Or } from '../control-flow'
import { Expect } from '../test-util'
import { Keys } from './value'

type InternalGetKeysDeep<T, P extends string = ''> = {
  [K in keyof T]-?: K extends string
    ? P extends ''
      ? T[K] extends infer V
        ? V extends Record<PropertyKey, any>
          ? K | InternalGetKeysDeep<V, K>
          : K
        : never
      : T[K] extends infer V
      ? V extends Record<PropertyKey, any>
        ? `${P}.${K}` | InternalGetKeysDeep<V, `${P}.${K}`>
        : `${P}.${K}`
      : never
    : never
}[keyof T]

type GetKeysDeep<T> = InternalGetKeysDeep<T>

type GGG = GetKeysDeep<{
  a?: {
    b?: 2
    c: 3
  }
}>

type Get<T, K extends keyof T> = T[K]
type GetDeep<
  T,
  K extends GetKeysDeep<T>
> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? T[Head] extends infer V
      ? V extends Record<PropertyKey, any>
        ? Tail extends GetKeysDeep<V>
          ? GetDeep<V, Tail>
          : never
        : undefined
      : never
    : never
  : K extends keyof T
  ? T[K]
  : never

type GG = GetDeepPath<
  {
    a?: {
      b?: 2
      c?: {
        g: 1
      }
    }
  },
  'a.c.g' | 'a.b'
>
const gac: GG = {
  a: {
    b: undefined,
    c: {
      g: 1
    }
  }
}
// good
type GetDeepPath2<T, K extends GetKeysDeep<T>> = {
  [P in keyof T as P extends K
    ? P
    : K extends `${infer Head}.${string}`
    ? P extends Head
      ? P
      : never
    : never]: P extends K
    ? T[P]
    : [Exclude<K, keyof T>] extends [`${infer Head}.${infer Tail}`]
    ? P extends Head
      ? T[P] extends infer V
        ? V extends Record<PropertyKey, any>
          ? GetDeepPath2<V, Extract<Tail, GetKeysDeep<V>>>
          : V
        : never
      : never
    : never
}

type GetDeepPath<T, K extends GetKeysDeep<T>> = UnionToIntersection<
  K extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? {
          [P in keyof T as P extends Head ? P : never]: T[P] extends infer V
            ? V extends Record<PropertyKey, any>
              ? GetDeepPath<V, Extract<Tail, GetKeysDeep<V>>>
              : V
            : never
        }
      : never
    : {
        [P in keyof T as P extends K ? P : never]: T[P]
      }
>
type DP = GetDeepPath2<
  {
    a?:
      | {
          c?:
            | {
                d: 2
                g: 3
                h: 44
              }
            | 1
          e: 2
        }
      | 3
  },
  'a.c.d' | 'a.c.g' | 'a.c'
>

type Result = Expect<
  DP,
  {
    a?:
      | {
          c?:
            | {
                d: 2
                g: 3
                h: 44
              }
            | 1
        }
      | 3
  }
>

type C = {
  a: {
    c: {
      d: 2
    }
    e: 2
  }
}

type CC = {
  a: {
    c: {
      g: 2
    }
  }
}
type QQ = Simplify<C & CC>
const qq: DP = {
  a: {
    c: {
      g: 3,
      d: 2
    }
  }
}

export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>
}

export type ReadonlyDeepPick<T, K extends GetKeysDeep<T>> = Merge<
  StrictOmit<T, Extract<K, Keys<T>>>,
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
                    readonly [P in Head]?: T[P] extends infer V
                      ? V extends Record<PropertyKey, any>
                        ? Tail extends GetKeysDeep<V>
                          ? ReadonlyDeepPick<V, Tail>
                          : never
                        : V
                      : never
                  },
                  {
                    [P in Head]?: T[P] extends infer V
                      ? V extends Record<PropertyKey, any>
                        ? Tail extends GetKeysDeep<V>
                          ? ReadonlyDeepPick<V, Tail>
                          : never
                        : V
                      : never
                  }
                >
              : If<
                  Or<[IsExtends<Head, ReadonlyKeys<T>>, IsExtends<Head, K>]>,
                  {
                    readonly [P in Head]: T[P] extends infer V
                      ? V extends Record<PropertyKey, any>
                        ? Tail extends GetKeysDeep<V>
                          ? ReadonlyDeepPick<V, Tail>
                          : never
                        : V
                      : never
                  },
                  {
                    [P in Head]: T[P] extends infer V
                      ? V extends Record<PropertyKey, any>
                        ? Tail extends GetKeysDeep<V>
                          ? ReadonlyDeepPick<V, Tail>
                          : never
                        : V
                      : never
                  }
                >
            : // Head extends keyof T failed, means the last prop
              {}
        >
      : never
  >
>

type QA = ReadonlyDeepPick<
  {
    a: {
      c: number
      d: {
        e: number
      }
    }
    b: 2
  },
  'a'
>

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

interface Props {
  a: number
  readonly b?: {
    value?:
      | {
          c: number
          d: number
        }
      | number
    d: number
    g: number
  }
  readonly c: {
    v: number
  }
}

type newProps = ReadonlyDeepPick<Props, 'b.d' | 'a' | 'c.v' | 'b.value'>

type Test1 = Expect<
  {
    readonly a: number
    readonly b?: {
      value?:
        | {
            c: number
            d: number
          }
        | number
      readonly d: number
      g: number
    }
    readonly c: {
      readonly v: number
    }
  },
  newProps
>

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

type Test = ReadonlyKeys<Props>

const g: newProps = {
  a: 1,
  b: {
    value: {
      c: 2
    },
    d: 4,
    g: 44
  },
  c: {
    v: 1
  }
}
g.a = 2
g.c = {
  v: 1
}
g.c.v = 3

g.a = 2
g.b = {
  value: 1,
  d: 2,
  g: 3
}
g.b!.value = {
  c: 1,
  d: 2
}
g.b.d = 1
g.b!.value = 2
g.b!.value?.c = 2
g.b.g = 1

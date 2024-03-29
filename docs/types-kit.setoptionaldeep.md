<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types-kit](./types-kit.md) &gt; [SetOptionalDeep](./types-kit.setoptionaldeep.md)

## SetOptionalDeep type

Make some properties (includes deep properties) in T optional.

**Signature:**

```typescript
export type SetOptionalDeep<T, K extends DeepKeys<T>> = IsNever<
  Extract<K, Keys<T>>
> extends true
  ? // for tuple when not match the first level properties
    {
      [P in keyof T]: T[P] extends infer V
        ? V extends V
          ? IsObject<V> extends true
            ? SetOptionalDeep<
                V,
                // distributed condition type
                K extends `${infer Head}.${infer Tail}`
                  ? P extends Head
                    ? Extract<
                        Tail extends Tail
                          ? `${P}.${Tail}` extends K
                            ? Tail
                            : never
                          : never,
                        DeepKeys<V>
                      >
                    : never
                  : never
              >
            : V
          : never
        : never
    }
  : Simplify<
      {
        [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, IsExtends<P, K>]>,
          P,
          never
        >]?: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetOptionalDeep<
                  V,
                  // distributed condition type
                  K extends `${infer Head}.${infer Tail}`
                    ? P extends Head
                      ? Extract<
                          Tail extends Tail
                            ? `${P}.${Tail}` extends K
                              ? Tail
                              : never
                            : never,
                          DeepKeys<V>
                        >
                      : never
                    : never
                >
              : V
            : never
          : never
      } & {
        [P in keyof T as If<
          And<[IsExtends<P, Keys<T>>, Not<IsExtends<P, K>>]>,
          P,
          never
        >]: T[P] extends infer V
          ? V extends V
            ? IsObject<V> extends true
              ? SetOptionalDeep<
                  V,
                  // distributed condition type
                  K extends `${infer Head}.${infer Tail}`
                    ? P extends Head
                      ? Extract<
                          Tail extends Tail
                            ? `${P}.${Tail}` extends K
                              ? Tail
                              : never
                            : never,
                          DeepKeys<V>
                        >
                      : never
                    : never
                >
              : V
            : never
          : never
      }
    >
```
**References:** [DeepKeys](./types-kit.deepkeys.md)<!-- -->, [IsNever](./types-kit.isnever.md)<!-- -->, [Keys](./types-kit.keys.md)<!-- -->, [IsObject](./types-kit.isobject.md)<!-- -->, [SetOptionalDeep](./types-kit.setoptionaldeep.md)<!-- -->, [Simplify](./types-kit.simplify.md)<!-- -->, [If](./types-kit.if.md)<!-- -->, [And](./types-kit.and.md)<!-- -->, [IsExtends](./types-kit.isextends.md)<!-- -->, [Not](./types-kit.not.md)

## Example


```ts
interface Props {
       a: {
         b?: number
         readonly c: {
           d: number
         }
       }
       e: number
     }
     // Expect: {
     //    a?: {
     //     b?: number | undefined
     //     readonly c: {
     //        d?: number
     //     }
     //   }
     //    e?: number
     // }
     type NewProps = SetOptionalDeep<Props, 'e' | 'a' | 'a.c.d'>
```


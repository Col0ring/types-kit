import { Keys } from '../mapper'
import { IsNever } from './value'

/**
 * @description Get the value type of an Iterable / AsyncIterable
 * @example
 * ```ts
 * function* IterableValueFoo() {
      yield 1
      yield 2
   }
   // Expect: 1 | 2
   type FooType = IterableValue<ReturnType<typeof IterableValueFoo>>
   async function* IterableValueBar() {
      yield 3
      yield 4
   }
   // Expect: 3 | 4
   type BarType = IterableValue<ReturnType<typeof IterableValueBar>>
 * ```
 */
export type IterableValue<T> = T extends Iterable<infer U>
  ? U
  : T extends AsyncIterable<infer U>
  ? U
  : never

export type ArrayEntry<T extends readonly unknown[]> = [number, T[number]]
export type MapEntry<T extends ReadonlyMap<unknown, unknown>> =
  T extends ReadonlyMap<infer K, infer V> ? [K, V] : never
export type ObjectEntry<T extends object> = [
  Keys<T> extends infer K ? (K extends number ? K : never) : never,
  T[Keys<T>]
]
export type SetEntry<T extends ReadonlySet<unknown>> = T extends ReadonlySet<
  infer U
>
  ? [U, U]
  : never

export type Entry<T> = T extends ReadonlyMap<unknown, unknown>
  ? MapEntry<T>
  : T extends ReadonlySet<unknown>
  ? SetEntry<T>
  : T extends readonly unknown[]
  ? ArrayEntry<T>
  : T extends object
  ? ObjectEntry<T>
  : never

export type Entries<T> = Entry<T> extends infer E
  ? IsNever<E> extends true
    ? never
    : E[]
  : never

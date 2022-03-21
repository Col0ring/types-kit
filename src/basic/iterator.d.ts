import { Keys } from '../mapper'
import { IsTuple } from './array'
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

/**
 * @description return the type of that array's entry.
 * @example
 * ```ts
 * type Foo = [1, 2]
 *
 * // Expect: [number, 1 | 2]
 * type EntryType = ArrayEntry<Foo>
 * ```
 */
export type ArrayEntry<T extends readonly unknown[]> = [number, T[number]]
/**
 * @description return the type of that map's entry.
 * @example
 * ```ts
 * type Foo = Map<number, string>
 *
 * // Expect: [number, string]
 * type EntryType = MapEntry<Foo>
 */
export type MapEntry<T extends ReadonlyMap<unknown, unknown>> =
  T extends ReadonlyMap<infer K, infer V> ? [K, V] : never
/**
 * @description return the type of that object's entry.
 * @example
 * ```ts
 * type Foo = { a:1, b:2 }
 *
 * // Expect: ['a' | 'b', 1 | 2]
 * type EntryType = ObjectEntry<Foo>
 */
export type ObjectEntry<T extends object> = [
  Keys<T> extends infer K
    ? T extends readonly unknown[]
      ? K extends number
        ? K
        : never
      : K
    : never,
  T[Keys<T>]
]
/**
 * @description return the type of that set's entry.
 * @example
 * ```ts
 * type Foo = Set<number>
 *
 * // Expect: [number, number]
 * type EntryType = SetEntry<Foo>
 */
export type SetEntry<T extends ReadonlySet<unknown>> = T extends ReadonlySet<
  infer U
>
  ? [U, U]
  : never

/**
 * @description return the type of that collection's entry.
 * @example
 * ```ts
 * type Foo = [1, 2]
 * type Bar = { a: 1, b: 2 }
 *
 * // Expect: [0 | 1, 1 | 2]
 * type EntryType = Entry<Foo>
 * // Expect: ['a' | 'b', 1 | 2]
 * type EntryType2 = Entry<Bar>
 */
export type Entry<T> = T extends ReadonlyMap<unknown, unknown>
  ? MapEntry<T>
  : T extends ReadonlySet<unknown>
  ? SetEntry<T>
  : T extends readonly unknown[]
  ? IsTuple<T> extends true
    ? ObjectEntry<T>
    : ArrayEntry<T>
  : T extends object
  ? ObjectEntry<T>
  : never

/**
 * @description return the type of that collection's entries.
 * @example
 * ```ts
 * type Foo = [1, 2]
 * type Bar = { a: 1, b: 2 }
 *
 * // Expect: [0 | 1, 1 | 2][]
 * type EntryType = Entries<Foo>
 * // Expect: ['a' | 'b', 1 | 2][]
 * type EntryType2 = Entries<Bar>
 */
export type Entries<T> = Entry<T> extends infer E
  ? IsNever<E> extends true
    ? never
    : E[]
  : never

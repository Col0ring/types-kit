import { Simplify } from './simplify'
import { StrictOmit } from './strict-omit'
import { Keys } from './value'

/**
 *
 * @description Make all properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 *    interface Props {
 *      readonly a: number;
 *      readonly b: number;
 *      readonly c: number;
 *    };
 *    // Expect: { a: number; b: number; c: number; }
 *    type NewProps = Mutable<Props>;
 * ```
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 *
 * @description Make some properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 * interface Props {
     readonly a: number;
     readonly b: number;
     readonly c: number;
   };
  // Expect: {  a: number;  b: number; readonly c: number; }
  type newProps = ReadonlyPick<Props, 'a' | 'b'>;
 * ```
 */
export type MutablePick<T, K extends Keys<T>> = Simplify<
  StrictOmit<T, K> & Mutable<Pick<T, K>>
>

/**
 *
 * @description Make all properties (includes deep properties) in T mutable (remove readonly decorator)
 * @example
 * ```ts
 * interface Props {
     readonly a: {
       readonly d: number
     };
     readonly b: number;
     readonly c: number;
   };
  // Expect: { a: { d: number }; b: number; c: number; }
  type newProps = MutableDeep<Props>;
 * ```
 */
// here we use keyof T, which can allow us return a array at the end
export type MutableDeep<T> = {
  -readonly [P in keyof T]: MutableDeep<T[P]>
}

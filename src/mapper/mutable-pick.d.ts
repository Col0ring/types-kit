import { StrictOmit } from './strict-omit'
import { Mutable } from './mutable'
import { Simplify } from './simplify'

/**
 *
 * @description Make some properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 *    interface Props {
 *      readonly a: 1;
 *      readonly b: 2;
 *      readonly c: 3;
 *    };
 *    // Expect: { a: 1; b: 2; readonly c: 3; }
 *    type newProps = MutablePick<Props, 'a' | 'b'>;
 * ```
 */
export type MutablePick<T, K extends keyof T> = Simplify<
  StrictOmit<T, K> & Mutable<Pick<T, K>>
>

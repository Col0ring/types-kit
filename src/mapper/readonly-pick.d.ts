/**
 *  Readonly is build-in
 */

import { StrictOmit } from './strict-omit'
import { Simplify } from './simplify'

/**
 *
 * @description Make some properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 *    interface Props {
 *       a: 1;
 *       b: 2;
 *       c: 3;
 *    };
 *    // Expect: { readonly a: 1; readonly b: 2; c: 3; }
 *    type newProps = ReadonlyPick<Props, 'a' | 'b'>;
 * ```
 */

export type ReadonlyPick<T, K extends keyof T> = Simplify<
  StrictOmit<T, K> & Readonly<Pick<T, K>>
>

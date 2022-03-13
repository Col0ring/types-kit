/**
 *
 * @description Make all properties in T mutable (remove readonly decorator)
 * @example
 * ```ts
 *    interface Props {
 *      readonly a: 1;
 *      readonly b: 2;
 *      readonly c: 3;
 *    };
 *    // Expect: { a: 1; b: 2; c: 3; }
 *    type NewProps = Mutable<Props>;
 * ```
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

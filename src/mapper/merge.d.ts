import { StrictOmit } from './strict-omit'
import { Simplify } from './simplify'

/**
 * @description Merge two types into a new type. Keys of the second type overrides keys of the first type.
 * @example
 * ```ts
    interface Foo {
        a: number;
        b: string;
    };
    interface Bar {
        b: number;
    };
    // Except: { a: number, b: number }
    type newProps = Merge<Foo, Bar>
    ```
 */
export type Merge<F, S> = Simplify<StrictOmit<F, Extract<keyof F, keyof S>> & S>

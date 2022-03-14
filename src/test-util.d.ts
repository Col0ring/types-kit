import { IsEquals } from './control-flow'

export type Expect<T, U> = IsEquals<T, U>

export type Test<T extends true[]> = T

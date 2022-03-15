import { IsEquals, IsExtends } from './control-flow'

export type Expect<T, U> = IsEquals<T, U>

export type ExpectMatch<T, U> = IsExtends<T, U>

export type Test<T extends true[]> = T

export type Group<T extends true[]> = T extends true[] ? true : false

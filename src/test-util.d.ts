import { IsEquals, IsExtends } from './control-flow'

export type SuccessTest = {
  result: true
  first: any
  second: any
}
export type FailTest = {
  result: false
  first: any
  second: any
}

export type Expect<T, U> = {
  result: IsEquals<T, U>
  first: T
  second: U
}

export type ExpectMatch<T, U> = {
  result: IsExtends<T, U>
  first: T
  second: U
}

export type Test<T extends SuccessTest[]> = T extends SuccessTest[]
  ? true
  : false

export type Group<T extends SuccessTest[]> = T extends SuccessTest[]
  ? SuccessTest
  : FailTest

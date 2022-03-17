import { IsEquals, IsExtends } from './control-flow'

export type SuccessTestResult = {
  result: true
  first: any
  second: any
}
export type FailTestResult = {
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

export type Group<T extends SuccessTestResult[]> = T extends SuccessTestResult[]
  ? SuccessTestResult
  : FailTestResult

export type Test<T extends SuccessTestResult[]> = T extends SuccessTestResult[]
  ? true
  : false

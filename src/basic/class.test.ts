import { Expect, Test } from '../test-utils'
import { Constructor, Class } from './class'

type TestConstructor = Expect<
  Constructor<{ a: number; b: string }, [a: number, b: string]>,
  { new (a: number, b: string): { a: number; b: string } }
>

type TestClass = Expect<
  Class<{ a: number; b: string }, [a: number, b: string]>,
  { new (a: number, b: string): { a: number; b: string } } & {
    prototype: {
      a: number
      b: string
    }
  }
>

export type Result = Test<[TestConstructor, TestClass]>

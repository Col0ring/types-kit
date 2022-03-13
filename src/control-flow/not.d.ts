import { IsFalsy } from '../basic'
import { If } from './if'

export type Not<T> = If<IsFalsy<T>, true, false>

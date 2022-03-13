export type MutableDeep<T> = {
  -readonly [P in keyof T]: MutableDeep<T[P]>
}

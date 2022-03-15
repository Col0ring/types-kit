export type Constructor<T, P extends unknown[] = unknown[]> = new (
  ...args: P
) => T

export type Class<T, P extends unknown[] = unknown[]> = Constructor<T, P> & {
  prototype: T
}

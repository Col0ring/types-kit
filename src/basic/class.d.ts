export type Constructor<T, P extends unknown[] = any[]> = new (...args: P) => T

export type Class<T, P extends unknown[] = any[]> = Constructor<T, P> & {
  prototype: T
}

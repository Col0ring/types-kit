/**
 * Create a constructor type.
 */
export type Constructor<T, P extends unknown[] = unknown[]> = new (
  ...args: P
) => T

/**
 * Create a class type.
 */
export type Class<T, P extends unknown[] = unknown[]> = Constructor<T, P> & {
  prototype: T
}

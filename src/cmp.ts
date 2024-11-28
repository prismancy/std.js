/**
 * @module
 * Simple comparison functions
 */

export type Compare<T> = (a: T, b: T) => number;

export const ascend = <T>(a: T, b: T): number =>
  a < b ? -1
  : a > b ? 1
  : 0;
export const descend = <T>(a: T, b: T): number => -ascend(a, b);

export const ascendBy =
  <T, U>(f: (x: T) => U): Compare<T> =>
  (a: T, b: T) =>
    ascend(f(a), f(b));
export const descendBy =
  <T, U>(f: (x: T) => U): Compare<T> =>
  (a: T, b: T) =>
    descend(f(a), f(b));

import { dual } from "../fn";
import { type Repeat, type uint } from "../types";

/**
 * Splits an iterable into equally-sized sub arrays
 * @param iter
 * @param size the length of each chunk
 * @returns the chunks
 */
export const chunk: {
  <T, N extends uint>(first: Iterable<T>, size: N): Generator<Repeat<T, N>>;
  <T, N extends uint>(size: N): (first: Iterable<T>) => Generator<Repeat<T, N>>;
} = dual(function* <T, N extends uint>(iter: Iterable<T>, size: N) {
  let result: T[] = [];
  for (const value of iter) {
    result.push(value);
    if (result.length === size) {
      yield result as Repeat<T, N>;
      result = [];
    }
  }

  if (result.length) yield result as Repeat<T, N>;
});

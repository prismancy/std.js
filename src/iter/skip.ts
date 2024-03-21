import { dual } from "../fn/mod.ts";
import { type uint } from "../types.ts";

/**
 * Skips over the first `n` values of an iterable
 * @param iter
 * @param n number of values to skip over
 */
export const skip: {
  <T>(iter: Iterable<T>, n: uint): Generator<T>;
  <T>(n: uint): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T>(iter: Iterable<T>, n: uint) {
  let count = 0;
  for (const value of iter) {
    if (++count > n) yield value;
  }
});

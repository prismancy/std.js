import { dual } from "../fn";
import { type uint } from "../types";

export const slidingWindow: {
  <T>(
    iter: Iterable<T>,
    { size, partial }: { size: uint; partial?: boolean },
  ): Generator<T[]>;
  <T>({
    size,
    partial,
  }: {
    size: uint;
    partial?: boolean;
  }): (iter: Iterable<T>) => Generator<T[]>;
} = dual(function* <T>(
  iter: Iterable<T>,
  { size, partial }: { size: uint; partial?: boolean },
): Generator<T[]> {
  const window: T[] = [];
  for (const value of iter) {
    window.push(value);
    if (window.length > size) window.shift();
    if (window.length === size || partial) yield [...window];
  }

  if (partial) {
    while (window.length > 1) {
      window.shift();
      yield [...window];
    }
  }
});

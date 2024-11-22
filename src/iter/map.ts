import { dual } from "../fn";

export const map: {
  <T, U>(iter: Iterable<T>, fn: (value: T) => U): Generator<U>;
  <T, U>(fn: (value: T) => U): (iter: Iterable<T>) => Generator<U>;
} = dual(function* <T, U>(iter: Iterable<T>, fn: (item: T) => U) {
  for (const item of iter) {
    yield fn(item);
  }
});

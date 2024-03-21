import { dual } from "../fn/mod.ts";

/**
 * Checks if one of the items in an iterable passes a `predicate`
 * @param iter
 * @param predicate a function to test each item
 */
export const some: {
  <T>(iter: Iterable<T>, predicate: (item: T) => unknown): boolean;
  <T>(predicate: (item: T) => unknown): (iter: Iterable<T>) => boolean;
} = dual(<T>(iter: Iterable<T>, predicate: (item: T) => unknown) => {
  for (const item of iter) {
    if (predicate(item)) return true;
  }

  return false;
});

import { dual } from "../fn";
import { pickByKeys } from "../object";
import { type AnyRecord } from "../types";

/**
 * Using an iterable of objects, extract part of each object
 * @param iter
 * @param keys an array of keys in each object or a single key
 * @returns the iterator of object only containing the keys specified
 */
export const pick: {
  <T extends AnyRecord, K extends keyof T>(
    iter: Iterable<T>,
    key: K,
  ): Generator<T[K]>;
  <T extends AnyRecord, K extends keyof T>(
    key: K,
  ): (iter: Iterable<T>) => Generator<T[K]>;
  <T extends AnyRecord, K extends keyof T>(
    iter: Iterable<T>,
    keys: K[],
  ): Generator<Pick<T, K>>;
  <T extends AnyRecord, K extends keyof T>(
    keys: K[],
  ): (iter: Iterable<T>) => Generator<Pick<T, K>>;
} = dual(function* <T extends AnyRecord, K extends keyof T>(
  iter: Iterable<T>,
  keys: K | K[],
) {
  if (Array.isArray(keys)) {
    for (const item of iter) {
      yield pickByKeys(item, keys);
    }
  } else {
    for (const item of iter) {
      yield item[keys];
    }
  }
});

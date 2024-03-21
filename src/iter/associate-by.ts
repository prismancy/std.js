import { dual } from "../fn/mod.ts";
import { type AnyRecord } from "../types.ts";

export const associateBy: {
  <T extends AnyRecord, K extends keyof T>(
    first: Iterable<T>,
    key: K,
  ): Map<T[K], T>;
  <T extends AnyRecord, K extends keyof T>(
    key: K,
  ): (first: Iterable<T>) => Map<T[K], T>;
} = dual(
  <T extends AnyRecord, K extends keyof T>(array: Iterable<T>, key: K) => {
    const map = new Map<T[K], T>();
    for (const item of array) {
      map[item[key]] = item;
    }

    return map;
  },
);

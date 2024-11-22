import { dual } from "../fn";
import { type AnyRecord, type NonFalsy } from "../types";

/**
 * Allows values from an iterable based on a predicate function
 * @param iter
 * @param predicate a function that filters based on the truthiness of the return value
 */
export const filter: {
  <T>(iter: Iterable<T>, predicate: BooleanConstructor): Generator<NonFalsy<T>>;
  <T>(
    predicate: BooleanConstructor,
  ): (iter: Iterable<T>) => Generator<NonFalsy<T>>;
  <T, S extends T>(
    iter: Iterable<T>,
    predicate: (value: T) => value is S,
  ): Generator<S>;
  <T, S extends T>(
    predicate: (value: T) => value is S,
  ): (iter: Iterable<T>) => Generator<S>;
  <T>(iter: Iterable<T>, predicate: (value: T) => unknown): Generator<T>;
  <T>(predicate: (value: T) => unknown): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T, S extends T>(
  iter: Iterable<T>,
  predicate:
    | ((value: T) => value is S)
    | ((value: T) => unknown)
    | BooleanConstructor,
) {
  for (const value of iter) {
    if (predicate(value)) yield value as S;
  }
});

export const filterByKey: {
  <T extends AnyRecord>(iter: Iterable<T>, key: keyof T): Generator<T>;
  <T extends AnyRecord>(key: keyof T): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T extends AnyRecord>(iter: Iterable<T>, key: keyof T) {
  for (const value of iter) {
    if (value[key]) yield value;
  }
});

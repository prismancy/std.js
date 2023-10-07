import { type NonFalsy } from "../types";

/**
 * Allows values from an iterable based on a predicate function
 * @param iter
 * @param predicate a function that filters based on the truthiness of the return value
 */
export function filter<T>(
	iter: Iterable<T>,
	predicate: BooleanConstructor,
): Generator<NonFalsy<T>>;
export function filter<T, S extends T>(
	iter: Iterable<T>,
	predicate: (value: T) => value is S,
): Generator<S>;
export function filter<T>(
	iter: Iterable<T>,
	predicate: (value: T) => unknown,
): Generator<T>;
export function* filter<T, S extends T>(
	iter: Iterable<T>,
	predicate:
		| ((value: T) => value is S)
		| ((value: T) => unknown)
		| BooleanConstructor,
) {
	for (const value of iter) {
		if (predicate(value)) yield value as S;
	}
}

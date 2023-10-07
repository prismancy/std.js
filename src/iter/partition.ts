import { type NonFalsy } from "../types";

/**
 * Splits an iterable into two halves based on a condition
 * @param iter
 * @param predicate a function to test each item
 * @returns a tuple with items that either pass or fail the `predicate`
 */
export function partition<T>(
	iter: Iterable<T>,
	predicate: BooleanConstructor,
): [pass: Array<NonFalsy<T>>, fail: T[]];
export function partition<T, S extends T>(
	iter: Iterable<T>,
	predicate: (value: T) => value is S,
): [pass: S[], fail: T[]];
export function partition<T, S extends T>(
	iter: Iterable<T>,
	predicate: (value: T) => unknown,
): [pass: T[], fail: T[]];
export function partition<T, S extends T>(
	iter: Iterable<T>,
	predicate:
		| ((value: T) => value is S)
		| ((value: T) => unknown)
		| BooleanConstructor,
) {
	const pass: T[] = [];
	const fail: T[] = [];
	for (const item of iter) {
		if (predicate(item)) pass.push(item);
		else fail.push(item);
	}

	return [pass, fail];
}

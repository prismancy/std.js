import { dual } from "../fn";
import { type NonFalsy } from "../types";

/**
 * Splits an iterable into two halves based on a condition
 * @param iter
 * @param predicate a function to test each item
 * @returns a tuple with items that either pass or fail the `predicate`
 */
// @ts-expect-error `dual` doesn't support generics
export const partition: {
	<T>(
		iter: Iterable<T>,
		predicate: BooleanConstructor,
	): [pass: Array<NonFalsy<T>>, fail: T[]];
	<T>(
		predicate: BooleanConstructor,
	): (iter: Iterable<T>) => [pass: Array<NonFalsy<T>>, fail: T[]];
	<T, S extends T>(
		iter: Iterable<T>,
		predicate: (value: T) => value is S,
	): [pass: S[], fail: T[]];
	<T, S extends T>(
		predicate: (value: T) => value is S,
	): (iter: Iterable<T>) => [pass: S[], fail: T[]];
	<T>(
		iter: Iterable<T>,
		predicate: (value: T) => unknown,
	): [pass: T[], fail: T[]];
	<T>(
		predicate: (value: T) => unknown,
	): (iter: Iterable<T>) => [pass: T[], fail: T[]];
} = dual(
	<T, S extends T>(
		iter: Iterable<T>,
		predicate:
			| ((value: T) => value is S)
			| ((value: T) => unknown)
			| BooleanConstructor,
	) => {
		const pass: T[] = [];
		const fail: T[] = [];
		for (const item of iter) {
			if (predicate(item)) pass.push(item);
			else fail.push(item);
		}

		return [pass, fail];
	},
);

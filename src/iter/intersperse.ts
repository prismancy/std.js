import { dual } from "../fn/mod.ts";

/**
 * Inserts a `separator` value between each value of the iterable
 * @param iter
 * @param separator the value to insert between each value of the iterable
 */
export const intersperse: {
	<T, U>(first: Iterable<T>, separator: U): Generator<T | U>;
	<T, U>(separator: U): (first: Iterable<T>) => Generator<T | U>;
} = dual(function* <T, U>(iter: Iterable<T>, separator: U) {
	let first = true;
	for (const value of iter) {
		if (first) first = false;
		else yield separator;
		yield value;
	}
});

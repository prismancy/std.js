import { dual } from "../fn/mod.ts";
import { type uint } from "../types.ts";
import { range } from "./range.ts";

/**
 * Repeats an iterable `n` times
 * @param iter
 * @param n the number of times to repeat the iterable
 */
export const repeat: {
	<T>(iter: Iterable<T>, n: uint): Generator<T>;
	<T>(n: uint): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T>(iter: Iterable<T>, n: uint) {
	const values: T[] = [];
	for (const i of range(n)) {
		if (i) {
			for (const value of values) {
				yield value;
			}
		} else {
			for (const value of iter) {
				yield value;
				values.push(value);
			}
		}
	}
});

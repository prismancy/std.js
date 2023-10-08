import { dual } from "../fn";
import { range } from "./range";

/**
 * Repeats an iterable `n` times
 * @param iter
 * @param n the number of times to repeat the iterable
 */
export const repeat: {
	<T>(iter: Iterable<T>, n: number): Generator<T>;
	<T>(n: number): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T>(iter: Iterable<T>, n: number) {
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

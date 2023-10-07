import { range } from "./range";

/**
 * Repeats an iterable `n` times
 * @param iter
 * @param n the number of times to repeat the iterable
 */
export function* repeat<T>(iter: Iterable<T>, n: number) {
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
}

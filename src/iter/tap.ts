/**
 * Calls a function on each value of an iterable without modifying
 * @param iter
 * @param fn a function to call on each value
 */
export function* tap<T>(iter: Iterable<T>, fn: (value: T) => unknown) {
	for (const value of iter) {
		fn(value);
		yield value;
	}
}

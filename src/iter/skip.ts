/**
 * Skips over the first `n` values of an iterable
 * @param iter
 * @param n number of values to skip over
 */
export function* skip<T>(iter: Iterable<T>, n: number) {
	let count = 0;
	for (const value of iter) {
		if (++count > n) yield value;
	}
}

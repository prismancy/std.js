/**
 * Take the first n values from an iterable
 * @param iter
 * @param n number of values to take
 */
export function* take<T>(iter: Iterable<T>, n: number) {
	let count = 0;
	for (const value of iter) {
		if (count++ < n) yield value;
		else break;
	}
}

/**
 * Loops an iterable infinitely
 * @param iter
 */
export function* cycle<T>(iter: Iterable<T>): Iterator<T> {
	const values: T[] = [];
	for (const value of iter) {
		yield value;
		values.push(value);
	}

	while (values.length) {
		for (const value of values) {
			yield value;
		}
	}
}

/**
 * Loops an iterable infinitely
 * @param iter
 */
export function* cycle<T>(iter: Iterable<T>) {
	const saved: T[] = [];
	for (const value of iter) {
		yield value;
		saved.push(value);
	}

	while (saved.length) {
		for (const value of saved) {
			yield value;
		}
	}
}

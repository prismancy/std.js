/**
 * Counts the number of values from an iterable
 * @param iter
 */
export function count<T>(iter: Iterable<T>) {
	let count = 0;
	for (const _ of iter) {
		count++;
	}

	return count;
}

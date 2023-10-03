/**
 * Gets a certain value from an iterable based on sequence number
 * @param iter
 * @param n a zero-based index
 */
export function nth<T>(iter: Iterable<T>, n: number) {
	let i = 0;
	for (const value of iter) {
		if (i++ === n) return value;
	}

	return undefined;
}

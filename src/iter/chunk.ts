/**
 * Splits an iterable into equally-sized sub arrays
 * @param iter
 * @param size the length of each chunk
 * @returns the chunks
 */
export function* chunk<T>(iter: Iterable<T>, size: number) {
	const result: T[] = [];
	for (const value of iter) {
		result.push(value);
		if (result.length === size) {
			yield result;
			result.length = 0;
		}
	}

	if (result.length) yield result;
}

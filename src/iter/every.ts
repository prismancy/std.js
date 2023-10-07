/**
 * Checks if every item in an iterable passes a `predicate`
 * @param iter
 * @param predicate a function to test each item
 */
export function every<T>(
	iter: Iterable<T>,
	predicate: (item: T) => unknown = Boolean,
) {
	for (const item of iter) {
		if (!predicate(item)) return false;
	}

	return true;
}

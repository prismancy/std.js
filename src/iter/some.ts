/**
 * Checks if one of the items in an iterable passes a `predicate`
 * @param iter
 * @param predicate a function to test each item
 */
export function some<T>(
	iter: Iterable<T>,
	predicate: (item: T) => unknown = Boolean,
) {
	for (const item of iter) {
		if (predicate(item)) return true;
	}

	return false;
}

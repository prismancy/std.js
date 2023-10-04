/**
 * Splits an iterable into two halves based on a condition
 * @param iter
 * @param predicate a function to test each item
 * @returns a tuple with items that either pass or fail the `predicate`
 */
export function partition<T>(
	iter: Iterable<T>,
	predicate: (item: T) => any,
): [pass: T[], fail: T[]] {
	const pass: T[] = [];
	const fail: T[] = [];
	for (const item of iter) {
		if (predicate(item)) pass.push(item);
		else fail.push(item);
	}

	return [pass, fail];
}

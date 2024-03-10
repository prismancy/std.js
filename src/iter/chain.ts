/**
 * Runs through all the iterables in order, yielding each value in turn
 * @param iterables
 */
export function* chain<T>(...iterables: Array<Iterable<T>>): Iterator<T> {
	for (const iterable of iterables) {
		yield* iterable;
	}
}

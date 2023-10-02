/**
 * Allows values from an iterable based on a predicate function
 * @param iter
 * @param predicate a function that filters based on the truthiness of the return value
 */
export function* filter<T>(iter: Iterable<T>, predicate: (value: T) => any) {
	for (const value of iter) {
		if (predicate(value)) yield value;
	}
}

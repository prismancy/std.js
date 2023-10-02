/**
 * Inserts a `separator` value between each value of the iterable
 * @param iter
 * @param separator the value to insert between each value of the iterable
 */
export function* intersperse<T, U>(iter: Iterable<T>, separator: U) {
	let first = true;
	for (const value of iter) {
		if (first) first = false;
		else yield separator;
		yield value;
	}
}

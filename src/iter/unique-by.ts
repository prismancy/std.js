export function* uniqueBy<T>(iter: Iterable<T>) {
	const seen = new Set();
	for (const item of iter) {
		if (!seen.has(item)) {
			seen.add(item);
			yield item;
		}
	}
}

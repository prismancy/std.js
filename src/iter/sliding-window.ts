export function* slidingWindow<T>(
	iter: Iterable<T>,
	{ size, partial }: { size: number; partial?: boolean },
): Iterator<T[]> {
	const window: T[] = [];
	for (const value of iter) {
		window.push(value);
		if (window.length > size) window.shift();
		if (window.length === size || partial) yield [...window];
	}
}

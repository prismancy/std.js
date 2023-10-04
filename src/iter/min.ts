export function min(iter: Iterable<number>) {
	let min = Number.POSITIVE_INFINITY;
	for (const value of iter) {
		if (value < min) min = value;
	}

	return min;
}

export function max(iter: Iterable<number>) {
	let max = Number.NEGATIVE_INFINITY;
	for (const value of iter) {
		if (value > max) max = value;
	}

	return max;
}

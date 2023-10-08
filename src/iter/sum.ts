export function sum(iter: Iterable<number>) {
	let total = 0;
	for (const value of iter) {
		total += value;
	}

	return total;
}

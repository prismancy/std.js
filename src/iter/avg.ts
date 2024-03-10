export function avg(iter: Iterable<number>): number {
	let total = 0;
	let count = 0;
	for (const value of iter) {
		total += value;
		count++;
	}

	return total / count;
}

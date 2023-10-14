export function min(iter: Iterable<number>) {
	let min = Number.POSITIVE_INFINITY;
	for (const value of iter) {
		if (value < min) min = value;
	}

	return min;
}

export function max(iter: Iterable<number>) {
	let max = Number.NEGATIVE_INFINITY;
	for (const value of iter) {
		if (value > max) max = value;
	}

	return max;
}

export function minmax(...nums: number[]): [min: number, max: number] {
	return [min(nums), max(nums)];
}

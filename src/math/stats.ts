export function min(array: number[]): number {
	let min = Number.POSITIVE_INFINITY;
	for (const x of array) {
		if (x < min) min = x;
	}

	return min;
}

export function max(array: number[]): number {
	let max = Number.NEGATIVE_INFINITY;
	for (const x of array) {
		if (x > max) max = x;
	}

	return max;
}

export function minmax(...nums: number[]): [min: number, max: number] {
	return [min(nums), max(nums)];
}

export function sum(array: number[]): number {
	return array.reduce((sum, current) => sum + current, 0);
}

export function mean(array: number[]): number {
	const { length } = array;
	if (!length) return 0;
	return sum(array) / length;
}

export const average = mean;

export function median(array: number[]): number {
	const { length } = array;
	if (!length) return 0;
	const sorted = [...array].sort((a, b) => a - b);
	if (length % 2) return sorted[length / 2]!;
	return (sorted[length / 2 - 1]! + sorted[length / 2]!) / 2;
}

export function mode(array: number[]): number[] {
	const counts: Record<number, number> = {};
	for (const n of array) {
		if (counts[n]) counts[n]++;
		else counts[n] = 1;
	}

	const sortedCounts = Object.entries(counts).sort((a, b) => a[1] - b[1]);
	const sortedNumbers = sortedCounts.map(n => n[1]);
	return sortedNumbers.filter(n => n === sortedCounts[0]![1]);
}

export function variance(array: number[]): number {
	const m = mean(array);
	return mean(array.map(n => (n - m) ** 2));
}

export function stddev(array: number[]): number {
	return Math.sqrt(variance(array));
}

export function meanAbsDev(array: number[]): number {
	const m = mean(array);
	return mean(array.map(n => n - m));
}

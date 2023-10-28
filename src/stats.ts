import { sortByKeys } from "./array";
import { descend } from "./cmp";
import { map, tee } from "./iter";

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

export function minmax(iter: Iterable<number>): [min: number, max: number] {
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;
	for (const value of iter) {
		if (value < min) min = value;
		if (value > max) max = value;
	}

	return [min, max];
}

export function sum(iter: Iterable<number>) {
	let total = 0;
	for (const value of iter) {
		total += value;
	}

	return total;
}

export function product(iter: Iterable<number>) {
	let total = 1;
	for (const value of iter) {
		total *= value;
	}

	return total;
}

export function avg(iter: Iterable<number>) {
	let total = 0;
	let count = 0;
	for (const value of iter) {
		total += value;
		count++;
	}

	return total / count;
}

export function median(array: number[]) {
	const { length } = array;
	if (!length) return 0;
	const sorted = [...array].sort((a, b) => a - b);
	if (length % 2) return sorted[length / 2]!;
	return (sorted[length / 2 - 1]! + sorted[length / 2]!) / 2;
}

export function mode(iter: Iterable<number>) {
	const counts = new Map<number, number>();
	for (const n of iter) {
		const count = counts.get(n) || 0;
		counts.set(n, count + 1);
	}

	const sortedCounts = sortByKeys([...counts.entries()], 1, descend);
	const topEntry = sortedCounts[0];
	if (!topEntry) return [];
	const sortedNumbers = sortedCounts.map(n => n[1]);
	return sortedNumbers.filter(n => n === topEntry[1]);
}

export function variance(iter: Iterable<number>) {
	const [a, b] = tee(iter);
	const m = avg(a);
	return avg(
		map(b, n => {
			const d = n - m;
			return d * d;
		}),
	);
}

export function stddev(iter: Iterable<number>) {
	return Math.sqrt(variance(iter));
}

export function meanAbsDev(iter: Iterable<number>) {
	const [a, b] = tee(iter);
	const m = avg(a);
	return avg(map(b, n => n - m));
}

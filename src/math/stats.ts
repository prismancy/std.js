import { sortByKey } from "../array";
import { descend } from "../cmp";
import { avg, map, tee } from "../iter";

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

	const sortedCounts = sortByKey([...counts.entries()], 1, descend);
	const topEntry = sortedCounts[0];
	if (!topEntry) return [];
	const sortedNumbers = sortedCounts.map(n => n[1]);
	return sortedNumbers.filter(n => n === topEntry[1]);
}

export function variance(iter: Iterable<number>) {
	const [a, b] = tee(iter);
	const m = avg(a);
	return avg(map(b, n => (n - m) ** 2));
}

export function stddev(iter: Iterable<number>) {
	return Math.sqrt(variance(iter));
}

export function meanAbsDev(iter: Iterable<number>) {
	const [a, b] = tee(iter);
	const m = avg(a);
	return avg(map(b, n => n - m));
}

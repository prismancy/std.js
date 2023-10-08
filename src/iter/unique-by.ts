import { dual } from "../fn";

export const uniqueBy: {
	<T>(iter: Iterable<T>): Generator<T>;
	<T>(): (v: Iterable<T>) => Generator<T>;
} = dual(function* <T>(iter: Iterable<T>) {
	const seen = new Set();
	for (const item of iter) {
		if (!seen.has(item)) {
			seen.add(item);
			yield item;
		}
	}
});

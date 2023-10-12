import { dual } from "../fn";

export const uniqueBy: {
	<T, U>(iter: Iterable<T>, keyFn: (value: T) => U): Generator<T>;
	<T, U>(keyFn: (value: T) => U): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T, U>(iter: Iterable<T>, keyFn: (value: T) => U) {
	const seen = new Set<U>();
	for (const item of iter) {
		const key = keyFn(item);
		if (!seen.has(key)) {
			seen.add(key);
			yield item;
		}
	}
});

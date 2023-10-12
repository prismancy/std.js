import { dual } from "../fn";

export const unique: {
	<T>(iter: Iterable<T>): Generator<T>;
	<T>(): (iter: Iterable<T>) => Generator<T>;
} = dual(function* <T>(iter: Iterable<T>) {
	const seen = new Set<T>();
	for (const item of iter) {
		if (!seen.has(item)) {
			seen.add(item);
			yield item;
		}
	}
});

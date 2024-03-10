import { dual } from "../fn/mod.ts";
import { type Repeat } from "../types.ts";
import { map } from "./map.ts";
import { range } from "./range.ts";

/**
 * Returns a tuple of iterables, which all yield the same items as the original iterable
 * @param iter
 */
export const tee: {
	<T, N extends number = 2>(
		first: Iterable<T>,
		n?: N,
	): Repeat<IterableIterator<T>, N>;
	<T, N extends number = 2>(
		n?: N,
	): (first: Iterable<T>) => Repeat<IterableIterator<T>, N>;
} = dual(<T, N extends number = 2>(iter: Iterable<T>, n?: N) => {
	const values = [...iter];
	return [...map(range(n ?? 2), () => values[Symbol.iterator]())] as Repeat<
		IterableIterator<T>,
		N
	>;
});

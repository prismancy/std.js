import { dual } from "../fn";
import { type Repeat } from "../types";
import { map } from "./map";
import { range } from "./range";

/**
 * Returns a tuple of iterables, which all yield the same items as the original iterable
 * @param iter
 */
// @ts-expect-error `dual` doesn't support generics
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

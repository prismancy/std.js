import { type Any, type List } from "ts-toolbelt";
import { map } from "./map";
import { range } from "./range";

type Repeat<T, N extends number> = Any.Equals<N, number> extends 1
	? T[]
	: List.Repeat<T, N>;

/**
 * Returns a tuple of iterables, which all yield the same items as the original iterable
 * @param iter
 */
export function tee<T, N extends number = 2>(iter: Iterable<T>, n?: N) {
	const values = [...iter];
	return [...map(range(n ?? 2), () => values[Symbol.iterator]())] as Repeat<
		IterableIterator<T>,
		N
	>;
}

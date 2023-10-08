import { dual } from "../fn";
import { type Repeat } from "../types";

/**
 * Splits an iterable into equally-sized sub arrays
 * @param iter
 * @param size the length of each chunk
 * @returns the chunks
 */
// @ts-expect-error `dual` doesn't support generics
export const chunk: {
	<T, N extends number>(first: Iterable<T>, size: N): Generator<Repeat<T, N>>;
	<T, N extends number>(
		size: N,
	): (first: Iterable<T>) => Generator<Repeat<T, N>>;
} = dual(function* <T, N extends number>(iter: Iterable<T>, size: N) {
	const result: T[] = [];
	for (const value of iter) {
		result.push(value);
		if (result.length === size) {
			yield result as Repeat<T, N>;
			result.length = 0;
		}
	}

	if (result.length) yield result as Repeat<T, N>;
});

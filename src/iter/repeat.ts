/**
 * Repeats an iterable `n` times
 * @param iter
 * @param n the number of times to repeat the iterable
 */
export function* repeat<T>(iter: Iterable<T>, n: number): Iterator<T> {
	for (let i = 0; i < n; i++) {
		yield* iter;
	}
}

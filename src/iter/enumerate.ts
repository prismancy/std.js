export function* enumerate<T>(iter: Iterable<T>): Generator<[number, T]> {
	let i = 0;
	for (const value of iter) {
		yield [i++, value];
	}
}

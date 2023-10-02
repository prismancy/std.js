export function* enumerate<T>(iter: Iterable<T>): Iterator<[number, T]> {
	let i = 0;
	for (const value of iter) {
		yield [i++, value];
	}
}

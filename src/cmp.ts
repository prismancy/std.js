export type Compare<T> = (a: T, b: T) => number;

export const ascend = <T>(a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);
export const descend = <T>(a: T, b: T) => -ascend(a, b);

export const ascendBy =
	<T, U>(f: (x: T) => U) =>
	(a: T, b: T) =>
		ascend(f(a), f(b));
export const descendBy =
	<T, U>(f: (x: T) => U) =>
	(a: T, b: T) =>
		descend(f(a), f(b));

export type Compare = <T>(a: T, b: T) => number;

export const ascend: Compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
export const descend: Compare = (a, b) => -ascend(a, b);

export const ascendBy =
	<T, U>(f: (x: T) => U) =>
	(a: T, b: T) =>
		ascend(f(a), f(b));
export const descendBy =
	<T, U>(f: (x: T) => U) =>
	(a: T, b: T) =>
		descend(f(a), f(b));

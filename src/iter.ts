export const serial = (() => {
	let id = 1;
	return () => id++;
})();

export function range(max: number): Generator<number>;
export function range(
	min: number,
	max: number,
	step?: number,
): Generator<number>;
export function* range(min: number, max?: number, step = 1): Generator<number> {
	if (max === undefined) {
		yield* range(0, min);
	} else {
		const absStep = Math.abs(step);
		if (max > min) {
			for (let i = min; i < max; i += absStep) {
				yield i;
			}
		} else {
			for (let i = min; i > max; i -= absStep) {
				yield i;
			}
		}
	}
}

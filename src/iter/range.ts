import { type int } from "../types.ts";

export function range(max: int): Generator<int>;
export function range(
	min: number,
	max: number,
	step?: number,
): Generator<number>;
export function* range(min: number, max?: number, step = 1) {
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

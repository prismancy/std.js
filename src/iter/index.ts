export * from "./chain";
export * from "./count";
export * from "./cycle";
export * from "./enumerate";
export * from "./filter";
export * from "./first";
export * from "./last";
export * from "./nth";
export * from "./skip";
export * from "./sliding-window";
export * from "./take";
export * from "./tap";
export * from "./unzip";
export * from "./zip";

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

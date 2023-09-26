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
export function range(array: number[]): number;
export function* range(
	minOrMaxOrArray: number | number[],
	maxValue?: number,
	step = 1,
): number | Generator<number> {
	if (Array.isArray(minOrMaxOrArray))
		return Math.max(...minOrMaxOrArray) - Math.min(...minOrMaxOrArray);
	if (maxValue !== undefined) {
		const absStep = Math.abs(step);
		if (maxValue > minOrMaxOrArray) {
			for (let i = 0; i <= maxValue; i += absStep) {
				yield i;
			}
		} else {
			for (let i = maxValue; i >= minOrMaxOrArray; i -= absStep) {
				yield i;
			}
		}
	}

	return range(0, minOrMaxOrArray);
}

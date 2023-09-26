export function random(max?: number): number;
export function random(min?: number, max?: number): number;
export function random<T>(array: T[]): T[][number];
export function random<T>(
	min?: number | T[],
	max?: number,
): number | T[][number] | undefined {
	if (Array.isArray(min)) return min[Math.floor(Math.random() * min.length)];

	if (!min) return Math.random();
	if (!max) return Math.random() * min;
	const Min = Math.min(min, max);
	return (Math.max(min, max) - Min) * Math.random() + Min;
}

export function randomInt(min?: number, max?: number): number {
	return Math.floor(random(min, max));
}

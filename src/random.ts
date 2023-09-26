export function random(max?: number): number;
export function random(min?: number, max?: number): number;
export function random<T>(array: T[]): T[][number];
export function random(string: string): string;
export function random<T>(min?: number | T[] | string, max?: number) {
	if (Array.isArray(min)) return min[randomInt(min.length)];
	if (typeof min === "string") return min[randomInt(min.length)];

	if (!min) return Math.random();
	if (!max) return Math.random() * min;
	const Min = Math.min(min, max);
	return (Math.max(min, max) - Min) * Math.random() + Min;
}

export function randomInt(min?: number, max?: number) {
	return Math.floor(random(min, max));
}

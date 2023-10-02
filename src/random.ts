/**
 * Returns a random number from 0 to a maximum non-inclusive
 * @param max default 1
 */
export function random(max?: number): number;
/**
 * Returns a random number from a minimum inclusive to a maximum non-inclusive
 * @param min
 * @param max
 */
export function random(min?: number, max?: number): number;
/**
 * Returns a random from an array
 * @param array
 */
export function random<T>(array: T[]): T[][number];
/**
 * Returns a character from a string
 * @param string
 */
export function random(string: string): string;
export function random<T>(min?: number | T[] | string, max?: number) {
	if (Array.isArray(min)) return min[randomInt(min.length)];
	if (typeof min === "string") return min[randomInt(min.length)];

	if (!min) return Math.random();
	if (!max) return Math.random() * min;
	const Min = Math.min(min, max);
	return (Math.max(min, max) - Min) * Math.random() + Min;
}

/**
 * Returns a random number from 0 to a maximum inclusive
 * @param max default 1
 */
export function randomInt(max?: number): number;
/**
 * Returns a random number from a minimum inclusive to a maximum inclusive
 * @param min
 * @param max
 */
export function randomInt(min: number, max: number): number;
export function randomInt(min = 0, max?: number) {
	if (typeof max === "number") return Math.floor(random(min, max + 1));
	return Math.floor(random(min + 1));
}

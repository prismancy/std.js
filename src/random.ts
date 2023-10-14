import { swap } from "./array";

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
	if (Array.isArray(min)) return min[randomInt(min.length - 1)];
	if (typeof min === "string") return min[randomInt(min.length - 1)];

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

/**
 * Randomizes the order of items in an array in-place
 * @param array
 * @returns the original array
 */
export function shuffle<T extends ArrayLike<unknown>>(array: T) {
	for (let { length } = array, i = length - 1; i > 0; i--) {
		const j = randomInt(i);
		swap(array, i, j);
	}

	return array;
}

/**
 * Get random items from an array
 * @param array
 * @param n number of items to pick
 * @returns an array containing the random items
 */
export function sample<T>(array: ArrayLike<T>, n: number): T[];
/**
 * Get random characters from a string
 * @param string
 * @param n number of characters to pick
 * @returns a string of the random chars
 */
export function sample<T>(string: string, n: number): string;
export function sample<T>(
	array: ArrayLike<T> | string,
	n: number,
): T[] | string {
	if (!array.length || !n) return [];
	if (typeof array === "string") {
		let result = "";
		for (let i = 0; i < n; i++) {
			result += random(array);
		}

		return result;
	}

	return Array.from<T>({ length: n }).map(
		() => array[randomInt(array.length - 1)]!,
	);
}

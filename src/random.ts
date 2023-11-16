import { swap, unorderedRemove } from "./array";
import { type int, type uint } from "./types";

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
export function random(min?: number, max?: number) {
	if (!min) return Math.random();
	if (!max) return Math.random() * min;
	const Min = Math.min(min, max);
	return (Math.max(min, max) - Min) * Math.random() + Min;
}

/**
 * Returns a random number from 0 to a maximum inclusive
 * @param max default 1
 */
export function randomInt(max?: int): int;
/**
 * Returns a random number from a minimum inclusive to a maximum inclusive
 * @param min
 * @param max
 */
export function randomInt(min: int, max: int): int;
export function randomInt(min = 0, max?: int) {
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
 * Chooses a random character from a string
 * @param string
 */
export function choice<T>(string: string): string;
/**
 * Chooses a random item from an array
 * @param array
 */
export function choice<T>(array: ArrayLike<T>): T | undefined;
export function choice<T>(array: ArrayLike<T>) {
	return array[randomInt(array.length - 1)];
}

/**
 * Get random items from an array
 * @param array
 * @param n number of items to pick
 * @returns an array containing the random items
 */
export function choices<T>(array: ArrayLike<T>, n: uint): T[];
/**
 * Get random characters from a string
 * @param string
 * @param n number of characters to pick
 * @returns a string of the random chars
 */
export function choices<T>(string: string, n: uint): string;
export function choices<T>(array: ArrayLike<T>, n: uint): T[] | string {
	if (!array.length || !n) return [];
	if (typeof array === "string") {
		let result = "";
		for (let i = 0; i < n; i++) {
			result += choice(array);
		}

		return result;
	}

	return Array.from<T>({ length: n }).map(
		() => array[randomInt(array.length - 1)]!,
	);
}

/**
 * Chooses unique random items from an array
 * @param array
 * @param n number of items to pick
 * @returns an array containing the random items
 */
export function sample<T>(array: ArrayLike<T> & Iterable<T>, n: uint) {
	const copy = [...array];
	const result = Array.from<T>({ length: n });
	for (let i = 0; i < n; i++) {
		const index = randomInt(copy.length - 1);
		const item = unorderedRemove(copy, index);
		if (item) result[i] = item;
	}

	return result;
}

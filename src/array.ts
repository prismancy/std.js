import { zip } from "./iter";
import { random, randomInt } from "./random";
import { type Indexable } from "./types";

/**
 * Switches the positions of two values in an array in-place
 * @param array
 * @param i the first index
 * @param j the second index
 */
export function swap<T>(array: Indexable<T>, i: number, j: number) {
	const temp = array[i]!;
	array[i] = array[j]!;
	array[j] = temp;
}

/**
 * Randomizes the order of items in an array in-place
 * @param array
 * @returns the original array
 */
export function shuffle<T>(array: ArrayLike<T>) {
	for (let { length } = array, i = length - 1; i > 0; i--) {
		const j = randomInt(i);
		swap(array, i, j);
	}

	return array;
}

/**
 * Removes a value from an array
 * @param array
 * @param item
 * @returns if the item was removed
 */
export function remove<T>(array: T[], item: T) {
	const index = array.indexOf(item);
	if (index === -1) return false;
	array.splice(index, 1);
	return true;
}

/**
 * Removes an item from an array without maintaining order
 * @param array
 * @param index
 */
export function unorderedRemove<T>(array: T[], index: number) {
	swap(array, index, array.length - 1);
	array.pop();
}

/**
 * Splits an array into equally-sized sub arrays
 * @param array
 * @param size the length of each chunk
 * @returns the chunks
 */
export function chunk<T>(array: readonly T[], size: number) {
	const result: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}

/**
 * Returns an array containing items found in all arrays
 * @param arrays
 */
export function intersection<T>(...arrays: ReadonlyArray<readonly T[]>): T[] {
	const [first, ...rest] = arrays;
	if (!first) return [];
	return first.filter(item => rest.every(array => array.includes(item)));
}

export function changes<T, U>(
	oldArray: readonly T[],
	newArray: readonly U[],
): [added: U[], removed: T[]] {
	return [
		newArray.filter(value => !oldArray.includes(value as unknown as T)),
		oldArray.filter(value => !newArray.includes(value as unknown as U)),
	];
}

export function difference<T>(array1: readonly T[], array2: readonly T[]) {
	const [added, removed] = changes(array1, array2);
	return [...added, ...removed];
}

/**
 * Returns an array containing items from all arrays deduplicated
 * @param arrays
 */
export function union<T>(...arrays: ReadonlyArray<readonly T[]>) {
	return [...new Set(arrays.flat())];
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

export function arraysEqual<T>(a: readonly T[], b: readonly T[]) {
	if (a.length !== b.length) return false;
	for (const [item1, item2] of zip(a, b)) {
		if (item1 !== item2) return false;
	}

	return true;
}

/**
 * Check if an array contains at least one of the items in another
 * @param a the array to check
 * @param b items the array should include
 * @returns if the `a` has at least one of the items in `b`
 */
export function includesAny<T, U>(a: readonly T[], b: readonly U[]) {
	return b.some(item => a.includes(item as unknown as T));
}

/**
 * Check if an array contains all of the items in another
 * @param a the array to check
 * @param b items the array should include
 * @returns if the `a` has all of the items in `b`
 */
export function includesAll<T, U>(a: readonly T[], b: readonly U[]) {
	return b.every(item => a.includes(item as unknown as T));
}

export function dedupe<T extends { [K in keyof T]: T[K] }>(
	array: readonly T[],
	key: keyof T,
) {
	const copy = [...array];
	const values = new Set<PropertyKey>();
	for (let i = copy.length - 1; i >= 0; i--) {
		const item = copy[i]!;
		const value = item[key];
		if (values.has(value)) copy.splice(i, 1);
		else values.add(value);
	}

	return copy;
}

export function filterByKey<T>(array: readonly T[], key: keyof T) {
	return array.filter(item => item[key]);
}

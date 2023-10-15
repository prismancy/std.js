import { ascend, type Compare } from "./cmp";
import { zip } from "./iter";
import { type Indexable, type MaybeArray } from "./types";

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
	const result: T[] = [];
	const values = new Set<PropertyKey>();
	for (const item of array) {
		const value = item[key];
		if (!values.has(value)) {
			result.push(item);
			values.add(value);
		}
	}

	return result;
}

export function filterByKey<T>(array: readonly T[], key: keyof T) {
	return array.filter(item => item[key]);
}

export function sortByKey<T, K extends keyof T>(
	array: readonly T[],
	key: MaybeArray<K>,
	compare: Compare<T[K]> = ascend,
) {
	return [...array].sort((a, b) => {
		const keys = Array.isArray(key) ? key : [key];
		for (const key of keys) {
			const value1 = a[key];
			const value2 = b[key];
			const cmp = compare(value1, value2);
			if (cmp) return cmp;
		}

		return 0;
	});
}

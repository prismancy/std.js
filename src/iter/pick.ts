import { pickByKeys } from "../object";
import { type AnyRecord } from "../types";

/**
 * Using an iterable of objects, extract the value from each object
 * @param iter
 * @param key a key in each object
 * @returns the iterator of values
 */
export function pick<T extends AnyRecord, K extends keyof T>(
	iter: Iterable<T>,
	key: K,
): Generator<T[K]>;
/**
 * Using an iterable of objects, extract part of each object
 * @param iter
 * @param keys an array of keys in each object
 * @returns the iterator of object only containing the keys specified
 */
export function pick<T extends AnyRecord, K extends keyof T>(
	iter: Iterable<T>,
	keys: K[],
): Generator<Pick<T, K>>;
export function* pick<T extends AnyRecord, K extends keyof T>(
	iter: Iterable<T>,
	keys: K | K[],
) {
	if (Array.isArray(keys)) {
		for (const item of iter) {
			yield pickByKeys(item, keys);
		}
	} else {
		for (const item of iter) {
			yield item[keys];
		}
	}
}

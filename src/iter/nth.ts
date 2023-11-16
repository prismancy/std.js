import { dual } from "../fn";
import { type uint } from "../types";

/**
 * Gets a certain value from an iterable based on sequence number
 * @param iter
 * @param n a zero-based index
 */
export const nth: {
	<T>(iter: Iterable<T>, n: uint): T;
	<T>(n: uint): (iter: Iterable<T>) => T;
} = dual(<T>(iter: Iterable<T>, n: uint) => {
	let i = 0;
	for (const value of iter) {
		if (i++ === n) return value;
	}

	return undefined;
});

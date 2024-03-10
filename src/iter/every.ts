import { dual } from "../fn/mod.ts";

/**
 * Checks if every item in an iterable passes a `predicate`
 * @param iter
 * @param predicate a function to test each item
 */
export const every: {
	<T>(iter: Iterable<T>, predicate: (item: T) => unknown): boolean;
	<T>(predicate: (item: T) => unknown): (iter: Iterable<T>) => boolean;
} = dual(<T>(iter: Iterable<T>, predicate: (item: T) => unknown) => {
	for (const item of iter) {
		if (!predicate(item)) return false;
	}

	return true;
});

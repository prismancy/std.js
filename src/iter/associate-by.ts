import { type AnyRecord } from "../types";

export function associateBy<T extends AnyRecord, K extends keyof T>(
	array: Iterable<T>,
	key: K,
) {
	const map = new Map<T[K], T>();
	for (const item of array) {
		map[item[key]] = item;
	}

	return map;
}

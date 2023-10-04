import { type AnyRecord } from "../types";

export function groupBy<T extends AnyRecord, K extends keyof T>(
	array: Iterable<T>,
	key: K,
) {
	const groups = new Map<T[K], T[]>();
	for (const item of array) {
		const value = item[key];
		const group = groups.get(value);
		if (group) group.push(item);
		else groups.set(value, [item]);
	}

	return groups;
}

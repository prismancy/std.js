import { dual } from "../fn";

export const sum = dual((iter: Iterable<number>) => {
	let total = 0;
	for (const value of iter) {
		total += value;
	}

	return total;
});

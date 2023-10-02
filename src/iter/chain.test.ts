import { expect, test } from "vitest";
import { chain } from "./chain";
import { range } from "./range";

test("range(5) + range(10)", () => {
	const iter1 = range(5);
	const iter2 = range(10);
	const iter = chain(iter1, iter2);
	expect([...iter]).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

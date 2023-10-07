import { expect, test } from "vitest";
import { range } from "./range";
import { repeat } from "./repeat";

test("zero items", () => {
	const iter = range(0);
	const repeated = repeat(iter, 3);
	expect([...repeated]).toEqual([]);
});

test("one item", () => {
	const iter = range(1);
	const repeated = repeat(iter, 3);
	expect([...repeated]).toEqual([0, 0, 0]);
});

test("multiple items", () => {
	const iter = range(5);
	const repeated = repeat(iter, 3);
	expect([...repeated]).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]);
});

import { expect, test } from "vitest";
import { count } from "./count";
import { range } from "./range";

test("zero items", () => {
	const iter = range(0);
	const n = count(iter);
	expect(n).toEqual(0);
});

test("one item", () => {
	const iter = range(1);
	const n = count(iter);
	expect(n).toEqual(1);
});

test("multiple items", () => {
	const iter = range(5);
	const n = count(iter);
	expect(n).toEqual(5);
});

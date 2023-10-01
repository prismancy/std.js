import { expect, test } from "vitest";
import { range } from "../iter";
import { SortedArray } from "./sorted-array";

test("push() keeps sorted order", () => {
	const array = [...range(100)];
	const sorted = new SortedArray();
	for (const value of array) {
		sorted.push(value);
	}

	expect([...sorted]).toEqual(array);
});

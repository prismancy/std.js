import { expect, test } from "vitest";
import { shuffle } from "../array";
import { range } from "../iter";
import { SortedArray } from "./sorted-array";

test("push() keeps sorted order", () => {
	const array = [...range(100)];
	const sorted = new SortedArray();
	console.log(shuffle([...array]));
	for (const value of shuffle([...array])) {
		sorted.push(value);
	}

	expect([...sorted]).toEqual(array);
});

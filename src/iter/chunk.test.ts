import { expect, test } from "vitest";
import { chunk } from "./chunk";

test("chunk", () => {
	const array = [1, 2, 3, 4, 5];
	expect(chunk(array, 2)).toEqual([[1, 2], [3, 4], [5]]);
	expect(chunk(array, 3)).toEqual([
		[1, 2, 3],
		[4, 5],
	]);
});

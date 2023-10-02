import { expect, test } from "vitest";
import { enumerate } from "./enumerate";
import { range } from "./range";

test("contains correct indices", () => {
	const iter = range(2, 7);
	const enumerated = enumerate(iter);
	expect([...enumerated]).toEqual([
		[0, 2],
		[1, 3],
		[2, 4],
		[3, 5],
		[4, 6],
	]);
});

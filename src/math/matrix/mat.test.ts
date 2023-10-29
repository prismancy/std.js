import { assert, test } from "vitest";
import { Matrix, mat } from "./mat";

const a = mat(4, 3).set([
	[1, 5, 4],
	[8, 0, 4],
	[6, 4, 8],
	[4, 5, 5],
]);
const b = mat([
	[1, 2],
	[3, 3],
	[0, 8],
]);

test("multiply", () => {
	const ans = Matrix.mul(a, b);
	assert(
		ans.eq([
			[16, 49],
			[8, 48],
			[18, 88],
			[19, 63],
		]),
	);
});

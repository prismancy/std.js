import { assert, test } from "vitest";
import { Matrix2, mat2 } from "./mat2";

const a = mat2([5, 8, 3, 8]);
const b = mat2([3, 8, 8, 9]);

test("add", () => {
	const ans = Matrix2.add(a, b);
	assert(ans.equals([8, 16, 11, 17]));
});

test("subtract", () => {
	const ans = Matrix2.sub(a, b);
	assert(ans.equals([2, 0, -5, -1]));
});

test("multiply", () => {
	const ans = Matrix2.mult(a, b);
	assert(ans.equals([79, 112, 73, 96]));
});

test("determinant", () => {
	const ans = a.det();
	assert(ans === 16);
});
